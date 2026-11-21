# Cairn

*语言切换： [English](README.md) | **中文***

![Cairn —— 浅色与深色模式斜向拼接](media/hero.png)

一个 Obsidian 的牛皮纸档案主题——让你的知识库看起来像摆在暖色书桌上的一张张实体文件。

暖色的纸张中性色、棕色墨水、单一的赭红色强调色，配上干净的无衬线字体。圆角小而带档案感，
阴影是暖棕色而不是冷灰色，表面带着一层淡淡的 CSS 纸张纹理。全篇没有纯白、没有纯黑，
也没有任何冷灰色。

## 截图

五色标注（callout）系统与独立圆章图标：

![Cairn 的标注系统 —— 五种类别色映射到 Obsidian 的 callout 类型](media/callouts.png)

Obsidian **Bases（数据库）** 账本表格与内嵌白板点阵预览：

![Cairn 数据库与内嵌白板 —— 三阶暖牛皮纸账本表与点阵缩略预览](media/bases.png)

**Canvas（白板）** 暖纸点阵底板、五色轻染色卡片与相纸胶带图片装裱：

![Cairn 白板 —— 暖纸点阵底板、五色卡片与和纸胶带图片框](media/canvas.png)

独立行号代码块与账本数据表格：

![Cairn 代码块与账本表格](media/components.png)

行内排版、手绘马克笔高亮、手写复选框与多级列表：

![Cairn 行内排版、手绘马克笔高亮与任务列表](media/typography.png)

Cairn 实现了 [Project Cairn](https://github.com/iBlinkQ/project-cairn) 设计语言。
它的五种类别色——砖红（元规则）、橄榄（时间线）、赭黄（知识）、灰褐（外部输入）、
青灰（过程物）——被映射到 Obsidian 的 callout 类型上，所以一个标注的配色方式，
和 Cairn 可视化里一张文件卡片的配色方式是一致的。

两侧边栏铺开温和的天然牛皮纸纤维肌理，搭配连续柔淡的铅笔油墨展开竖线、圆角墨水折叠箭头与暖羊皮旧纸签选中态。顶部属性区做成上下锯齿撕边、以蓝漆曲别针夹住的档案小票；引用块做成带折角的纸卡片；正文与白板图片统一采用暖米白相纸装裱与半透明和纸胶带；代码块自带独立行号栏，Obsidian **Bases（数据库）** 与 **Canvas（白板）** 也完整映射到同一套账本表格与暖纸点阵语言。

字号、行宽和间距沿用 Obsidian 自身的约定，而不是设计系统落地页上的数值：
正文 16px、测量宽度 42rem、行高 1.8，标题相对 em 缩放。较宽的字间距作为品牌标志
被保留下来，但只用在标签类文字上——状态栏、表格表头、属性键——这样中文正文
才能保持自己的节奏。

### 字体

Cairn 默认使用系统自带的无衬线字体栈：`-apple-system, "PingFang SC",
"Microsoft YaHei", "Noto Sans SC", sans-serif`。社区主题不能加载远程资源，
所以主题本身不会拉取任何网络字体——字体栈会按顺序落到你系统里实际有的无衬线字体上。

如果想换字体，去 **设置 → 外观 → 字体**（正文、界面、等宽分别设置）。Cairn 只是
填充 Obsidian 主题自带的字体位，所以你在那里的选择永远优先——标题和行内标题也会
跟着变。不需要装任何插件。

## 安装

**从 Obsidian 内安装**——设置 → 外观 → 主题 → 管理 → 搜索 `Cairn`。

**手动安装**——从[最新的 release](../../releases/latest) 里下载 `manifest.json`
和 `theme.css`，放进 `<vault>/.obsidian/themes/Cairn/`，然后在设置 → 外观里选中 Cairn。

## 自定义

Cairn 开箱即用，**不安装任何第三方插件也可以完整使用全部默认样式**。

如果想在不写 CSS 的情况下可视化微调颜色、纸张材质与各项开关，可以选装社区插件
[Style Settings](https://github.com/obsidian-community/obsidian-style-settings)：

- 强调色、笔记表面色、桌面表面色、墨水色和分隔线颜色（浅色/深色分别设置）
- 默认字体栈、行高、行宽
- 圆角大小
- 纸张材质——ruled（横线）/ dot grid（点阵）/ plain（空白），
  以及横线颜色、标题粗横线颜色和引用卡纸张颜色、纯色引用（去掉引用块卡片外观）、
  隐藏图片和纸胶带、内部链接加下划线、界面变暗

即使不安装 Style Settings，也可以直接通过 Obsidian 原生笔记属性 `cssclasses`
按单篇切换样式（支持 `cairn-stock-dots`、`cairn-stock-plain`、`cairn-no-image-tape`）。

## 开发

源码放在 `src/` 里，按编号拆成多个模块；仓库根目录的 `theme.css` 是拼接后的构建
产物，不要手动编辑它。

```bash
npm run build   # src/ -> theme.css
npm run sync    # 构建后复制到测试库
npm run dev     # 每次改动后自动重新构建并同步
npm run check   # 构建后按 Obsidian 主题规范做检查
```

`npm run check` 会在出现 `!important`、`@import`、`url()` 里的远程资源、
括号不配对、或者缺少浅色/深色任一区块时让构建失败——这些正是社区主题目录审核会
检查的项目。它还会读取 `src/02-color-light.css` 和 `src/03-color-dark.css` 里的
色板，如果某个文字颜色在它实际所处的背景上低于 WCAG AA 标准（4.5:1）对比度，
也会失败。有两个值被豁免，`contrast.mjs` 里写明了各自的原因。

深色模式是一个扩展，不是设计源头——Cairn 设计系统本身只提供浅色。深色色板全程
保留品牌的暖棕色倾向。

同步目标默认是 iCloud 下的 `TestVault`。可以用 `OBSIDIAN_THEME_DIR` 环境变量
指向别的位置：

```bash
OBSIDIAN_THEME_DIR="/path/to/vault/.obsidian/themes/Cairn" npm run dev
```

`theme.css` 一变化，Obsidian 会立刻重新加载。`manifest.json` 的改动需要重启应用。

### 发布新版本

```bash
npm version patch   # 同时更新 package.json、manifest.json 和 versions.json
git push --follow-tags
```

发布的 GitHub Actions 会构建主题，并把 `manifest.json` 和 `theme.css` 附到同版本号
的 GitHub release 上。

## 致谢

纸张纤维肌理、索引卡式标题粗横线、曲别针小票属性区、手绘马克笔高亮与油墨引导线等实体文具细节受 Kevin Ngo 的
[Looseleaf](https://github.com/kevintngo/looseleaf) 项目启发，并与
[Project Cairn](https://github.com/iBlinkQ/project-cairn) 设计语言结合实现。

## 许可

MIT
