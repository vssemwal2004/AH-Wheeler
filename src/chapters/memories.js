// Chapter 8 · Memories: sticky cards stack like tickets in a pocket.
// Every card is visibly marked "Sample" until real memories replace them.

import gsap from 'gsap';
import memories from '../data/memories.json';
import { placeholderMarkup } from '../components/placeholder.js';

export function initMemories({ reduce }) {
  const stack = document.querySelector('[data-memories]');
  stack.innerHTML = memories.map((m, i) => `
    <article class="memory" style="--i: ${i}">
      <figure>${placeholderMarkup({ slot: m.slot, caption: 'Portrait', ratio: '1/1', variant: 'nocap' })}</figure>
      <div>
        <p class="memory__quote">${m.quote}</p>
        <p class="memory__who">${m.who} · ${m.where}</p>
      </div>
      ${m.sample ? '<span class="memory__sample">Sample · replace with real memory</span>' : ''}
    </article>`).join('');

  if (reduce) return;
  const cards = [...stack.children];
  cards.slice(0, -1).forEach((card, i) => {
    gsap.to(card, {
      scale: 0.94, ease: 'none',
      scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 25%', scrub: true },
    });
  });
}
