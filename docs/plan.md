# 个人博客网页 - 实施计划

## Context

用户需要一个**文章聚合型个人博客**：收藏并点评优质文章，搭配现代玻璃风 (Glassmorphism) 设计，支持分类/标签筛选、模糊搜索、GitHub Discussions 评论、Umami 阅读统计。项目从零开始，部署到 Vercel。

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

## 项目结构

```
blog_demo/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 根布局（导航、暗色模式脚本）
│   │   ├── page.tsx            # 首页（文章列表 + 筛选）
│   │   ├── posts/
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # 文章详情页
│   │   ├── about/
│   │   │   └── page.tsx        # 关于页
│   │   └── search/
│   │       └── page.tsx        # 搜索结果页
│   ├── components/
│   │   ├── ui/
│   │   │   ├── GlassCard.tsx     # 玻璃风卡片
│   │   │   ├── GlassNav.tsx      # 玻璃风导航栏
│   │   │   ├── GlassButton.tsx   # 玻璃风按钮
│   │   │   └── GlassInput.tsx    # 玻璃风输入框
│   │   ├── BlogPost.tsx          # 文章卡片组件
│   │   ├── SearchBar.tsx         # 搜索栏
│   │   ├── FilterBar.tsx         # 分类/标签筛选
│   │   ├── PostList.tsx          # 文章列表
│   │   ├── CommentSection.tsx    # giscus 评论组件
│   │   └── ThemeToggle.tsx       # 暗色/亮色切换
│   ├── lib/
│   │   ├── posts.ts              # 文章数据加载/筛选
│   │   ├── search.ts             # Fuse.js 搜索
│   │   └── config.ts             # 站点配置
│   ├── data/
│   │   └── posts.json            # 文章数据
│   └── styles/
│       └── globals.css           # 全局样式 + glassmorphism
├── data/
│   └── posts.json                # 文章数据（构建时读取）
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── vercel.json
```

## 实施步骤

### Step 1: 初始化项目
- `npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-import-alias`
- 安装依赖：`fuse.js`, `@types/fuse.js`
- 配置 Tailwind

### Step 2: 数据层
- 创建 `data/posts.json` 数据结构
- 实现 `src/lib/posts.ts` - 加载、排序、筛选
- 实现 `src/lib/config.ts` - 站点元数据、分类、标签

### Step 3: UI 基础组件（玻璃风）
- `GlassCard.tsx` - backdrop-filter: blur + 半透明背景 + 渐变边框
- `GlassNav.tsx` - 固定顶部导航，毛玻璃效果
- `GlassButton.tsx` / `GlassInput.tsx` - 统一的玻璃风交互组件
- `ThemeToggle.tsx` - 暗色/亮色切换

### Step 4: 页面实现
- `app/layout.tsx` - 根布局、导航、暗色模式
- `app/page.tsx` - 首页（文章列表 + 筛选 + 搜索）
- `app/posts/[slug]/page.tsx` - 文章详情页 + giscus
- `app/about/page.tsx` - 关于页
- `app/search/page.tsx` - Fuse.js 搜索结果页

### Step 5: 功能组件
- `PostList.tsx` - 文章卡片列表
- `FilterBar.tsx` - 按分类/标签筛选
- `SearchBar.tsx` - Fuse.js 客户端搜索
- `CommentSection.tsx` - giscus 集成

### Step 6: 第三方集成
- giscus 配置（需创建 GitHub 仓库 + Discussions）
- Umami 脚本注入（`<script>` 标签）
- Open Graph 元数据

### Step 7: 玻璃风设计
- 渐变背景动画（CSS `@keyframes`）
- 暗色模式适配
- 页面过渡动画
- 响应式布局

### Step 8: 本地验证
- `npm run dev` 启动开发服务器
- 测试各页面、筛选、搜索、评论、统计

## 玻璃风 CSS 方案

```css
/* GlassCard 核心样式 */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .glass-card {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}

/* 渐变背景动画 */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.bg-gradient-animate {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}
```

## 验证方案

1. `npm run dev` - 本地启动
2. 访问首页 → 文章列表渲染
3. 点击分类/标签 → 筛选生效
4. 搜索框输入 → Fuse.js 结果
5. 点击文章 → 详情页 + giscus 评论加载
6. 切换暗色模式 → 样式适配
7. 移动端尺寸 → 响应式布局
