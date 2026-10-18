// Chapter 7 · Across India: a schematic (not geographic) route diagram.
// Lines draw on scroll; station boards open a detail panel.

import gsap from 'gsap';
import data from '../data/stations.json';
import { placeholderMarkup } from '../components/placeholder.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

export function initRouteMap({ reduce }) {
  const mapEl = document.querySelector('[data-route-map]');
  const panel = document.querySelector('[data-station-panel]');
  panel.setAttribute('data-lenis-prevent', '');

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 1040 520');
  svg.setAttribute('role', 'group');
  svg.setAttribute('aria-label', 'Schematic railway diagram of stations. Not a geographic map.');

  const paths = data.lines.map((l) => {
    const p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', l.d);
    p.setAttribute('class', `rmap__line rmap__line--${l.kind}`);
    svg.append(p);
    return p;
  });

  const nodes = data.stations.map((s) => {
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class', 'rmap__node');
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', `${s.en}: show stall`);
    const w = s.en.length * 13 + 30;
    const ly = s.y + s.labelDy;
    g.innerHTML = `
      <circle cx="${s.x}" cy="${s.y}" r="9"></circle>
      <rect x="${s.x - w / 2}" y="${ly - 17}" width="${w}" height="34"></rect>
      <text x="${s.x}" y="${ly}">${s.en}</text>`;
    svg.append(g);
    return g;
  });
  mapEl.append(svg);

  function select(i, { open = true } = {}) {
    const s = data.stations[i];
    nodes.forEach((n, j) => n.classList.toggle('is-active', j === i));
    panel.innerHTML = `
      ${placeholderMarkup({ slot: s.slot, caption: `Wheeler stall, ${s.en}`, ratio: '1/1' })}
      <p class="station__name">${s.en} <span class="station__hi" lang="hi">${s.hi}</span></p>
      <p class="station__text">${s.text}</p>
      <button class="btn btn--ghost station__close" type="button">Close</button>`;
    panel.querySelector('.station__close').addEventListener('click', () => {
      panel.classList.remove('is-open');
      nodes[i].focus();
    });
    panel.classList.toggle('is-open', open);
  }

  nodes.forEach((node, i) => {
    node.addEventListener('click', () => select(i));
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); }
    });
    node.addEventListener('mouseenter', () => matchMedia('(hover: hover)').matches && select(i, { open: false }));
  });
  document.addEventListener('keydown', (e) => e.key === 'Escape' && panel.classList.remove('is-open'));

  select(data.stations.findIndex((s) => s.id === 'allahabad'), { open: false });

  if (reduce) return;
  paths.forEach((p) => {
    const len = p.getTotalLength();
    gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
      strokeDashoffset: 0, ease: 'none',
      scrollTrigger: { trigger: mapEl, start: 'top 80%', end: 'center 50%', scrub: true },
    });
  });
  gsap.from(nodes, {
    opacity: 0, y: 10, duration: 0.8, ease: 'expo.out', stagger: 0.08,
    scrollTrigger: { trigger: mapEl, start: 'top 60%', once: true },
  });
}
