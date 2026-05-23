'use client';

import { useEffect, useRef } from 'react';
import { utterancesConfig } from '@/lib/config';

interface CommentSectionProps {
  slug: string;
}

export default function CommentSection({ slug }: CommentSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', utterancesConfig.repo);
    script.setAttribute('issue-term', utterancesConfig.issueTerm);
    script.setAttribute('theme', utterancesConfig.theme);
    script.setAttribute('label', utterancesConfig.label);
    script.setAttribute('crossorigin', 'anonymous');

    containerRef.current.appendChild(script);

    return () => {
      containerRef.current?.querySelector('script')?.remove();
    };
  }, [slug]);

  return (
    <div className="glass p-6 mt-8">
      <h3 className="text-xl font-semibold text-white mb-4">评论</h3>
      <div ref={containerRef} className="min-h-[200px]">
        <p className="text-white/50 text-sm">
          加载评论中...
        </p>
      </div>
    </div>
  );
}
