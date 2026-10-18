#!/bin/bash
# Run the skill's fixed instructions through the local Codex CLI.
#
#   codex.sh reverse   <image> <run_dir>              first pass -> run_dir/prompt_en.txt
#   codex.sh generate  <prompt.txt> <gen_dir>         text-only generation -> gen_dir/generated.png
#   codex.sh calibrate <image> <prev_run_dir> <run_dir>
#                      compares the original with prev_run_dir/gen/generated.png
#                      and revises prev_run_dir/prompt_en.txt -> run_dir/prompt_en.txt
#
# Instructions are read from SKILL.md, never copied. Existing outputs are kept, not
# overwritten. The generator only ever receives the English prompt, never the image.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
SKILL="$(dirname "$HERE")/SKILL.md"
FLAGS=(--skip-git-repo-check --disable memories -s workspace-write --json)

usage() { sed -n '2,10p' "$0" | sed 's/^# \{0,1\}//'; exit 2; }
instruction() { python3 -I "$HERE/instruction.py" "$SKILL" "$1"; }
abs() { python3 -I -c 'import os,sys; print(os.path.abspath(sys.argv[1]))' "$1"; }

GENERATE_REQUEST='Read the file ./prompt.txt with a shell command. Call your image generation tool exactly once, passing the complete contents of that file as the prompt argument, character for character. Do not add, remove, translate, summarize or rephrase anything, and add no words of your own. Omit referenced_image_paths and num_last_images_to_include, and set transparent_background to false. When it finishes, copy the generated PNG into the current directory as ./generated.png. Do not create or edit any other file. Reply only with the path of the copied file.'

reverse() {
  local img out ext
  img="$(abs "$1")"; out="$2"
  if [ -s "$out/prompt_en.txt" ]; then echo "kept existing $out/prompt_en.txt"; return; fi
  mkdir -p "$out/work"; ext="${img##*.}"
  cp "$img" "$out/work/image.$ext"   # neutral name: the executor gets no hints from file names
  instruction "通用指令" > "$out/instruction.txt"
  codex exec "${FLAGS[@]}" -C "$out/work" -o "$out/prompt_en.txt" \
    "$(cat "$out/instruction.txt")" -i "$out/work/image.$ext" \
    < /dev/null > "$out/codex_events.jsonl" 2> "$out/codex_stderr.txt"
  python3 -I "$HERE/record.py" text "$img" "$out" "first pass"
}

generate() {
  local prompt out
  prompt="$1"; out="$2"
  if [ -s "$out/generated.png" ]; then echo "kept existing $out/generated.png"; return; fi
  mkdir -p "$out"
  cp "$prompt" "$out/prompt.txt"
  codex exec "${FLAGS[@]}" -C "$out" -c 'model_reasoning_effort="low"' -o "$out/codex_last.txt" \
    "$GENERATE_REQUEST" < /dev/null > "$out/codex_events.jsonl" 2> "$out/codex_stderr.txt"
  python3 -I "$HERE/record.py" generation "$out"
}

calibrate() {
  local img prev out ext
  img="$(abs "$1")"; prev="$2"; out="$3"
  if [ -s "$out/prompt_en.txt" ]; then echo "kept existing $out/prompt_en.txt"; return; fi
  [ -s "$prev/prompt_en.txt" ] && [ -s "$prev/gen/generated.png" ] \
    || { echo "need $prev/prompt_en.txt and $prev/gen/generated.png" >&2; exit 1; }
  mkdir -p "$out/work"; ext="${img##*.}"
  cp "$img" "$out/work/original.$ext"
  cp "$prev/gen/generated.png" "$out/work/generated.png"
  { instruction "校准指令"; printf '"""\n%s\n"""\n' "$(cat "$prev/prompt_en.txt")"; } > "$out/instruction.txt"
  codex exec "${FLAGS[@]}" -C "$out/work" -o "$out/prompt_en.txt" \
    "$(cat "$out/instruction.txt")" -i "$out/work/original.$ext" "$out/work/generated.png" \
    < /dev/null > "$out/codex_events.jsonl" 2> "$out/codex_stderr.txt"
  python3 -I "$HERE/record.py" text "$img" "$out" "calibration of $(basename "$prev")"
}

case "${1:-}" in
  reverse)   [ $# -eq 3 ] || usage; reverse "$2" "$3" ;;
  generate)  [ $# -eq 3 ] || usage; generate "$2" "$3" ;;
  calibrate) [ $# -eq 4 ] || usage; calibrate "$2" "$3" "$4" ;;
  *) usage ;;
esac
