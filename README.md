<h1 align="center">Image Prompt Reconstruction</h1>

<p align="center">
  <strong>把参考图写成可复用的生图提示词</strong><br>
  先定画幅、媒介与光线，再写布局和细节；需要时用一次生图结果校准。
</p>

<p align="center">
  <a href="#快速开始">快速开始</a> ·
  <a href="#留出集对比">留出集对比</a> ·
  <a href="#模型与评测">模型与评测</a> ·
  <a href="SKILL.md">通用指令</a>
</p>

<p align="center"><sub>Agent Skill · v6 · 10 张未参与调试的新图 × 3 组生成 · 另有 12 张 v5 历史案例</sub></p>

<table width="100%">
<tr><th width="25%">原图</th><th width="25%">v5</th><th width="25%">v6 单次</th><th width="25%">v6 + 校准一轮</th></tr>
<tr><td align="center"><img src="examples/holdout/h0905/source.jpg" width="210" alt="晨雾中的老城原图"></td><td align="center"><img src="examples/holdout/h0905/v5/generated.webp" width="210" alt="v5 生成：晴朗清晨，没有浓雾"></td><td align="center"><img src="examples/holdout/h0905/v6/generated.webp" width="210" alt="v6 单次生成：仍是晴朗清晨"></td><td align="center"><img src="examples/holdout/h0905/v6-calibrated/generated.webp" width="210" alt="v6 校准后生成：浓雾与粉彩低反差接近原图"></td></tr>
</table>

晨雾老城：两版单次反推都被生成器“改”成晴朗清晨；校准一轮后，雾层、低反差的粉彩色调和塔楼位置接近原图。右边三张都只接收英文，没有输入原图。

[英文原文](examples/holdout/h0905/) · [检查记录](examples/holdout/h0905/case.json) · 原图：Hendrik Mändla，CC BY-SA 4.0，[来源与完整署名](ATTRIBUTION.md#holdout)。

> 反推与校准用 Codex 里的 `gpt-6-astra`，生图用 Codex 内置图像工具（图片 C2PA 凭证标为 ChatGPT · gpt-image）。展示真实差异，不代表精确复刻或找回原作者提示词。

## 快速开始

在项目目录运行，需要 Node.js 与 npm：

```bash
npx skills add 0xsline/image-prompt-reconstruction \
  --skill image-prompt-reconstruction
```

选择客户端安装，新开会话，附上图片后说：

```text
用 image-prompt-reconstruction 反推这张图。
保存首次英文提示词和运行记录，暂时不要生图。
```

想让生成结果更像原图，且助手能生图时，接着说：

```text
用首次英文生成一张，再按校准指令对照原图校准一轮，校准稿另存后重新生成。
```

助手会实际查看图片，按同一条指令先写画幅、媒介、机位和光线，再写布局、主体与质感，保存 `prompt_en.txt` 和 `record.json`。首次英文不被后续校准覆盖。

需要支持看图和文件操作的助手；生图还需要宿主提供相应工具。仓库不含模型，处理方式和费用取决于客户端，**本地 skill 不等于离线推理**。

<details>
<summary>手动安装、直接使用指令、批量处理与 Codex 脚本</summary>

**手动安装**，适用于支持项目级 `.agents/skills/` 的客户端：

```bash
mkdir -p .agents/skills
git clone https://github.com/0xsline/image-prompt-reconstruction.git \
  .agents/skills/image-prompt-reconstruction
```

其它客户端请换成其技能目录，保留 `SKILL.md` 与 `references/`。不要覆盖已有修改。如果没有自动发现，可明确要求助手读取安装目录的 `SKILL.md` 后执行；未验证所有客户端的自动触发。

**不安装**，复制 [通用英文指令](SKILL.md#通用指令-v6)，连同图片交给视觉模型。这种方式只返回文字，不会自动保存记录。

**批量处理**，可以这样请求：

```text
用同一条通用指令逐张反推这些图片，每张单独保存。
对选定的图片，用完整英文各生成一次，不向生成模型传原图。
保留失败结果，不按结果逐图改词。模型不可用时直接说明。
```

每图使用独立目录。`record.json` 记录源图和提示词的 SHA-256、指令版本、实际模型与执行方式，未知字段写 `unknown`。译文、修订稿、校准稿和参考图生成结果另存，不混入首次纯文结果。

**本机 Codex**：[scripts/](scripts/) 用已登录的 Codex CLI 跑反推、纯文生图和校准，指令直接从 `SKILL.md` 读取，并从 Codex 日志核对图像工具收到的英文与文件逐字一致（代理常会自行扩写提示词）。

</details>

## v6 改了什么

v5 的英文把大量篇幅花在百分比坐标上，媒介和光线放在段末。生成器对坐标只是大致遵守，却会按自己的习惯把画面“改好”：主体放大、移向中间，夜景提亮，阴天变晴，油画变成高细节数码画，看不清的牌匾被编出新字。v6 针对这些偏差改写：

- **开头一句先定画面**：画幅比例（如 `Landscape 3:2`）、实际媒介、机位高度与角度、景别、主体、场景和时间光线。生图工具没有尺寸参数时，比例只能靠这句话传达。
- **景别按画框判断**：主体四周都有留白时，无论多大都写成“完整主体、四周可见环境”，只有碰到或被画框截断才叫特写，避免 `tightly framed`、`close-up` 把主体推大。
- **写明生成器的习惯**：指令列出放大、居中、提亮、加饱和、堆细节、数码化等常见偏差，原图凡是不同于这些倾向的地方，要在开头直说。
- **强度照实写**：颜色、暗度、对比与质感按实际强度描述，不用 deeply、very、dramatic 之类强化词。
- **文字照抄**：清楚可读的文字原样加引号转写，读不清的写明不可读，不编字。
- **款式靠形状**：交代比例和独特造型；只有一眼可认的地标或产品型号才点名，且仍描述外形。不识别真人，不点名画家。
- **可选校准一轮**：用首次英文生成一张，让同一个反推模型对照原图，改掉差别最大的三到五处，另存校准稿再生成。生成器始终只收到英文。开发集上第二轮会把已对的颜色或物体改错，所以默认只做一轮。

## 留出集对比

选图规则在查看任何结果之前定死：Wikimedia Commons 每日图片，从 2026-09-01 起按日期取前 8 张合格图（排除可识别人物肖像、地图图表、超宽全景和非 CC/PD 许可），另按同一规则补两幅 8 月的版画/海报。这 10 张没有参与 v6 的任何调试。每张图用 v5 和 v6 在同一环境各反推一次、各生成一次；校准只做一轮，对照的是 v6 首次生成的那张。没有重跑挑选。

页首的晨雾老城（h0905）也属于这一组：冻结检查通过 0 / 0 / 4。

### 建筑 · 蓝调时刻的山丘餐厅

<table width="100%">
<tr><th width="25%">原图</th><th width="25%">v5</th><th width="25%">v6 单次</th><th width="25%">v6 + 校准</th></tr>
<tr><td align="center"><img src="examples/holdout/h0904/source.jpg" width="200" alt="夜色山丘上的餐厅原图"></td><td align="center"><img src="examples/holdout/h0904/v5/generated.webp" width="200" alt="v5 生成的夜色山丘上的餐厅"></td><td align="center"><img src="examples/holdout/h0904/v6/generated.webp" width="200" alt="v6 单次生成的夜色山丘上的餐厅"></td><td align="center"><img src="examples/holdout/h0904/v6-calibrated/generated.webp" width="200" alt="v6 校准后生成的夜色山丘上的餐厅"></td></tr>
</table>

v5 画成 3:2，立面字被编成 STRANDPAVILLON；v6 保住 16:9 和 MARIEN HÖHE；校准后沙丘压成近黑剪影，最接近原图。

冻结检查通过 1 / 2 / 3（每版 4 条）· 英文：[v5](examples/holdout/h0904/v5/prompt.txt) · [v6](examples/holdout/h0904/v6/prompt.txt) · [校准稿](examples/holdout/h0904/v6-calibrated/prompt.txt) · [检查记录](examples/holdout/h0904/case.json) · 原图：Dietmar Rabich，CC BY-SA 4.0，[来源](ATTRIBUTION.md#holdout)。

### 版画 · 1843 年军舰失火

<table width="100%">
<tr><th width="25%">原图</th><th width="25%">v5</th><th width="25%">v6 单次</th><th width="25%">v6 + 校准</th></tr>
<tr><td align="center"><img src="examples/holdout/h0826/source.jpg" width="200" alt="军舰失火版画原图"></td><td align="center"><img src="examples/holdout/h0826/v5/generated.webp" width="200" alt="v5 生成的军舰失火版画"></td><td align="center"><img src="examples/holdout/h0826/v6/generated.webp" width="200" alt="v6 单次生成的军舰失火版画"></td><td align="center"><img src="examples/holdout/h0826/v6-calibrated/generated.webp" width="200" alt="v6 校准后生成的军舰失火版画"></td></tr>
</table>

v5 把底部题字编成另一场火灾，画幅也成了 3:2；v6 照抄原题字，但把岩山放到左边；校准后岩山回到右侧，烟火与小船更接近。

冻结检查通过 2 / 2 / 3（每版 4 条）· 英文：[v5](examples/holdout/h0826/v5/prompt.txt) · [v6](examples/holdout/h0826/v6/prompt.txt) · [校准稿](examples/holdout/h0826/v6-calibrated/prompt.txt) · [检查记录](examples/holdout/h0826/case.json) · 原图：Thomas Goldsworthy Dutton / Edward Duncan，公有领域，[来源](ATTRIBUTION.md#holdout)。

### 动物 · 两只飞行的金刚鹦鹉

<table width="100%">
<tr><th width="25%">原图</th><th width="25%">v5</th><th width="25%">v6 单次</th><th width="25%">v6 + 校准</th></tr>
<tr><td align="center"><img src="examples/holdout/h0909/source.jpg" width="200" alt="两只飞行的金刚鹦鹉原图"></td><td align="center"><img src="examples/holdout/h0909/v5/generated.webp" width="200" alt="v5 生成的两只飞行的金刚鹦鹉"></td><td align="center"><img src="examples/holdout/h0909/v6/generated.webp" width="200" alt="v6 单次生成的两只飞行的金刚鹦鹉"></td><td align="center"><img src="examples/holdout/h0909/v6-calibrated/generated.webp" width="200" alt="v6 校准后生成的两只飞行的金刚鹦鹉"></td></tr>
</table>

三版都画对两只鸟和飞行方向；单次两版背景清晰、翅膀多出黄色条带，校准后背景虚化、配色接近原图。

冻结检查通过 1 / 1 / 3（每版 4 条）· 英文：[v5](examples/holdout/h0909/v5/prompt.txt) · [v6](examples/holdout/h0909/v6/prompt.txt) · [校准稿](examples/holdout/h0909/v6-calibrated/prompt.txt) · [检查记录](examples/holdout/h0909/case.json) · 原图：Giles Laurent，CC BY-SA 4.0，[来源](ATTRIBUTION.md#holdout)。

<details>
<summary>另外 6 组（含失败案例）</summary>

### 交通 · 海岸沉船

<table width="100%">
<tr><th width="25%">原图</th><th width="25%">v5</th><th width="25%">v6 单次</th><th width="25%">v6 + 校准</th></tr>
<tr><td align="center"><img src="examples/holdout/h0901/source.jpg" width="200" alt="海岸沉船原图"></td><td align="center"><img src="examples/holdout/h0901/v5/generated.webp" width="200" alt="v5 生成的海岸沉船"></td><td align="center"><img src="examples/holdout/h0901/v6/generated.webp" width="200" alt="v6 单次生成的海岸沉船"></td><td align="center"><img src="examples/holdout/h0901/v6-calibrated/generated.webp" width="200" alt="v6 校准后生成的海岸沉船"></td></tr>
</table>

v6 单次还原了阴天冷灰的光线（v5 是晴天）；校准后水线高度对了，却又变成晴天，船体也偏大。

冻结检查通过 1 / 2 / 2（每版 4 条）· 英文：[v5](examples/holdout/h0901/v5/prompt.txt) · [v6](examples/holdout/h0901/v6/prompt.txt) · [校准稿](examples/holdout/h0901/v6-calibrated/prompt.txt) · [检查记录](examples/holdout/h0901/case.json) · 原图：Ximonic (Simo Räsänen)，CC BY-SA 4.0，[来源](ATTRIBUTION.md#holdout)。

### 动物 · 红海旗鲷

<table width="100%">
<tr><th width="25%">原图</th><th width="25%">v5</th><th width="25%">v6 单次</th><th width="25%">v6 + 校准</th></tr>
<tr><td align="center"><img src="examples/holdout/h0902/source.jpg" width="200" alt="红海旗鲷原图"></td><td align="center"><img src="examples/holdout/h0902/v5/generated.webp" width="200" alt="v5 生成的红海旗鲷"></td><td align="center"><img src="examples/holdout/h0902/v6/generated.webp" width="200" alt="v6 单次生成的红海旗鲷"></td><td align="center"><img src="examples/holdout/h0902/v6-calibrated/generated.webp" width="200" alt="v6 校准后生成的红海旗鲷"></td></tr>
</table>

v6 单次颜色发闷，鱼也画小了，不如 v5；校准后恢复闪光下的饱和色和右下的软珊瑚，但鱼又偏大。

冻结检查通过 2 / 1 / 3（每版 4 条）· 英文：[v5](examples/holdout/h0902/v5/prompt.txt) · [v6](examples/holdout/h0902/v6/prompt.txt) · [校准稿](examples/holdout/h0902/v6-calibrated/prompt.txt) · [检查记录](examples/holdout/h0902/case.json) · 原图：Diego Delso，CC BY-SA 4.0，[来源](ATTRIBUTION.md#holdout)。

### 动物 · 迎面走来的犀牛

<table width="100%">
<tr><th width="25%">原图</th><th width="25%">v5</th><th width="25%">v6 单次</th><th width="25%">v6 + 校准</th></tr>
<tr><td align="center"><img src="examples/holdout/h0906/source.jpg" width="200" alt="迎面走来的犀牛原图"></td><td align="center"><img src="examples/holdout/h0906/v5/generated.webp" width="200" alt="v5 生成的迎面走来的犀牛"></td><td align="center"><img src="examples/holdout/h0906/v6/generated.webp" width="200" alt="v6 单次生成的迎面走来的犀牛"></td><td align="center"><img src="examples/holdout/h0906/v6-calibrated/generated.webp" width="200" alt="v6 校准后生成的迎面走来的犀牛"></td></tr>
</table>

v5 画成大角、光皮的另一种犀牛；v6 两版是带甲褶皮肤的独角犀，但整体偏右，校准版光线更接近原图的灰雾。

冻结检查通过 1 / 1 / 1（每版 4 条）· 英文：[v5](examples/holdout/h0906/v5/prompt.txt) · [v6](examples/holdout/h0906/v6/prompt.txt) · [校准稿](examples/holdout/h0906/v6-calibrated/prompt.txt) · [检查记录](examples/holdout/h0906/case.json) · 原图：Charles J. Sharp，CC BY-SA 4.0，[来源](ATTRIBUTION.md#holdout)。

### 风景 · 工业区湖面暮色

<table width="100%">
<tr><th width="25%">原图</th><th width="25%">v5</th><th width="25%">v6 单次</th><th width="25%">v6 + 校准</th></tr>
<tr><td align="center"><img src="examples/holdout/h0908/source.jpg" width="200" alt="工业区湖面暮色原图"></td><td align="center"><img src="examples/holdout/h0908/v5/generated.webp" width="200" alt="v5 生成的工业区湖面暮色"></td><td align="center"><img src="examples/holdout/h0908/v6/generated.webp" width="200" alt="v6 单次生成的工业区湖面暮色"></td><td align="center"><img src="examples/holdout/h0908/v6-calibrated/generated.webp" width="200" alt="v6 校准后生成的工业区湖面暮色"></td></tr>
</table>

三版都多画了一座风车，船的大小或位置也不对；校准版的紫粉色调最接近，v6 单次偏橙。

冻结检查通过 0 / 1 / 1（每版 4 条）· 英文：[v5](examples/holdout/h0908/v5/prompt.txt) · [v6](examples/holdout/h0908/v6/prompt.txt) · [校准稿](examples/holdout/h0908/v6-calibrated/prompt.txt) · [检查记录](examples/holdout/h0908/case.json) · 原图：W.carter，CC0 1.0，[来源](ATTRIBUTION.md#holdout)。

### 动物 · 石上的林三趾鹑

<table width="100%">
<tr><th width="25%">原图</th><th width="25%">v5</th><th width="25%">v6 单次</th><th width="25%">v6 + 校准</th></tr>
<tr><td align="center"><img src="examples/holdout/h0910/source.jpg" width="200" alt="石上的林三趾鹑原图"></td><td align="center"><img src="examples/holdout/h0910/v5/generated.webp" width="200" alt="v5 生成的石上的林三趾鹑"></td><td align="center"><img src="examples/holdout/h0910/v6/generated.webp" width="200" alt="v6 单次生成的石上的林三趾鹑"></td><td align="center"><img src="examples/holdout/h0910/v6-calibrated/generated.webp" width="200" alt="v6 校准后生成的石上的林三趾鹑"></td></tr>
</table>

三版都没画出胸前的黑白横斑，变成常见的斑点鹌鹑；这类细纹理很难只靠文字锁住。

冻结检查通过 1 / 1 / 1（每版 4 条）· 英文：[v5](examples/holdout/h0910/v5/prompt.txt) · [v6](examples/holdout/h0910/v6/prompt.txt) · [校准稿](examples/holdout/h0910/v6-calibrated/prompt.txt) · [检查记录](examples/holdout/h0910/case.json) · 原图：Tisha Mukherjee，CC BY-SA 4.0，[来源](ATTRIBUTION.md#holdout)。

### 海报 · 1913 年电影海报

<table width="100%">
<tr><th width="25%">原图</th><th width="25%">v5</th><th width="25%">v6 单次</th><th width="25%">v6 + 校准</th></tr>
<tr><td align="center"><img src="examples/holdout/h0807/source.jpg" width="200" alt="1913 年电影海报原图"></td><td align="center"><img src="examples/holdout/h0807/v5/generated.webp" width="200" alt="v5 生成的1913 年电影海报"></td><td align="center"><img src="examples/holdout/h0807/v6/generated.webp" width="200" alt="v6 单次生成的1913 年电影海报"></td><td align="center"><img src="examples/holdout/h0807/v6-calibrated/generated.webp" width="200" alt="v6 校准后生成的1913 年电影海报"></td></tr>
</table>

三版都抄对了大标题；v6 单次的版式最接近，校准版恢复了明黄底色，却把 BIOGRAPH 缩成角落小字。

冻结检查通过 0 / 2 / 1（每版 4 条）· 英文：[v5](examples/holdout/h0807/v5/prompt.txt) · [v6](examples/holdout/h0807/v6/prompt.txt) · [校准稿](examples/holdout/h0807/v6-calibrated/prompt.txt) · [检查记录](examples/holdout/h0807/case.json) · 原图：A.B.C. Co.（海报出版方），公有领域，[来源](ATTRIBUTION.md#holdout)。

</details>

## 模型与评测

| 阶段 | 模型 | 本次条件 |
|---|---|---|
| 图片反推 | `gpt-6-astra`（Codex CLI 0.163，推理强度 xhigh） | 原图改成中性文件名 + 固定指令，工具辅助代理；v5 与 v6 在同一环境运行 |
| 校准 | 同上 | 原图 + v6 首次生成图 + 校准指令，一轮 |
| 图片生成 | Codex 内置图像工具（C2PA 凭证：ChatGPT · gpt-image） | 只发英文，从 Codex 日志核对工具收到的文本逐字一致；每个提示词生成一次，无参考图；工具不提供尺寸、质量和种子参数 |

10 张留出图，每版 40 条冻结检查、10 张生成图：

| 指标 | v5 | v6 单次 | v6 + 校准一轮 |
|---|---:|---:|---:|
| 冻结检查通过（共 40 条） | 9 | 13 | 22 |
| 　光线、颜色与媒介（10 条） | 0 | 3 | 8 |
| 　层次与布局（10 条） | 2 | 3 | 6 |
| 　外接框尺度（10 条） | 0 | 1 | 1 |
| 盲评排第一（2 位评审 × 10 张，共 20 次） | 1 | 6 | 13 |
| 盲评平均名次（1 最好） | 2.75 | 1.90 | 1.35 |
| 8×8 色彩布局色差，越低越好 | 18.8 | 17.0 | 14.5 |
| 64×64 亮度 SSIM，越高越好 | 0.249 | 0.279 | 0.317 |
| 画幅比例误差（对数），越低越好 | 0.056 | 0.005 | 0.005 |

<details>
<summary>评测方法与边界</summary>

- **选图与冻结**：选图规则、每张 4 条检查项与容差、v5/v6/校准三份指令的 SHA-256，都在任何留出图反推之前固定。v6 指令只在 12 张旧案例（开发集）上调试过。
- **生成**：每个提示词只生成一次，不重跑挑选。生成器的随机性没有控制，单张差异不能全归因于提示词；十张的合计更有参考价值。
- **冻结检查**：由 Claude 在只看到 A/B/C 标签、不知道版本的情况下，对照原图与 10% 网格逐条判断，打完分再揭盲。视觉估计，不是人工标注或像素分割。
- **盲评排序**：两个独立的 AI 评审（Claude Opus、Claude Fable）只看到原图与随机排列的 A/B/C 三张生成图，按“复现程度”排序，不评美观。
- **粗略指标**：低分辨率亮度结构与色彩布局，只反映构图、明暗和配色，不评价物体身份、姿态、文字或笔触。
- **开发集参考**：v6 单次在 12 张旧案例上的冻结检查为 29 通过、17 不通过、2 不确定，与 v5 公布的 30 / 16 / 2 相近（评审者不同）；色彩布局色差平均 19.0 → 16.3。开发集上第二轮校准在 3 张里有 2 张变差，所以默认只做一轮。
- **仍然做不到**：主体大小与位置在三版里都常常超出 ±5 个百分点；细纹理（如鸟的横斑）、物体数量（多出一座风车）和次要物体位置仍会变化。严格复刻需要参考图或布局控制，不能与纯文结果混算。公开图片可能已在模型训练数据中。

完整记录见 [references/evaluation.md](references/evaluation.md) 与各 `case.json`。

</details>

## v5 历史案例

<details>
<summary>12 张 v5 案例：原图与 GPT Image 2 生成图（现为 v6 的开发样本）</summary>

这 12 张用于调试 v6，不再作为 v6 的效果证据。以下保留 v5 当时的展示、模型记录与评测。

### v5 首批六组

以下为 v5 指令的首批案例。左侧是原图，右侧是反推后生成的图。下面的餐厅一例原为页首示例。

#### 室内 · 餐厅长桌与排椅

<table width="100%">
<tr><th width="50%">原图</th><th width="50%">反推提示词 → GPT Image 2</th></tr>
<tr><td width="50%" align="center"><img src="examples/s21/source.jpg" width="360" alt="有长桌与排椅的餐厅原图"></td><td width="50%" align="center"><img src="examples/s21/generated.webp" width="360" alt="v5 生成的餐厅，花团和桌椅细节改变"></td></tr>
</table>

桌椅关系保留，花团、灯具和桌腿细节仍有变化。

[英文原文](examples/s21/prompt.txt) · [检查记录](examples/s21/case.json) · 原图：Wilfredor，CC0 1.0，[来源与完整署名](ATTRIBUTION.md#sources)。

#### 食物 · 松饼的占比变化

<table width="100%">
<tr><th width="50%">原图</th><th width="50%">反推提示词 → GPT Image 2</th></tr>
<tr><td width="50%" align="center"><img src="examples/s17/source.jpg" width="360" alt="皱纸中的原始松饼照片"></td><td width="50%" align="center"><img src="examples/s17/generated.webp" width="360" alt="v5 提示词生成的松饼，主体变大"></td></tr>
</table>

颜色、纸杯和顶部裂口保留，但松饼与纸杯的外接框面积约占画面的 62%，原图约 48.3%，超过预设容差。

[英文原文](examples/s17/prompt.txt) · [检查记录](examples/s17/case.json) · 原图：W.carter，CC BY-SA 4.0，[来源与完整署名](ATTRIBUTION.md#sources)。


#### 动物 · 斑点保留，姿态改变

<table width="100%">
<tr><th width="50%">原图</th><th width="50%">反推提示词 → GPT Image 2</th></tr>
<tr><td width="50%" align="center"><img src="examples/s19/source.jpg" width="360" alt="草地上的斑点小兽原图"></td><td width="50%" align="center"><img src="examples/s19/generated.webp" width="360" alt="v5 生成的小兽，姿态和边界改变"></td></tr>
</table>

生成图保留了斑点、草地和大致朝向，但动物的姿态、位置和轮廓范围不同。识别出动物类别不等于复现它在画面中的状态。

[英文原文](examples/s19/prompt.txt) · [检查记录](examples/s19/case.json) · 原图：Charles J. Sharp，CC BY-SA 4.0，[来源与完整署名](ATTRIBUTION.md#sources)。


#### 建筑 · 整体轮廓与局部细节

<table width="100%">
<tr><th width="50%">原图</th><th width="50%">反推提示词 → GPT Image 2</th></tr>
<tr><td width="50%" align="center"><img src="examples/s23/source.jpg" width="360" alt="街角尖顶建筑原图"></td><td width="50%" align="center"><img src="examples/s23/generated.webp" width="360" alt="v5 生成的街角建筑，窗格和装饰重构"></td></tr>
</table>

大轮廓和位置符合 4 条预设条件，窗户、装饰和其它建筑细部仍被重新组合。这里检查的是有限的可见关系，不是建筑测绘精度。

[英文原文](examples/s23/prompt.txt) · [检查记录](examples/s23/case.json) · 原图：Aciarium，CC BY 4.0，[来源与完整署名](ATTRIBUTION.md#sources)。


#### 汽车 · 配色与款式的区别

<table width="100%">
<tr><th width="50%">原图</th><th width="50%">反推提示词 → GPT Image 2</th></tr>
<tr><td width="50%" align="center"><img src="examples/s25/source.jpg" width="360" alt="铜红色老式汽车原图"></td><td width="50%" align="center"><img src="examples/s25/generated.webp" width="360" alt="v5 生成的老式汽车，车头和车身比例不同"></td></tr>
</table>

红白配色和街景关系保留，车身边界超出预设容差，车头结构与具体款式也不同。这类结果不能作为商品同款展示图。

[英文原文](examples/s25/prompt.txt) · [检查记录](examples/s25/case.json) · 原图：© Frank Schulenburg / CC BY-SA 4.0，[来源与完整署名](ATTRIBUTION.md#sources)。


#### 绘画 · 人物尺度与笔触漂移

<table width="100%">
<tr><th width="50%">原图</th><th width="50%">反推提示词 → GPT Image 2</th></tr>
<tr><td width="50%" align="center"><img src="examples/s27/source.jpg" width="360" alt="海浪与遇险者绘画原图"></td><td width="50%" align="center"><img src="examples/s27/generated.webp" width="360" alt="v5 生成的海浪场景，人物木筏放大，质感更写实"></td></tr>
</table>

前后层次保留，但人物与木质残骸变大，画面占比和绘画质感不符。生成图更细致，不代表更接近原画。

[英文原文](examples/s27/prompt.txt) · [检查记录](examples/s27/case.json) · 原作：Ivan Aivazovsky，来源标记 PD-Art，[地域条件与来源](ATTRIBUTION.md#sources)。


### v5 补充六组

这六组沿用已有的首次英文描述，各实际生成一次，不传原图、不逐图改词、不重跑挑选。左侧原图，右侧为真实生成结果；返回质量与尺寸逐例标注。

#### 食物 · 扭结面包与餐布

<table width="100%">
<tr><th width="50%">原图</th><th width="50%">反推提示词 → GPT Image 2</th></tr>
<tr><td width="50%" align="center"><img src="examples/s18/source.jpg" width="360" alt="扭结面包与餐布原图"></td><td width="50%" align="center"><img src="examples/s18/generated.webp" width="360" alt="生成的扭结面包，盘堆更靠右，表面颗粒和色泽改变"></td></tr>
</table>

右侧盘堆与左下两只面包的关系保留，但盘堆更靠右，面包的扭结、颗粒和烘烤色泽改变。

`low` · 1536 × 1024 · [英文原文](examples/s18/prompt.txt) · [检查记录](examples/s18/case.json) · 原图：W.carter，CC0 1.0，[来源与完整署名](ATTRIBUTION.md#sources)。

#### 动物 · 海豚群俯拍

<table width="100%">
<tr><th width="50%">原图</th><th width="50%">反推提示词 → GPT Image 2</th></tr>
<tr><td width="50%" align="center"><img src="examples/s20/source.jpg" width="360" alt="清澈蓝色海水中的海豚群原图"></td><td width="50%" align="center"><img src="examples/s20/generated.webp" width="360" alt="生成的俯拍海豚群，个体排列和水面纹理改变"></td></tr>
</table>

俯拍、向上游动和蓝绿水色保留，个体排列、水花位置和水面纹理明显不同。

`medium` · 1448 × 1086 · [英文原文](examples/s20/prompt.txt) · [检查记录](examples/s20/case.json) · 原图：Giles Laurent，CC BY-SA 4.0，[来源与完整署名](ATTRIBUTION.md#sources)。

#### 室内 · 窗前双椅与边桌

<table width="100%">
<tr><th width="50%">原图</th><th width="50%">反推提示词 → GPT Image 2</th></tr>
<tr><td width="50%" align="center"><img src="examples/s22/source.jpg" width="360" alt="金棕窗帘前的双椅与边桌原图"></td><td width="50%" align="center"><img src="examples/s22/generated.webp" width="360" alt="生成的窗前双椅，吊灯花束和台灯放大"></td></tr>
</table>

窗帘、双椅和居中边桌保留；吊灯、花束与台灯更大，家具样式和窗外细节也改变。

`medium` · 1448 × 1086 · [英文原文](examples/s22/prompt.txt) · [检查记录](examples/s22/case.json) · 原图：Crisco 1492，CC BY-SA 4.0，[来源与完整署名](ATTRIBUTION.md#sources)。

#### 建筑 · 夜间壳形屋顶

<table width="100%">
<tr><th width="50%">原图</th><th width="50%">反推提示词 → GPT Image 2</th></tr>
<tr><td width="50%" align="center"><img src="examples/s24/source.jpg" width="360" alt="夜间水岸壳形屋顶建筑原图"></td><td width="50%" align="center"><img src="examples/s24/generated.webp" width="360" alt="生成的水岸建筑，屋顶组合和观察角度不同"></td></tr>
</table>

白色壳形屋顶、暖光和水面倒影保留，但观察角度、屋顶组合与城市天际线被重新构造。

`medium` · 1672 × 941 · [英文原文](examples/s24/prompt.txt) · [检查记录](examples/s24/case.json) · 原图：Diliff，CC BY-SA 3.0，[来源与地域条件](ATTRIBUTION.md#sources)。

#### 交通 · 蓝色载人三轮车

<table width="100%">
<tr><th width="50%">原图</th><th width="50%">反推提示词 → GPT Image 2</th></tr>
<tr><td width="50%" align="center"><img src="examples/s26/source.jpg" width="360" alt="门楼下的蓝色载人三轮车原图"></td><td width="50%" align="center"><img src="examples/s26/generated.webp" width="360" alt="生成的载人三轮车，人脸车头门楼文字和街道重构"></td></tr>
</table>

蓝车、上方乘客与门洞纵深保留。人脸、车头、门楼文字和街道细节发生重构，不能当作原照修复。

`high` · 1536 × 1024 · [英文原文](examples/s26/prompt.txt) · [检查记录](examples/s26/case.json) · 原图：Luo Shaoyang，CC BY 2.0，[来源与完整署名](ATTRIBUTION.md#sources)。

#### 绘画 · 几何静物

<table width="100%">
<tr><th width="50%">原图</th><th width="50%">反推提示词 → GPT Image 2</th></tr>
<tr><td width="50%" align="center"><img src="examples/s28/source.jpg" width="360" alt="几何静物绘画原图"></td><td width="50%" align="center"><img src="examples/s28/generated.webp" width="360" alt="生成的几何静物，右侧器物拉长，色块和遮挡关系改变"></td></tr>
</table>

主要配色与几何主题保留，但右侧器物明显拉长，黄黑椭圆、叉子、色块和遮挡关系改变。

`medium` · 1024 × 1536 · [英文原文](examples/s28/prompt.txt) · [检查记录](examples/s28/case.json) · 原作：Fernand Léger，来源标记 PD-Art，[地域条件与来源](ATTRIBUTION.md#sources)。

[查看全部 12 个案例文件](examples/) · [原图署名与许可](ATTRIBUTION.md)

下载完整仓库后，双击 `examples/index.html` 可离线切换、放大和复制提示词。[GitHub 上的 HTML 文件](examples/index.html) 显示源码，不是在线画廊。

#### v5 模型与评测

| 阶段 | 模型 | 本次条件 |
|---|---|---|
| 图片反推 | `openai-codex/gpt-6-astra` | 原图 + 固定 v5 指令，工具辅助视觉代理 |
| 图片生成 | GPT Image 2 | 完整英文，每张一次，无参考图，不控制种子；返回质量见各例 |

生图请求标识为 `openai-codex/gpt-image-2`，返回标识为 `gpt-image-2-codex`。原六组均为 `medium`；补充六组中，面包为 `low`、三轮车为 `high`，其余为 `medium`。工具未提供质量参数，以上按实际回执记录，不作为同档质量的受控比较。每例的英文、尺寸、哈希和逐项判断保存在对应的 `case.json` 与 `prompt.txt` 中。

<details>
<summary>查看评测结果与方法</summary>

每张图在反推前固定 4 条可见条件，反推执行器不读取这些答案或来源标题。首批预选每类一张生成；用户要求完整对比后，补齐原先仅文字反推的另外六张。全部沿用首次英文，各生成一次，没有重跑挑选；补充批次不是新的独立留出集。

| 检查对象 | 数量 | 结果 |
|---|---:|---|
| 首次英文 | 48 条 | 完整支持 29 条，部分覆盖 19 条 |
| 首批六张生成图 | 24 条 | 通过 17 条，不通过 7 条 |
| 补充六张生成图 | 24 条 | 通过 13 条，不通过 9 条，不确定 2 条 |
| 全部十二张生成图 | 48 条 | 通过 30 条，不通过 16 条，不确定 2 条 |

评审由 AI 视觉代理完成，边界为视觉估计，不是人工专家共识或像素分割。每类只有两张实际生图，公开样图也可能已在训练数据中，结果不是总体准确率。首批室内和建筑各通过 4 条限定检查，仍不等于整图复刻；没有旧版本对照，不能据此声称 v5 全面更好。

完整方法见 [references/evaluation.md](references/evaluation.md)。

</details>

文字中的百分比不是几何控制。商品款式、精确数量、复杂文字、遮挡与笔触仍可能变化；严格复刻需要另行验证参考图或布局控制，不能与纯文结果混算。其它模型的效果也需要单独测试。

</details>

## 文档与贡献

- [SKILL.md](SKILL.md)：适用场景、执行规则、v6 通用指令与校准指令
- [评测方法](references/evaluation.md)：冻结样本、记录首次输出、分开判断文字与图片，以及 v6 留出评测记录
- [scripts/](scripts/)：用本机 Codex 跑反推、纯文生图、校准与粗略相似度，并核对生图工具收到的英文
- [案例目录](examples/)：`holdout/` 为 v6 留出案例，`s17`–`s28` 为 v5 历史案例

欢迎提交失败案例。请附可再分发的来源许可、首次英文、实际模型、生成条件和可见差异。改通用指令时，另留未参与调试的图片验证，不只上传最好的一次结果。

<details>
<summary>项目结构与参考</summary>

```text
SKILL.md                  核心指令（通用指令 v6 与校准指令）
references/evaluation.md  评测方法与 v6 留出评测记录
scripts/                  本机 Codex 反推、生图、校准与相似度脚本
examples/holdout/h0905/   v6 留出案例，其它编号同理
  source.jpg              原图
  v5/ v6/ v6-calibrated/  各自的英文 prompt.txt 与实际生成图 generated.webp
  case.json               来源、冻结检查、运行记录、盲评与指标
examples/s17/             v5 历史案例，其它编号同理
examples/index.html       v5 历史案例离线画廊
ATTRIBUTION.md            素材署名与许可
LICENSE                   代码与文档许可
```

技能结构参考 [Anthropic Skills](https://github.com/anthropics/skills)、[Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) 和 [OpenAI Creative Production](https://github.com/openai/plugins/tree/main/plugins/creative-production/skills/produce)。README 的图片展示与信息分层参考 [baoyu-design](https://github.com/JimLiu/baoyu-design) 和 [baoyu-skills](https://github.com/JimLiu/baoyu-skills)，未复制它们的任务指令。

</details>

## 许可

指令、项目说明和画廊代码采用 [MIT](LICENSE)，**不覆盖案例资产**。原图保留各自的 CC 许可或有地域条件的公有领域状态，详见 [ATTRIBUTION.md](ATTRIBUTION.md)。

项目可许可的案例提示词、评审数据和生成图采用 CC BY-SA 4.0，不保证 AI 产物在各司法辖区都具有版权。再分发时保留对应原图的署名与许可，不暗示原作者认可生成结果。
