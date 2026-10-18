// A.H. Wheeler — "Between Stations"
// Boot order matters: ScrollTriggers are created top-to-bottom so pinned
// chapters (hero, carriage window) are measured before what follows them.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import 'lenis/dist/lenis.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/chapters/hero.css';
import './styles/chapters/opening.css';
import './styles/chapters/origin.css';
import './styles/chapters/timeline.css';
import './styles/chapters/books.css';
import './styles/chapters/legacy.css';
import './styles/chapters/banerjee.css';
import './styles/chapters/network.css';
import './styles/chapters/memories.css';
import './styles/chapters/departures.css';
import './styles/chapters/closing.css';

import { initSmoothScroll } from './scroll/smooth.js';
import { initReveals } from './scroll/reveals.js';
import { renderPlaceholders } from './components/placeholder.js';
import { initMasthead } from './components/masthead.js';
import { initTicket } from './components/ticket.js';
import { initHero } from './chapters/hero.js';
import { initOpening } from './chapters/opening.js';
import { initOrigin } from './chapters/origin.js';
import { initCarriageWindow } from './chapters/carriage-window.js';
import { initStallShelf } from './chapters/stall-shelf.js';
import { initLegacy } from './chapters/legacy.js';
import { initBanerjee } from './chapters/banerjee.js';
import { initRouteMap } from './chapters/route-map.js';
import { initMemories } from './chapters/memories.js';
import { initDepartureBoard } from './chapters/departure-board.js';
import { initClosing } from './chapters/closing.js';

import images from './data/images.json';

gsap.registerPlugin(ScrollTrigger, SplitText);

function renderCredits() {
  const unique = [...new Map(Object.values(images).map((i) => [i.source, i])).values()];
  document.querySelector('[data-credits]').innerHTML = unique
    .map((i) => `<li><a href="${i.source}" target="_blank" rel="noopener">${i.caption}</a> · ${i.credit}</li>`)
    .join('');
}

async function boot() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.toggle('reduce-motion', reduce);
  document.querySelector('[data-year]').textContent = new Date().getFullYear();

  renderPlaceholders();
  renderCredits();
  await document.fonts.ready; // split text only after real fonts are measured

  const { lenis, scrollTo } = initSmoothScroll({ reduce });
  const ctx = { reduce, lenis, scrollTo };

  initMasthead(ctx);
  initHero(ctx);
  initOpening(ctx);
  initOrigin(ctx);
  initCarriageWindow(ctx);
  initStallShelf(ctx);
  initLegacy(ctx);
  initBanerjee(ctx);
  initRouteMap(ctx);
  initMemories(ctx);
  initDepartureBoard(ctx);
  initClosing(ctx);
  initReveals(ctx);
  initTicket(ctx);

  ScrollTrigger.refresh();
}

boot();
