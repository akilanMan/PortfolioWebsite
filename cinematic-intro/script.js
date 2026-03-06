(() => {
  const intro = document.getElementById('intro');
  const introName = document.getElementById('introName');
  const siteShell = document.getElementById('siteShell');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!intro || !introName || !siteShell) return;

  if (reduceMotion) {
    siteShell.style.opacity = '1';
    siteShell.style.transform = 'none';
    siteShell.removeAttribute('aria-hidden');
    document.body.style.overflow = 'auto';
    return;
  }

  gsap.set(siteShell, {
    opacity: 0,
    scale: 1.02
  });

  gsap.set(introName, {
    opacity: 0,
    scale: 0.96,
    letterSpacing: '0.01em'
  });

  const tl = gsap.timeline({
    defaults: {
      ease: 'power2.inOut'
    },
    onComplete: () => {
      intro.style.display = 'none';
      siteShell.removeAttribute('aria-hidden');
      document.body.style.overflow = 'auto';
    }
  });

  tl.to(introName, {
    opacity: 1,
    duration: 1.1
  })
    .to(introName, {
      letterSpacing: '0.08em',
      scale: 1.12,
      duration: 1.3
    }, '-=0.2')
    .to(introName, {
      scale: 5.8,
      opacity: 0,
      duration: 1.45
    })
    .to(siteShell, {
      opacity: 1,
      scale: 1,
      duration: 1.05
    }, '-=1.15')
    .to(intro, {
      opacity: 0,
      duration: 0.5
    }, '-=0.65');
})();
