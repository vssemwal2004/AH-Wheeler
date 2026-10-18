// Chapter 2 · Allahabad Jn., 1877: archive loupe + schematic line draw.

import gsap from 'gsap';
import { initLoupes } from '../components/loupe.js';

export function initOrigin({ reduce }) {
  initLoupes();
  if (reduce) return;

  const doc = document.querySelector('.origin__doc');
  gsap.from(doc, {
    y: 60, rotate: 4, opacity: 0, duration: 1.4, ease: 'expo.out',
    scrollTrigger: { trigger: doc, start: 'top 90%', once: true },
  });

  const line = document.querySelector('.schem__line');
  gsap.fromTo(line, { attr: { x2: 40 } }, {
    attr: { x2: 760 }, ease: 'none',
    scrollTrigger: { trigger: '.origin__schematic', start: 'top 85%', end: 'top 45%', scrub: true },
  });
}
