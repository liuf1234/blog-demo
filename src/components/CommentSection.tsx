'use client';

import { useEffect, useRef } from 'react';
import { giscusConfig } from '@/lib/config';

interface CommentSectionProps {
  slug: string;
}

export default function CommentSection({ slug }: CommentSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!giscusConfig.repo || !containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.defer = true;
    script.setAttribute('data-repo', giscusConfig.repo);
    script.setAttribute('data-repo-id', giscusConfig.repoId);
    script.setAttribute('data-category', giscusConfig.category);
    script.setAttribute('data-category-id', giscusConfig.categoryId);
    script.setAttribute('data-mapping', giscusConfig.mapping);
    script.setAttribute('data-strict', String(giscusConfig.strict));
    script.setAttribute('data-reactions-enabled', String(giscusConfig.reactionsEnabled));
    script.setAttribute('data-theme', giscusConfig.theme);
    script.setAttribute('data-lang', giscusConfig.lang);

    containerRef.current.appendChild(script);

    return () => {
      containerRef.current?.querySelector('script')?.remove();
    };
  }, [slug]);

  return (
    <div className="glass p-6 mt-8">
      <h3 className="text-xl font-semibold text-white mb-4">评论</h3>
      <div ref={containerRef}>
        <p className="text-white/50 text-sm">
          配置 giscusConfig 后可在此查看评论
        </p>
      </div>
    </div>
  );
}
