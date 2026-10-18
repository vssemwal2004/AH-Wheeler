// Chapter 0 · The Shutter
// Pinned for ~1.4 screens: louvers tilt open → curtain rolls up →
// headline rises → the scene settles into a framed photograph.

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { buildShutter } from '../components/shutter.js';

export function initHero({ reduce }) {
  if (reduce) return;

  const hero = document.querySelector('#hero');
  const scene = hero.querySelector('[data-hero-scene]');
  const title = hero.querySelector('[data-hero-title]');
  const sub = hero.querySelector('[data-hero-sub]');
  const eyebrow = hero.querySelector('.eyebrow');
  const cue = hero.querySelector('[data-hero-cue]');
  const { curtain, slats } = buildShutter(hero.querySelector('.shutter'), 12);
  const words = SplitText.create(title, { type: 'words', mask: 'words' }).words;

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: hero, start: 'top top', end: '+=140%', pin: true, scrub: 0.8 },
  });

  tl.to(cue, { opacity: 0, duration: 0.08 }, 0)
    // 1 · light slips through the louvers
    .to(slats, { rotateX: -64, duration: 0.22, stagger: { each: 0.012, from: 'end' } }, 0)
    // 2 · the curtain rolls up, slats closing as they coil
    .to(curtain, { yPercent: -102, duration: 0.36, ease: 'power2.in' }, 0.2)
    .to(slats, { rotateX: 0, duration: 0.2 }, 0.3)
    // 3 · the headline arrives
    .from(eyebrow, { opacity: 0, y: 16, duration: 0.12 }, 0.5)
    .from(words, { yPercent: 110, duration: 0.22, stagger: 0.035, ease: 'power3.out' }, 0.52)
    .from(sub, { opacity: 0, y: 18, duration: 0.14 }, 0.68)
    // 4 · the scene settles into a framed photograph
    .to(scene, { scale: 0.88, borderRadius: 8, duration: 0.2, ease: 'power2.inOut' }, 0.86);
}
