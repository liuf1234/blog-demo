---
name: personal-blog-glassmorphism
description: 文章聚合型个人博客，Glassmorphism 玻璃风设计，Next.js 15 + Tailwind + giscus + Umami
metadata:
  type: project
---

# 个人博客网页 - 设计规范

## 项目概述

文章聚合型个人博客：收藏并点评优质文章，搭配现代玻璃风 (Glassmorphism) 设计。

## 需求

### 用户角色
普通访客（浏览文章、搜索、评论）和博主本人（通过编辑本地 JSON 文件添加文章）。

### 核心功能

1. **文章列表页（首页）** - 以卡片形式展示文章，支持按分类、标签筛选，支持模糊搜索
2. **文章详情页** - 展示文章标题、来源链接、博主点评、发布日期，底部嵌入 giscus 评论
3. **搜索** - Fuse.js 客户端模糊搜索，按标题、标签、点评内容匹配
4. **评论系统** - giscus (GitHub Discussions)，需 GitHub 登录
5. **阅读统计** - Umami (umami.is 免费版)，隐私友好
6. **暗色/亮色切换** - 全局主题切换
7. **关于页** - 博主简介

### 设计风格
Glassmorphism（玻璃风）：
- 半透明背景 `rgba(255,255,255,0.1)`
- 毛玻璃效果 `backdrop-filter: blur(10px)`
- 圆角 `border-radius: 16px`
- 渐变背景动画
- 暗色模式下深色半透明背景

## 技术栈

| 层面 | 选择 |
|------|------|
| 框架 | Next.js 15 (App Router) + TypeScript |
| 样式 | Tailwind CSS + 自定义 glassmorphism |
| 数据 | 本地 `data/posts.json` |
| 评论 | giscus (GitHub Discussions) |
| 统计 | Umami (umami.is) |
| 搜索 | Fuse.js 客户端模糊搜索 |
| 部署 | Vercel |

## 数据结构

```typescript
interface Post {
  slug: string;        // URL 标识，如 "react-19-new-features"
  title: string;       // 文章标题
  source: string;      // 原文链接
  author: string;      // 原文作者
  date: string;        // 发布日期 YYYY-MM-DD
  categories: string[]; // 分类 ["前端", "AI"]
  tags: string[];      // 标签 ["React", "框架"]
  summary: string;     // 博主一句话点评
  review?: string;     // 详细点评（可选）
}
```

## 项目结构

```
blog_demo/
├── docs/
│   ├── plan.md                    # 实施计划
│   └── superpowers/specs/
│       └── 2026-05-21-blog-design.md  # 本文件
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # 根布局（导航、暗色模式）
│   │   ├── page.tsx               # 首页（文章列表 + 筛选）
│   │   ├── posts/[slug]/page.tsx  # 文章详情页
│   │   ├── about/page.tsx         # 关于页
│   │   └── search/page.tsx        # 搜索结果页
│   ├── components/
│   │   ├── ui/                    # 玻璃风基础组件
│   │   │   ├── GlassCard.tsx
│   │   │   ├── GlassNav.tsx
│   │   │   ├── GlassButton.tsx
│   │   │   └── GlassInput.tsx
│   │   ├── BlogPost.tsx           # 文章卡片
│   │   ├── SearchBar.tsx          # 搜索栏
│   │   ├── FilterBar.tsx          # 分类/标签筛选
│   │   ├── PostList.tsx           # 文章列表
│   │   ├── CommentSection.tsx     # giscus 评论
│   │   └── ThemeToggle.tsx        # 主题切换
│   ├── lib/
│   │   ├── posts.ts               # 文章数据加载/筛选
│   │   ├── search.ts              # Fuse.js 搜索
│   │   └── config.ts              # 站点配置
│   └── styles/
│       └── globals.css            # 全局样式 + glassmorphism
├── data/
│   └── posts.json                 # 文章数据
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 实施步骤

1. 初始化 Next.js 项目 + TypeScript + Tailwind
2. 数据层（posts.json + lib/posts.ts）
3. UI 基础组件（玻璃风卡片、导航、按钮）
4. 页面（首页、详情页、关于页、搜索页）
5. 功能组件（列表、筛选、搜索、评论）
6. 第三方集成（giscus、Umami、Open Graph）
7. 玻璃风设计细节（渐变动画、暗色模式、响应式）
8. 本地验证（npm run dev）

## 第三方集成说明

### giscus
- 需要创建 GitHub 仓库并启用 Discussions
- 通过 `<script>` 标签嵌入，配置 `repo`、`repo-id`、`category`、`category-id`
- 每篇文章使用唯一 discussion mapping（页面路径）

### Umami
- 注册 umami.is 免费版
- 获取站点追踪脚本 ID
- 在 `layout.tsx` 注入 `<script src="https://umami.is/script.js" data-website-id="YOUR_ID" />`

### Fuse.js
- 构建时将 posts.json 序列化为搜索索引
- 客户端使用 Fuse.js 进行模糊匹配
- 搜索范围：标题、点评、标签
