'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import GlassInput from './ui/GlassInput';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <GlassInput
        placeholder="搜索文章..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
