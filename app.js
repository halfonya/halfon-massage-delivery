const state = { treatment: '', package: 'חבילה קטנה', time: 'עכשיו' };
const pages = [...document.querySelectorAll('[data-page]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const toastBox = document.querySelector('#toast');
const sheet = document.querySelector('#sheet');
const app = document.querySelector('#app');
const sheetClose = document.querySelector('#sheet-close');
let toastTimer;
let priorFocus;

function activePage() {
  const requested = (window.location.hash || '#home').slice(1);
  return pages.some(page => page.dataset.page === requested) ? requested : 'home';
}

function renderPage(name = activePage()) {
  pages.forEach(page => page.classList.toggle('is-active', page.dataset.page === name));
  navLinks.forEach(link => link.classList.toggle('is-active', link.dataset.target === name));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigate(name) {
  window.location.hash = name;
}

function toast(message) {
  toastBox.textContent = message;
  toastBox.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastBox.classList.remove('is-visible'), 2400);
}

function showSheet(title, text) {
  priorFocus = document.activeElement;
  document.querySelector('#sheet-title').textContent = title;
  document.querySelector('#sheet-text').textContent = text;
  sheet.classList.add('is-visible');
  sheet.setAttribute('aria-hidden', 'false');
  app.inert = true;
  sheetClose.focus();
}

function closeSheet() {
  sheet.classList.remove('is-visible');
  sheet.setAttribute('aria-hidden', 'true');
  app.inert = false;
  priorFocus?.focus();
}

document.querySelectorAll('[data-target]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.target)));
document.querySelectorAll('[data-toast]').forEach(button => button.addEventListener('click', () => toast(button.dataset.toast)));
window.addEventListener('hashchange', () => renderPage());
document.addEventListener('DOMContentLoaded', () => renderPage());

document.querySelectorAll('.treatment-card').forEach(card => card.addEventListener('click', () => {
  document.querySelectorAll('.treatment-card').forEach(item => {
    item.classList.remove('is-selected');
    item.setAttribute('aria-pressed', 'false');
  });
  card.classList.add('is-selected');
  card.setAttribute('aria-pressed', 'true');
  state.treatment = card.dataset.treatment;
  document.querySelector('#treatment-continue').disabled = false;
}));

document.querySelector('#treatment-continue').addEventListener('click', () => {
  if (!state.treatment) return;
  showSheet('הבחירה נשמרה', `בחרת ב־${state.treatment}. בגרסה הבאה ייפתח כאן יומן לבחירת מועד ושעה פנויים.`);
});

document.querySelectorAll('.package-option').forEach(option => option.addEventListener('click', () => {
  document.querySelectorAll('.package-option').forEach(item => {
    item.classList.remove('is-selected');
    item.setAttribute('aria-pressed', 'false');
  });
  option.classList.add('is-selected');
  option.setAttribute('aria-pressed', 'true');
  state.package = option.dataset.package;
}));

document.querySelectorAll('[data-time]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-time]').forEach(item => {
    item.classList.remove('is-selected');
    item.setAttribute('aria-pressed', 'false');
  });
  button.classList.add('is-selected');
  button.setAttribute('aria-pressed', 'true');
  state.time = button.dataset.time;
}));

document.querySelector('#delivery-form').addEventListener('submit', event => {
  event.preventDefault();
  const pickup = document.querySelector('#pickup').value.trim();
  const dropoff = document.querySelector('#dropoff').value.trim();
  if (!pickup || !dropoff) {
    toast('יש להזין כתובת איסוף וכתובת יעד');
    return;
  }
  const weight = document.querySelector('#weight').value;
  const distance = document.querySelector('#distance').value;
  const summary = document.querySelector('#delivery-summary');
  summary.hidden = false;
  const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
  summary.innerHTML = `<strong>סיכום בקשת השליחות</strong><br>סוג: ${escape(state.package)}<br>משקל: ${escape(weight)} · מרחק: ${escape(distance)}<br>איסוף: ${escape(pickup)}<br>יעד: ${escape(dropoff)}<br>מועד: ${escape(state.time)}<br><span>זהו מסך הדגמה — עדיין לא נשלחה בקשה אמיתית.</span>`;
  summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

sheetClose.addEventListener('click', closeSheet);
sheet.addEventListener('click', event => { if (event.target === sheet) closeSheet(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && sheet.classList.contains('is-visible')) closeSheet();
  if (event.key === 'Tab' && sheet.classList.contains('is-visible')) {
    event.preventDefault();
    sheetClose.focus();
  }
});
