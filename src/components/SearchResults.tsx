'use client';

import { useState, useEffect } from 'react';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { getAllPosts, type Post } from '@/lib/posts';
import PostList from './PostList';

const posts = getAllPosts();

const fuseOptions: IFuseOptions<Post> = {
  keys: ['title', 'summary', 'tags', 'categories'],
  threshold: 0.4,
};

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const [results, setResults] = useState<Post[]>([]);

  useEffect(() => {
    if (query) {
      const fuse = new Fuse(posts, fuseOptions);
      const res = fuse.search(query).map((r) => r.item);
      setResults(res);
    } else {
      setResults([]);
    }
  }, [query]);

  return <PostList posts={results} />;
}
