import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';
import GlassCard from '@/components/ui/GlassCard';

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">搜索</h1>
      <GlassCard className="p-4">
        <p className="text-white/70">
          搜索 &quot;{query}&quot; 的结果
        </p>
      </GlassCard>
      <Suspense fallback={<p className="text-white/50 text-sm">搜索中...</p>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
