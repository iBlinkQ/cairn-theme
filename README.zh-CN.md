# Cairn

*语言切换： [English](README.md) | **中文***

![Cairn —— 浅色与深色模式斜向拼接](media/hero.png)

一个面向 Obsidian 的**暖牛皮纸档案主题**——把你的知识库还原成摊开在书桌上的实体纸页与卡片。全篇采用暖色纸张、深棕墨水与赤陶强调色，无纯白、无纯黑、无冷灰，完整支持浅色与暗房深色模式。

> **轻量高性能**：所有纸张纤维、油墨引导线、小票锯齿、曲别针与和纸胶带均采用极轻纯矢量贴图与原生 CSS 实现——**零 `<feTurbulence>` 重滤镜、零远程资源加载、无任何脚本开销**，滚动长文档与切换多面板依然顺滑轻快。

## 设计特点

- **五色档案语义**：基于 [Project Cairn](https://github.com/iBlinkQ/project-cairn) 设计语言，将砖红（元规则）、橄榄（时序）、赭黄（知识）、灰褐（外部输入）、青灰（过程物）五类色槽统一映射到 14 种独立圆章图标的 Callout 与白板卡片。
- **实体文具质感**：上下锯齿小票 + 真实遮挡蓝漆曲别针属性区、折角引用便签、统一暖米白相纸框与和纸胶带、手绘马克笔高亮、独立行号代码块与三阶账本表格。
- **克制的侧边栏导航**：天然牛皮纸纤维底纹、暖羊皮旧纸签选中态、连续柔淡铅笔油墨展开竖线与 `13px` 圆角墨水折角。
- **原生插件深度适配**：Obsidian **Bases（数据库）** 账本视图、**Canvas（白板）** 暖纸点阵底板与五色卡片、内嵌笔记附页以及悬浮预览浮窗。
- **舒适的中文阅读排版**：正文 `16px`、行高 `1.8`、行宽 `42rem`，较宽字距仅用于标签与表头，保持中文正文自然节奏；全色板正文与标题通过 WCAG AA/AAA 对比度校验。

## 截图

五色标注（Callout）系统与独立圆章图标：

![Cairn 的标注系统 —— 五种类别色映射到 Obsidian 的 callout 类型](media/callouts.png)

Obsidian **Bases（数据库）** 账本表格与内嵌白板点阵预览：

![Cairn 数据库与内嵌白板 —— 三阶暖牛皮纸账本表与点阵缩略预览](media/bases.png)

**Canvas（白板）** 暖纸点阵底板、五色轻染色卡片与相纸胶带图片装裱：

![Cairn 白板 —— 暖纸点阵底板、五色卡片与和纸胶带图片框](media/canvas.png)

独立行号代码块与账本数据表格：

![Cairn 代码块与账本表格](media/components.png)

行内排版、手绘马克笔高亮、手写复选框与多级列表：

![Cairn 行内排版、手绘马克笔高亮与任务列表](media/typography.png)

## 安装

- **从 Obsidian 内安装**：设置 → 外观 → 主题 → 管理 → 搜索 `Cairn`。
- **手动安装**：从[最新 Release](../../releases/latest) 下载 `manifest.json` 和 `theme.css`，放入 `<vault>/.obsidian/themes/Cairn/`，在设置 → 外观中启用。

## 自定义

Cairn 开箱即用，**不安装任何第三方插件也可以完整使用全部默认样式**。

- **字体与字号**：直接前往 **设置 → 外观 → 字体 / 字体大小** 调整（主题仅填充默认系统无衬线字体栈，你的原生设置始终优先，无需插件）。
- **单篇样式覆写（无需插件）**：在笔记 Frontmatter 的 `cssclasses` 属性中填入以下类名即可单篇生效：
  - `cairn-stock-dots`（点阵纸） / `cairn-stock-plain`（空白纸）
  - `cairn-no-image-tape`（隐藏图片和纸胶带）
- **可视化全局微调（可选）**：安装社区插件 [Style Settings](https://github.com/obsidian-community/obsidian-style-settings) 后，可直接免代码调整：
  - 强调色、笔记表面色、桌面表面色、墨水色与分隔线颜色（浅色/深色分别配置）
  - 默认字体栈、行高、行宽与圆角大小
  - 纸张底纹（横线 / 点阵 / 空白）、横线与标题粗线颜色、引用卡片底色
  - 实用开关：纯色引用（去掉折角卡片）、隐藏图片和纸胶带、内部链接常驻下划线、未悬停时调暗边栏

## 致谢

纸张纤维肌理、索引卡式标题粗横线、曲别针小票属性区、手绘马克笔高亮与油墨引导线等实体文具细节受 Kevin Ngo 的 [Looseleaf](https://github.com/kevintngo/looseleaf) 项目启发，并与 [Project Cairn](https://github.com/iBlinkQ/project-cairn) 设计语言结合实现。

## 许可

MIT
