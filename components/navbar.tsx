'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { NavItem } from '@/data/siteData';
import { ThemeToggle } from '@/components/theme-toggle';

type NavbarProps = {
  name: string;
  navItems: NavItem[];
};

export function Navbar({ name, navItems }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8" aria-label="Primary">
        <Link href="#home" className="focus-ring text-sm font-medium tracking-[0.08em] text-ink">
          {name}
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="focus-ring rounded-md border border-line px-3 py-2 text-xs uppercase tracking-[0.2em] text-ink"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            Menu
          </button>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="focus-ring text-xs uppercase tracking-[0.2em] text-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line/60 md:hidden"
          >
            <ul className="space-y-1 px-6 py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="focus-ring block rounded-md px-2 py-3 text-sm text-ink hover:bg-ink/5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
