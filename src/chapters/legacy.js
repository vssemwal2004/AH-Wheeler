// Chapter 5 · Our Legacy: gentle image parallax (≤ 8%) inside its frame.

import gsap from 'gsap';

export function initLegacy({ reduce }) {
  if (reduce) return;
  document.querySelectorAll('[data-parallax] .ph-box').forEach((box) => {
    const media = box.querySelector('img') || box.querySelector('.ph-box__mark');
    gsap.fromTo(media, { yPercent: -8, scale: 1.16 }, {
      yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}
