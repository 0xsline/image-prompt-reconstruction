"""Tests for the helper scripts. Run: python3 -m unittest discover -s scripts/tests"""
import json
import os
import sys
import tempfile
import unittest
from unittest import mock

import numpy as np
from PIL import Image

SCRIPTS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT = os.path.dirname(SCRIPTS)
sys.path.insert(0, SCRIPTS)

import instruction  # noqa: E402
import record  # noqa: E402
import similarity  # noqa: E402


def load_json(path: str) -> dict:
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def cbor_text(s: str) -> bytes:
    raw = s.encode()
    assert len(raw) < 24
    return bytes([0x60 + len(raw)]) + raw


class InstructionTest(unittest.TestCase):
    def test_reads_both_blocks_from_skill(self) -> None:
        skill = os.path.join(ROOT, "SKILL.md")
        first = instruction.extract(skill, "通用指令")
        calib = instruction.extract(skill, "校准指令")
        self.assertTrue(first.startswith("Reconstruct the attached image"))
        self.assertIn("single paragraph", first)
        self.assertTrue(calib.endswith("Prompt used for the second image:"))
        self.assertNotIn("```", first + calib)

    def test_missing_heading_fails(self) -> None:
        with tempfile.NamedTemporaryFile("w", suffix=".md", delete=False) as fh:
            fh.write("# nothing here\n")
        with self.assertRaises(SystemExit):
            instruction.extract(fh.name, "通用指令")


class C2paTest(unittest.TestCase):
    def test_reads_software_agent_map(self) -> None:
        blob = (b"\x89PNG junk softwareAgent" + bytes([0xA2]) + cbor_text("name") + cbor_text("ChatGPT")
                + cbor_text("version") + cbor_text("gpt-image") + b"tail")
        with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as fh:
            fh.write(blob)
        self.assertEqual(record.c2pa_agent(fh.name), {"name": "ChatGPT", "version": "gpt-image"})

    def test_missing_agent_is_unknown(self) -> None:
        with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as fh:
            fh.write(b"\x89PNG no credentials")
        self.assertEqual(record.c2pa_agent(fh.name), "unknown")


class GenerationRecordTest(unittest.TestCase):
    def make_run(self, home: str, sent: str) -> str:
        tid = "thread-123"
        sessions = os.path.join(home, ".codex", "sessions", "2026", "10", "19")
        os.makedirs(sessions)
        item = {"type": "item_completed", "item": {"kind": "image_gen.generation", "status": "completed", "revisedPrompt": sent, "failure": None}}
        with open(os.path.join(sessions, f"rollout-x-{tid}.jsonl"), "w") as fh:
            fh.write(json.dumps({"payload": item}) + "\n")
        gen = os.path.join(home, "gen")
        os.makedirs(gen)
        with open(os.path.join(gen, "codex_events.jsonl"), "w") as fh:
            fh.write(json.dumps({"type": "thread.started", "thread_id": tid}) + "\n")
        with open(os.path.join(gen, "prompt.txt"), "w") as fh:
            fh.write("A plain test prompt.\n")
        Image.new("RGB", (30, 20), "gray").save(os.path.join(gen, "generated.png"))
        return gen

    def test_verbatim_prompt_passes(self) -> None:
        with tempfile.TemporaryDirectory() as home, mock.patch.dict(os.environ, {"HOME": home}):
            gen = self.make_run(home, "A plain test prompt.")
            record.record_generation(gen)
            rec = load_json(os.path.join(gen, "generation.json"))
            self.assertTrue(rec["sent_equals_prompt"])
            self.assertEqual((rec["width"], rec["height"]), (30, 20))

    def test_rewritten_prompt_is_flagged(self) -> None:
        with tempfile.TemporaryDirectory() as home, mock.patch.dict(os.environ, {"HOME": home}):
            gen = self.make_run(home, "A stunning, cinematic test prompt.")
            with self.assertRaises(SystemExit):
                record.record_generation(gen)
            rec = load_json(os.path.join(gen, "generation.json"))
            self.assertFalse(rec["sent_equals_prompt"])
            self.assertEqual(rec["sent_prompt"], "A stunning, cinematic test prompt.")


class SkillVersionTest(unittest.TestCase):
    def test_reads_version_from_front_matter(self) -> None:
        self.assertRegex(record.skill_version(), r"^v\d+")


class SimilarityTest(unittest.TestCase):
    def save(self, arr: np.ndarray) -> str:
        fh = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
        Image.fromarray(arr.astype("uint8")).save(fh.name)
        return fh.name

    def test_identical_and_different_images(self) -> None:
        rng = np.random.default_rng(0)
        base = np.zeros((90, 120, 3))
        base[20:70, 30:80] = [200, 120, 40]
        base += rng.integers(0, 20, base.shape)
        a = self.save(base)
        same = similarity.compare(a, a)
        self.assertAlmostEqual(same["ssim_luma64"], 1.0, places=3)
        self.assertEqual(same["color_layout_dE8"], 0.0)
        self.assertAlmostEqual(same["lab_hist_intersection"], 1.0, places=3)
        moved = np.roll(base, 40, axis=1)
        other = similarity.compare(a, self.save(moved))
        self.assertLess(other["ssim_luma64"], same["ssim_luma64"])
        self.assertGreater(other["color_layout_dE8"], 5)


if __name__ == "__main__":
    unittest.main()
