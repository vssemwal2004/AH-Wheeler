// Chapter 6 · T. K. Banerjee: the portrait holds (CSS sticky) while
// three short life beats arrive beside it.

import gsap from 'gsap';

export function initBanerjee({ reduce }) {
  if (reduce) return;
  gsap.utils.toArray('.banerjee .beat').forEach((beat) => {
    gsap.from(beat.children, {
      y: 36, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1,
      scrollTrigger: { trigger: beat, start: 'top 75%', once: true },
    });
  });
}
