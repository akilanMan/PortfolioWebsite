'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;

  return 'dark';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const preferred = getPreferredTheme();
    setTheme(preferred);
    document.documentElement.classList.toggle('dark', preferred === 'dark');
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    window.localStorage.setItem('theme', nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="focus-ring rounded-full border border-line bg-paper/80 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-ink hover:border-ink"
      aria-label={mounted && theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={mounted && theme === 'dark'}
    >
      {mounted ? (theme === 'dark' ? 'Light' : 'Dark') : 'Light'}
    </button>
  );
}
