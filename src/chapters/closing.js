// Chapter 10 · Shutters Down: the closing line rises, then the stall
// shutter from the hero rolls back down over the footer.

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { buildShutter } from '../components/shutter.js';

export function initClosing({ reduce }) {
  if (reduce) return;

  const line = document.querySelector('[data-closing-line]');
  SplitText.create(line, {
    type: 'words', mask: 'words',
    onSplit: (self) => gsap.from(self.words, {
      yPercent: 105, duration: 1.3, ease: 'expo.out', stagger: 0.07,
      scrollTrigger: { trigger: line, start: 'top 85%', once: true },
    }),
  });

  // Trigger on the shutter itself: on desktop it fills the finale, on mobile
  // it sits above the footer, and either way it is closed once fully in view.
  const shutter = document.querySelector('[data-finale] .shutter');
  const { curtain } = buildShutter(shutter, 12);
  gsap.fromTo(curtain, { yPercent: -102 }, {
    yPercent: 0, ease: 'none',
    scrollTrigger: { trigger: shutter, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
  });
}
