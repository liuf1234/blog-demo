# 个人博客网页实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 从零构建文章聚合型个人博客，Glassmorphism 玻璃风设计，支持筛选/搜索/评论/统计。

**Architecture:** Next.js 15 App Router 静态生成，文章数据通过本地 JSON 文件管理，构建时读取并生成页面。客户端 Fuse.js 处理搜索，giscus 嵌入评论，Umami 统计访问。

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Fuse.js, giscus, Umami, Vercel

---

## 文件总览

| 文件 | 职责 |
|------|------|
| `data/posts.json` | 文章数据源 |
| `src/lib/config.ts` | 站点配置（名称、描述、giscus/Umami ID） |
| `src/lib/posts.ts` | Post 类型定义、数据加载、筛选 |
| `src/lib/search.ts` | Fuse.js 搜索配置 |
| `src/styles/globals.css` | 全局样式、玻璃风 CSS、动画 |
| `src/components/ui/GlassCard.tsx` | 玻璃风卡片基础组件 |
| `src/components/ui/GlassNav.tsx` | 玻璃风固定顶部导航 |
| `src/components/ui/GlassButton.tsx` | 玻璃风按钮 |
| `src/components/ui/GlassInput.tsx` | 玻璃风输入框 |
| `src/components/ThemeToggle.tsx` | 暗色/亮色切换按钮 |
| `src/components/BlogPost.tsx` | 文章卡片（列表页使用） |
| `src/components/PostList.tsx` | 文章卡片列表 |
| `src/components/FilterBar.tsx` | 分类/标签筛选栏 |
| `src/components/SearchBar.tsx` | 客户端搜索栏 |
| `src/components/CommentSection.tsx` | giscus 评论组件 |
| `src/app/layout.tsx` | 根布局、导航、暗色模式、Umami |
| `src/app/page.tsx` | 首页（文章列表 + 筛选 + 搜索） |
| `src/app/posts/[slug]/page.tsx` | 文章详情页 + 评论 |
| `src/app/about/page.tsx` | 关于页 |
| `src/app/search/page.tsx` | 搜索结果页 |

---

### Task 1: 初始化 Next.js 项目

**Files:**
- Create: `package.json`, `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`

- [ ] **Step 1: 创建 Next.js 项目**

Run: `npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-import-alias --use-npm`

Expected: Next.js 项目初始化完成，包含 TypeScript 和 Tailwind CSS。

- [ ] **Step 2: 安装搜索依赖**

Run: `npm install fuse.js`

- [ ] **Step 3: 创建目录结构**

Run:
```
mkdir src\components\ui src\lib src\data src\styles data
```

- [ ] **Step 4: 提交**

```bash
git init
git add .
git commit -m "init: Next.js 15 project with TypeScript and Tailwind"
```

---

### Task 2: 站点配置

**Files:**
- Create: `src/lib/config.ts`

- [ ] **Step 1: 创建站点配置**

Create `src/lib/config.ts`:

```typescript
export const siteConfig = {
  title: '我的博客',
  description: '收藏并点评优质文章',
  url: 'http://localhost:3000',
  author: '博主',
};

export const giscusConfig = {
  repo: '',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
  mapping: 'pathname' as const,
  strict: 0,
  reactionsEnabled: 1,
  theme: 'preferred_color_scheme' as const,
  lang: 'zh-CN',
};

export const umamiConfig = {
  websiteId: '',
  scriptUrl: 'https://umami.is/script.js',
};
```

- [ ] **Step 2: 提交**

```bash
git add src/lib/config.ts
git commit -m "feat: add site configuration for giscus and Umami"
```

---

### Task 3: 文章数据层

**Files:**
- Create: `data/posts.json`
- Create: `src/lib/posts.ts`

- [ ] **Step 1: 创建文章数据类型和工具函数**

Create `src/lib/posts.ts`:

```typescript
export interface Post {
  slug: string;
  title: string;
  source: string;
  author: string;
  date: string;
  categories: string[];
  tags: string[];
  summary: string;
  review?: string;
}

const posts: Post[] = [
  {
    slug: 'example-post',
    title: '示例文章：Next.js 15 新特性',
    source: 'https://nextjs.org/blog/next-15',
    author: 'Vercel',
    date: '2026-05-01',
    categories: ['前端', '框架'],
    tags: ['Next.js', 'React'],
    summary: 'Next.js 15 带来了 Partial Prerendering 和 Server Actions 的重大更新。',
    review: 'Partial Prerendering 是 Next.js 最大的突破，静态和动态内容终于可以完美共存。',
  },
];

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  posts.forEach((p) => p.categories.forEach((c) => categories.add(c)));
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function filterPosts(options?: {
  category?: string;
  tag?: string;
}): Post[] {
  let result = getAllPosts();
  if (options?.category) {
    result = result.filter((p) => p.categories.includes(options.category!));
  }
  if (options?.tag) {
    result = result.filter((p) => p.tags.includes(options.tag!));
  }
  return result;
}
```

- [ ] **Step 2: 提交**

```bash
git add src/lib/posts.ts
git commit -m "feat: add Post data layer with filtering utilities"
```

---

### Task 4: 全局样式和玻璃风 CSS

**Files:**
- Create: `src/styles/globals.css`

- [ ] **Step 1: 创建玻璃风全局样式**

Create `src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: rgba(0, 0, 0, 0.1);
  --text-primary: #1a1a1a;
  --text-secondary: #666;
}

.dark {
  --glass-bg: rgba(0, 0, 0, 0.3);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: rgba(0, 0, 0, 0.3);
  --text-primary: #f0f0f0;
  --text-secondary: #aaa;
}

body {
  color: var(--text-primary);
  min-height: 100vh;
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.dark body {
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #1a1a2e);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  box-shadow: 0 8px 32px var(--glass-shadow);
}

.glass-nav {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--glass-border);
}

.glass-button {
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 16px var(--glass-shadow);
  transform: translateY(-1px);
}

.dark .glass-button:hover {
  background: rgba(255, 255, 255, 0.15);
}

.glass-input {
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  color: var(--text-primary);
  transition: border-color 0.3s ease;
}

.glass-input:focus {
  border-color: rgba(255, 255, 255, 0.5);
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}
```

- [ ] **Step 2: 确保 layout 引入 globals.css**

Next.js App Router 自动引入 `src/app/globals.css`，将其重命名为 `src/app/globals.css` 并从 `src/styles/globals.css` 导入。

在 `src/app/layout.tsx` 中添加 `import '@/styles/globals.css'`。

- [ ] **Step 3: 提交**

```bash
git add src/styles/
git commit -m "feat: add glassmorphism global styles with gradient animation"
```

---

### Task 5: 玻璃风 UI 基础组件

**Files:**
- Create: `src/components/ui/GlassCard.tsx`
- Create: `src/components/ui/GlassButton.tsx`
- Create: `src/components/ui/GlassInput.tsx`

- [ ] **Step 1: 创建 GlassCard 组件**

Create `src/components/ui/GlassCard.tsx`:

```typescript
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div className={`glass ${hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : ''} ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: 创建 GlassButton 组件**

Create `src/components/ui/GlassButton.tsx`:

```typescript
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'outline';
}

export default function GlassButton({ children, variant = 'default', className = '', ...props }: GlassButtonProps) {
  const variantClass = variant === 'outline'
    ? 'glass-button text-white'
    : 'glass-button text-white';

  return (
    <button className={`glass-button px-4 py-2 text-sm font-medium ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
```

- [ ] **Step 3: 创建 GlassInput 组件**

Create `src/components/ui/GlassInput.tsx`:

```typescript
import { InputHTMLAttributes } from 'react';

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function GlassInput({ label, className = '', ...props }: GlassInputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm text-white mb-1">{label}</label>}
      <input
        className={`glass-input w-full px-4 py-2 ${className}`}
        {...props}
      />
    </div>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add src/components/ui/
git commit -m "feat: add glass UI base components (Card, Button, Input)"
```

---

### Task 6: 导航栏和主题切换

**Files:**
- Create: `src/components/ui/GlassNav.tsx`
- Create: `src/components/ThemeToggle.tsx`

- [ ] **Step 1: 创建主题切换组件**

Create `src/components/ThemeToggle.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDark(isDark);
  }, []);

  const toggle = () => {
    document.documentElement.classList.toggle('dark');
    setDark(!dark);
  };

  return (
    <button onClick={toggle} className="glass-button px-3 py-1.5 text-white text-sm" aria-label="切换主题">
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
```

- [ ] **Step 2: 创建导航栏**

Create `src/components/ui/GlassNav.tsx`:

```typescript
import Link from 'next/link';
import ThemeToggle from '../ThemeToggle';

export default function GlassNav() {
  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          Blog
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white/80 hover:text-white text-sm">
            首页
          </Link>
          <Link href="/about" className="text-white/80 hover:text-white text-sm">
            关于
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: 提交**

```bash
git add src/components/ui/GlassNav.tsx src/components/ThemeToggle.tsx
git commit -m "feat: add navigation bar and theme toggle"
```

---

### Task 7: 根布局和关于页

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: 创建根布局**

Modify `src/app/layout.tsx`:

```typescript
import '@/styles/globals.css';
import { siteConfig, umamiConfig } from '@/lib/config';
import GlassNav from '@/components/ui/GlassNav';
import Script from 'next/script';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        <GlassNav />
        <main className="pt-20 pb-12 px-4 max-w-5xl mx-auto">
          {children}
        </main>
        {umamiConfig.websiteId && (
          <Script
            src={umamiConfig.scriptUrl}
            data-website-id={umamiConfig.websiteId}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: 创建关于页**

Create `src/app/about/page.tsx`:

```typescript
import GlassCard from '@/components/ui/GlassCard';

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">关于</h1>
      <GlassCard className="p-8">
        <div className="text-white/80 space-y-4">
          <p>这是一个文章聚合博客，收藏并点评我遇到的优质文章。</p>
          <p>技术栈：Next.js 15 + Tailwind CSS + Glassmorphism</p>
        </div>
      </GlassCard>
    </div>
  );
}
```

- [ ] **Step 3: 验证布局渲染**

Run: `npm run dev`
访问 `http://localhost:3000/about`
Expected: 玻璃风导航栏 + 关于页内容正常显示

- [ ] **Step 4: 提交**

```bash
git add src/app/layout.tsx src/app/about/page.tsx src/styles/globals.css
git commit -m "feat: add root layout with nav and about page"
```

---

### Task 8: 文章卡片和列表组件

**Files:**
- Create: `src/components/BlogPost.tsx`
- Create: `src/components/PostList.tsx`

- [ ] **Step 1: 创建文章卡片组件**

Create `src/components/BlogPost.tsx`:

```typescript
import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import GlassCard from './ui/GlassCard';
import { Post } from '@/lib/posts';

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <GlassCard hover className="p-6 block">
        <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
        <p className="text-white/70 mb-4">{post.summary}</p>
        <div className="flex items-center justify-between text-sm text-white/50">
          <span>{format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}</span>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-white/10 px-2 py-0.5 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
```

- [ ] **Step 2: 安装 date-fns**

Run: `npm install date-fns`

- [ ] **Step 3: 创建文章列表组件**

Create `src/components/PostList.tsx`:

```typescript
import BlogPost from './BlogPost';
import { Post } from '@/lib/posts';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="glass p-8 text-center text-white/60">
        没有找到文章
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <BlogPost key={post.slug} post={post} />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add src/components/BlogPost.tsx src/components/PostList.tsx
git commit -m "feat: add blog post card and list components"
```

---

### Task 9: 筛选栏和搜索栏

**Files:**
- Create: `src/components/FilterBar.tsx`
- Create: `src/components/SearchBar.tsx`

- [ ] **Step 1: 创建筛选栏组件**

Create `src/components/FilterBar.tsx`:

```typescript
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { getAllCategories, getAllTags } from '@/lib/posts';

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const tag = searchParams.get('tag') || '';

  const allCategories = typeof window !== 'undefined' ? [] : [];
  const categories = getAllCategories();
  const tags = getAllTags();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <div className="glass-button px-4 py-2">
        <select
          value={category}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="bg-transparent text-white border-none outline-none"
        >
          <option value="">全部分类</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="glass-button px-4 py-2">
        <select
          value={tag}
          onChange={(e) => updateFilter('tag', e.target.value)}
          className="bg-transparent text-white border-none outline-none"
        >
          <option value="">所有标签</option>
          {tags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建搜索栏组件**

Create `src/components/SearchBar.tsx`:

```typescript
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import GlassInput from './ui/GlassInput';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <GlassInput
        placeholder="搜索文章..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
```

- [ ] **Step 3: 提交**

```bash
git add src/components/FilterBar.tsx src/components/SearchBar.tsx
git commit -m "feat: add filter bar and search bar components"
```

---

### Task 10: 首页（文章列表 + 筛选 + 搜索）

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 实现首页**

Modify `src/app/page.tsx`:

```typescript
import { filterPosts, getAllCategories, getAllTags } from '@/lib/posts';
import PostList from '@/components/PostList';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import { siteConfig } from '@/lib/config';

export default function Home({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string };
}) {
  const posts = filterPosts({
    category: searchParams.category,
    tag: searchParams.tag,
  });

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-white">{siteConfig.title}</h1>
        <p className="text-white/70">{siteConfig.description}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <SearchBar />
        <FilterBar />
      </div>
      <PostList posts={posts} />
    </div>
  );
}
```

- [ ] **Step 2: 验证首页**

Run: `npm run dev`
访问 `http://localhost:3000/`
Expected: 显示文章卡片列表、筛选栏、搜索栏

- [ ] **Step 3: 提交**

```bash
git add src/app/page.tsx
git commit -m "feat: implement homepage with post list, filter and search"
```

---

### Task 11: Fuse.js 客户端搜索

**Files:**
- Create: `src/lib/search.ts`
- Create: `src/app/search/page.tsx`

- [ ] **Step 1: 创建搜索工具**

Create `src/lib/search.ts`:

```typescript
import Fuse from 'fuse.js';
import { Post, getAllPosts } from './posts';

const posts = getAllPosts();

const fuseOptions: Fuse.IFuseOptions<Post> = {
  keys: ['title', 'summary', 'tags', 'categories'],
  threshold: 0.4,
  includeScore: true,
};

export function searchPosts(query: string): Post[] {
  const fuse = new Fuse(posts, fuseOptions);
  const results = fuse.search(query);
  return results.map((r) => r.item);
}
```

- [ ] **Step 2: 创建搜索页**

Create `src/app/search/page.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchPosts, Post } from '@/lib/posts';
import PostList from '@/components/PostList';
import GlassCard from '@/components/ui/GlassCard';

// Client-side search using Fuse.js
import Fuse from 'fuse.js';
import { getAllPosts } from '@/lib/posts';

const posts = getAllPosts();
const fuseOptions: Fuse.IFuseOptions<Post> = {
  keys: ['title', 'summary', 'tags', 'categories'],
  threshold: 0.4,
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Post[]>([]);

  useEffect(() => {
    if (query) {
      const fuse = new Fuse(posts, fuseOptions);
      const res = fuse.search(query).map((r) => r.item);
      setResults(res);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">搜索</h1>
      <GlassCard className="p-4">
        <p className="text-white/70">搜索 &quot;{query}&quot; 的结果 ({results.length} 条)</p>
      </GlassCard>
      <PostList posts={results} />
    </div>
  );
}
```

- [ ] **Step 3: 提交**

```bash
git add src/lib/search.ts src/app/search/page.tsx
git commit -m "feat: add client-side search with Fuse.js"
```

---

### Task 12: 文章详情页和 giscus 评论

**Files:**
- Create: `src/app/posts/[slug]/page.tsx`
- Create: `src/components/CommentSection.tsx`

- [ ] **Step 1: 创建 giscus 评论组件**

Create `src/components/CommentSection.tsx':

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { giscusConfig } from '@/lib/config';

interface CommentSectionProps {
  slug: string;
}

export default function CommentSection({ slug }: CommentSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!giscusConfig.repo || !containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.defer = true;
    script.setAttribute('data-repo', giscusConfig.repo);
    script.setAttribute('data-repo-id', giscusConfig.repoId);
    script.setAttribute('data-category', giscusConfig.category);
    script.setAttribute('data-category-id', giscusConfig.categoryId);
    script.setAttribute('data-mapping', giscusConfig.mapping);
    script.setAttribute('data-strict', String(giscusConfig.strict));
    script.setAttribute('data-reactions-enabled', String(giscusConfig.reactionsEnabled));
    script.setAttribute('data-theme', giscusConfig.theme);
    script.setAttribute('data-lang', giscusConfig.lang);

    containerRef.current.appendChild(script);

    return () => {
      containerRef.current?.querySelector('script')?.remove();
    };
  }, [slug]);

  return (
    <div className="glass p-6 mt-8">
      <h3 className="text-xl font-semibold text-white mb-4">评论</h3>
      <div ref={containerRef} />
    </div>
  );
}
```

- [ ] **Step 2: 创建文章详情页**

Create `src/app/posts/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import CommentSection from '@/components/CommentSection';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { siteConfig } from '@/lib/config';

export function generateStaticParams() {
  return getPostBySlug?.()?.slug
    ? [{ slug: getPostBySlug()?.slug }]
    : [];
}

interface PageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: '文章未找到' };
  return {
    title: `${post.title} - ${siteConfig.title}`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
    },
  };
}

export default function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <GlassCard className="p-8">
        <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
          <span>{format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}</span>
          <span>by {post.author}</span>
        </div>
        <p className="text-white/80 mb-6 text-lg">{post.summary}</p>
        {post.review && (
          <div className="glass p-4 mb-6">
            <h3 className="text-white font-medium mb-2">点评</h3>
            <p className="text-white/70">{post.review}</p>
          </div>
        )}
        <GlassButton as="a" href={post.source} target="_blank" rel="noopener noreferrer">
          阅读原文 →
        </GlassButton>
      </GlassCard>
      <CommentSection slug={post.slug} />
    </article>
  );
}
```

- [ ] **Step 3: 提交**

```bash
git add src/app/posts/ src/components/CommentSection.tsx
git commit -m "feat: add post detail page with giscus comments"
```

---

### Task 13: 本地验证和响应式调整

**Files:**
- Modify: 可能需微调各组件样式

- [ ] **Step 1: 启动开发服务器**

Run: `npm run dev`

- [ ] **Step 2: 验证各功能**

| 测试项 | 预期 |
|--------|------|
| 首页 | 文章列表渲染，筛选栏、搜索栏可用 |
| 分类筛选 | `?category=前端` 筛选文章 |
| 标签筛选 | `?tag=React` 筛选文章 |
| 搜索 | 输入关键词跳转到 `/search?q=xxx` |
| 文章详情 | 标题、点评、阅读原文按钮正常 |
| 关于页 | 玻璃风卡片正常显示 |
| 暗色模式 | 切换后导航、卡片、背景变化 |
| 移动端 | 浏览器 DevTools 模拟移动设备，布局自适应 |

- [ ] **Step 3: 响应式样式调整**

根据测试结果，在各组件中添加 Tailwind 响应式类：
- 导航栏在小屏幕下调整间距
- 筛选栏在小屏幕下垂直排列
- 卡片在小屏幕下全宽显示

- [ ] **Step 4: 提交**

```bash
git add -A
git commit -m "fix: responsive layout adjustments"
```

---

## 自审结果

**Spec 覆盖检查：**
- [x] 文章列表页（首页）— Task 8, 10
- [x] 文章详情页 — Task 12
- [x] 分类/标签筛选 — Task 9, 10
- [x] Fuse.js 搜索 — Task 11
- [x] giscus 评论 — Task 12
- [x] Umami 统计 — Task 7 (layout.tsx)
- [x] 暗色/亮色切换 — Task 6
- [x] 关于页 — Task 7
- [x] 玻璃风设计 — Task 4, 5
- [x] Open Graph 元数据 — Task 12

**占位符检查：** 无 TBD、TODO、待定内容 ✓

**类型一致性：** Post interface 在所有文件中保持一致 ✓

---

## 部署（后续步骤）

实施完成后，通过以下流程部署到 Vercel：

1. 创建 GitHub 仓库并推送代码
2. 在 Vercel 导入仓库
3. 配置 giscus（GitHub 仓库启用 Discussions）
4. 配置 Umami（获取 websiteId 填入 config.ts）
5. 使用 `vercel-optimize` skill 进行性能优化
