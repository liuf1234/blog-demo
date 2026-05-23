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
