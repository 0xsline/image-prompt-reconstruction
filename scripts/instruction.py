"""Print a fixed instruction block from SKILL.md, so scripts never keep their own copy.

usage: python3 -I instruction.py <SKILL.md> <heading prefix>
  e.g. "通用指令" or "校准指令"; prints the first ```text block under that ## heading.
"""
import re
import sys


def extract(skill_path: str, heading: str) -> str:
    with open(skill_path, encoding="utf-8") as fh:
        text = fh.read()
    pattern = r"^## " + re.escape(heading) + r"[^\n]*\n.*?```text\n(.*?)\n```"
    match = re.search(pattern, text, re.S | re.M)
    if not match:
        raise SystemExit(f"no ```text block under '## {heading}' in {skill_path}")
    return match.group(1).strip()


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    print(extract(sys.argv[1], sys.argv[2]))
