'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDark(isDark);
  }, []);

  const toggle = () => {
    document.documentElement.classList.toggle('dark');
    setDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggle}
      className="glass-button px-3 py-1.5 text-white text-sm"
      aria-label="切换主题"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
