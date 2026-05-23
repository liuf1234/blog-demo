import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, Post } from '@/lib/posts';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import CommentSection from '@/components/CommentSection';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllPosts().map((post: Post) => ({ slug: post.slug }));
}

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
          <span>{post.date}</span>
          <span>by {post.author}</span>
        </div>
        <p className="text-white/80 mb-6 text-lg">{post.summary}</p>
        {post.review && (
          <div className="glass p-4 mb-6">
            <h3 className="text-white font-medium mb-2">点评</h3>
            <p className="text-white/70">{post.review}</p>
          </div>
        )}
        <div>
          <a href={post.source} target="_blank" rel="noopener noreferrer">
            <GlassButton>阅读原文 →</GlassButton>
          </a>
        </div>
      </GlassCard>
      <CommentSection slug={post.slug} />
    </article>
  );
}
