# 用本机 Codex 跑反推、生图与校准

这些脚本把 `SKILL.md` 里的两条固定指令交给本机 Codex CLI 执行，并留下可核对的记录。指令每次都从 `SKILL.md` 读取，脚本里没有副本。需要已登录的 `codex`、Python 3、Pillow 与 NumPy。生图会消耗 Codex 账号额度。

```bash
scripts/codex.sh reverse   photo.jpg runs/photo/r0                    # 首次反推 → r0/prompt_en.txt
scripts/codex.sh generate  runs/photo/r0/prompt_en.txt runs/photo/r0/gen   # 纯文生图 → gen/generated.png
scripts/codex.sh calibrate photo.jpg runs/photo/r0 runs/photo/r1      # 对照原图与 r0/gen 校准一轮
scripts/codex.sh generate  runs/photo/r1/prompt_en.txt runs/photo/r1/gen
python3 -I scripts/similarity.py photo.jpg runs/photo/r1/gen/generated.png
```

- `reverse` 把原图复制成中性的 `image.*` 再交给 Codex，执行器拿不到原文件名；输出 `prompt_en.txt`、`instruction.txt` 和 `record.json`（源图与英文的 SHA-256、实际模型、推理强度、会话编号）。
- `generate` 只发送英文，不发送原图。Codex 代理常会自行扩写提示词，所以脚本要求它原样读取文件，再从 Codex 会话日志核对图像工具实际收到的文本；不一致时以非零状态退出，并在 `generation.json` 里保留实际发送的文本。图像内嵌的 C2PA 生成方信息一并记录。
- `calibrate` 同时附上原图和上一轮生成图，用校准指令改写上一轮英文，结果另存在新目录，不覆盖首次英文。
- 已存在的输出会保留，不会被重跑覆盖；要重跑请换目录。
- `similarity.py` 给出低分辨率结构（SSIM、边缘相关）和色彩布局（8×8 Lab 色差、直方图交集）的粗略数值，只反映构图、明暗和配色，不评价物体身份、姿态、文字或笔触，不能代替看图。

测试：`python3 -m unittest discover -s scripts/tests`
