# DevBlog — 个人技术博客

基于 **Astro 5**、**Tailwind CSS** 和 **Markdown** 构建的现代化、高性能、SEO 友好的个人技术博客。支持一键部署到 Vercel 或 GitHub Pages。

## ✨ 功能特性

- ⚡ **极速加载**——纯静态 HTML，零 JavaScript 默认输出
- 🎨 **暗黑模式**——自动跟随系统 + 手动切换，无闪烁
- 📝 **Markdown 写作**——使用 `.md` 文件 + frontmatter 管理内容
- 🏷️ **标签/分类筛选**——构建时自动生成标签页
- 💻 **代码高亮**——Shiki 双主题，支持 Python、Bash 等 ~200 种语言
- 📱 **全响应式**——移动端汉堡菜单 + 自适应网格布局
- 🔍 **SEO 优化**——Open Graph、Twitter Cards、JSON-LD、RSS、Sitemap
- 🚀 **一键部署**——Vercel 或 GitHub Pages

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（http://localhost:4321）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📂 项目结构

```
src/
├── content.config.ts       # 内容集合 schema 定义
├── content/blog/           # Markdown 博客文章
├── layouts/                # BaseLayout、PostLayout
├── components/             # 可复用 UI 组件
├── pages/                  # 路由页面（基于文件的动态路由）
├── utils/                  # 工具函数
├── styles/                 # 全局 CSS + 排版样式
├── scripts/                # 客户端脚本（主题切换）
└── consts.ts               # 站点全局常量
```

## 📝 撰写文章

在 `src/content/blog/` 下创建 `.md` 文件：

```markdown
---
title: "我的新文章"
description: "一段简短的描述，用于 SEO 和文章卡片。"
pubDate: 2026-06-01
tags: ["python", "教程"]
category: "编程语言"
featured: true
---

正文内容...
```

## 🚢 部署

### Vercel（推荐）

1. 推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入仓库
3. 完成——每次推送自动部署

### GitHub Pages

1. 修改 `astro.config.mjs` 中的 `site` 和 `base`
2. 推送到 `main` 分支
3. GitHub Actions 自动部署（`.github/workflows/deploy.yml`）

## ⚙️ 自定义配置

编辑 `src/consts.ts` 即可个性化：
- 站点标题、描述、URL
- 作者姓名和简介
- 社交媒体链接
- 导航菜单项
- 技术栈展示

## 📄 许可证

MIT
