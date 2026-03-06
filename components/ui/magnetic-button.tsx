'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type MagneticButtonProps = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
};

export function MagneticButton({ href, label, variant = 'primary' }: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const canMagnetize = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  const base =
    'focus-ring inline-flex rounded-full border px-5 py-2.5 text-sm tracking-wide transition-[border-color,background-color,color] duration-300 ease-luxe';
  const style =
    variant === 'primary'
      ? 'border-ink bg-ink text-paper hover:bg-transparent hover:text-ink'
      : 'border-line bg-paper/70 text-ink hover:border-ink';

  return (
    <motion.div
      animate={reduce ? undefined : { x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 18, mass: 0.3 }}
      onMouseMove={(event) => {
        if (!canMagnetize || reduce) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
        setOffset({ x, y });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="inline-block"
    >
      <Link href={href} className={`${base} ${style}`}>
        {label}
      </Link>
    </motion.div>
  );
}
