'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { getAllCategories, getAllTags } from '@/lib/posts';

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const tag = searchParams.get('tag') || '';

  const categories = getAllCategories();
  const tags = getAllTags();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <div className="glass-button px-4 py-2">
        <select
          value={category}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="bg-transparent text-white border-none outline-none cursor-pointer"
          style={{ WebkitAppearance: 'none' }}
        >
          <option value="" style={{ background: '#1a1a2e' }}>
            全部分类
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat} style={{ background: '#1a1a2e' }}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="glass-button px-4 py-2">
        <select
          value={tag}
          onChange={(e) => updateFilter('tag', e.target.value)}
          className="bg-transparent text-white border-none outline-none cursor-pointer"
          style={{ WebkitAppearance: 'none' }}
        >
          <option value="" style={{ background: '#1a1a2e' }}>
            所有标签
          </option>
          {tags.map((t) => (
            <option key={t} value={t} style={{ background: '#1a1a2e' }}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
