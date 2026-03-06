'use client';

import { gsap } from 'gsap';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type IntroShellProps = {
  children: ReactNode;
};

export function IntroShell({ children }: IntroShellProps) {
  const [done, setDone] = useState(false);
  const introRef = useRef<HTMLElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setDone(true);
      return;
    }

    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, scale: 1.02 });
      gsap.set(nameRef.current, { opacity: 0, scale: 0.96, letterSpacing: '0.02em' });

      gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          gsap.set(contentRef.current, { clearProps: 'all' });
          document.body.style.overflow = '';
          setDone(true);
        }
      })
        .to(nameRef.current, { opacity: 1, duration: 1.05 })
        .to(nameRef.current, { letterSpacing: '0.09em', scale: 1.12, duration: 1.2 }, '-=0.28')
        .to(nameRef.current, { scale: 6.4, opacity: 0, duration: 1.4 })
        .to(contentRef.current, { opacity: 1, scale: 1, duration: 1.05 }, '-=1.12')
        .to(introRef.current, { opacity: 0, duration: 0.55 }, '-=0.64');
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <div ref={contentRef}>{children}</div>

      {!done && (
        <section ref={introRef} className="cinematic-intro" aria-label="Cinematic intro">
          <div className="cinematic-intro-bg" aria-hidden />
          <div className="cinematic-intro-grain" aria-hidden />
          <h1 ref={nameRef} className="cinematic-intro-name">
            akilan
          </h1>
        </section>
      )}
    </>
  );
}
