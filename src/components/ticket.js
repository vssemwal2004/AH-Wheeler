// The Journey Ticket: fixed progress card. One punch per chapter passed,
// click to open a chapter menu, flips over when the journey ends.

import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initTicket({ scrollTo }) {
  const ticket = document.querySelector('[data-ticket]');
  const toggle = ticket.querySelector('[data-ticket-toggle]');
  const menu = ticket.querySelector('[data-ticket-menu]');
  const nowEl = ticket.querySelector('[data-ticket-now]');
  const punchWrap = ticket.querySelector('[data-ticket-punches]');
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  const last = chapters.length - 1;

  const punches = chapters.map(() => {
    const p = document.createElement('i');
    p.className = 'ticket__punch';
    punchWrap.append(p);
    return p;
  });

  menu.innerHTML = chapters
    .map((ch, i) => `<a href="#${ch.id}"><span>${String(i).padStart(2, '0')}</span>${ch.dataset.chapter}</a>`)
    .join('');
  const links = [...menu.querySelectorAll('a')];

  let current = -1;
  function setCurrent(i) {
    if (i === current) return;
    current = i;
    punches.forEach((p, j) => p.classList.toggle('is-punched', j <= i));
    links.forEach((a, j) => a.setAttribute('aria-current', j === i ? 'true' : 'false'));
    nowEl.textContent = chapters[i].dataset.chapter;
    ticket.classList.toggle('is-visible', i >= 1);
    ticket.classList.toggle('is-complete', i === last);
    toggle.setAttribute('aria-label', `Journey progress: chapter ${i} of ${last}, ${chapters[i].dataset.chapter}. Open chapter menu`);
  }

  chapters.forEach((ch, i) => {
    ScrollTrigger.create({
      trigger: ch,
      start: i === last ? 'top 40%' : 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => self.isActive && setCurrent(i),
      onLeaveBack: () => i > 0 && setCurrent(i - 1),
    });
  });
  setCurrent(0);

  const setOpen = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  links.forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(a.getAttribute('href'));
  }));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { setOpen(false); toggle.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !ticket.contains(e.target)) setOpen(false);
  });
}
