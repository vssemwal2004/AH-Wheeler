// Chapter 1 · Opening statement: words light up as you read,
// then three card tickets are punched as they arrive.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export function initOpening({ reduce }) {
  if (reduce) return;

  const statement = document.querySelector('[data-statement]');
  const { words } = SplitText.create(statement, { type: 'words' });
  gsap.fromTo(words, { opacity: 0.14 }, {
    opacity: 1, ease: 'none', stagger: 0.1,
    scrollTrigger: { trigger: statement, start: 'top 78%', end: 'bottom 45%', scrub: true },
  });

  ScrollTrigger.batch('[data-eticket]', {
    start: 'top 88%', once: true,
    onEnter: (cards) => {
      gsap.from(cards, { y: 40, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.14 });
      gsap.to(cards.map((c) => c.querySelector('.eticket__hole')), {
        scale: 1, duration: 0.35, ease: 'power4.out', stagger: 0.14, delay: 0.55,
      });
    },
  });
}
