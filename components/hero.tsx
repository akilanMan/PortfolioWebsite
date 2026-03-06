'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';

type HeroProps = {
  name: string;
  title: string;
  subtitle: string;
  headshot: string;
  location: string;
  linkedin: string;
  github: string;
};

export function Hero({ name, title, subtitle, headshot, location, linkedin, github }: HeroProps) {
  const reduce = useReducedMotion();
  const [blob, setBlob] = useState({ x: 0, y: 0, enabled: false });

  useEffect(() => {
    if (reduce) return;
    const media = window.matchMedia('(min-width: 768px) and (pointer: fine)');
    const update = () =>
      setBlob((prev) => ({
        ...prev,
        enabled: media.matches
      }));

    const onPointerMove = (event: PointerEvent) => {
      if (!media.matches) return;
      setBlob({ x: event.clientX, y: event.clientY, enabled: true });
    };

    update();
    media.addEventListener('change', update);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      media.removeEventListener('change', update);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [reduce]);

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[82vh] w-full max-w-6xl items-center px-6 pb-20 pt-16 lg:px-8"
      aria-label="Introduction"
    >
      {blob.enabled && !reduce && (
        <motion.div
          aria-hidden
          animate={{ left: blob.x, top: blob.y }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed z-0 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/10 blur-3xl"
        />
      )}

      <motion.div
        initial={reduce ? false : 'hidden'}
        animate={reduce ? undefined : 'show'}
        variants={{
          hidden: { opacity: 0, y: 12 },
          show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          }
        }}
        className="relative z-10 grid w-full items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="space-y-8">
          <motion.p variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="text-xs uppercase tracking-[0.3em] text-muted">
            {title} · {subtitle}
          </motion.p>

          <motion.h1 variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="font-serif text-5xl leading-tight text-ink sm:text-6xl lg:text-7xl">
            {name}
          </motion.h1>
          <motion.p variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="-mt-5 text-sm italic tracking-wide text-muted sm:text-base">
            (uh-kee-len)
          </motion.p>

          <motion.p variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            i like computer science and data         
 </motion.p>

          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects" label="View Projects" />
            <MagneticButton href="#contact" label="Get in touch" variant="secondary" />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span>{location}</span>
            <Link
              href={`https://www.linkedin.com/in/${linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="focus-ring hover:text-ink"
            >
              LinkedIn
            </Link>
            <Link href={`https://github.com/${github}`} target="_blank" rel="noreferrer" className="focus-ring hover:text-ink">
              GitHub
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          className="mx-auto w-full max-w-[320px] lg:justify-self-end"
        >
          <div className="overflow-hidden rounded-3xl border border-line/70 bg-paper/70 p-3 shadow-soft">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line/70">
              <Image src={headshot} alt="Headshot placeholder" fill sizes="(max-width: 1024px) 60vw, 320px" className="object-cover" priority />
            </div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
