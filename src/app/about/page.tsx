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
