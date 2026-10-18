// Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger stays in sync.
// Disabled entirely when the visitor prefers reduced motion.

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSmoothScroll({ reduce }) {
  let lenis = null;
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.09 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const scrollTo = (hash) => {
    const target = document.querySelector(hash);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', hash);
  };

  // Route every in-page link through the same scroller
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link || link.getAttribute('href') === '#' || e.defaultPrevented) return;
    e.preventDefault();
    scrollTo(link.getAttribute('href'));
  });

  return { lenis, scrollTo };
}
