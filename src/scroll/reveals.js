// Shared, quiet reveals used across chapters: station boards swing in,
// headings rise word by word, paragraphs fade up, archival images unclip.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export function initReveals({ reduce }) {
  if (reduce) return;

  gsap.utils.toArray('[data-board]').forEach((board) => {
    gsap.from(board, {
      rotateX: -75, transformOrigin: '50% 0%', transformPerspective: 600, opacity: 0,
      duration: 1.2, ease: 'expo.out',
      scrollTrigger: { trigger: board, start: 'top 88%', once: true },
    });
  });

  gsap.utils.toArray('.h2').forEach((h) => {
    SplitText.create(h, {
      type: 'words', mask: 'words',
      onSplit: (self) => gsap.from(self.words, {
        yPercent: 105, duration: 1.1, ease: 'expo.out', stagger: 0.04,
        scrollTrigger: { trigger: h, start: 'top 85%', once: true },
      }),
    });
  });

  ScrollTrigger.batch('.reveal-up', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.from(els, { y: 28, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.12 }),
  });

  gsap.utils.toArray('.reveal-clip').forEach((el) => {
    gsap.fromTo(el,
      { clipPath: 'inset(14% 10% 14% 10%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });
}
