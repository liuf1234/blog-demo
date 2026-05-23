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
    slug: 'example-nextjs-15',
    title: 'Next.js 15 新特性',
    source: 'https://nextjs.org/blog/next-15',
    author: 'Vercel',
    date: '2026-05-01',
    categories: ['前端', '框架'],
    tags: ['Next.js', 'React'],
    summary: 'Next.js 15 带来了 Partial Prerendering 和 Server Actions 的重大更新。',
    review: 'Partial Prerendering 是 Next.js 最大的突破，静态和动态内容终于可以完美共存。',
  },
  {
    slug: 'example-ai-agents',
    title: 'AI Agent 的构建范式',
    source: 'https://example.com/ai-agents',
    author: 'John Doe',
    date: '2026-04-20',
    categories: ['AI'],
    tags: ['AI', 'Agent', 'LLM'],
    summary: '一文了解 AI Agent 从工具调用到自主规划的演进。',
    review: '作者把 Agent 的演进分为了三个阶段，对工具调用的分析尤其精彩。',
  },
  {
    slug: 'example-design-system',
    title: '从 0 到 1 构建设计系统',
    source: 'https://example.com/design-system',
    author: 'Jane Smith',
    date: '2026-04-10',
    categories: ['设计', '前端'],
    tags: ['设计系统', '组件库'],
    summary: '一篇关于如何从零开始构建企业级设计系统的完整指南。',
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
