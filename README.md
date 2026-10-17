# Image Prompt Reconstruction

把图片反推成可复用的英文生图提示词，先保留构图、比例和遮挡，再描述外观。

A vision-agent skill for image-to-prompt reconstruction, with licensed examples and text-only regeneration results.

这个 skill 更关心物体在画面里有多大、相互放在哪里，而不只是识别图片里有什么。它是一套给视觉助手执行的指令，不是模型权重、在线服务或独立生图软件。

**输出是对可见图片的重建描述，不是原作者的提示词，也不保证精确复刻。** 下面同时保留接近原图的部分和失真的部分。

[安装与使用](#安装与使用) · [六类图片案例](#六类图片案例) · [如何评测](#如何评测) · [素材署名与许可](ATTRIBUTION.md)

## 它具体做什么

同一条 v5 指令用于每张图片，不为每个案例单独补词。描述按画面的整体结构展开：主体的左右和上下边界、环境留白、物体与承载面的大小关系、近景遮挡、主体平面和远景，之后再补姿态、颜色、表面、光线和焦点。

这能让提示词明确表达一些容易被忽略的关系，比如珠宝相对桌面的大小、人物是不是被裁切，以及画面下方的物体究竟在近景还是中景。但百分比仍只是文字，生成模型不一定按它执行。

| 适合 | 不应依赖它保证 |
|---|---|
| 整理参考图的构图与视觉特征 | 找回作者的原始提示词、种子或模型 |
| 为重新创作提供英文描述 | 商品款式、人物身份或精细结构一致 |
| 批量保存首次反推结果，做可追踪的比较 | 精确数量、几何尺寸、文字排版或笔触 |

完整执行规则和通用英文指令在 [SKILL.md](SKILL.md)。

## 安装与使用

### Skills CLI 安装

与社区 skill 仓库一样，可以通过 [Skills CLI](https://github.com/vercel-labs/skills) 安装。在你的项目目录运行，按提示选择客户端：

```bash
npx skills add 0xsline/image-prompt-reconstruction \
  --skill image-prompt-reconstruction
```

这是一个独立 skill，不是插件 marketplace。无需安装其它技能包。安装器需要 Node.js 与 npm；不使用安装器时，可以采用下面的 Git 方式。

### 手动安装

在支持项目级 `.agents/skills/` 目录的客户端中，从你的项目根目录运行：

```bash
mkdir -p .agents/skills
git clone https://github.com/0xsline/image-prompt-reconstruction.git \
  .agents/skills/image-prompt-reconstruction
```

如果客户端使用其它技能目录，将目标路径换成它要求的位置。仓库根目录包含 `SKILL.md`，并通过相对路径引用 `references/`，这两者需要一起保留。目标目录已经存在时，不要覆盖已有修改。

### 调用

刷新客户端的技能发现或新开会话，附上图片后可以这样说：

```text
用 image-prompt-reconstruction 反推这张图。
保存首次英文提示词和运行记录，暂时不要生图。
```

批量比较时：

```text
用同一条通用指令逐张反推这些图片，每张单独保存。
选定要验证的图片后，用完整英文各生成一次，不向生成模型传原图。
保留失败结果，不按结果逐图改词。如果模型不可用，直接说明。
```

不同客户端的自动发现规则不同，本仓库不承诺所有客户端都会自动加载。如果没有发现技能，可以明确要求助手读取安装目录中的 `SKILL.md` 后执行。

### 不安装，直接使用指令

打开 [SKILL.md 的通用指令部分](SKILL.md#通用指令-v5)，将英文指令和图片一起交给支持看图的模型。这种方式得到的是文本，不会自动替你保存运行记录。只有文本输入、不能读取图片的模型无法完成这项任务。

仓库不自带模型、不配置 API 密钥，也不自行发起模型 API 请求。**skill 保存在本地，不代表推理离线运行**；图片处理方式和费用取决于你使用的客户端与模型。

## 输出与记录

正常执行会保存以下文件，批量时每张图片使用独立目录：

```text
image-01/
  prompt_en.txt
  record.json
```

`prompt_en.txt` 是首次英文原文。`record.json` 记录源图与提示词的 SHA-256、指令版本、可核实的模型和执行方式。未知字段写 `unknown`，不猜温度、种子或耗时。

中文译文、人工修订版和参考图生成结果应另存并标明性质。它们都不能覆盖首次英文，或者混入纯文反推的成绩。

## 六类图片案例

公开案例集有 12 张原图，每类两张。全部完成首次反推，在运行前选定每类一张实际生图，共 6 张。其余 6 张只有文字结果，没有补造生成图。

下面每组都是**左侧原图，右侧为反推提示词生成的图**，不是两张原图，也不是图生图。保留真实差异，不修图来制造“一致”的效果。

### 模型与生成条件

| 阶段 | 实际运行记录中的模型 | 输入与条件 |
|---|---|---|
| 图片反推 | `openai-codex/gpt-6-astra` | 原图 + 固定 v5 指令，工具辅助视觉代理，保存首次英文 |
| 图片生成 | GPT Image 2，返回标识 `gpt-image-2-codex` | 仅完整英文，`medium`，每张一次，不传参考图，不控制随机种子 |

生图请求使用的目录标识是 `openai-codex/gpt-image-2`。五张输出为 1536 × 1024，汽车案例为 1448 × 1086；每张的模型标识、尺寸和哈希均在对应 `case.json` 中。这组结果没有重跑挑选，也不是不同指令版本的受控对照实验。

### 食物：外观保留，主体被放大

| 原图 | 反推提示词 → GPT Image 2 |
|---|---|
| <img src="examples/s17/source.jpg" width="360" alt="皱纸中的原始松饼照片"> | <img src="examples/s17/generated.webp" width="360" alt="v5 提示词生成的松饼，主体变大"> |

颜色、纸杯和顶部裂口保留，但松饼与纸杯的外接框面积约占画面的 62%，原图约 48.3%，超过预设容差。

[英文原文](examples/s17/prompt.txt) · [检查记录](examples/s17/case.json) · 原图：W.carter，CC BY-SA 4.0，[来源与完整署名](ATTRIBUTION.md#sources)。

### 动物：斑点与朝向接近，姿态和位置改变

| 原图 | 反推提示词 → GPT Image 2 |
|---|---|
| <img src="examples/s19/source.jpg" width="360" alt="草地上的斑点小兽原图"> | <img src="examples/s19/generated.webp" width="360" alt="v5 生成的小兽，姿态和边界改变"> |

生成图保留了斑点、草地和大致朝向，但动物的姿态、位置和轮廓范围不同。识别出动物类别不等于复现它在画面中的状态。

[英文原文](examples/s19/prompt.txt) · [检查记录](examples/s19/case.json) · 原图：Charles J. Sharp，CC BY-SA 4.0，[来源与完整署名](ATTRIBUTION.md#sources)。

### 室内：限定检查通过，房间仍被重新布置

| 原图 | 反推提示词 → GPT Image 2 |
|---|---|
| <img src="examples/s21/source.jpg" width="360" alt="有长桌与排椅的餐厅原图"> | <img src="examples/s21/generated.webp" width="360" alt="v5 生成的餐厅，花团和桌椅细节改变"> |

近侧四椅和家具范围等 4 条限定条件通过，但花团变大、布置变密，桌腿与近端椅出现下缘裁切，背景和灯具也发生变化。这个案例说明，4/4 不能等同于整图复刻。

[英文原文](examples/s21/prompt.txt) · [检查记录](examples/s21/case.json) · 原图：Wilfredor，CC0 1.0，[来源与完整署名](ATTRIBUTION.md#sources)。

### 建筑：轮廓接近，细部没有锁定

| 原图 | 反推提示词 → GPT Image 2 |
|---|---|
| <img src="examples/s23/source.jpg" width="360" alt="街角尖顶建筑原图"> | <img src="examples/s23/generated.webp" width="360" alt="v5 生成的街角建筑，窗格和装饰重构"> |

大轮廓和位置符合 4 条预设条件，窗户、装饰和其它建筑细部仍被重新组合。这里检查的是有限的可见关系，不是建筑测绘精度。

[英文原文](examples/s23/prompt.txt) · [检查记录](examples/s23/case.json) · 原图：Aciarium，CC BY 4.0，[来源与完整署名](ATTRIBUTION.md#sources)。

### 交通工具：配色保留，车身边界和款式改变

| 原图 | 反推提示词 → GPT Image 2 |
|---|---|
| <img src="examples/s25/source.jpg" width="360" alt="铜红色老式汽车原图"> | <img src="examples/s25/generated.webp" width="360" alt="v5 生成的老式汽车，车头和车身比例不同"> |

红白配色和街景关系保留，车身边界超出预设容差，车头结构与具体款式也不同。这类结果不能作为商品同款展示图。

[英文原文](examples/s25/prompt.txt) · [检查记录](examples/s25/case.json) · 原图：© Frank Schulenburg / CC BY-SA 4.0，[来源与完整署名](ATTRIBUTION.md#sources)。

### 绘画：场景保留，笔触与人物尺度漂移

| 原图 | 反推提示词 → GPT Image 2 |
|---|---|
| <img src="examples/s27/source.jpg" width="360" alt="海浪与遇险者绘画原图"> | <img src="examples/s27/generated.webp" width="360" alt="v5 生成的海浪场景，人物木筏放大，质感更写实"> |

前后层次保留，但人物与木质残骸变大，画面占比和绘画质感不符。生成图更细致，不代表更接近原画。

[英文原文](examples/s27/prompt.txt) · [检查记录](examples/s27/case.json) · 原作：Ivan Aivazovsky，来源标记 PD-Art，[地域条件与来源](ATTRIBUTION.md#sources)。

### 查看全部 12 张案例

[examples/](examples/) 中包含全部原图、首次英文、模型参数、冻结检查和评审结果。下载完整仓库后，打开 [examples/index.html](examples/index.html) 可离线切换案例、放大图片和复制提示词。GitHub 直接打开 HTML 文件时显示的是源码，不是在线画廊。

## 如何评测

每张图在反推前固定 4 条可见条件，分别覆盖主体数量与位置、画面占比、遮挡层次，以及类别结构、颜色或绘画媒介。执行反推的代理不读取这些答案，也不读取来源页面的标题和作者说明。

| 检查对象 | 数量 | 结果 |
|---|---:|---|
| 首次英文描述 | 48 条 | 完整支持 29 条，部分覆盖 19 条 |
| 6 张实际生成图 | 24 条 | 通过 17 条，不通过 7 条 |
| 6 张未生图样本 | 24 条 | 单列为 `not_generated`，不计通过或零分 |

**这不是整图相似度或总体准确率。** 一条检查包含多个条件时，必须全部满足才通过。部分覆盖、不确定和没有生成分开记录。评审由 AI 视觉代理完成，边界为视觉估计，不是人工专家共识或像素级分割。

每类只有一张实际生成图，样图不是随机抽样；公开图片也可能已在模型训练语料中。没有 v2 对照，不能根据这组结果声称 v5 全面优于旧版。详细流程见 [评测方法](references/evaluation.md)。

## 使用边界

- 无法找回原始提示词。相似图片可以由不同模型、参数和描述生成，图像本身不包含唯一答案。
- 百分比不是几何控制。文字可以明确表达尺寸关系，生成模型仍可能改动它。
- 商品款式、精确数量、复杂文字、精细遮挡和绘画笔触需要额外验证。不要用视觉上更漂亮替代忠实度判断。
- 严格复刻应考虑经用户同意的参考图或布局控制。那属于不同生成条件，应与纯文实验分别记录。
- 指令不依赖某家的 API，但这里只提供上述实际模型的案例，不保证其它模型有相同效果。

## 文件结构

```text
SKILL.md                  通用指令和执行约定
references/evaluation.md  评测与迭代方法
examples/index.html       离线案例画廊
examples/data.js          画廊数据
examples/s17/             单个案例目录，其它ID同理
  source.jpg              来源图片
  prompt.txt              首次英文原文
  generated.webp          实际生成图，仅6个案例有此文件
  case.json               来源、参数、哈希和逐项评审
ATTRIBUTION.md            原图及案例资产的署名与许可
LICENSE                   skill、项目说明与画廊代码的MIT许可
```

## 贡献案例

欢迎提交失败案例。新增图片需要可核实的来源和再分发许可，保留首次英文，并记录实际模型、参数、是否使用参考图、预设条件与失败现象。

修改通用指令时，用开发样图调整，另留未参与调试的图片验证。请不要只上传多次尝试中最好的一张，或在看过结果后放宽标准。

## 结构参考

本仓库参考成熟开源项目的组织方式，没有复制它们的任务指令：

- [Anthropic Skills](https://github.com/anthropics/skills)：用 `SKILL.md` 的 `name`、`description` 和执行步骤封装单个技能，README 面向安装和使用。
- [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills)：明确“何时使用”、提供 Skills CLI 安装入口，将辅助材料放在 `references/`。
- [OpenAI Creative Production](https://github.com/openai/plugins/tree/main/plugins/creative-production/skills/produce)：主文件保持工作流清晰，额外参考资料按需读取，交付时明确让用户比较的对象。OpenAI 的旧 `skills` 仓库已标记弃用，这里参考的是现行 `plugins` 仓库。

当前公开 skill 保持原有 v5 英文指令；安装说明、案例展示与模型记录独立放在 README 和 `examples/` 中，不把全部案例答案塞进每次推理的上下文。

发布前已检查案例文件哈希，并在真实浏览器中验证全部 12 个案例的切换、图片显示、原文复制和放大操作，以及手机尺寸下的对比布局。Skills CLI 已在独立临时项目中识别、安装并列出该 skill；显式读图调用也已产生原始英文与运行记录。这不代表所有客户端的自动触发都经过测试。

## 许可

skill、项目说明和画廊代码采用 [MIT](LICENSE)。**MIT 不覆盖案例资产。** 原图保留各自的 CC 许可或公有领域标记及其地域条件，详见 [ATTRIBUTION.md](ATTRIBUTION.md)。

案例提示词、评审数据、生成图等本项目可许可的贡献采用 CC BY-SA 4.0。AI 产物是否具有版权因司法辖区而异，本项目不作权利保证。使用或再次分发图片时，应保留对应原图的署名与许可，也不要暗示原作者认可生成结果。
