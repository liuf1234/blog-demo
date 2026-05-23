import Link from 'next/link';
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
          <span>{post.date}</span>
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
