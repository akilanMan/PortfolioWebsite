'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeading } from '@/components/section-heading';
import type { ExperienceItem } from '@/data/siteData';

type ExperienceProps = {
  items: ExperienceItem[];
};

export function Experience({ items }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.3']
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.25 });

  return (
    <section id="experience" ref={sectionRef} className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8">
      <div className="mb-10 overflow-hidden border-y border-line/60 py-2">
        <div className="flex w-[200%] animate-marquee gap-10 text-[11px] uppercase tracking-[0.25em] text-muted/60 motion-reduce:animate-none">
          <span>Experience / Work / Building</span>
          <span>Experience / Work / Building</span>
          <span>Experience / Work / Building</span>
          <span>Experience / Work / Building</span>
        </div>
      </div>

      <SectionHeading eyebrow="Experience" title="Shipped in enterprise and product environments" />

      <div className="relative pl-8 sm:pl-10">
        <div className="absolute bottom-0 left-1.5 top-0 w-px bg-line sm:left-2" aria-hidden />
        <motion.div
          aria-hidden
          style={{ scaleY: reduce ? 1 : lineProgress }}
          className="absolute bottom-0 left-1.5 top-0 origin-top w-px bg-ink sm:left-2"
        />

        <ol className="space-y-12">
          {items.map((item, index) => (
            <motion.li
              key={`${item.company}-${item.period}`}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span className="absolute -left-[2rem] top-2 h-3 w-3 rounded-full border border-ink bg-paper sm:-left-[2.55rem]" aria-hidden />
              <article className="space-y-4 border-b border-line/70 pb-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-2xl text-ink">{item.company}</h3>
                    <p className="text-sm text-muted">{item.role}</p>
                  </div>
                  <div className="text-right text-xs uppercase tracking-[0.18em] text-muted">
                    <p>{item.period}</p>
                    <p>{item.location}</p>
                  </div>
                </div>

                <ul className="space-y-2 text-sm leading-relaxed text-muted sm:text-[15px]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span aria-hidden>·</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
