// Chapter 3 · The Carriage Window
// Desktop: section pins, milestones slide past a train window in three depth
// layers, a brass route draws beneath and the year flips on a split-flap.
// Mobile / reduced motion: a vertical line with stacked stops, no pin.

import gsap from 'gsap';
import milestones from '../data/milestones.json';
import { placeholderMarkup, imageFor } from '../components/placeholder.js';
import { createFlap } from '../components/split-flap.js';

export function initCarriageWindow({ reduce }) {
  const section = document.querySelector('#timeline');
  const pinEl = section.querySelector('[data-timeline-pin]');
  const glass = section.querySelector('.window__glass');
  const track = section.querySelector('[data-track]');
  const far = section.querySelector('[data-layer="far"]');
  const near = section.querySelector('[data-layer="near"]');
  const line = section.querySelector('[data-route-line]');
  const dotsWrap = section.querySelector('[data-route-dots]');
  const n = milestones.length;

  const captionFor = (m) => {
    const img = imageFor(m.slot);
    return img ? `${img.caption}<span class="caption__credit">${img.credit}</span>` : `AHW-IMG · ${m.slot} · ${m.caption}`;
  };

  track.innerHTML = milestones.map((m) => `
    <li class="stop">
      <figure>${placeholderMarkup({ slot: m.slot, caption: m.caption, ratio: '4/3', variant: 'nocap' })}</figure>
      <div>
        <p class="stop__year"><span class="${m.verify ? 'verify' : ''}">${m.year}</span></p>
        <h3 class="stop__title">${m.title}</h3>
        <p class="stop__body">${m.body}</p>
        <p class="caption stop__caption">${captionFor(m)}</p>
      </div>
    </li>`).join('');

  dotsWrap.innerHTML = milestones.map((m, i) =>
    `<i class="route__dot" style="left: ${(i / (n - 1)) * 100}%"><span>${m.year}</span></i>`).join('');
  const dots = [...dotsWrap.children];
  const flap = createFlap(section.querySelector('[data-route-flap]'), { length: 5, reduce });

  let active = -1;
  function setActive(i) {
    if (i === active) return;
    active = i;
    flap.set(milestones[i].year);
    dots.forEach((d, j) => {
      d.classList.toggle('is-active', j === i);
      d.classList.toggle('is-passed', j < i);
    });
  }

  if (reduce) return;

  const mm = gsap.matchMedia();

  mm.add('(min-width: 900px)', () => {
    section.classList.add('timeline--horizontal');
    const distance = () => track.offsetWidth - glass.clientWidth;
    gsap.set(far, { backgroundPosition: '0px 0px, 0px 0px' });
    gsap.set(near, { backgroundPosition: '0px 0px, 0px 0px' });
    setActive(0);

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: pinEl, start: 'top top', end: () => `+=${distance() * 1.15}`,
        pin: true, scrub: 0.6, invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(line, { scaleX: self.progress });
          setActive(Math.round(self.progress * (n - 1)));
        },
      },
    });
    tl.to(track, { x: () => -distance() }, 0)
      .to(far, { backgroundPosition: () => `0px 0px, ${-distance() * 0.35}px 0px` }, 0)
      .to(near, { backgroundPosition: () => `0px 0px, ${-distance() * 1.6}px 0px` }, 0);

    return () => section.classList.remove('timeline--horizontal');
  });

  mm.add('(max-width: 899px)', () => {
    gsap.fromTo(track, { '--draw': 0 }, {
      '--draw': 1, ease: 'none',
      scrollTrigger: { trigger: track, start: 'top 75%', end: 'bottom 75%', scrub: true },
    });
    gsap.utils.toArray(track.children).forEach((stop) => gsap.from(stop, {
      y: 40, opacity: 0, duration: 1, ease: 'expo.out',
      scrollTrigger: { trigger: stop, start: 'top 88%', once: true },
    }));
  });
}
