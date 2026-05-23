import { Suspense } from 'react';
import { filterPosts } from '@/lib/posts';
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
        <Suspense fallback={<div className="text-white/50 text-sm">加载中...</div>}>
          <FilterBar />
        </Suspense>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
