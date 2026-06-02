---
title: "用 Astro 和 Tailwind CSS 搭建极速博客"
description: "从零搭建现代化静态博客的完整教程，使用 Astro 5、Tailwind CSS 和 Markdown 内容集合。"
pubDate: 2026-05-28
tags: ["astro", "tailwind", "教程", "前端", "ssg"]
category: "Web 开发"
draft: false
featured: true
---

## 为什么选择 Astro？

Astro 是一个现代化的静态站点生成器，**默认输出零 JavaScript**。它非常适合博客、文档站、作品集等内容为主的网站。

核心优势：
- **局部水合**——只在需要的时候加载交互组件
- **内容集合**——类型安全的 Markdown 管理方案
- **视图过渡**——内置 SPA 般的页面切换动画
- **多框架支持**——React、Vue、Svelte 或纯 `.astro` 组件都可以

## 项目初始化

```bash
# 创建新项目
npm create astro@latest my-blog -- --template minimal --typescript

# 进入目录并安装依赖
cd my-blog
npm install @astrojs/tailwind @tailwindcss/typography
npm run dev
```

## 配置内容集合

Astro 5 使用 Content Layer API 配合 glob 加载器：

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
```

## 构建文章页面

在 `src/pages/blog/[...slug].astro` 中创建动态路由：

```astro
---
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<article>
  <h1>{post.data.title}</h1>
  <time datetime={post.data.pubDate.toISOString()}>
    {post.data.pubDate.toLocaleDateString()}
  </time>
  <Content />
</article>
```

## 性能优化技巧

1. **使用 `font-display: swap`** 确保文字快速渲染
2. **用 Astro 内置的 `<Image />` 组件优化图片**
3. **在部署平台开启 gzip/brotli 压缩**
4. **预加载关键 CSS** 降低 LCP 时间

## 部署上线

```bash
# 构建并本地预览
npm run build
npm run preview

# 部署到 Vercel（在后台面板一键导入即可）
# 或使用 CLI：
vercel --prod
```

凭借 Astro 的静态输出能力，你的博客将在 Lighthouse 上轻松拿下 **100/100 满分**。
