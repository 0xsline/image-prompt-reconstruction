window.EXAMPLES_DATA = {
  "instruction": "Reconstruct the attached image as one English text-to-image prompt. Preserve its spatial composition before describing attractive details. First identify the actual shot scale, the largest visual masses, and three depth layers when present: nearest framing elements, the main subject plane, and the distant background. Placement low in the image does not by itself make something foreground; use occlusion, surrounding space and focus cues to preserve its depth. If a setting occupies most of the picture and the interesting objects are small within it, begin with a wide environmental view and keep those objects in their original subject plane, not a close product display. Build the opening sentences around a compact layout: for the main subjects, their supports, and large secondary features, state approximate left/right and top/bottom extents as rounded fractions or percentages of the full frame. State the visible environment margins on both sides and the actual crop edges. Distinguish a support's entire silhouette from the visible surface carrying smaller objects, so the surface ratio is not confused with its thickness or legs. Keep all stated widths, heights and edge positions mutually consistent. Give the smaller objects' sizes relative to the supporting surface and to one another, preserving their gaps; deliberately oversized subjects must remain oversized. These numbers are rough visual estimates, not physical measurements. Then add count, pose, gaze, hand-held relationships, viewer-left/right arrangement, distinctive shape, color and visible surface appearance, plus observable lighting and focus. Preserve the original depth order and visual hierarchy throughout; avoid genre labels or adjectives that imply greater closeness, grandeur or size than the image supports. Keep uncertain markings abstract and omit guessed brands, identities, exact ages, hidden parts, material composition and camera specifications. Finish by reaffirming the same roomy or tight framing actually visible, without introducing new objects. Usually use 220 to 310 words, prioritizing layout over ornament. Output only one descriptive paragraph, without analysis, alternatives or a coordinate table.",
  "samples": [
    {
      "id": "s17",
      "category": "食物餐饮",
      "title": "松饼近景",
      "source": {
        "page": "https://commons.wikimedia.org/wiki/File:Plain_vanilla_muffin_in_Tuntorp.jpg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Plain_vanilla_muffin_in_Tuntorp.jpg/1920px-Plain_vanilla_muffin_in_Tuntorp.jpg",
        "author": "W.carter (Ann-Sophie Qvarnström)",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
        "width": 1920,
        "height": 1280,
        "sha256": "33be61b36a31c6c04aedf19d6a52cad39163a246775057ca786e95eee9cab275"
      },
      "caption": {
        "file": "prompt.txt",
        "sha256": "be820434940a4c1f7bc5f7fe530543a2db3c90b289599c7394a2804ca25a7f6b",
        "model": "openai-codex/gpt-6-astra"
      },
      "generation": {
        "file": "generated.webp",
        "model": "GPT Image 2",
        "requestedModel": "openai-codex/gpt-image-2",
        "reportedModel": "gpt-image-2-codex",
        "quality": "medium",
        "width": 1536,
        "height": 1024,
        "sha256": "7a47b0aa78306b61e02e8fdb1533a34b8f18cd566c2650cc63f7fb684fcb73b5",
        "referenceImage": false,
        "seed": null,
        "license": "CC-BY-SA-4.0"
      },
      "checks": [
        {
          "id": "s17-count-position",
          "description": "可观察主体计数与位置",
          "expected": "画面中央偏下仅一个完整松饼，四周是皱纸；不计边缘零星纸杯。",
          "tolerance": "位置约±5个百分点；指定子集计数不容差"
        },
        {
          "id": "s17-occupancy",
          "description": "松饼及纸杯的画面占比（外接框）",
          "expected": {
            "bbox": [
              0.14,
              0.19,
              0.82,
              0.9
            ],
            "areaPercent": 48.3
          },
          "tolerance": {
            "bboxEdgePercentagePoints": 5,
            "areaPercentagePoints": 5
          }
        },
        {
          "id": "s17-occlusion",
          "description": "遮挡及前后关系",
          "expected": "前侧褶皱纸杯遮住松饼下半部，后侧杯沿位于松饼之后。",
          "tolerance": null
        },
        {
          "id": "s17-structure-color",
          "description": "类别关键结构及颜色",
          "expected": "金棕色圆顶，中上部有浅黄色开裂；无糖霜、无水果装饰。",
          "tolerance": "允许轻微色温差，不允许替换关键颜色或结构"
        }
      ],
      "review": {
        "captionChecks": [
          {
            "id": "s17-count-position",
            "status": "supported",
            "evidence": "one round golden-brown cake；完整框14%–83%、19%–90%；surrounded entirely by crumpled white and cream wrapping paper",
            "reason": "明确为单个完整主体，中心略偏下，四周皱纸。"
          },
          {
            "id": "s17-occupancy",
            "status": "supported",
            "evidence": "complete cake-and-liner silhouette ... 14% to 83% ... 19% to 90%",
            "reason": "四边均在冻结容差内；由明确文字框计算的矩形面积约49%，与48.3%相差约0.7个百分点。",
            "observedBBox": [
              0.14,
              0.19,
              0.83,
              0.9
            ],
            "observedBBoxAreaPercent": 49,
            "measurementBasis": "英文明确边界，不是生成图测量"
          },
          {
            "id": "s17-occlusion",
            "status": "supported",
            "evidence": "rear pleated rim rises above the cake；near rim overlaps its lower edge and descends into a rounded, shadowed base",
            "reason": "前杯沿覆盖下部、后杯沿位于后侧两项均明确。"
          },
          {
            "id": "s17-structure-color",
            "status": "partial",
            "evidence": "domed cake top；split across the upper middle ... pale yellow ... crumb；no ... additional food",
            "reason": "圆顶、金棕色及中上浅黄裂口明确，但未明确排除糖霜；不能将正文没提糖霜直接算作无糖霜条件已支持。"
          }
        ],
        "generationChecks": [
          {
            "id": "s17-count-position",
            "status": "pass",
            "evidence": "完整生成图只有一个松饼，位于中央略偏下，四周为皱纸。",
            "reason": "主体数量及中心位置符合限定子集与位置容差。"
          },
          {
            "id": "s17-occupancy",
            "status": "fail",
            "evidence": "生成图杯纸顶缘约9%–10%高度，底缘约94%–95%，左右约13%和86%。",
            "reason": "上边缘比冻结19%高约9–10个百分点，超出5个百分点；矩形面积约62%也明显超出43.3%–53.3%。",
            "observedBBox": [
              0.13,
              0.1,
              0.86,
              0.95
            ],
            "observedBBoxAreaPercent": 62,
            "uncertainty": "边界视觉估计约±1–2个百分点；不影响失败结论。"
          },
          {
            "id": "s17-occlusion",
            "status": "pass",
            "evidence": "前方竖褶杯纸挡住下部糕体，后侧杯纸沿在圆顶后方露出。",
            "reason": "两个前后关系均可见。"
          },
          {
            "id": "s17-structure-color",
            "status": "pass",
            "evidence": "金棕色圆顶、上中部浅黄色开裂，无糖霜或水果。",
            "reason": "全部冻结结构颜色条件满足；裂口比原图更大更分叉，不代表细节完全复刻。"
          }
        ],
        "conclusion": "保留单个松饼、皱纸环境和前后杯沿及核心颜色；生成主体明显放大，上方留白减少，尺度项失败。裂口形状与原图不同，文字也未明确覆盖无糖霜条件。"
      },
      "provenance": {
        "sourceLicenseChecked": "2026-10-17",
        "sourceLicenseEvidence": "Author and licensing sections independently reread on the linked Wikimedia Commons file page.",
        "sourceModification": "Wikimedia proportional thumbnail of the linked source version; no project cropping, retouching or re-encoding. Downloaded image bytes preserved.",
        "sourceConditions": "The linked source license applies; attribution retained. No endorsement or clearance of non-copyright rights is implied.",
        "reviewLimitations": "AI visual estimates and model review against four preselected checks, not human annotations, segmentation measurements or an overall accuracy benchmark.",
        "generationRights": "For generated images, only rights this project can license are offered under CC BY-SA 4.0; corresponding source credit and conditions remain. No guarantee of copyright subsistence, exclusivity or third-party clearance."
      },
      "captionText": "A tightly framed, slightly elevated close view of one round golden-brown cake in a pale tan pleated baking liner, surrounded entirely by crumpled white and cream wrapping paper. The complete cake-and-liner silhouette extends approximately from 14% to 83% of the frame width and from 19% to 90% of its height, leaving irregular paper margins on both sides and a broad band above. The exposed domed cake top occupies roughly the central 54% of the image width, from about 22% to 76%, and lies between 28% and 70% of the image height. Its surrounding liner is wider than the edible top; the rear pleated rim rises above the cake, while the near rim overlaps its lower edge and descends into a rounded, shadowed base. The nearest layer consists of large angular paper folds along the lower and side edges, the main subject is the cake, and the background is further wrinkled wrapping rather than a separate room. A prominent irregular split across the upper middle of the dome reveals pale yellow, softly porous crumb inside a raised orange-gold border. The remaining crust has a fine, uneven, dark honey-brown texture, especially on the viewer-left half. Closely spaced vertical liner pleats alternate between illuminated cream ridges and brown translucent-looking valleys near the base. Warm directional illumination from the upper right brightens the split and right-hand paper, leaving a deep soft-edged shadow beneath and to the left. Keep the cake surface sharply detailed and the surrounding paper visibly creased, with the entire liner inside the crop and no distant scenery, plates, or additional food."
    },
    {
      "id": "s18",
      "category": "食物餐饮",
      "title": "扭结面包与餐布",
      "source": {
        "page": "https://commons.wikimedia.org/wiki/File:Cardamom_buns.jpg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Cardamom_buns.jpg/1920px-Cardamom_buns.jpg",
        "author": "W.carter",
        "license": "CC0 1.0",
        "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
        "width": 1920,
        "height": 1322,
        "sha256": "97c930c6ab9c1eb6aca90e1a5f0da464b19985b769a670e78b79987d6c52274d"
      },
      "caption": {
        "file": "prompt.txt",
        "sha256": "39cab794fbc3be3f8737f42e1f1d9eba3ed073235c3f1391b2d12e020702a0cf",
        "model": "openai-codex/gpt-6-astra"
      },
      "generation": {
        "file": "generated.webp",
        "model": "GPT Image 2",
        "requestedModel": "openai-codex/gpt-image-2",
        "reportedModel": "gpt-image-2-codex",
        "quality": "low",
        "width": 1536,
        "height": 1024,
        "sha256": "f4b25d0e9580a8de1239f0af28be2cf4ca5e75516a3ea0751290901724af1008",
        "referenceImage": false,
        "seed": null,
        "license": "CC-BY-SA-4.0",
        "batch": "completion-2026-10-17",
        "attempts": 1,
        "promptSha256": "39cab794fbc3be3f8737f42e1f1d9eba3ed073235c3f1391b2d12e020702a0cf",
        "requestedAspectRatio": "3:2"
      },
      "checks": [
        {
          "id": "s18-count-position",
          "description": "可观察主体计数与位置",
          "expected": "一只深棕盘位于中右；盘外左下可辨认两只完整扭结面包；不要求数清盘内被遮挡个体。",
          "tolerance": "位置约±5个百分点；指定子集计数不容差"
        },
        {
          "id": "s18-occupancy",
          "description": "盘中面包堆及盘的画面占比（外接框）",
          "expected": {
            "bbox": [
              0.27,
              0.11,
              0.92,
              0.76
            ],
            "areaPercent": 42.3
          },
          "tolerance": {
            "bboxEdgePercentagePoints": 5,
            "areaPercentagePoints": 5
          }
        },
        {
          "id": "s18-occlusion",
          "description": "遮挡及前后关系",
          "expected": "前排面包遮住后排，盘沿从下方露出；左下盘外面包位于红白布上。",
          "tolerance": null
        },
        {
          "id": "s18-structure-color",
          "description": "类别关键结构及颜色",
          "expected": "金黄色扭结面包表面有砂糖颗粒，红白格织布包围下半幅，左上露出木台。",
          "tolerance": "允许轻微色温差，不允许替换关键颜色或结构"
        }
      ],
      "review": {
        "captionChecks": [
          {
            "id": "s18-count-position",
            "status": "supported",
            "evidence": "plate ... toward the right；two additional rolls ... separately ... lower left；dark reddish-brown plate",
            "reason": "单盘中右与盘外左下两只均明确。"
          },
          {
            "id": "s18-occupancy",
            "status": "supported",
            "evidence": "main pile 27%–92%,11%–73%；plate 30%–91%,40%–76%",
            "reason": "堆与盘的联合框为27%–92%、11%–76%，面积约42%，四边与面积均符合冻结值。",
            "observedBBox": [
              0.27,
              0.11,
              0.92,
              0.76
            ],
            "observedBBoxAreaPercent": 42,
            "measurementBasis": "英文两个明确框的联合框"
          },
          {
            "id": "s18-occlusion",
            "status": "supported",
            "evidence": "thin curved rim ... along the front；overlapping bread；some showing only sections beneath their neighbors；two additional rolls ... on ... cloth",
            "reason": "前后面包重叠、下方露盘沿与盘外面包在布上均有明确描述。"
          },
          {
            "id": "s18-structure-color",
            "status": "partial",
            "evidence": "golden twisted bread rolls；fine sparkling granules；red-orange and white checked cloth；wooden surface ... upper left",
            "reason": "颜色、扭结、织布位置及木台均明确，颗粒仅称sparkling granules，未明确为冻结条件中的砂糖；不推断颗粒成分。"
          }
        ],
        "generationChecks": [
          {
            "id": "s18-count-position",
            "status": "pass",
            "evidence": "生成图中右是一只深棕盘；盘外左下清楚可辨两只完整扭结面包。",
            "reason": "指定盘的位置、颜色和盘外两只的计数保留；不把盘内重叠个体纳入计数。"
          },
          {
            "id": "s18-occupancy",
            "status": "fail",
            "evidence": "盘与盘中面包联合外框目测约为x28%–100%、y4%–73%；右侧盘沿接触画框，最高面包接近顶部。",
            "reason": "上边比冻结11%高约7个百分点，右边比92%多约8个百分点，均超出±5个百分点；面积也明显偏大。粗估误差不影响右侧裁切的判断。",
            "observedBBox": [
              0.28,
              0.04,
              1.0,
              0.73
            ],
            "observedBBoxAreaPercent": 49.7,
            "measurementBasis": "AI视觉粗估联合外接框，非分割或像素级测量"
          },
          {
            "id": "s18-occlusion",
            "status": "pass",
            "evidence": "前排扭结面包遮挡后排，深棕盘前沿从面包下方露出；盘外两只落在红白织布上。",
            "reason": "冻结的三组遮挡和承托关系均可见。"
          },
          {
            "id": "s18-structure-color",
            "status": "pass",
            "evidence": "金黄至焦棕的扭结表面有可见白色砂糖状颗粒，红白格织布铺满下半幅，左上是浅色木台。",
            "reason": "扭结、可见糖粒外观、红白格布和左上木台均保留；颗粒仅按视觉外观判断，不鉴定成分。"
          }
        ],
        "conclusion": "一次纯文生图保留中右深棕盘、盘外左下两只及布面承托关系，但盘堆扩大至右边裁切，顶部抬高，面包扭结和糖粒更粗，木台变浅。四项限定检查为3通过、1不通过，不代表整图相似度。",
        "reviewProvenance": "2026-10-17：AI视觉评审实际打开source.jpg与generated.webp，按既有四项冻结条件逐项比较；非人工标注、非独立盲评或受控基准。外接框为视觉粗估。"
      },
      "provenance": {
        "sourceLicenseChecked": "2026-10-17",
        "sourceLicenseEvidence": "Author and licensing sections independently reread on the linked Wikimedia Commons file page.",
        "sourceModification": "Wikimedia proportional thumbnail of the linked source version; no project cropping, retouching or re-encoding. Downloaded image bytes preserved.",
        "sourceConditions": "The linked source license applies; attribution retained. No endorsement or clearance of non-copyright rights is implied.",
        "reviewLimitations": "AI visual estimates and model review against four preselected checks, not human annotations, segmentation measurements or an overall accuracy benchmark.",
        "generationRights": "For generated images, only rights this project can license are offered under CC BY-SA 4.0; corresponding source credit and conditions remain. No guarantee of copyright subsistence, exclusivity or third-party clearance."
      },
      "captionText": "An elevated, close tabletop view of a heaped plate of golden twisted bread rolls, arranged toward the right with two additional rolls lying separately on a rumpled red-orange and white checked cloth in the lower left. The main pile spans approximately 27% to 92% of the frame width and 11% to 73% of its height. Its dark reddish-brown plate extends from about 30% to 91% across and 40% to 76% down, with a thin curved rim visible especially along the front; the bread largely conceals the carrying surface. The two separate rolls together occupy roughly 11% to 48% across and 59% to 95% down. A pale, horizontally jointed wooden surface remains exposed across the upper left, while the cloth fills the lower half, curls up the right edge, and continues beyond the bottom and sides. Preserve three overlapping planes: foreground cloth folds and the two loose rolls, the central raised plate and overlapping bread, then the uncovered wooden background and upright right-hand fabric. Roughly ten partially overlapping rolls are discernible in the heap, some showing only sections beneath their neighbors. Each complete roll is around one-quarter to one-third the plate's width, with thick interwoven loops, swollen rounded ends, pale seams, and rich amber-brown tops sprinkled with fine sparkling granules. A large horizontal knot occupies the middle of the pile; a rounder knot projects toward the lower right. The cloth has a clearly visible coarse weave, diagonal striped checks, and alternating bright ridges and deep folds. Soft warm light reveals the bread's uneven crust and casts restrained shadows between rolls. Maintain the tight food arrangement but retain the conspicuous empty wooden area at upper left and the separate foreground pair."
    },
    {
      "id": "s19",
      "category": "动物",
      "title": "草地斑点小兽",
      "source": {
        "page": "https://commons.wikimedia.org/wiki/File:Eastern_quoll_%28Dasyurus_viverrinus%29_fawn_morph_Esk_Valley.jpg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Eastern_quoll_%28Dasyurus_viverrinus%29_fawn_morph_Esk_Valley.jpg/1920px-Eastern_quoll_%28Dasyurus_viverrinus%29_fawn_morph_Esk_Valley.jpg",
        "author": "Charles J. Sharp",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
        "width": 1920,
        "height": 1280,
        "sha256": "f030bb8f2308a4f4cfa51e35d6a0dadfe472e3b6ebb135acc80f721844c6927a"
      },
      "caption": {
        "file": "prompt.txt",
        "sha256": "009185cf4604b97b51ab7b846cdc7a30c3b7f996a667ab2ba4cb5b108422defe",
        "model": "openai-codex/gpt-6-astra"
      },
      "generation": {
        "file": "generated.webp",
        "model": "GPT Image 2",
        "requestedModel": "openai-codex/gpt-image-2",
        "reportedModel": "gpt-image-2-codex",
        "quality": "medium",
        "width": 1536,
        "height": 1024,
        "sha256": "997fe703d773955ff2c2ab6e3ea17ebe15a1e0964c0ed70b69cc88f68ab6fc1d",
        "referenceImage": false,
        "seed": null,
        "license": "CC-BY-SA-4.0"
      },
      "checks": [
        {
          "id": "s19-count-position",
          "description": "可观察主体计数与位置",
          "expected": "一只斑点小兽位于左中，头朝右，耳朵竖起；右侧留有草地。",
          "tolerance": "位置约±5个百分点；指定子集计数不容差"
        },
        {
          "id": "s19-occupancy",
          "description": "动物头身四肢、不含尾巴与胡须的画面占比（外接框）",
          "expected": {
            "bbox": [
              0.13,
              0.16,
              0.61,
              0.87
            ],
            "areaPercent": 34.1
          },
          "tolerance": {
            "bboxEdgePercentagePoints": 5,
            "areaPercentagePoints": 5
          }
        },
        {
          "id": "s19-occlusion",
          "description": "遮挡及前后关系",
          "expected": "前景草叶遮住脚部与下腹边缘；尾巴向右伸在身体后方。",
          "tolerance": null
        },
        {
          "id": "s19-structure-color",
          "description": "类别关键结构及颜色",
          "expected": "灰褐毛皮上有白色圆斑，鼻头粉红，眼睛黑亮，背景上方近黑。",
          "tolerance": "允许轻微色温差，不允许替换关键颜色或结构"
        }
      ],
      "review": {
        "captionChecks": [
          {
            "id": "s19-count-position",
            "status": "supported",
            "evidence": "single small spotted mammal ... left of center ... face turned ... right；Two large upright ears；more open grass at right",
            "reason": "单只、左中、朝右、竖耳和右侧草地均明确。"
          },
          {
            "id": "s19-occupancy",
            "status": "supported",
            "evidence": "main body, head, and ears ...14% to 61% ...16% to 87%；尾巴另述",
            "reason": "主体框与冻结框仅左边差1个百分点，矩形面积约33%，符合两种容差。",
            "observedBBox": [
              0.14,
              0.16,
              0.61,
              0.87
            ],
            "observedBBoxAreaPercent": 33,
            "measurementBasis": "英文主体明确边界；尾巴另计"
          },
          {
            "id": "s19-occlusion",
            "status": "partial",
            "evidence": "grass blades partially obscure the feet；tail lies behind ... body and extends rightward",
            "reason": "脚部草遮挡和尾巴右伸在后均明确，但未明确草叶遮住下腹边缘。"
          },
          {
            "id": "s19-structure-color",
            "status": "partial",
            "evidence": "gray-brown ... irregular white spots；smooth pink nose；glossy dark eye；broad nearly black band",
            "reason": "毛色、鼻眼与近黑背景明确，白斑称irregular，未明确冻结条件的圆斑形状；不将泛称白斑当圆斑已全部覆盖。"
          }
        ],
        "generationChecks": [
          {
            "id": "s19-count-position",
            "status": "fail",
            "evidence": "单只竖耳朝右小兽及右侧草地保留；头身四肢中心约x30%、y44%，原冻结框中心约x37%、y52%。",
            "reason": "数量朝向正确，但整体左移、上移均约7–8个百分点，超过约±5个百分点位置容差，不能以部分符合判通过。"
          },
          {
            "id": "s19-occupancy",
            "status": "fail",
            "evidence": "不含尾巴胡须，生成动物约从x6%至53%、y7%至81%。",
            "reason": "左、上、右边界分别偏约7、9、8个百分点；面积接近冻结值不能抵消边界失败。",
            "observedBBox": [
              0.06,
              0.07,
              0.53,
              0.81
            ],
            "observedBBoxAreaPercent": 35,
            "uncertainty": "边缘约±1–2个百分点，面积约±3个百分点；上边缘明确超差。"
          },
          {
            "id": "s19-occlusion",
            "status": "pass",
            "evidence": "近景草叶遮住两前脚及腹部最低边缘；长尾由身体后方向右伸展。",
            "reason": "两个遮挡关系均可见。"
          },
          {
            "id": "s19-structure-color",
            "status": "pass",
            "evidence": "灰褐皮毛白色近圆斑、粉红鼻、黑亮眼、上方近黑背景均可见。",
            "reason": "冻结颜色结构满足，但生成兽更修长、白斑更密、耳朵比例改变，不能扩展成物种或外形精确复刻。"
          }
        ],
        "conclusion": "保留朝右竖耳、斑点毛皮、粉鼻黑眼及草地遮挡，生成动物明显左上移，位置和边界项失败；身形、耳朵与白斑分布也不同。"
      },
      "provenance": {
        "sourceLicenseChecked": "2026-10-17",
        "sourceLicenseEvidence": "Author and licensing sections independently reread on the linked Wikimedia Commons file page.",
        "sourceModification": "Wikimedia proportional thumbnail of the linked source version; no project cropping, retouching or re-encoding. Downloaded image bytes preserved.",
        "sourceConditions": "The linked source license applies; attribution retained. No endorsement or clearance of non-copyright rights is implied.",
        "reviewLimitations": "AI visual estimates and model review against four preselected checks, not human annotations, segmentation measurements or an overall accuracy benchmark.",
        "generationRights": "For generated images, only rights this project can license are offered under CC BY-SA 4.0; corresponding source credit and conditions remain. No guarantee of copyright subsistence, exclusivity or third-party clearance."
      },
      "captionText": "A ground-level, medium-close view of a single small spotted mammal sitting on green grass, its rounded body left of center and its alert face turned toward the viewer's right. The main body, head, and ears occupy approximately 14% to 61% of the frame width and 16% to 87% of its height. A long, narrow pale-gray tail lies behind the front of the body and extends rightward across the grass to about 77% of the frame width, near three-quarters of the image height. Leave a grassy margin of roughly one-eighth of the frame at left and substantially more open grass at right; both ears and the body remain within the crop, while individual grass blades partially obscure the feet. The nearest layer is uneven grass along the bottom edge, the animal occupies the sharply resolved middle plane, and the upper background recedes into soft green grass and a broad nearly black band. Its compact gray-brown back is scattered with distinct irregular white spots, with a cream-gray chest and lower face. Two large upright ears have pinkish inner surfaces, the viewer-left ear broader and more front-facing than the narrower right ear. The pointed muzzle ends in a smooth pink nose, with long fine dark whiskers extending sideways, and a prominent glossy dark eye catches a small bright reflection. Two short forelegs descend close together beneath the chest; the hindquarters form the large rounded mass at left. Strong light from the left-front reveals individual fur strands and casts a broad dark shadow across the grass to the right. A tiny white daisy with a yellow center appears near the lower-right edge, much smaller than an ear. Preserve the low viewpoint, dark upper background, complete animal silhouette, and generous space in the direction of its gaze."
    },
    {
      "id": "s20",
      "category": "动物",
      "title": "海豚群俯拍",
      "source": {
        "page": "https://commons.wikimedia.org/wiki/File:009_Pod_of_Spinner_dolphins_swimming_in_the_Indian_ocean_Photo_by_Giles_Laurent.jpg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/009_Pod_of_Spinner_dolphins_swimming_in_the_Indian_ocean_Photo_by_Giles_Laurent.jpg/1920px-009_Pod_of_Spinner_dolphins_swimming_in_the_Indian_ocean_Photo_by_Giles_Laurent.jpg",
        "author": "Giles Laurent",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
        "width": 1920,
        "height": 1440,
        "sha256": "35a8c29c419831d6af8fa47e1053599dcb9ee9f1c4ce785701d7e8e38e4e4779"
      },
      "caption": {
        "file": "prompt.txt",
        "sha256": "c577f93fce8579f9e1f8e34dd4d46304733f5023a27eca70ce736f95e63de9ac",
        "model": "openai-codex/gpt-6-astra"
      },
      "generation": {
        "file": "generated.webp",
        "model": "GPT Image 2",
        "requestedModel": "openai-codex/gpt-image-2",
        "reportedModel": "gpt-image-2-codex",
        "quality": "medium",
        "width": 1448,
        "height": 1086,
        "sha256": "8a6632199f741622b1e2732d9e4ceb73d37ea6199127932b0085bb594f60b4e3",
        "referenceImage": false,
        "seed": null,
        "license": "CC-BY-SA-4.0",
        "batch": "completion-2026-10-17",
        "attempts": 1,
        "promptSha256": "c577f93fce8579f9e1f8e34dd4d46304733f5023a27eca70ce736f95e63de9ac",
        "requestedAspectRatio": "4:3"
      },
      "checks": [
        {
          "id": "s20-count-position",
          "description": "可观察主体计数与位置",
          "expected": "只评上方三只分离海豚：约位于x20%、34%、60%；最右一只最高，均头朝画面上方。",
          "tolerance": "位置约±5个百分点；指定子集计数不容差"
        },
        {
          "id": "s20-occupancy",
          "description": "上方中央偏右独立海豚的画面占比（外接框）",
          "expected": {
            "bbox": [
              0.58,
              0.035,
              0.625,
              0.25
            ],
            "areaPercent": 1.0
          },
          "tolerance": {
            "bboxEdgePercentagePoints": 5,
            "areaPercentagePoints": 5
          }
        },
        {
          "id": "s20-occlusion",
          "description": "遮挡及前后关系",
          "expected": "中央偏下四只较亮海豚周围出现白色水花；两侧较淡青色海豚在水下，无陆地遮挡。",
          "tolerance": null
        },
        {
          "id": "s20-structure-color",
          "description": "类别关键结构及颜色",
          "expected": "俯视蓝青海水，海豚细长灰背与叉形尾鳍；主体间留有明显水面间隙。",
          "tolerance": "允许轻微色温差，不允许替换关键颜色或结构"
        }
      ],
      "review": {
        "captionChecks": [
          {
            "id": "s20-count-position",
            "status": "partial",
            "evidence": "highest animal ... just right of center；two more ... upper-left and upper-middle；all ... head-up",
            "reason": "上方三只及最右最高和朝上明确，但未明确约x20%、34%、60%的各自位置；upper-middle不足以确认x34%±5%。"
          },
          {
            "id": "s20-occupancy",
            "status": "partial",
            "evidence": "Individual dolphins ...3% to 5% ... width and17% to23% ... height；highest animal ... just right of center near the top；formation top3%",
            "reason": "个体宽高范围给出约0.5%–1.2%的矩形面积，但不是指定海豚的完整四边框，不能确认其每条边均在容差内。",
            "observedBBox": null,
            "observedBBoxAreaPercent": null,
            "measurementBasis": "仅有全体通用宽高范围，不能伪造指定个体框"
          },
          {
            "id": "s20-occlusion",
            "status": "supported",
            "evidence": "四个central dolphins逐一定位，each accompanied by white bubbles ... splashes；softer cyan silhouettes below the water；no shoreline or horizon",
            "reason": "四只水花主体与水下淡青个体及无陆地均明确。"
          },
          {
            "id": "s20-structure-color",
            "status": "partial",
            "evidence": "straight-down ... turquoise-blue；silver-gray ... streamlined bodies；horizontally spread tail flukes；water ... between every animal",
            "reason": "俯视海色、细长灰背和间隙明确，但水平展开尾鳍未明确叉形轮廓，不把方向词当形状全部支持。"
          }
        ],
        "generationChecks": [
          {
            "id": "s20-count-position",
            "status": "fail",
            "evidence": "生成图最高的三只分离海豚约在x20%、43%、59%，头均朝上，右边一只最高。",
            "reason": "中间一只从冻结x34%移至约43%，超过±5个百分点；其他子条件保留也不能使整项通过。"
          },
          {
            "id": "s20-occupancy",
            "status": "fail",
            "evidence": "上方中央偏右最高海豚本体含尾鳍的外框目测约x56%–61%、y2%–17%，不计水花尾迹。",
            "reason": "下边约17%而冻结为25%，缩短约8个百分点，超过±5个百分点；面积接近不能抵消四边条件不满足。",
            "observedBBox": [
              0.56,
              0.02,
              0.61,
              0.17
            ],
            "observedBBoxAreaPercent": 0.75,
            "measurementBasis": "AI视觉粗估指定海豚本体含尾鳍，不含白色尾迹；非分割测量"
          },
          {
            "id": "s20-occlusion",
            "status": "fail",
            "evidence": "明显白色水花伴随的亮海豚分布于顶部中央偏右、左上偏中、中部偏右和左下；另有较暗青色水下个体，无陆地遮挡。",
            "reason": "水下层次与无陆地保留，但四只亮海豚并未集中在中央偏下，顶部最高个体也被加上水花，不满足完整位置关系。"
          },
          {
            "id": "s20-structure-color",
            "status": "pass",
            "evidence": "俯视蓝青水面，细长灰背海豚可见横向分叉尾鳍，个体之间保留明显水面空隙。",
            "reason": "俯视、海色、灰背、叉尾和个体间隙均可观察；新增清晰海底纹理不在该项限定条件内。"
          }
        ],
        "conclusion": "一次纯文生图保留俯视蓝青海水、细长灰背叉尾和群体间隙，但上方中间个体右移，最高海豚变短，水花主体位置重排，并新增明显海底纹理。四项限定检查为1通过、3不通过，不能据类别一致声称布局复现。",
        "reviewProvenance": "2026-10-17：AI视觉评审实际打开source.jpg与generated.webp，按既有四项冻结条件逐项比较；非人工标注、非独立盲评或受控基准。外接框为视觉粗估。"
      },
      "provenance": {
        "sourceLicenseChecked": "2026-10-17",
        "sourceLicenseEvidence": "Author and licensing sections independently reread on the linked Wikimedia Commons file page.",
        "sourceModification": "Wikimedia proportional thumbnail of the linked source version; no project cropping, retouching or re-encoding. Downloaded image bytes preserved.",
        "sourceConditions": "The linked source license applies; attribution retained. No endorsement or clearance of non-copyright rights is implied.",
        "reviewLimitations": "AI visual estimates and model review against four preselected checks, not human annotations, segmentation measurements or an overall accuracy benchmark.",
        "generationRights": "For generated images, only rights this project can license are offered under CC BY-SA 4.0; corresponding source credit and conditions remain. No guarantee of copyright subsistence, exclusivity or third-party clearance."
      },
      "captionText": "A wide, straight-down aerial view of a pod of dolphins swimming through uninterrupted clear turquoise-blue water, all oriented approximately head-up toward the top of the image. The scattered formation extends from roughly 8% to 91% of the frame width and 3% to 95% of its height, with water visible between every animal and along all four edges. Individual dolphins are slender, generally about 3% to 5% of the frame width and 17% to 23% of its height including their tails, rather than enlarged close-up subjects. Approximately eighteen dolphins are visible, some crisp at the surface and others faintly submerged. The highest animal sits just right of center near the top; two more occupy the upper-left and upper-middle areas, while one isolated dolphin near the lower left reaches closest to the bottom edge. A loose arc of dolphins runs down the right side, and additional staggered swimmers fill the left and central spaces without forming a rigid grid. Preserve the depth distinction between silver-gray surface bodies with dark back markings and the softer cyan silhouettes below the water. Several central dolphins break the surface: one left of center, one near the upper middle-right, one lower left of center, and one lower middle-right, each accompanied by white bubbles and narrow broken splashes trailing toward its tail. A broader dark, softly defined underwater patch lies behind the center-right swimmers. Long tapered snouts, paired side fins, streamlined bodies, and horizontally spread tail flukes remain legible from above. The water is luminous and largely smooth, with subtle tonal variations rather than large waves, and no shoreline or horizon. Maintain the expansive overhead composition, visible separation among animals, and multiple submerged depths without adding a foreground frame or cropping the outermost dolphins."
    },
    {
      "id": "s21",
      "category": "室内空间",
      "title": "餐厅长桌与排椅",
      "source": {
        "page": "https://commons.wikimedia.org/wiki/File:Dining_room_at_the_inn_Dans_les_bras_de_Morph%C3%A9e%2C_located_on_%C3%8Ele_d%27Orl%C3%A9ans.jpg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Dining_room_at_the_inn_Dans_les_bras_de_Morph%C3%A9e%2C_located_on_%C3%8Ele_d%27Orl%C3%A9ans.jpg/1920px-Dining_room_at_the_inn_Dans_les_bras_de_Morph%C3%A9e%2C_located_on_%C3%8Ele_d%27Orl%C3%A9ans.jpg",
        "author": "Wilfredor",
        "license": "CC0 1.0",
        "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
        "width": 1920,
        "height": 1280,
        "sha256": "438496ff1d771be6a16a9338773cd11d6a0ee21365751e404810598a170721e6"
      },
      "caption": {
        "file": "prompt.txt",
        "sha256": "05fb4c252c91de5a3ddd91aeb9dcbdfeb8daaddd0c6c8b5ec0e04d4b2c61ce75",
        "model": "openai-codex/gpt-6-astra"
      },
      "generation": {
        "file": "generated.webp",
        "model": "GPT Image 2",
        "requestedModel": "openai-codex/gpt-image-2",
        "reportedModel": "gpt-image-2-codex",
        "quality": "medium",
        "width": 1536,
        "height": 1024,
        "sha256": "0960fde487571b0d54131e128abc15daf652b8d925caf4d0c1214edba36e9fc4",
        "referenceImage": false,
        "seed": null,
        "license": "CC-BY-SA-4.0"
      },
      "checks": [
        {
          "id": "s21-count-position",
          "description": "可观察主体计数与位置",
          "expected": "长餐桌斜向从左后延伸到右前，右侧是一排大窗；仅检查近侧四把连续椅背，不要求全屋椅子计数。",
          "tolerance": "位置约±5个百分点；指定子集计数不容差"
        },
        {
          "id": "s21-occupancy",
          "description": "餐桌与周围白椅家具组的画面占比（外接框）",
          "expected": {
            "bbox": [
              0.1,
              0.23,
              0.9,
              0.97
            ],
            "areaPercent": 59.2
          },
          "tolerance": {
            "bboxEdgePercentagePoints": 5,
            "areaPercentagePoints": 5
          }
        },
        {
          "id": "s21-occlusion",
          "description": "遮挡及前后关系",
          "expected": "近侧椅背遮住桌沿和桌面局部，远侧椅子在桌后；吊灯悬于餐桌上方。",
          "tolerance": null
        },
        {
          "id": "s21-structure-color",
          "description": "类别关键结构及颜色",
          "expected": "奶白色木椅带交叉靠背，木地板暖棕色，右侧窗外绿色植物，桌面摆杯碟与花。",
          "tolerance": "允许轻微色温差，不允许替换关键颜色或结构"
        }
      ],
      "review": {
        "captionChecks": [
          {
            "id": "s21-count-position",
            "status": "partial",
            "evidence": "long rectangular dining table receding ... lower-right ... upper-left；windows ... right wall；Around ten ... chairs；nearest chair backs ... diagonal",
            "reason": "餐桌方向和右窗明确，但没有指定近侧连续四把椅背；全屋约十把不能替代冻结子集计数。"
          },
          {
            "id": "s21-occupancy",
            "status": "partial",
            "evidence": "tabletop10%–90%,30%–57%；nearest chair59%–87%,37%–97%；legs ... almost to the bottom",
            "reason": "桌面和一把椅子框明确，但家具组整体顶部23%及其联合四边没有完整约束，不能拿桌面框替代家具组框。",
            "observedBBox": null,
            "observedBBoxAreaPercent": null,
            "measurementBasis": "未给出整个家具组四边，拒绝用局部框充当整体"
          },
          {
            "id": "s21-occlusion",
            "status": "partial",
            "evidence": "nearest plane contains chair backs ... middle plane ... table setting；chandeliers hang above the table",
            "reason": "前后层次与上方吊灯明确，但近侧椅背遮桌沿及桌面局部、远侧椅子在桌后没有全部明确写出。"
          },
          {
            "id": "s21-structure-color",
            "status": "partial",
            "evidence": "Cream chairs ... open crossed or slatted backs；honey-brown floor；windows overlooking green foliage；floral arrangements ... white cups, plates",
            "reason": "颜色、地板、绿植与杯碟花明确，但靠背给出crossed or slatted的可选结构，未固定交叉靠背全部条件。"
          }
        ],
        "generationChecks": [
          {
            "id": "s21-count-position",
            "status": "pass",
            "evidence": "桌子从左后斜向右前，右边整排大窗；近侧长边可辨四个连续椅背，右前端椅另计。",
            "reason": "限定近侧子集四把及场景方向均符合；没有以全屋数量替代。"
          },
          {
            "id": "s21-occupancy",
            "status": "pass",
            "evidence": "只计桌椅家具，不含桌上花和后方柜子，联合框约x11%–94%、y26%–100%。",
            "reason": "四边偏差约1、3、4、3个百分点，各在5以内；矩形面积约61%，在54.2%–64.2%范围内。底部出现裁切仍在该数值容差内，不等于完整轮廓复刻。",
            "observedBBox": [
              0.11,
              0.26,
              0.94,
              1.0
            ],
            "observedBBoxAreaPercent": 61,
            "uncertainty": "视觉边界约±1个百分点，面积约±2个百分点；此项仅按冻结bbox容差判断。"
          },
          {
            "id": "s21-occlusion",
            "status": "pass",
            "evidence": "近侧椅背挡住局部桌沿及桌面，远侧椅子在桌后露出，吊灯在桌上方。",
            "reason": "三项前后关系均满足。"
          },
          {
            "id": "s21-structure-color",
            "status": "pass",
            "evidence": "奶白木椅有明显交叉背、暖棕木地板、右窗外绿色树叶、桌上杯碟和花。",
            "reason": "冻结条件全部可见；花团明显变大、桌面布置更密并非本项通过即完整保真。"
          }
        ],
        "conclusion": "生成图在四项冻结条件内通过，包括限定近侧四椅与宽容差家具框；但花团变大、布置更密、桌腿和近端椅被下边裁切，房间背景及灯具改变，不能称整体精确复刻。文字四项均仅部分覆盖。"
      },
      "provenance": {
        "sourceLicenseChecked": "2026-10-17",
        "sourceLicenseEvidence": "Author and licensing sections independently reread on the linked Wikimedia Commons file page.",
        "sourceModification": "Wikimedia proportional thumbnail of the linked source version; no project cropping, retouching or re-encoding. Downloaded image bytes preserved.",
        "sourceConditions": "The linked source license applies; attribution retained. No endorsement or clearance of non-copyright rights is implied.",
        "reviewLimitations": "AI visual estimates and model review against four preselected checks, not human annotations, segmentation measurements or an overall accuracy benchmark.",
        "generationRights": "For generated images, only rights this project can license are offered under CC BY-SA 4.0; corresponding source credit and conditions remain. No guarantee of copyright subsistence, exclusivity or third-party clearance."
      },
      "captionText": "A wide diagonal view across a furnished dining room, with a long rectangular dining table receding from the lower-right middle toward the upper-left middle and bright multipane windows covering the right wall. The tabletop extends approximately from 10% to 90% of the image width and 30% to 57% of its height; its reflective dark-edged surface is distinct from the tall pale turned legs that descend almost to the bottom. Around ten pale painted dining chairs surround it, with the nearest chair backs forming a diagonal from the left middle to the large right-hand end chair, whose full silhouette occupies roughly 59% to 87% across and 37% to 97% down. Exposed honey-brown floor fills the lower and left margins, while the windows extend from about 71% across to the right crop and from the top to just under half the image height. The nearest plane contains chair backs, table legs, and open floor; the middle plane is the table setting; the rear contains a dark sideboard, framed wall pictures, lamps, a doorway, and windows overlooking green foliage. Two pale ornate multiarm chandeliers hang above the table, partly cut by the top edge. A long light patterned runner follows the tabletop, carrying small floral arrangements spaced among white cups, plates, folded napkins, and utensils; these objects remain small compared with the table rather than becoming a close display. Cream chairs have curved top rails, open crossed or slatted backs, and padded pale seats. Warm lamps glow along the back wall, balanced by strong daylight from the right that reflects off the tabletop and polished floor. Hanging green foliage frames the upper-right windows, and part of a rocking chair is cropped at far right. Retain the roomy interior perspective and the table's full relationship to its surrounding chairs and architecture."
    },
    {
      "id": "s22",
      "category": "室内空间",
      "title": "窗前双椅与边桌",
      "source": {
        "page": "https://commons.wikimedia.org/wiki/File:Interior_of_Willistead_Manor_%28two_chairs_by_window%29%2C_Windsor%2C_Ontario%2C_2025-06-07.jpg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Interior_of_Willistead_Manor_%28two_chairs_by_window%29%2C_Windsor%2C_Ontario%2C_2025-06-07.jpg/1920px-Interior_of_Willistead_Manor_%28two_chairs_by_window%29%2C_Windsor%2C_Ontario%2C_2025-06-07.jpg",
        "author": "Crisco 1492",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
        "width": 1920,
        "height": 1376,
        "sha256": "d0695058f473c80dd1d35734f93191b03b170574930c908d8ade9f291e17bb2c"
      },
      "caption": {
        "file": "prompt.txt",
        "sha256": "9a357d1851d806da0cbc8cdbd71af9beabfe44accc574a39436a10870eaea10d",
        "model": "openai-codex/gpt-6-astra"
      },
      "generation": {
        "file": "generated.webp",
        "model": "GPT Image 2",
        "requestedModel": "openai-codex/gpt-image-2",
        "reportedModel": "gpt-image-2-codex",
        "quality": "medium",
        "width": 1448,
        "height": 1086,
        "sha256": "83d46777ba375aa291e73aba77aeb7d2fd3f16e2db6e6f7108c19ad7b871fb3f",
        "referenceImage": false,
        "seed": null,
        "license": "CC-BY-SA-4.0",
        "batch": "completion-2026-10-17",
        "attempts": 1,
        "promptSha256": "9a357d1851d806da0cbc8cdbd71af9beabfe44accc574a39436a10870eaea10d",
        "requestedAspectRatio": "4:3"
      },
      "checks": [
        {
          "id": "s22-count-position",
          "description": "可观察主体计数与位置",
          "expected": "两把椭圆靠背椅左右分列，中间一张窄桌；桌上两盏台灯夹着花瓶。",
          "tolerance": "位置约±5个百分点；指定子集计数不容差"
        },
        {
          "id": "s22-occupancy",
          "description": "两椅及中间桌子家具组的画面占比（外接框）",
          "expected": {
            "bbox": [
              0.27,
              0.65,
              0.71,
              0.96
            ],
            "areaPercent": 13.6
          },
          "tolerance": {
            "bboxEdgePercentagePoints": 5,
            "areaPercentagePoints": 5
          }
        },
        {
          "id": "s22-occlusion",
          "description": "遮挡及前后关系",
          "expected": "桌椅位于蕾丝窗帘前，侧面厚窗帘在两侧；中央吊灯位于上方前景。",
          "tolerance": null
        },
        {
          "id": "s22-structure-color",
          "description": "类别关键结构及颜色",
          "expected": "金棕暖色室内，左右壁灯各有两个灯罩，窗户白色蕾丝与深色木家具形成明暗对比。",
          "tolerance": "允许轻微色温差，不允许替换关键颜色或结构"
        }
      ],
      "review": {
        "captionChecks": [
          {
            "id": "s22-count-position",
            "status": "supported",
            "evidence": "Two ... chairs ... left ... right；narrow dark console table；two matching shaded figurine lamps flank a central flower arrangement；dark carved oval frames",
            "reason": "两把椭圆椅、中央窄桌、两台灯夹花均明确。"
          },
          {
            "id": "s22-occupancy",
            "status": "supported",
            "evidence": "left chair28%–41%；right59%–71%；both66%–96%；console39%–61%,70%–89%",
            "reason": "椅桌联合框28%–71%、66%–96%，面积约13%，四边及面积均在冻结容差。",
            "observedBBox": [
              0.28,
              0.66,
              0.71,
              0.96
            ],
            "observedBBoxAreaPercent": 13,
            "measurementBasis": "英文椅桌三个明确框的联合框，不计桌上摆件"
          },
          {
            "id": "s22-occlusion",
            "status": "supported",
            "evidence": "chairs ... in front ... rear plane ... lace-covered window；Heavy side curtains；pendant hangs centrally from the top crop",
            "reason": "家具在蕾丝前、厚侧帘两侧及上方中央吊灯层次均明确。"
          },
          {
            "id": "s22-structure-color",
            "status": "partial",
            "evidence": "golden-brown curtains；pale lace；dark console；matching double-arm wall sconces",
            "reason": "暖色及浅蕾丝对深家具明确，但double-arm只明确双臂，未明确每侧两个灯罩；不能将双臂自动当成两个灯罩。"
          }
        ],
        "generationChecks": [
          {
            "id": "s22-count-position",
            "status": "pass",
            "evidence": "两把椭圆靠背椅左右分列，中央窄木桌上两盏台灯夹着一只插花花瓶。",
            "reason": "指定家具与台灯数量、左右排列和花瓶居中的关系均保留。"
          },
          {
            "id": "s22-occupancy",
            "status": "uncertain",
            "evidence": "不计台灯花瓶，两椅与桌子联合外框目测约x26%–75%、y61%–93%，面积约15.7%；右椅较原图外扩，椅背更高。",
            "reason": "粗估值落在冻结容差内，但右边距允许上限76%仅约1个百分点，上边也接近60%下限；未做像素级边界标注，不能确信全部四边同时满足，保留不确定而非算通过。",
            "observedBBox": [
              0.26,
              0.61,
              0.75,
              0.93
            ],
            "observedBBoxAreaPercent": 15.7,
            "measurementBasis": "AI视觉粗估家具联合外接框，不计桌上摆件；接近容差边界，非分割测量"
          },
          {
            "id": "s22-occlusion",
            "status": "pass",
            "evidence": "桌椅在白色蕾丝窗帘前，厚重花纹窗帘在左右两侧，碗形吊灯从上方中央垂下并遮住后方帘幔。",
            "reason": "家具、窗帘与中央前景吊灯的全部冻结深度关系可见。"
          },
          {
            "id": "s22-structure-color",
            "status": "pass",
            "evidence": "室内为金棕暖色，左右壁灯各清楚可见两个灯罩，亮白蕾丝衬在深色木桌椅后。",
            "reason": "每侧两个灯罩的数量和明暗、颜色关系全部保留；灯具花纹和家具款式仍有变化。"
          }
        ],
        "conclusion": "一次纯文生图保留双椅一桌、两台灯夹花、每侧双罩壁灯及窗帘前后层次；椅桌组略扩大，吊灯和花束更显眼，帘幔、桌腿及墙板细节重构，底部新增地毯。四项限定检查为3通过、1不确定，家具框接近容差边界，不宣称精确复刻。",
        "reviewProvenance": "2026-10-17：AI视觉评审实际打开source.jpg与generated.webp，按既有四项冻结条件逐项比较；非人工标注、非独立盲评或受控基准。外接框为视觉粗估。"
      },
      "provenance": {
        "sourceLicenseChecked": "2026-10-17",
        "sourceLicenseEvidence": "Author and licensing sections independently reread on the linked Wikimedia Commons file page.",
        "sourceModification": "Wikimedia proportional thumbnail of the linked source version; no project cropping, retouching or re-encoding. Downloaded image bytes preserved.",
        "sourceConditions": "The linked source license applies; attribution retained. No endorsement or clearance of non-copyright rights is implied.",
        "reviewLimitations": "AI visual estimates and model review against four preselected checks, not human annotations, segmentation measurements or an overall accuracy benchmark.",
        "generationRights": "For generated images, only rights this project can license are offered under CC BY-SA 4.0; corresponding source credit and conditions remain. No guarantee of copyright subsistence, exclusivity or third-party clearance."
      },
      "captionText": "A wide, nearly symmetrical frontal view of a warmly lit window alcove, framed by floor-length patterned golden-brown curtains and a broad floral swag valance. The complete draped opening spans approximately 13% to 89% of the image width and 2% to 97% of its height, leaving visible amber wall margins on both sides. Behind it, a tall multipane window covered by fine pale lace curtains occupies roughly 27% to 73% across and 22% to 89% down. Two small upholstered chairs stand in front of a narrow dark console table: the left chair extends from about 28% to 41% across, the right from 59% to 71%, both between 66% and 96% of image height. The console's entire silhouette spans approximately 39% to 61% across and 70% to 89% down, while its thin horizontal top is only a narrow strip beneath the displayed objects. On that top, two matching shaded figurine lamps flank a central flower arrangement, leaving small gaps; each shade is about one-quarter of the tabletop width, and the bouquet spreads across roughly half. The closest plane includes chair legs and a shallow strip of wooden floor, the main furnishing plane holds the chairs and console, and the rear plane is the lace-covered window with faint greenery beyond. The chairs have dark carved oval frames and gold upholstery, with a button-tufted back on the left and a smoother striped back on the right. Heavy side curtains are tied back low and pool slightly at the floor. A glowing amber bowl pendant hangs centrally from the top crop, while matching double-arm wall sconces illuminate both side walls. Dark lower wall paneling anchors the composition. Preserve the full architectural framing, small furniture scale, balanced gaps, and subdued contrast between cool window light and warm interior lamps."
    },
    {
      "id": "s23",
      "category": "建筑外观",
      "title": "街角尖顶建筑",
      "source": {
        "page": "https://commons.wikimedia.org/wiki/File:Kaiserfeldgasse_8_Leoben_06-2025.jpg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Kaiserfeldgasse_8_Leoben_06-2025.jpg/1280px-Kaiserfeldgasse_8_Leoben_06-2025.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
        "author": "Aciarium",
        "license": "CC BY 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
        "width": 1280,
        "height": 853,
        "sha256": "9aef4317474786b964ce039c0f912b3a2fbe3ead36fbce0b89225faf4bb5f16f"
      },
      "caption": {
        "file": "prompt.txt",
        "sha256": "6516882259d7c46bd1eecd65cb56605b623a90d4a5f60b0d1c87f003dd6cdcc0",
        "model": "openai-codex/gpt-6-astra"
      },
      "generation": {
        "file": "generated.webp",
        "model": "GPT Image 2",
        "requestedModel": "openai-codex/gpt-image-2",
        "reportedModel": "gpt-image-2-codex",
        "quality": "medium",
        "width": 1536,
        "height": 1024,
        "sha256": "7fc78a8965fe04f2ab7900b423bd37734d8816e32bb656147055775d56364625",
        "referenceImage": false,
        "seed": null,
        "license": "CC-BY-SA-4.0"
      },
      "checks": [
        {
          "id": "s23-1",
          "description": "主建筑数量与位置",
          "expected": "一栋浅黄色街角建筑居中，两个立面向左右展开；一座尖顶角塔位于画面中央上部，不考核边缘其他楼房数量",
          "tolerance": null
        },
        {
          "id": "s23-2",
          "description": "主体包围盒和画面占比（AI视觉粗估，坐标为距左/上边的百分比；面积为bbox面积，非分割面积）",
          "expected": {
            "subject": "浅黄色主建筑含角塔，不含右邻浅黄平顶楼及前景树木",
            "bboxPercent": [
              18,
              3,
              86,
              94
            ],
            "bboxAreaPercent": 61.9
          },
          "tolerance": {
            "bboxEdgesPercentagePoints": 5,
            "bboxAreaPercentagePoints": 5
          }
        },
        {
          "id": "s23-3",
          "description": "遮挡与前后关系",
          "expected": "左侧树冠遮住主建筑左下立面；路灯和停靠车辆位于立面之前，街道路面位于底部",
          "tolerance": null
        },
        {
          "id": "s23-4",
          "description": "建筑关键结构和颜色",
          "expected": "浅黄与奶白石饰立面；深灰细长尖顶角塔，底层连续拱形门窗，上层矩形窗配三角或装饰窗楣",
          "tolerance": null
        }
      ],
      "review": {
        "captionChecks": [
          {
            "id": "s23-1",
            "status": "supported",
            "evidence": "'pale yellow corner building'; 'projecting corner tower ... near the horizontal center'; 'left wing' 与 'long right facade'。",
            "reason": "明确交代单栋浅黄街角主楼、中央尖塔及左右两翼。"
          },
          {
            "id": "s23-2",
            "status": "supported",
            "evidence": "主楼明确为横向18%–86%、纵向3%–95%，邻楼另列。",
            "reason": "与冻结边界最大差1个百分点；由文字边界计算矩形面积约62.6%，与61.9%相差约0.7个百分点，两种容差均满足。",
            "observedBBox": [
              0.18,
              0.03,
              0.86,
              0.95
            ],
            "observedBBoxAreaPercent": 62.6,
            "measurementBasis": "caption_explicit_extents"
          },
          {
            "id": "s23-3",
            "status": "supported",
            "evidence": "'tree mass ... partially hiding the left wing'; 'streetlight poles rise in front'; 'Parked cars ... along the right curb'; 'asphalt junction along the bottom'。",
            "reason": "树对左翼的遮挡、立面前路灯及车辆、底部路面均有明确描述。"
          },
          {
            "id": "s23-4",
            "status": "supported",
            "evidence": "'pale yellow'、'pale cream wall panels'、'slender dark pointed roof'、'rectangular windows above arched ground-floor openings'、'window pediments'。",
            "reason": "浅黄奶白立面、深色细尖塔顶、底层拱口和上层带装饰窗楣矩形窗均覆盖；未要求复刻各雕饰。"
          }
        ],
        "generationChecks": [
          {
            "id": "s23-1",
            "status": "pass",
            "evidence": "生成图为一栋居中浅黄街角楼，尖顶角塔在中央上部，两侧立面向左右展开。",
            "reason": "满足冻结数量和大体位置，不把附加屋顶装饰计作另一栋主建筑。"
          },
          {
            "id": "s23-2",
            "status": "pass",
            "evidence": "不计树和右邻平顶楼，主楼可见轮廓粗估横向16%–86%、纵向1%–90%。",
            "reason": "四边与冻结标注相差约2、2、0、4个百分点；bbox面积约62%，与61.9%接近，均在冻结容差内。",
            "observedBBox": [
              0.16,
              0.01,
              0.86,
              0.9
            ],
            "observedBBoxAreaPercent": 62,
            "uncertainty": "边界目测约±1个百分点；左下有树遮挡，只据可见建筑轮廓估计。"
          },
          {
            "id": "s23-3",
            "status": "pass",
            "evidence": "大树覆盖左下立面；浅色路灯在树及建筑之前；车辆沿右立面停靠；道路占底部。",
            "reason": "全部要求的遮挡与前后层次保留。"
          },
          {
            "id": "s23-4",
            "status": "pass",
            "evidence": "浅黄奶白立面、深灰尖塔、连续底层拱形开口、上层矩形窗及三角/曲线装饰窗楣可见。",
            "reason": "全部冻结结构颜色条件满足，但生成图额外繁化屋顶和雕饰，不代表立面细部完全一致。"
          }
        ],
        "conclusion": "四项文字与四项生成检查均在本轮有限标准内通过；街角双立面、尖塔和道路层次保留，但屋顶、窗饰与树冠明显重构，不能视为建筑精确复刻。"
      },
      "provenance": {
        "sourceLicenseChecked": "2026-10-17",
        "sourceLicenseEvidence": "Author and licensing sections independently reread on the linked Wikimedia Commons file page.",
        "sourceModification": "Wikimedia proportional thumbnail of the linked source version; no project cropping, retouching or re-encoding. Downloaded image bytes preserved.",
        "sourceConditions": "The linked source license applies; attribution retained. No endorsement or clearance of non-copyright rights is implied.",
        "reviewLimitations": "AI visual estimates and model review against four preselected checks, not human annotations, segmentation measurements or an overall accuracy benchmark.",
        "generationRights": "For generated images, only rights this project can license are offered under CC BY-SA 4.0; corresponding source credit and conditions remain. No guarantee of copyright subsistence, exclusivity or third-party clearance."
      },
      "captionText": "A wide street-level architectural view shows an ornate pale yellow corner building beneath a clear blue sky, with the building extending approximately from 18% to 86% of the frame width and from 3% to 95% of its height. Its projecting corner tower stands near the horizontal center, capped by a slender dark pointed roof, while the long right facade recedes toward the right edge. The main facade includes a tall triangular gable to the left of the tower, smaller roof forms farther left, and three upper rows of rectangular windows above arched ground-floor openings. Mustard-colored molding outlines pale cream wall panels, window pediments, cornices, and the faceted tower bays. A leafy green tree mass fills the lower left quarter, partially hiding the left wing rather than standing behind it. The nearest layer is the open asphalt junction along the bottom, with white crossing and lane markings; slim pale streetlight poles rise in front of the building near the left-center. Parked cars form a small line along the right curb, including an orange car near the building and a nearer silver hatchback at lower right. A neighboring light gray ornamental facade is tightly cropped along the far right edge, while a simpler yellow building continues beyond the main building in the middle distance. Small dark storefront sign strips with light lettering remain subordinate to the architecture. Strong daylight from the upper right brightens the facades and casts defined shadows, with crisp detail throughout. Keep the tower tip inside the frame, generous blue sky around its upper silhouette, the street visible below, and the same wide corner-building framing."
    },
    {
      "id": "s24",
      "category": "建筑外观",
      "title": "夜间壳形屋顶建筑",
      "source": {
        "page": "https://commons.wikimedia.org/wiki/File:Sydney_Opera_House_-_Dec_2008.jpg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/1280px-Sydney_Opera_House_-_Dec_2008.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
        "author": "Diliff",
        "license": "CC BY-SA 3.0 (selected from dual-license options)",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
        "width": 1280,
        "height": 707,
        "sha256": "489eb86409b8058e282d37a6e518a2739420275342d4c0c13fe980f553be0391"
      },
      "caption": {
        "file": "prompt.txt",
        "sha256": "f81872690066e898064800e5cfceb52d28d58bc5f43b7250c10d94352f4e5130",
        "model": "openai-codex/gpt-6-astra"
      },
      "generation": {
        "file": "generated.webp",
        "model": "GPT Image 2",
        "requestedModel": "openai-codex/gpt-image-2",
        "reportedModel": "gpt-image-2-codex",
        "quality": "medium",
        "width": 1672,
        "height": 941,
        "sha256": "abfd501062cab3eb1074b772e2343575c76877000d5c8cbd4aea38f311ebe116",
        "referenceImage": false,
        "seed": null,
        "license": "CC-BY-SA-4.0",
        "batch": "completion-2026-10-17",
        "attempts": 1,
        "promptSha256": "f81872690066e898064800e5cfceb52d28d58bc5f43b7250c10d94352f4e5130",
        "requestedAspectRatio": "16:9"
      },
      "checks": [
        {
          "id": "s24-1",
          "description": "主建筑位置与形状组",
          "expected": "一组相连的白色壳片屋顶建筑位于中下部，最高壳片在中央附近，右侧有较小壳片组",
          "tolerance": null
        },
        {
          "id": "s24-2",
          "description": "主体包围盒和画面占比（AI视觉粗估，坐标为距左/上边的百分比；面积为bbox面积，非分割面积）",
          "expected": {
            "subject": "主建筑屋顶与墙体，不计外围码头与水面",
            "bboxPercent": [
              20,
              33,
              75,
              79
            ],
            "bboxAreaPercent": 25.3
          },
          "tolerance": {
            "bboxEdgesPercentagePoints": 5,
            "bboxAreaPercentagePoints": 5
          }
        },
        {
          "id": "s24-3",
          "description": "前后景层次",
          "expected": "水面和垂直灯光倒影在建筑前方，密集亮窗城市楼群在后方",
          "tolerance": null
        },
        {
          "id": "s24-4",
          "description": "建筑结构及夜间颜色",
          "expected": "多个尖顶弧形白色屋面相互叠置，屋面下为暖黄亮窗；天空及水面整体深蓝黑",
          "tolerance": null
        }
      ],
      "review": {
        "captionChecks": [
          {
            "id": "s24-1",
            "status": "supported",
            "evidence": "'overlapping white sail-shaped roofs'; 主屋顶位于22%–75%宽、34%–70%高；'tall pointed curved shells' 与右端 'smaller pair ... separated ... by a low section'。",
            "reason": "明确为中下部白色相连屋面组、中央附近高壳片及右侧小组。"
          },
          {
            "id": "s24-2",
            "status": "partial",
            "evidence": "屋顶单独给22%–75%、34%–70%；'podium and waterfront platform' 合并给15%至右边缘、65%–83%。",
            "reason": "没有为排除外围码头后的屋顶加墙体给出完整边界；不能把屋顶bbox或包含码头的平台bbox冒充冻结主体bbox。",
            "observedBBox": null,
            "observedBBoxAreaPercent": null,
            "measurementBasis": "caption_target_bbox_not_fully_specified",
            "partialExtent": {
              "roofOnlyBBox": [
                0.22,
                0.34,
                0.75,
                0.7
              ],
              "roofOnlyBBoxAreaPercent": 19.1
            }
          },
          {
            "id": "s24-3",
            "status": "supported",
            "evidence": "'nearest ... water' 携带 'elongated white and muted gold reflections below the quay lights'；其后为 'dense distant skyline ... yellow and white windows'。",
            "reason": "水和纵向拉长倒影在前、密集亮窗楼群在后的层次明确。"
          },
          {
            "id": "s24-4",
            "status": "partial",
            "evidence": "白色重叠尖曲壳片、'Warm golden glazing ... beneath the roofs'、'dark blue-gray sky' 与 'Dark harbor water'。",
            "reason": "结构、暖窗及暗色夜景有依据，但水面仅说暗，未明确冻结条件中的蓝黑色；不以部分颜色覆盖算全部支持。"
          }
        ],
        "generationChecks": [
          {
            "id": "s24-1",
            "status": "pass",
            "evidence": "生成图中一组相连白色壳片屋顶位于中下部，最高尖壳在横向约40%处，右侧约65%–75%处另有较小壳片组。",
            "reason": "中下部相连屋面、中央附近最高壳片及右侧小组均可见；不表示壳片数量与原图完全相同。"
          },
          {
            "id": "s24-2",
            "status": "fail",
            "evidence": "排除外围码头和水面，生成图建筑屋顶与墙体的AI视觉估计bbox约为[21,25,76,64]%，面积约21.5%。原图冻结bbox为[20,33,75,79]%。",
            "reason": "顶部约上移8个百分点、底部约上移15个百分点，均超过±5个百分点容差；即使估计有少量误差也不能通过全部边界条件。",
            "observedBBox": [
              0.21,
              0.25,
              0.76,
              0.64
            ],
            "observedBBoxAreaPercent": 21.5,
            "measurementBasis": "AI visual estimate from displayed image; not segmentation or calibrated measurement"
          },
          {
            "id": "s24-3",
            "status": "pass",
            "evidence": "蓝黑水面占据前景，建筑下方有纵向延伸的金白色灯光倒影；密集亮窗楼群位于建筑后方。",
            "reason": "前景水面及垂直倒影、后景亮窗城市的完整层次关系成立。"
          },
          {
            "id": "s24-4",
            "status": "pass",
            "evidence": "多个白色尖顶弧面互相叠置，其下为暖金黄色玻璃和亮窗，天空及大部分非倒影水面呈深蓝色。",
            "reason": "叠置尖曲屋面、下方暖窗和蓝黑夜景均保留。"
          }
        ],
        "conclusion": "实际生成保留白色壳片、右侧小屋面、暖窗和水岸夜景层次，但建筑整体上移，墙体底缘明显高于冻结边界，壳片形状、城市楼群和水纹亦被重构。四项限定检查为3通过、1不通过，不代表精确复刻。",
        "provenance": {
          "reviewerType": "AI visual review",
          "reviewerModel": "openai-codex/gpt-6-astra",
          "date": "2026-10-17",
          "inputsViewed": [
            "source.jpg",
            "generated.webp"
          ],
          "method": "Direct visual comparison against the four unchanged preselected checks; not human review or an independent blinded benchmark. Bounding boxes are approximate AI visual estimates."
        }
      },
      "provenance": {
        "sourceLicenseChecked": "2026-10-17",
        "sourceLicenseEvidence": "Author and licensing sections independently reread on the linked Wikimedia Commons file page.",
        "sourceModification": "Wikimedia proportional thumbnail of the linked source version; no project cropping, retouching or re-encoding. Downloaded image bytes preserved.",
        "sourceConditions": "Photo licensed CC BY-SA 3.0, selected from the author’s offered licenses. The source page also cites Australian Copyright Act sections 65–68 for depictions of the building; this is not a worldwide clearance of architecture or other rights.",
        "reviewLimitations": "AI visual estimates and model review against four preselected checks, not human annotations, segmentation measurements or an overall accuracy benchmark.",
        "generationRights": "For generated images, only rights this project can license are offered under CC BY-SA 4.0; corresponding source credit and conditions remain. No guarantee of copyright subsistence, exclusivity or third-party clearance."
      },
      "captionText": "A wide elevated nighttime waterfront view centers a large illuminated building with overlapping white sail-shaped roofs, set across a projecting quay rather than filling the foreground. The architectural roof group occupies roughly 22% to 75% of the frame width and 34% to 70% of its height, while its broad low podium and waterfront platform extend from about 15% across to the right edge between 65% and 83% of the image height. Dark harbor water forms the nearest uninterrupted layer across the bottom fifth and a broad inlet at the left, carrying elongated white and muted gold reflections below the quay lights. The principal roof cluster sits left of center, with tall pointed curved shells rising behind lower fanlike shells; a separate smaller pair of white shells appears on the right end of the building, separated from the taller group by a low section. Warm golden glazing fills several triangular openings beneath the roofs, and narrow illuminated window bands cross the darker stepped base. Behind the waterfront structure, a dark belt of trees stretches across the image, followed by a dense distant skyline of modest rectangular buildings dotted with yellow and white windows. One slender taller illuminated tower rises in the upper right around 85% of the image width. The dark blue-gray sky occupies approximately the upper third, with open space above the roof tips and skyline. A bright starburst lamp glows just right of the main shells, and small promenade lights trace the quay and the landscaped shore at right. Retain detailed roof edges against the night, softly streaked water reflections, roomy dark water in front, and the complete environmental width of the harbor setting."
    },
    {
      "id": "s25",
      "category": "交通工具",
      "title": "铜红色老式汽车",
      "source": {
        "page": "https://commons.wikimedia.org/wiki/File:Chevy_Bel_Air_in_the_Presidio_of_San_Francisco.jpg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Chevy_Bel_Air_in_the_Presidio_of_San_Francisco.jpg/1280px-Chevy_Bel_Air_in_the_Presidio_of_San_Francisco.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
        "author": "Frank Schulenburg",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
        "width": 1280,
        "height": 951,
        "sha256": "b1e4cb5e9ae98df91275fdec6f0434ce83841d772a8475915146208a54b50489"
      },
      "caption": {
        "file": "prompt.txt",
        "sha256": "2102be23682fe531727a8c8d46ce30675fd844f49aee0543269fb4ff0995a498",
        "model": "openai-codex/gpt-6-astra"
      },
      "generation": {
        "file": "generated.webp",
        "model": "GPT Image 2",
        "requestedModel": "openai-codex/gpt-image-2",
        "reportedModel": "gpt-image-2-codex",
        "quality": "medium",
        "width": 1448,
        "height": 1086,
        "sha256": "05506cfde7e2b5c1433ac176f862c5bcb8602c25438ca41de19077ed1004135a",
        "referenceImage": false,
        "seed": null,
        "license": "CC-BY-SA-4.0"
      },
      "checks": [
        {
          "id": "s25-1",
          "description": "车辆数量和朝向",
          "expected": "一辆主车位于中下部，前端朝左且略面向观者，右端为车尾",
          "tolerance": null
        },
        {
          "id": "s25-2",
          "description": "主体包围盒和画面占比（AI视觉粗估，坐标为距左/上边的百分比；面积为bbox面积，非分割面积）",
          "expected": {
            "subject": "完整主车（含轮胎，不含地面影子）",
            "bboxPercent": [
              12,
              41,
              96,
              97
            ],
            "bboxAreaPercent": 47.0
          },
          "tolerance": {
            "bboxEdgesPercentagePoints": 5,
            "bboxAreaPercentagePoints": 5
          }
        },
        {
          "id": "s25-3",
          "description": "前后遮挡关系",
          "expected": "车身遮挡后方灌木下部；白房和棕榈树在车后；可见近侧前后两轮，远侧轮不要求出现",
          "tolerance": null
        },
        {
          "id": "s25-4",
          "description": "车辆结构颜色",
          "expected": "铜红色车身、白色车顶与白壁轮胎，前保险杠及长侧饰条呈银色金属，车尾有上扬尾鳍",
          "tolerance": null
        }
      ],
      "review": {
        "captionChecks": [
          {
            "id": "s25-1",
            "status": "supported",
            "evidence": "'a ... sedan'、'three-quarter view'、'nose pointing toward the lower left'、'tail receding toward the right'，车在42%–97%高。",
            "reason": "数量、中下位置和左前右后的三分之四朝向均明确。"
          },
          {
            "id": "s25-2",
            "status": "supported",
            "evidence": "'entire car' 明确横向12%–96%、纵向42%–97%，不裁保险杠或车轮。",
            "reason": "边界最大差1个百分点，文字bbox面积46.2%，与冻结47.0%相差0.8个百分点；均满足容差。",
            "observedBBox": [
              0.12,
              0.42,
              0.96,
              0.97
            ],
            "observedBBoxAreaPercent": 46.2,
            "measurementBasis": "caption_explicit_extents"
          },
          {
            "id": "s25-3",
            "status": "supported",
            "evidence": "'Behind the car, a dense green hedge'、'white house'、'palm fronds ... center background'；分别描述可见前轮和较小后轮。",
            "reason": "明确灌木、房屋与棕榈位于车后，近侧前后轮可见；前车后篱的叠置与源图一致。"
          },
          {
            "id": "s25-4",
            "status": "supported",
            "evidence": "'copper-red'、'gray-white roof'、'broad white sidewalls'、'bumper ... bright silver'、'horizontal silver strip'、'prominent rear fin'。",
            "reason": "冻结的车身、车顶、白壁胎、金属保险杠和饰条及尾鳍均有明确支持。"
          }
        ],
        "generationChecks": [
          {
            "id": "s25-1",
            "status": "pass",
            "evidence": "一辆铜红主车位于中下部，车头向左并露正面，车尾在右。",
            "reason": "车辆数量和朝向满足全部冻结条件。"
          },
          {
            "id": "s25-2",
            "status": "fail",
            "evidence": "完整车辆可见外缘粗估横向3%–98%、纵向39%–89%，不含投影。",
            "reason": "左边比冻结12%约偏9个百分点，下边比97%约上移8个百分点，均超过5个百分点；面积约48%虽接近47%，不能抵消边界失败。",
            "observedBBox": [
              0.03,
              0.39,
              0.98,
              0.89
            ],
            "observedBBoxAreaPercent": 48,
            "uncertainty": "边缘目测约±1个百分点；结论不依赖细小测量误差。"
          },
          {
            "id": "s25-3",
            "status": "pass",
            "evidence": "车身遮住灌木下部，白房和棕榈在后，两只近侧白壁车轮均可见。",
            "reason": "全部前后遮挡和轮子可见性条件满足。"
          },
          {
            "id": "s25-4",
            "status": "pass",
            "evidence": "铜红车身、白顶、白壁轮胎、银色前杠与长侧饰条、右尾上扬尾鳍均清楚可见。",
            "reason": "冻结结构颜色条件全部满足；双圆灯、格栅及饰条造型与原车不同，但这些具体款式不在此条冻结要求中。"
          }
        ],
        "conclusion": "文字四项有依据；生成保留车辆朝向、颜色与环境层次，但左侧留白和底边位置超容差，尺度检查失败，车灯与格栅等款式也明显改变。"
      },
      "provenance": {
        "sourceLicenseChecked": "2026-10-17",
        "sourceLicenseEvidence": "Author and licensing sections independently reread on the linked Wikimedia Commons file page.",
        "sourceModification": "Wikimedia proportional thumbnail of the linked source version; no project cropping, retouching or re-encoding. Downloaded image bytes preserved.",
        "sourceConditions": "The linked source license applies; attribution retained. No endorsement or clearance of non-copyright rights is implied.",
        "reviewLimitations": "AI visual estimates and model review against four preselected checks, not human annotations, segmentation measurements or an overall accuracy benchmark.",
        "generationRights": "For generated images, only rights this project can license are offered under CC BY-SA 4.0; corresponding source credit and conditions remain. No guarantee of copyright subsistence, exclusivity or third-party clearance.",
        "requiredCredit": "© Frank Schulenburg / CC BY-SA 4.0"
      },
      "captionText": "A broad outdoor three-quarter view shows a copper-red four-door vintage sedan parked on dark asphalt, its nose pointing toward the lower left and its long passenger compartment and tail receding toward the right. The entire car occupies approximately 12% to 96% of the frame width and 42% to 97% of the height, leaving narrow road margins below and at the right rather than cropping its bumpers or wheels. Its pale gray-white roof arches across the middle right, from around 44% to 83% of the frame width, above dark windows with bright trim. The large front wheel sits near the lower center and the smaller rear wheel near the right edge; both have broad white sidewalls and reflective circular hubcaps. The front grille, bumper, and rounded headlamp surrounds are bright silver, with twin small raised ornaments on the long glossy hood. A horizontal silver strip runs along the doors into a wider pale ribbed panel below the prominent rear fin. Small badges and the front plate remain indistinct. Behind the car, a dense green hedge spans the picture and rises toward the left, separating the road from a raised white house in the upper left. The house occupies roughly the left two-fifths and upper half, with steep reddish roofs, a brick chimney, white siding, tall windows, and a shaded front porch. Tall spreading palm fronds overlap the house and fill the center background; a dark evergreen mass stands farther right, with a low white red-roofed building beyond. Blue sky opens across the upper right. Strong sunlight creates crisp highlights and a dark shadow under the car. Preserve the full vehicle, its dominant but contextual scale, and the visible house, palms, hedge, and road margins."
    },
    {
      "id": "s26",
      "category": "交通工具",
      "title": "蓝色载人三轮车",
      "source": {
        "page": "https://commons.wikimedia.org/wiki/File:Three_wheeler_in_Pingyao.jpg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Three_wheeler_in_Pingyao.jpg/1280px-Three_wheeler_in_Pingyao.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
        "author": "Luo Shaoyang",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
        "width": 1280,
        "height": 856,
        "sha256": "cd0043c08a34abc9371bc4df443155ee5efa1374610e5ad1d01b5e72017fa590"
      },
      "caption": {
        "file": "prompt.txt",
        "sha256": "1317705a38ba1e368b00eaf40a88db630b95ae18ca1e8d5de7f182080ad1c5f2",
        "model": "openai-codex/gpt-6-astra"
      },
      "generation": {
        "file": "generated.webp",
        "model": "GPT Image 2",
        "requestedModel": "openai-codex/gpt-image-2",
        "reportedModel": "gpt-image-2-codex",
        "quality": "high",
        "width": 1536,
        "height": 1024,
        "sha256": "b46711aa5c9907a3a1ef897c46b4a01fdcd99f5550659d0124d52425002ccd87",
        "referenceImage": false,
        "seed": null,
        "license": "CC-BY-SA-4.0",
        "batch": "completion-2026-10-17",
        "attempts": 1,
        "promptSha256": "1317705a38ba1e368b00eaf40a88db630b95ae18ca1e8d5de7f182080ad1c5f2",
        "requestedAspectRatio": "3:2"
      },
      "checks": [
        {
          "id": "s26-1",
          "description": "主体数量与位置",
          "expected": "一辆蓝色三轮货车正面居中驶来，单前轮位于车头正下方；车后载有一群人，不考核人群精确总数",
          "tolerance": null
        },
        {
          "id": "s26-2",
          "description": "主体包围盒和画面占比（AI视觉粗估，坐标为距左/上边的百分比；面积为bbox面积，非分割面积）",
          "expected": {
            "subject": "车辆本体，含镜子和轮子但不含乘客",
            "bboxPercent": [
              34,
              50,
              66,
              98
            ],
            "bboxAreaPercent": 15.4
          },
          "tolerance": {
            "bboxEdgesPercentagePoints": 5,
            "bboxAreaPercentagePoints": 5
          }
        },
        {
          "id": "s26-3",
          "description": "前后遮挡关系",
          "expected": "乘客的上身从驾驶室上方露出，下身被蓝色车厢和驾驶室挡住；车辆位于深色门洞之前",
          "tolerance": null
        },
        {
          "id": "s26-4",
          "description": "车辆关键结构颜色",
          "expected": "蓝色短驾驶室，大块近矩形挡风玻璃，两侧矩形灯组；一只中央前轮以及两侧后轮可见",
          "tolerance": null
        }
      ],
      "review": {
        "captionChecks": [
          {
            "id": "s26-1",
            "status": "supported",
            "evidence": "'frontal ... bright blue three-wheeled open-bed truck'、'single central front wheel'、'cargo-bed passengers rise above the cab'，整体横向33%–66%。",
            "reason": "蓝色三轮车正面居中、中央单前轮及后载人群均明确；不据文字判真实运动状态。"
          },
          {
            "id": "s26-2",
            "status": "partial",
            "evidence": "33%–66%、38%–98%明确给的是 'truck and its passengers'；驾驶室仅说 'begins around the middle'。",
            "reason": "不能把含乘客整体bbox当成排除乘客、包括后视镜与轮子的车辆本体bbox；车体起点和镜子范围没有完整单列。",
            "observedBBox": null,
            "observedBBoxAreaPercent": null,
            "measurementBasis": "caption_target_bbox_not_fully_specified",
            "partialExtent": {
              "truckAndPassengersBBox": [
                0.33,
                0.38,
                0.66,
                0.98
              ],
              "truckAndPassengersBBoxAreaPercent": 19.8
            }
          },
          {
            "id": "s26-3",
            "status": "partial",
            "evidence": "'passengers rise above the cab'、'partly obscured passenger'、车在 'large dark ornamental gateway' 下，街道在后。",
            "reason": "驾驶室上方人群和门洞背景支持，但没有明确群体下身被蓝色车厢和驾驶室挡住的关系；仅个别人部分遮挡不足覆盖该子条件。"
          },
          {
            "id": "s26-4",
            "status": "partial",
            "evidence": "蓝色驾驶室、'broad windshield'、'silver rectangular headlamps' 与 'single central front wheel'。",
            "reason": "没有明确挡风玻璃的近矩形形状，也未交代两侧后轮可见；三轮车类别不能代替两后轮的可见性描述。"
          }
        ],
        "generationChecks": [
          {
            "id": "s26-1",
            "status": "pass",
            "evidence": "画面中央略偏右是一辆迎面蓝色三轮货车，车头下方有单个中央前轮，后车厢载有一群上半身露出的乘客。",
            "reason": "单车、蓝色、正面朝向、中央前轮及后载人群均保留；静态画面只能支持迎面驶来的视觉姿态，不能证明实际运动。"
          },
          {
            "id": "s26-2",
            "status": "uncertain",
            "evidence": "包含车厢栏杆、后视镜和轮子，不含乘客，AI视觉估计车辆bbox约为[37,45,71,95]%，面积约17.0%；冻结值为[34,50,66,98]%，边界容差±5个百分点。",
            "reason": "面积和左、下边缘大致在容差内，但上缘和右缘恰接近容差界限；栏杆与乘客遮挡处的边界难以凭粗估精确确定，不能把约数舍入为全条件通过。",
            "observedBBox": [
              0.37,
              0.45,
              0.71,
              0.95
            ],
            "observedBBoxAreaPercent": 17.0,
            "measurementBasis": "AI visual estimate from displayed image; threshold-adjacent edges are uncertain, not segmentation measurements"
          },
          {
            "id": "s26-3",
            "status": "pass",
            "evidence": "后车厢乘客上身露在驾驶室上方，下身被蓝色车厢和驾驶室挡住；车辆在深色装饰门洞的前方，远街通过门洞向后延伸。",
            "reason": "指定的人车遮挡和车在门洞之前两层关系均可见。"
          },
          {
            "id": "s26-4",
            "status": "pass",
            "evidence": "蓝色短驾驶室有大块近矩形挡风玻璃和左右矩形灯组；中央前轮完整露出，左右后轮均能在车身两侧下方看到。",
            "reason": "全部冻结结构条件成立，但车头格栅、灯具造型和车厢栏杆并非原图款式。"
          }
        ],
        "conclusion": "实际生成保留正面蓝色三轮车、中央前轮、两侧后轮和车后人群遮挡，但车辆略向右移，车辆边界接近容差上限，不能凭粗估判定占比通过；乘客、车头款式、门楼及街景明显重构。四项为3通过、0不通过、1不确定，不是整图相似度。",
        "provenance": {
          "reviewerType": "AI visual review",
          "reviewerModel": "openai-codex/gpt-6-astra",
          "date": "2026-10-17",
          "inputsViewed": [
            "source.jpg",
            "generated.webp"
          ],
          "method": "Direct visual comparison against the four unchanged preselected checks; not human review or an independent blinded benchmark. Bounding boxes are approximate AI visual estimates."
        }
      },
      "provenance": {
        "sourceLicenseChecked": "2026-10-17",
        "sourceLicenseEvidence": "Author and licensing sections independently reread on the linked Wikimedia Commons file page.",
        "sourceModification": "Wikimedia proportional thumbnail of the linked source version; no project cropping, retouching or re-encoding. Downloaded image bytes preserved.",
        "sourceConditions": "The linked source license applies; attribution retained. No endorsement or clearance of non-copyright rights is implied.",
        "reviewLimitations": "AI visual estimates and model review against four preselected checks, not human annotations, segmentation measurements or an overall accuracy benchmark.",
        "generationRights": "For generated images, only rights this project can license are offered under CC BY-SA 4.0; corresponding source credit and conditions remain. No guarantee of copyright subsistence, exclusivity or third-party clearance."
      },
      "captionText": "A frontal street view places a small bright blue three-wheeled open-bed truck beneath a large dark ornamental gateway, with a narrow old street receding through the opening behind it. The truck and its passengers occupy approximately 33% to 66% of the frame width and 38% to 98% of its height. The blue cab begins around the middle of the frame, its broad windshield above silver rectangular headlamps, a small green plate, and a single central front wheel visible almost to the bottom edge. The cargo-bed passengers rise above the cab in a closely packed group of about nine visible people, mostly wearing pale gray, cream, or white tops. A man in a light shirt stands centrally at the front of the group, with another man gripping the left side and a partly obscured passenger holding the right side. Several people look toward the viewer. A cylindrical blue-and-red printed container sits above the cab at viewer-left, a rounded straw-colored hat is held near the middle, and a pale wide-brimmed hat rests toward the right. The nearest architectural frame consists of heavy brick piers near the left and right thirds, dark vertical plaques with gold calligraphic marks, and a carved horizontal lintel cropped by the top edge. Its opening reveals pale sky and rows of weathered gray tiled buildings receding diagonally toward the left distance, with tiny distant vehicles and pedestrians. A red lantern hangs under the cropped roof on the far right. Gray paving spans the bottom, with raised curbs at both sides. Use subdued diffuse daylight, a shadowed gateway, clear detail on the truck and faces, and softer distant architecture. Preserve the complete front wheel, the surrounding gateway, and the substantial street depth rather than isolating the passengers."
    },
    {
      "id": "s27",
      "category": "绘画插画",
      "title": "海浪与木筏绘画",
      "source": {
        "page": "https://commons.wikimedia.org/wiki/File:Aivazovsky,_Ivan_-_The_Ninth_Wave.jpg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Aivazovsky%2C_Ivan_-_The_Ninth_Wave.jpg/1280px-Aivazovsky%2C_Ivan_-_The_Ninth_Wave.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
        "author": "Ivan Aivazovsky",
        "license": "Public domain; PD-Art / author died 1900, life+100 or fewer; US pre-1931",
        "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
        "width": 1280,
        "height": 845,
        "sha256": "4050764e79cd0f36fbc3188ec759036debbd32afca97327cd77239814a069c97"
      },
      "caption": {
        "file": "prompt.txt",
        "sha256": "a01571a34ea38785e45f9753f9a1b684c461bd56868f30bbfdf2e23dced0438c",
        "model": "openai-codex/gpt-6-astra"
      },
      "generation": {
        "file": "generated.webp",
        "model": "GPT Image 2",
        "requestedModel": "openai-codex/gpt-image-2",
        "reportedModel": "gpt-image-2-codex",
        "quality": "medium",
        "width": 1536,
        "height": 1024,
        "sha256": "63d4a14c52ca729982e1a2f089d9a07f2d74cf1889d107435864f9de721a6df0",
        "referenceImage": false,
        "seed": null,
        "license": "CC-BY-SA-4.0"
      },
      "checks": [
        {
          "id": "s27-1",
          "description": "有限主体位置",
          "expected": "仅考核下部偏左一组抓住木质残骸的人物，整体很小；一人向上举着红色布状物；不要求精确数清重叠人群",
          "tolerance": null
        },
        {
          "id": "s27-2",
          "description": "主体包围盒和画面占比（AI视觉粗估，坐标为距左/上边的百分比；面积为bbox面积，非分割面积）",
          "expected": {
            "subject": "人群与木质残骸（画框内可见部分）",
            "bboxPercent": [
              23,
              77,
              55,
              100
            ],
            "bboxAreaPercent": 7.4
          },
          "tolerance": {
            "bboxEdgesPercentagePoints": 3,
            "bboxAreaPercentagePoints": 3
          }
        },
        {
          "id": "s27-3",
          "description": "前后层次与遮挡",
          "expected": "人物骑伏在前景木质残骸上，残骸下部被浪和下画框截断；较高绿色浪峰在人物后方，亮天空更远",
          "tolerance": null
        },
        {
          "id": "s27-4",
          "description": "可见绘画媒介和颜色",
          "expected": "明显为绘画：云层为柔化叠涂色块、浪花为细碎笔触，表面带均匀画布/颜料质感而非照片；橙红云层包围中央偏右亮黄色天空，海浪深绿",
          "tolerance": null
        }
      ],
      "review": {
        "captionChecks": [
          {
            "id": "s27-1",
            "status": "supported",
            "evidence": "'small cluster ... clinging to a low wooden raft near the bottom center-left'；一人 'raises an arm holding a small red scrap'。",
            "reason": "小人物群在下部偏左、抓附木质支撑及举红布全部明确。"
          },
          {
            "id": "s27-2",
            "status": "supported",
            "evidence": "木筏bbox为23%–55%、84%–100%；人群为38%–48%、78%–91%。",
            "reason": "二者并集为23%–55%、78%–100%，面积约7.0%，各边和面积均满足冻结±3个百分点。",
            "observedBBox": [
              0.23,
              0.78,
              0.55,
              1.0
            ],
            "observedBBoxAreaPercent": 7.0,
            "measurementBasis": "union_of_caption_explicit_extents"
          },
          {
            "id": "s27-3",
            "status": "supported",
            "evidence": "人群抓附木筏；'closest timbers cut by the bottom crop'、'partly submerged'；大浪在画面中层，'distant glowing center' 在后。",
            "reason": "人物与木筏关系、浪水和底框截断，以及高浪在后、亮天空更远的层次均明确。"
          },
          {
            "id": "s27-4",
            "status": "partial",
            "evidence": "'painted seascape'、'visibly painted, softly blended clouds with more finely worked water and spray'、橙红云围亮黄开口和深绿海浪。",
            "reason": "绘画、云水处理与颜色有依据，但没有明确全图均匀画布/颜料质感；不能把绘画标签等同于完整媒介质感子条件。"
          }
        ],
        "generationChecks": [
          {
            "id": "s27-1",
            "status": "fail",
            "evidence": "下部偏左人物仍抓伏木筏，一人举红布；但人物与木筏显著放大，形成突出的近景主体。",
            "reason": "位置和动作通过，原图人物整体很小这一子条件未保留，不能按部分满足判通过。"
          },
          {
            "id": "s27-2",
            "status": "fail",
            "evidence": "人群加木筏可见轮廓粗估横向14%–60%、纵向70%–100%。",
            "reason": "左边约偏9个百分点、顶边约偏7个百分点、右边约偏5个百分点，超过冻结3个百分点；bbox面积约14%也超过7.4%±3个百分点。",
            "observedBBox": [
              0.14,
              0.7,
              0.6,
              1.0
            ],
            "observedBBoxAreaPercent": 14,
            "uncertainty": "木材与飞沫交界难分，边界约±2个百分点；即使取保守边界仍不能全部满足冻结容差。"
          },
          {
            "id": "s27-3",
            "status": "pass",
            "evidence": "人物骑伏在近景木筏，木筏被浪与底框截断；大绿色浪峰在其后，更远是黄色亮天空。",
            "reason": "全部指定的前后关系和截断保留；尺寸变化由独立几何检查判失败。"
          },
          {
            "id": "s27-4",
            "status": "fail",
            "evidence": "橙红云、偏右亮黄天空和深绿浪仍在；但云层硬而高细节、泡沫和光照接近高反差数字拟真效果，缺少原图均匀画布/颜料表面和柔化叠涂色块感。",
            "reason": "颜色通过不能抵消媒介外观失败；判断针对可见质感，不推测实际制作媒介。"
          }
        ],
        "conclusion": "文字大部分布局信息被保留，但未充分约束均匀绘画表面；生成图保留举红布与海天层次，却明显放大人物木筏，并转向高细节数字拟真质感，主体尺度与媒介检查失败。"
      },
      "provenance": {
        "sourceLicenseChecked": "2026-10-17",
        "sourceLicenseEvidence": "Author and licensing sections independently reread on the linked Wikimedia Commons file page.",
        "sourceModification": "Wikimedia proportional thumbnail of the linked source version; no project cropping, retouching or re-encoding. Downloaded image bytes preserved.",
        "sourceConditions": "Commons marks the artwork public domain: artist died in 1900; life plus 100 years or fewer, and US publication before 1931. Commons considers the faithful 2D reproduction public domain in the US; reuse may be restricted in other jurisdictions. See https://commons.wikimedia.org/wiki/Commons:Reuse_of_PD-Art_photographs .",
        "reviewLimitations": "AI visual estimates and model review against four preselected checks, not human annotations, segmentation measurements or an overall accuracy benchmark.",
        "generationRights": "For generated images, only rights this project can license are offered under CC BY-SA 4.0; corresponding source credit and conditions remain. No guarantee of copyright subsistence, exclusivity or third-party clearance."
      },
      "captionText": "A wide painted seascape shows towering dark green waves beneath an immense orange-red sky, with a small cluster of people clinging to a low wooden raft near the bottom center-left. The sky occupies roughly the upper three-fifths, its brilliant yellow opening concentrated between about 45% and 74% of the frame width and 20% to 60% of its height, surrounded by billowing orange clouds and darker gray-brown upper corners. The sea fills the lower half in overlapping bands, with a large curling wave left of center rising to about halfway up the picture, a more distant crest on the right, and dark near-water rolling across the bottom edge. The raft spans approximately 23% to 55% of the frame width and 84% to 100% of its height, with its closest timbers cut by the bottom crop. Its small human group occupies only around 38% to 48% of the width and 78% to 91% of the height, remaining much smaller than the surrounding waves. Several huddled figures overlap one another; one raises an arm holding a small red scrap above the group, while pale clothing catches the light on a figure at the left. Long rough cylindrical beams, crosspieces, and thin trailing ropes describe the low floating support, partly submerged and streaked with spray. Yellow and lime-green reflected light forms a broken diagonal path from the distant glowing center toward the lower right of the raft. Foamy crests catch orange and pale highlights against near-black troughs. Use visibly painted, softly blended clouds with more finely worked water and spray, preserving the dramatic light contrast. Keep the people tiny within the expansive stormy sea and retain the cropped near end of the raft."
    },
    {
      "id": "s28",
      "category": "绘画插画",
      "title": "几何静物绘画",
      "source": {
        "page": "https://commons.wikimedia.org/wiki/File:Fernand_Léger_Still_Life_with_Candlestick_1922.jpg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Fernand_L%C3%A9ger_Still_Life_with_Candlestick_1922.jpg/960px-Fernand_L%C3%A9ger_Still_Life_with_Candlestick_1922.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
        "author": "Fernand Léger",
        "license": "Public domain; PD-Art / author died 1955, life+70 or fewer; US pre-1931",
        "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
        "width": 960,
        "height": 1386,
        "sha256": "493c285f1ecafa6806c731b413894b40772c3e39adba2cf29ff7aff5beb658c3"
      },
      "caption": {
        "file": "prompt.txt",
        "sha256": "531c8d46a5cc5231be91ed593d1c7d7dcb71882a9fb4abc57369ebcf08e9920a",
        "model": "openai-codex/gpt-6-astra"
      },
      "generation": {
        "file": "generated.webp",
        "model": "GPT Image 2",
        "requestedModel": "openai-codex/gpt-image-2",
        "reportedModel": "gpt-image-2-codex",
        "quality": "medium",
        "width": 1024,
        "height": 1536,
        "sha256": "75fd5f6053220d69122a65dddf943e2778ffa1336668bbfdb68574837aa620f6",
        "referenceImage": false,
        "seed": null,
        "license": "CC-BY-SA-4.0",
        "batch": "completion-2026-10-17",
        "attempts": 1,
        "promptSha256": "531c8d46a5cc5231be91ed593d1c7d7dcb71882a9fb4abc57369ebcf08e9920a",
        "requestedAspectRatio": "2:3"
      },
      "checks": [
        {
          "id": "s28-1",
          "description": "有限对象计数与位置",
          "expected": "只考核右下方一只灰白烛台及其圆形底盘；上半部有一块黑色波纹条带的黄色近圆形",
          "tolerance": null
        },
        {
          "id": "s28-2",
          "description": "主体包围盒和画面占比（AI视觉粗估，坐标为距左/上边的百分比；面积为bbox面积，非分割面积）",
          "expected": {
            "subject": "右下灰白烛台（含底盘和右侧环形把手）",
            "bboxPercent": [
              63,
              53,
              89,
              75
            ],
            "bboxAreaPercent": 5.7
          },
          "tolerance": {
            "bboxEdgesPercentagePoints": 2,
            "bboxAreaPercentagePoints": 2
          }
        },
        {
          "id": "s28-3",
          "description": "平面叠压关系",
          "expected": "上部黄色波纹圆形右缘被深色竖条遮住；左下碗勺与中部蓝白几何块互相叠压，烛台底盘位于桌面之上",
          "tolerance": null
        },
        {
          "id": "s28-4",
          "description": "绘画媒介和关键颜色",
          "expected": "非摄影静物：大面积黄、橙、黑、白、蓝平涂几何色块，边缘硬朗；灰色烛台以手绘明暗渐变塑形，背景为矩形条带而非真实房间",
          "tolerance": null
        }
      ],
      "review": {
        "captionChecks": [
          {
            "id": "s28-1",
            "status": "supported",
            "evidence": "右下单个 'slender gray turned vessel ... pale handled circular base'；上部 'yellow oval ... thick wavy black stripes'。",
            "reason": "虽然用中性的vessel而非candlestick称呼，仍明确描述了冻结对象的灰色车削状身形、浅圆底盘、单个右下位置及上部黄黑波纹形。"
          },
          {
            "id": "s28-2",
            "status": "supported",
            "evidence": "右下器物及带把圆底明确给63%–88%、53%–75%。",
            "reason": "与冻结bbox仅右边相差1个百分点，面积5.5%，与5.7%相差0.2个百分点，边界和面积均在±2个百分点内。",
            "observedBBox": [
              0.63,
              0.53,
              0.88,
              0.75
            ],
            "observedBBoxAreaPercent": 5.5,
            "measurementBasis": "caption_explicit_extents"
          },
          {
            "id": "s28-3",
            "status": "partial",
            "evidence": "'overlapping vessels and utensils'、桌面 'partly hidden' 于蓝白黄块；'broad dark vertical bar divides the right side'；右下器物列在桌面对象中。",
            "reason": "没有明确黄色波纹圆形右缘被深色竖条遮挡，也未具体说明左下碗勺与蓝白块的互相叠压；一般性overlapping不能覆盖这些定向关系。"
          },
          {
            "id": "s28-4",
            "status": "supported",
            "evidence": "'geometric painting'，黄橙黑白蓝等平面、'Flattened overlapping planes replace consistent natural perspective'、器皿 'restrained gray shading'、背景 'interlocking ... planes'，末句禁止添加房间。",
            "reason": "几何平面绘画而非摄影、关键色组、器物灰色明暗塑形和非真实房间背景均明确；几何块与矩形竖条支持硬朗分界。"
          }
        ],
        "generationChecks": [
          {
            "id": "s28-1",
            "status": "fail",
            "evidence": "上半部保留一块黄底黑色波纹的近圆形；右下虽有单个灰白器物和带把圆底盘，器身却变为高大、收腰、上口外张的瓶状物。",
            "reason": "只保留灰白颜色、右下位置和底盘不足以满足烛台对象条件；原图短小、带多层环节的烛台轮廓未保留。"
          },
          {
            "id": "s28-2",
            "status": "fail",
            "evidence": "把右下替代器物连同底盘、右侧环把整体计入，AI视觉估计bbox约为[61,38,99,81]%，面积约16.3%；原图冻结烛台bbox为[63,53,89,75]%，面积5.7%。",
            "reason": "替代器物明显放大并向上延伸，顶部约差15、右缘约差10、下缘约差6个百分点，面积约差10.6个百分点，均有远超±2容差的偏差。",
            "observedBBox": [
              0.61,
              0.38,
              0.99,
              0.81
            ],
            "observedBBoxAreaPercent": 16.3,
            "measurementBasis": "AI visual estimate of the corresponding replacement vessel, including base and handle; not segmentation or calibrated measurement"
          },
          {
            "id": "s28-3",
            "status": "fail",
            "evidence": "黄色波纹形呈完整弧形右边缘，伸入深色竖条区域而不是由该条切断；左下带勺杯碗位于蓝白块前方，不再呈原图那种被蓝白块切入的交错叠压。右下底盘仍置于桌面上。",
            "reason": "桌面承托关系保留，但黄色形与竖条的遮挡方向改变，碗勺与中部色块的交错关系未完整复现，不能以部分满足计通过。"
          },
          {
            "id": "s28-4",
            "status": "fail",
            "evidence": "生成图仍是黄、橙、黑、白、蓝硬边几何静物绘画，背景为抽象条带而非真实房间；右下器物却用大块黑白灰多边形切面塑形，原图柔和连续的灰色明暗渐变消失。",
            "reason": "非摄影媒介、色组和抽象背景保留，但指定的手绘渐变塑形子条件未满足。"
          }
        ],
        "conclusion": "实际生成保留黄黑波纹形和几何静物色组，却将右下小烛台改成高大的瓶状器物，圆桌、杯勺与中央色块也重排；黄色形的遮挡方向改变，灰色连续明暗变成硬边切面。四项完整条件均不通过，并非没有保留任何视觉元素。",
        "provenance": {
          "reviewerType": "AI visual review",
          "reviewerModel": "openai-codex/gpt-6-astra",
          "date": "2026-10-17",
          "inputsViewed": [
            "source.jpg",
            "generated.webp"
          ],
          "method": "Direct visual comparison against the four unchanged preselected checks; not human review or an independent blinded benchmark. Bounding boxes are approximate AI visual estimates."
        }
      },
      "provenance": {
        "sourceLicenseChecked": "2026-10-17",
        "sourceLicenseEvidence": "Author and licensing sections independently reread on the linked Wikimedia Commons file page.",
        "sourceModification": "Wikimedia proportional thumbnail of the linked source version; no project cropping, retouching or re-encoding. Downloaded image bytes preserved.",
        "sourceConditions": "Commons marks the artwork public domain: artist died in 1955; life plus 70 years or fewer, and US publication before 1931. This is not a worldwide public-domain assertion. Commons considers the faithful 2D reproduction public domain in the US; reuse may be restricted in other jurisdictions. See https://commons.wikimedia.org/wiki/Commons:Reuse_of_PD-Art_photographs .",
        "reviewLimitations": "AI visual estimates and model review against four preselected checks, not human annotations, segmentation measurements or an overall accuracy benchmark.",
        "generationRights": "For generated images, only rights this project can license are offered under CC BY-SA 4.0; corresponding source credit and conditions remain. No guarantee of copyright subsistence, exclusivity or third-party clearance."
      },
      "captionText": "A tightly framed vertical geometric painting assembles a small curved table, overlapping vessels and utensils, an orange chair-back shape, and a large yellow striped oval against interlocking black, white, gray, and colored planes. The table silhouette fills roughly the lower three-fifths of the frame width from 10% to 85%, with its pale curved top visible around 67% to 84% of the image height and its yellow, gray, and red support forms continuing beyond the bottom crop. The tabletop is partly hidden by a large overlapping dark blue, white, and yellow angular block spanning about 29% to 63% of the width and 47% to 75% of the height. At lower left, a red-and-white cup with a pale curved handle and diagonal spoon occupies about 17% to 36% of the width. At lower right, a slender gray turned vessel stands on a pale handled circular base, together spanning about 63% to 88% of the width and 53% to 75% of the height. A gray fork lies diagonally across the exposed table near the bottom center. Behind these forms, a tall orange rectangle with dark cutout-like vertical motifs rises at left, while the yellow oval above it extends from around 22% to 66% of the width and 11% to 38% of the height, crossed by thick wavy black stripes. A broad dark vertical bar divides the right side; beyond it are green rounded forms, a blue upper panel, and a huge reddish curved shape cropped by the right edge. Flattened overlapping planes replace consistent natural perspective, with restrained gray shading on the utensils and vessels and fine painted surface texture. Preserve the crowded edge-to-edge arrangement, partial occlusions, and cropped table supports without adding surrounding room."
    }
  ]
};
