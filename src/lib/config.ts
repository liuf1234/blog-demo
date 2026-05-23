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
