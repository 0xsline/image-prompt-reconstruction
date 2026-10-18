"""Crude, model-free similarity between a source image and a generated image.

Both images are resized to the same normalized grid, so positions are compared
as fractions of the frame; an aspect-ratio mismatch is reported separately.
These numbers are coarse signals for layout, brightness and palette. They do
not measure object identity, pose, text or brushwork, and they do not replace
looking at the images.

usage: python3 -I similarity.py <source> <generated>
"""
import json
import sys

import numpy as np
from PIL import Image

GRID = 64          # structure comparison resolution
COLOR_GRID = 8     # coarse color-layout grid
HIST_BINS = 8      # per-channel bins for the Lab histogram


def srgb_to_lab(rgb: np.ndarray) -> np.ndarray:
    """sRGB in 0..1 -> CIE Lab (D65)."""
    lin = np.where(rgb <= 0.04045, rgb / 12.92, ((rgb + 0.055) / 1.055) ** 2.4)
    m = np.array([[0.4124564, 0.3575761, 0.1804375],
                  [0.2126729, 0.7151522, 0.0721750],
                  [0.0193339, 0.1191920, 0.9503041]])
    xyz = lin @ m.T / np.array([0.95047, 1.0, 1.08883])
    eps, k = 216 / 24389, 24389 / 27
    f = np.where(xyz > eps, np.cbrt(xyz), (k * xyz + 16) / 116)
    return np.stack([116 * f[..., 1] - 16,
                     500 * (f[..., 0] - f[..., 1]),
                     200 * (f[..., 1] - f[..., 2])], axis=-1)


def load_lab(path: str, size: tuple[int, int]) -> np.ndarray:
    img = Image.open(path).convert("RGB").resize(size, Image.BICUBIC)
    return srgb_to_lab(np.asarray(img, dtype=np.float64) / 255.0)


def ssim(a: np.ndarray, b: np.ndarray, win: int = 7) -> float:
    """Mean SSIM with a uniform window on two 2-D arrays scaled 0..100."""
    c1, c2 = (0.01 * 100) ** 2, (0.03 * 100) ** 2
    pad = win // 2

    def box(x: np.ndarray) -> np.ndarray:
        p = np.pad(x, pad, mode="reflect")
        cs = np.pad(p.cumsum(0).cumsum(1), ((1, 0), (1, 0)))
        s = cs[win:, win:] - cs[:-win, win:] - cs[win:, :-win] + cs[:-win, :-win]
        return s / (win * win)

    mu_a, mu_b = box(a), box(b)
    va, vb = box(a * a) - mu_a ** 2, box(b * b) - mu_b ** 2
    cov = box(a * b) - mu_a * mu_b
    s = ((2 * mu_a * mu_b + c1) * (2 * cov + c2)) / ((mu_a ** 2 + mu_b ** 2 + c1) * (va + vb + c2))
    return float(s.mean())


def edge_corr(a: np.ndarray, b: np.ndarray) -> float:
    def mag(x: np.ndarray) -> np.ndarray:
        gy, gx = np.gradient(x)
        return np.hypot(gx, gy).ravel()

    ma, mb = mag(a), mag(b)
    if ma.std() == 0 or mb.std() == 0:
        return 0.0
    return float(np.corrcoef(ma, mb)[0, 1])


def lab_hist(lab: np.ndarray) -> np.ndarray:
    ranges = [(0, 100), (-128, 128), (-128, 128)]
    h, _ = np.histogramdd(lab.reshape(-1, 3), bins=HIST_BINS, range=ranges)
    return h / h.sum()


def compare(src: str, gen: str) -> dict:
    with Image.open(src) as s, Image.open(gen) as g:
        a_src, a_gen = s.width / s.height, g.width / g.height
    ls, lg = load_lab(src, (GRID, GRID)), load_lab(gen, (GRID, GRID))
    cs, cg = load_lab(src, (COLOR_GRID, COLOR_GRID)), load_lab(gen, (COLOR_GRID, COLOR_GRID))
    hs, hg = lab_hist(load_lab(src, (128, 128))), lab_hist(load_lab(gen, (128, 128)))
    chroma = lambda lab: np.hypot(lab[..., 1], lab[..., 2]).mean()  # noqa: E731
    return {
        "aspect_src": round(a_src, 3),
        "aspect_gen": round(a_gen, 3),
        "aspect_ratio_error": round(float(abs(np.log(a_gen / a_src))), 3),
        "ssim_luma64": round(ssim(ls[..., 0], lg[..., 0]), 3),
        "edge_corr64": round(edge_corr(ls[..., 0], lg[..., 0]), 3),
        "color_layout_dE8": round(float(np.sqrt(((cs - cg) ** 2).sum(-1)).mean()), 2),
        "lab_hist_intersection": round(float(np.minimum(hs, hg).sum()), 3),
        "L_mean_diff": round(float(lg[..., 0].mean() - ls[..., 0].mean()), 2),
        "L_std_diff": round(float(lg[..., 0].std() - ls[..., 0].std()), 2),
        "chroma_diff": round(float(chroma(lg) - chroma(ls)), 2),
    }


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    print(json.dumps(compare(sys.argv[1], sys.argv[2])))
