// Chapter 4 · Browse the Stall: spines on a plank; hover/focus pulls a
// book out to show its cover. Ticket-style filters, arrows and keyboard.

import books from '../data/books.json';
import { imageFor } from '../components/placeholder.js';

export function initStallShelf() {
  const shelf = document.querySelector('[data-shelf]');
  const row = shelf.querySelector('[data-shelf-row]');
  const filters = document.querySelector('[data-book-filters]');

  row.innerHTML = books.items.map((b) => {
    const cover = imageFor(b.slot);
    return `
    <li class="shelf__item" data-cat="${b.category}">
      <button class="book" type="button" style="--c: ${b.color}; --h: ${b.height}px"
        aria-label="${b.title}. ${b.series}, ${b.meta}">
        <span class="book__spine" aria-hidden="true"><span class="book__spine-title">${b.title}</span></span>
        <span class="book__cover${cover ? ' has-img' : ''}" aria-hidden="true">
          ${cover ? `<img class="book__img" src="${cover.src}" alt="" loading="lazy" decoding="async">` : ''}
          <span class="book__series">${b.series}</span>
          <span class="book__title">${b.title}</span>
          <span class="book__meta">AHW-IMG · ${b.slot} · ${b.meta}</span>
        </span>
      </button>
    </li>`;
  }).join('');

  filters.innerHTML = books.categories.map((c, i) =>
    `<button class="filter" type="button" data-filter="${c.id}" aria-pressed="${i === 0}">${c.label}</button>`).join('');

  const items = [...row.children];
  const visibleBooks = () => items.filter((li) => !li.hidden).map((li) => li.firstElementChild);

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    filters.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    items.forEach((li) => { li.hidden = btn.dataset.filter !== 'all' && li.dataset.cat !== btn.dataset.filter; });
    shelf.scrollTo({ left: 0, behavior: 'smooth' });
  });

  // Touch: tap toggles a book open (hover does it for mouse)
  row.addEventListener('click', (e) => {
    const book = e.target.closest('.book');
    if (!book) return;
    row.querySelectorAll('.book.is-open').forEach((b) => b !== book && b.classList.remove('is-open'));
    book.classList.toggle('is-open');
  });

  // Arrow keys move along the shelf
  row.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const list = visibleBooks();
    const i = list.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const next = list[Math.max(0, Math.min(list.length - 1, i + (e.key === 'ArrowRight' ? 1 : -1)))];
    next.focus();
    next.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
  });

  const step = () => shelf.clientWidth * 0.6;
  document.querySelector('[data-shelf-prev]').addEventListener('click', () => shelf.scrollBy({ left: -step(), behavior: 'smooth' }));
  document.querySelector('[data-shelf-next]').addEventListener('click', () => shelf.scrollBy({ left: step(), behavior: 'smooth' }));
}
