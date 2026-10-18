// Chapter 9 · The Departure Board: Archives, Stories and Films as
// destinations. Rows flip in on arrival; hover/focus opens each portal.

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import rows from '../data/departures.json';
import { placeholderMarkup } from '../components/placeholder.js';
import { createFlap } from '../components/split-flap.js';

export function initDepartureBoard({ reduce }) {
  const list = document.querySelector('[data-departure-rows]');
  list.innerHTML = rows.map((r) => `
    <li class="drow" style="--row-accent: ${r.accent}">
      <a class="drow__link" href="${r.href}">
        <span class="drow__main">
          <span class="drow__dest"><span class="sr-only">${r.dest}</span><span data-flap></span></span>
          <span class="drow__pf">${r.platform}</span>
          <span class="drow__status">${r.status}</span>
        </span>
        <span class="drow__desc">${r.desc}</span>
        <span class="drow__portal"><span>${placeholderMarkup({ slot: r.slot, caption: r.dest.toLowerCase(), ratio: '21/8' })}</span></span>
      </a>
    </li>`).join('');

  const width = Math.max(...rows.map((r) => r.dest.length));
  const flaps = [...list.querySelectorAll('[data-flap]')].map((el) => createFlap(el, { length: width, reduce }));

  if (reduce) {
    flaps.forEach((f, i) => f.set(rows[i].dest));
  } else {
    ScrollTrigger.create({
      trigger: list, start: 'top 80%', once: true,
      onEnter: () => flaps.forEach((f, i) => f.set(rows[i].dest, { delay: i * 260 })),
    });
  }

  const clock = document.querySelector('[data-clock]');
  const tick = () => {
    clock.textContent = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
  };
  tick();
  setInterval(tick, 30_000);
}
