"""Write run records for the Codex scripts.

usage:
  python3 -I record.py text <source_image> <run_dir> <label>
      -> <run_dir>/record.json for a reverse or calibration run (prompt_en.txt)
  python3 -I record.py generation <gen_dir>
      -> <gen_dir>/generation.json; checks the image tool received prompt.txt verbatim

Facts come from the files and from Codex's own session log (~/.codex/sessions);
anything that cannot be verified is written as "unknown".
"""
import glob
import hashlib
import json
import os
import re
import sys
from collections.abc import Iterator
from datetime import datetime, timezone

from PIL import Image

UNKNOWN = "unknown"


def sha256_file(path: str) -> str:
    with open(path, "rb") as fh:
        return hashlib.sha256(fh.read()).hexdigest()


def sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def thread_id(events_path: str) -> str | None:
    with open(events_path, encoding="utf-8") as fh:
        for line in fh:
            event = json.loads(line)
            if event.get("type") == "thread.started":
                return event.get("thread_id")
    return None


def rollout_path(tid: str | None) -> str | None:
    if not tid:
        return None
    hits = glob.glob(os.path.expanduser(f"~/.codex/sessions/*/*/*/rollout-*{tid}.jsonl"))
    return hits[0] if hits else None


def rollout_payloads(path: str | None) -> Iterator[dict]:
    if not path:
        return
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            payload = json.loads(line).get("payload")
            if isinstance(payload, dict):
                yield payload


def executor_facts(events_path: str) -> dict:
    tid = thread_id(events_path)
    facts = {"tool": "codex exec", "thread_id": tid or UNKNOWN, "model": UNKNOWN, "reasoning_effort": UNKNOWN, "cli_version": UNKNOWN}
    for p in rollout_payloads(rollout_path(tid)):
        facts["model"] = p.get("model", facts["model"])
        facts["reasoning_effort"] = p.get("effort", p.get("reasoning_effort", facts["reasoning_effort"]))
        facts["cli_version"] = p.get("cli_version", facts["cli_version"])
    return facts


def read_cbor_text(buf: bytes, i: int) -> tuple[str | None, int]:
    """Read one CBOR text string at buf[i]; return (text, next_index) or (None, i)."""
    head = buf[i]
    if head >> 5 != 3:
        return None, i
    n = head & 0x1F
    i += 1
    if n == 24:
        n, i = buf[i], i + 1
    elif n == 25:
        n, i = int.from_bytes(buf[i:i + 2], "big"), i + 2
    elif n > 25:
        return None, i
    return buf[i:i + n].decode("utf-8", "replace"), i + n


def c2pa_agent(png_path: str) -> dict | str:
    """Return the C2PA softwareAgent {name, version} embedded by the image service, if any."""
    with open(png_path, "rb") as fh:
        buf = fh.read()
    at = buf.find(b"softwareAgent")
    if at < 0:
        return UNKNOWN
    i = at + len("softwareAgent")
    if buf[i] >> 5 != 5:  # expect a CBOR map
        return UNKNOWN
    pairs, i = buf[i] & 0x1F, i + 1
    agent = {}
    for _ in range(pairs):
        key, i = read_cbor_text(buf, i)
        value, i = read_cbor_text(buf, i)
        if key is None or value is None:
            break
        agent[key] = value
    return agent or UNKNOWN


def skill_version() -> str:
    """Version from the SKILL.md front matter next to this scripts folder."""
    skill = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "SKILL.md")
    try:
        with open(skill, encoding="utf-8") as fh:
            match = re.search(r"^\s*version:\s*(\S+)", fh.read(), re.M)
    except OSError:
        return UNKNOWN
    return match.group(1) if match else UNKNOWN


def record_text(source: str, run_dir: str, label: str) -> None:
    prompt_path = os.path.join(run_dir, "prompt_en.txt")
    instruction_path = os.path.join(run_dir, "instruction.txt")
    rec = {
        "kind": label,
        "skill_version": skill_version(),
        "created": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "source": {"file": os.path.abspath(source), "sha256": sha256_file(source)},
        "prompt": {"file": "prompt_en.txt", "sha256": sha256_file(prompt_path) if os.path.exists(prompt_path) else UNKNOWN},
        "instruction": {"file": "instruction.txt", "sha256": sha256_file(instruction_path) if os.path.exists(instruction_path) else UNKNOWN},
        "executor": executor_facts(os.path.join(run_dir, "codex_events.jsonl")),
    }
    previous = os.path.join(run_dir, "work", "generated.png")
    if os.path.exists(previous):
        rec["compared_generation_sha256"] = sha256_file(previous)
    with open(os.path.join(run_dir, "record.json"), "w", encoding="utf-8") as fh:
        json.dump(rec, fh, ensure_ascii=False, indent=2)
    print(json.dumps({"record": os.path.join(run_dir, "record.json"), "model": rec["executor"]["model"]}))


def record_generation(gen_dir: str) -> None:
    with open(os.path.join(gen_dir, "prompt.txt"), encoding="utf-8") as fh:
        prompt = fh.read()
    rollout = rollout_path(thread_id(os.path.join(gen_dir, "codex_events.jsonl")))
    calls = []
    for p in rollout_payloads(rollout):
        item = p.get("item")
        if p.get("type") == "item_completed" and isinstance(item, dict) and item.get("kind") == "image_gen.generation":
            calls.append({"status": item.get("status"), "failure": item.get("failure"), "sent": item.get("revisedPrompt")})
    sent = calls[-1]["sent"] if calls else None
    image = os.path.join(gen_dir, "generated.png")
    rec = {
        "tool": "codex image_gen.imagegen (prompt only; no size, quality or seed parameters exposed)",
        "generation_calls": len(calls),
        "statuses": [c["status"] for c in calls],
        "failures": [c["failure"] for c in calls if c["failure"]],
        "prompt_sha256": sha256_text(prompt),
        "sent_equals_prompt": sent is not None and sent.strip() == prompt.strip(),
        "reference_image": False,
        "seed": None,
    }
    if sent is not None and not rec["sent_equals_prompt"]:
        rec["sent_prompt"] = sent
    if os.path.exists(image):
        with Image.open(image) as im:
            rec.update({"width": im.width, "height": im.height})
        rec["image_sha256"] = sha256_file(image)
        rec["c2pa_software_agent"] = c2pa_agent(image)
    with open(os.path.join(gen_dir, "generation.json"), "w", encoding="utf-8") as fh:
        json.dump(rec, fh, ensure_ascii=False, indent=2)
    print(json.dumps({k: rec.get(k) for k in ("generation_calls", "sent_equals_prompt", "width", "height", "c2pa_software_agent")}, ensure_ascii=False))
    if not rec["sent_equals_prompt"]:
        sys.exit("the image tool did not receive prompt.txt verbatim; see generation.json")


if __name__ == "__main__":
    if len(sys.argv) >= 5 and sys.argv[1] == "text":
        record_text(sys.argv[2], sys.argv[3], sys.argv[4])
    elif len(sys.argv) == 3 and sys.argv[1] == "generation":
        record_generation(sys.argv[2])
    else:
        sys.exit(__doc__)
