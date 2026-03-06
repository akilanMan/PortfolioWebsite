'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ScrollIndicator() {
  const reduce = useReducedMotion();
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const checkBottom = () => {
      const threshold = 2;
      const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - threshold;
      setAtBottom(reachedBottom);
    };

    checkBottom();
    window.addEventListener('scroll', checkBottom, { passive: true });
    window.addEventListener('resize', checkBottom);

    return () => {
      window.removeEventListener('scroll', checkBottom);
      window.removeEventListener('resize', checkBottom);
    };
  }, []);

  if (atBottom) return null;

  return (
    <motion.a
      href="#"
      aria-label="Scroll down"
      className="focus-ring fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-line/70 bg-paper/80 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-muted shadow-soft hover:text-ink"
      onClick={(event) => {
        event.preventDefault();
        window.scrollBy({
          top: Math.max(320, Math.floor(window.innerHeight * 0.92)),
          behavior: reduce ? 'auto' : 'smooth'
        });
      }}
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, 8, 0] }}
      transition={reduce ? { duration: 0.2 } : { duration: 1.4, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
    >
      Scroll ↓
    </motion.a>
  );
}
