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
