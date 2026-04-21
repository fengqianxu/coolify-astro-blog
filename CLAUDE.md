# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 硬性要求（User Non-Negotiables）

1. **写代码必须走规范。** 改完任何 `.ts/.astro/.mjs/.css` 之前，跑 `npm run format && npm run lint`，确保无报错再进下一步。ESLint / Prettier 配置在仓库根，不要本地覆盖。
2. **提交前必须过测试。** 任何 commit 之前必须跑 `npm run verify`（= `astro check && astro build`）全绿才能 `git add`。只跑 `dev` 不算验证；`verify` 覆盖类型、content schema、实际构建三层。
3. **文章文件一定要进提交。** `src/content/posts/*.md` 是站点核心数据，不在 `.gitignore` 里。写完文章后务必 `git status` 核对文件出现在 Untracked/Modified，再 `git add src/content/posts/<文件>.md`。

## 常用命令

```bash
# 开发（推荐走 dev.sh，内部会先激活 fnm 锁定 Node 版本）
./dev.sh                 # 等价于 fnm env && npm run dev

# 类型 & 内容校验（content collection schema 在这里生效）
npm run type-check       # = astro check

# 构建 + 提交前自检（硬性要求 #2 用的就是这个）
npm run verify           # = astro check && astro build
npm run build            # 仅构建，产物在 dist/
npm run preview          # 本地起静态服务看构建产物

# 代码风格
npm run lint             # ESLint flat config（.ts/.astro/.mjs/.cjs）
npm run format           # Prettier 写入
npm run format:check     # 只校验不写（CI 场景）

# 一次性：生成默认 OG 图（当前项目已提交一张 public/og-default.png，
# 除非要换设计，否则不需要重跑）
node scripts/gen-og-default.mjs
```

没有单元测试框架；"测试"在本仓库等价于 `astro check && astro build` 全绿。

## 架构总览

**技术栈**：Astro 5（静态 MPA）+ Tailwind v3 + MDX + Shiki + TypeScript strict。部署：两阶段 Docker（`node:20.18-alpine` 构建 → `nginx:1.27-alpine` 托管），通过 Coolify 在 push 后自动重建。

### 跨文件的"单一事实源"约定

这些是读多个文件都找不出来、必须靠约定维护的骨架。改一处容易遗漏另一处 —— **改之前先确认是不是在这张表上**：

| 概念 | 唯一出处 | 说明 |
| --- | --- | --- |
| 站点常量（name/url/author/导航/分类/LIMITS） | `src/config/site.ts` | 模板里**不准**硬编码站名、域名、外链、列表切片数量；都 import。`astro.config.mjs` 的 `site:` 和 `SITE.url` 必须同步更新（顶部有注释警告）。|
| 文章 frontmatter schema | `src/content/config.ts` | zod schema，字段改动要同步 `src/types/index.ts` 的 `PostMeta`。`category` 既接受字符串也接受数组，preprocess 统一成 `string[]`。|
| 站点统计（文章数/分类数/标签数/字符数） | `src/utils/stats.ts` | 首页、Sidebar、about 页展示的数字必须通过 `getSiteStats()`，不准自己从 tagCounts 求和，否则各页会漂移。|
| 分类路径访问 | `src/utils/category.ts` | 不要直接 `data.category[0]`，用 `catRoot / catLeaf / catPath / catKey`。layered category 是 `string[]`（如 `["考试","申论","大作文"]`）。|
| 颜色 / 阴影 / 渐变令牌 | `src/styles/global.css`（CSS 变量）+ `tailwind.config.mjs`（绑定 token） | 双主题：`:root` 日间 / `.dark` 夜间。颜色**必须**走 CSS 变量（`rgb(var(--c-xxx) / <alpha-value>)`），严禁在组件里硬编码 `#ff2d6b` 之类的值 —— 会在另一个主题下失效。|
| 字体家族（heading/body/display/sans/mono） | `tailwind.config.mjs` 的 `fontFamily` | Layout.astro 里是加载字体的 `<link>`，对应关系有注释；中文走 LXGW WenKai，英文大标题走 Fraunces（带 `opsz`/`SOFT` 变体轴）。|

### 目录职责

```
src/
├── config/site.ts          单一配置入口（见上表）
├── content/posts/*.md      所有文章（collection schema 校验）
├── content/config.ts       collection 定义
├── layouts/
│   ├── Layout.astro        基础布局：meta / NavBar / StarField / SearchModal / 主题恢复脚本 / 进度圆环 / 全局交互脚本
│   └── BlogPost.astro      文章详情页：封面 + header + prose + JSON-LD
├── pages/
│   ├── index.astro         首页（HeroVideo + 精选卡）
│   ├── blog/[slug].astro   文章路由（getStaticPaths 过滤 draft）
│   ├── tags/ categories/ archives/ about/ 404
│   ├── api/posts.json.ts   构建期生成的搜索索引（供 SearchModal 懒加载）
│   └── rss.xml.ts
├── components/             NavBar / Sidebar / PostCard / SearchModal / StarField / HeroVideo / Footer
├── scripts/interactions.ts 全站交互层（见下）
├── styles/global.css       CSS 变量 + 双主题 + prose 样式
├── utils/                  category / date / stats / ui 纯函数
└── types/index.ts          PostMeta / PostSummary / SearchEntry（含运行时 type guard）
```

### 交互层（`src/scripts/interactions.ts`）

Layout.astro 末尾一次性 import；它负责四件事：**3D tilt（`.tilt`）、多层视差（`[data-parallax]`）、滚入 reveal（`.reveal`，可带 `data-delay`）、右下进度圆环**。全部在 `prefers-reduced-motion: reduce` 时退化。**添加新入场动画不要自己造 IntersectionObserver**，给元素加 `class="reveal"` 就行。

### 主题 / FOUC 防抖

Layout.astro 的 `<head>` 里有一段 `is:inline` 同步脚本决定 `html.dark`：优先级是 `localStorage['theme']` → 06–18 点亮色、其余暗色。**这段脚本依赖的 key 和类名不要随意改**，否则会在刷新瞬间撞色。

### 搜索

构建期 `/api/posts.json`（`src/pages/api/posts.json.ts`）生成 `SearchEntry[]`；客户端 `SearchModal.astro` 懒加载 JSON，用 `isSearchEntry` 做运行时校验（`src/types/index.ts`）。添加搜索字段要**三处**同步：`SearchEntry` 类型、`posts.json.ts` 的 map、`isSearchEntry` 的守卫。

### 生产侧（部署前自检用得上）

- `Dockerfile` 里有一道 sanity check：`test -d /app/dist/blog && ls /app/dist/blog | grep -v index.html`，意在当 `src/content/posts/` 被误清空时提早 fail。如果本地 `npm run verify` 过、Coolify 却 fail，先看日志里是不是这段在报。
- `nginx.conf`：HTML `no-cache`，`/_astro/*` `immutable 1y`。CSP 白名单了 jsDelivr（LXGW 字体）和 Google Fonts；新增外部 CDN 要回来补 `style-src` / `font-src`。

## 软件工程约定

- **先 brainstorm 后实现。** 新增功能/组件之前，先跟用户对齐意图（通过 plan 或短对话），不要直接开改文件。Skill `superpowers:brainstorming` 适用。
- **复用优先。** 新加入的组件 / 工具 / 类型，先检查 `components/`、`utils/`、`types/index.ts`、`config/site.ts` 里是不是已经有类似的。重复一份是技术债。
- **小步提交，消息中文。** 看 `git log --oneline` 的既有风格：`feat(reveal): ...`、`fix(theme-toggle): ...`。一个 commit 一个主题，不要把"改文章"和"改样式"混在一起。
- **不碰忽略路径。** `博客源代码参考/`（第三方参考）、`assets/`（本地原始素材）、`dist/`、`.astro/` 在 `.gitignore`、`.claudeignore`、`eslint.config.mjs` 里都列了，不读不改不删。
- **Magic number 进 LIMITS。** 列表切片、标签云上限一类的数字统一写到 `src/config/site.ts` 的 `LIMITS`，模板里不出现 `.slice(0, 8)` 这种字面量。
- **写文章 ≠ 改代码。** 纯新增 `src/content/posts/*.md` 不需要跑 lint（`.prettierignore` 已经把 `src/content/` 排除），但仍然要跑 `npm run type-check`，让 content schema 校验 frontmatter。
- **不自作主张加 README / 归档 / 决策文档。** 工作上下文走对话和 plan；确实需要的长期知识，写进这份 CLAUDE.md 或 `src/config/site.ts` 的注释里。
- **审查 / 结构优化另开会话。** 代码审查和重构提案在 `../blog-review/` 的独立会话里进行（那里有自己的 CLAUDE.md 与 git 历史），避免把审查笔记和本仓库的日常开发上下文混在一起。本仓库不读写 blog-review。
