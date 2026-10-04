const pricing = { base: 20, perKm: 5, minimum: 25, weight: { 'עד 2 ק״ג': 0, '2–5 ק״ג': 5, '5–10 ק״ג': 10 } };
const state = {
  treatment: '', package: 'חבילה קטנה', time: 'עכשיו', pickupCoords: null, estimate: null,
  massage: { location: 'clinic', homeAddress: '', homeCoords: null, iceBath: false, doctorApproved: false }
};
const pages = [...document.querySelectorAll('[data-page]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const toastBox = document.querySelector('#toast');
const sheet = document.querySelector('#sheet');
const app = document.querySelector('#app');
const sheetClose = document.querySelector('#sheet-close');
const pickupInput = document.querySelector('#pickup');
const dropoffInput = document.querySelector('#dropoff');
const weightSelect = document.querySelector('#weight');
const quoteButton = document.querySelector('#calculate-price');
const quoteBox = document.querySelector('#price-estimate');
const distanceReadout = document.querySelector('#route-distance');
const massageAddressInput = document.querySelector('#massage-address');
const massageLocationFields = document.querySelector('#home-visit-fields');
const massageLocationButton = document.querySelector('#massage-share-location');
const massageExtras = document.querySelector('#massage-extras');
const iceBathInput = document.querySelector('#ice-bath');
const medicalApproval = document.querySelector('#medical-approval');
const doctorApprovalInput = document.querySelector('#doctor-approval');
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

function navigate(name) { window.location.hash = name; }

function toast(message) {
  toastBox.textContent = message;
  toastBox.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastBox.classList.remove('is-visible'), 2600);
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

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
}

function resetEstimate() {
  state.estimate = null;
  quoteBox.hidden = true;
  quoteBox.innerHTML = '';
  distanceReadout.textContent = 'ייחשב לפי מסלול';
}

function roadBand(distanceKm) {
  if (distanceKm <= 3) return 'עד 3 ק״מ';
  if (distanceKm <= 8) return '3–8 ק״מ';
  if (distanceKm <= 15) return '8–15 ק״מ';
  return 'מעל 15 ק״מ';
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('service unavailable');
  return response.json();
}

async function geocodeAddress(address) {
  const endpoint = new URL('https://nominatim.openstreetmap.org/search');
  endpoint.search = new URLSearchParams({ format: 'jsonv2', limit: '1', countrycodes: 'il', 'accept-language': 'he', q: address });
  const results = await fetchJson(endpoint);
  if (!results[0]) throw new Error('address not found');
  return { lat: Number(results[0].lat), lon: Number(results[0].lon) };
}

async function reverseGeocode({ lat, lon }) {
  const endpoint = new URL('https://nominatim.openstreetmap.org/reverse');
  endpoint.search = new URLSearchParams({ format: 'jsonv2', 'accept-language': 'he', lat, lon });
  const result = await fetchJson(endpoint);
  if (!result.display_name) throw new Error('address not found');
  return result.display_name;
}

function showManualQuote() {
  state.estimate = { manual: true };
  distanceReadout.textContent = 'נדרש תמחור ידני';
  quoteBox.hidden = false;
  quoteBox.innerHTML = '<strong>נדרש תמחור ידני</strong><span>במשלוחים מעל 10 ק״ג ניצור איתך קשר עם הצעת מחיר מותאמת.</span>';
}

function showEstimate({ distanceKm, kmCharge, weightCharge, total }) {
  state.estimate = { distanceKm, kmCharge, weightCharge, total, manual: false };
  distanceReadout.textContent = `${distanceKm.toFixed(1)} ק״מ · ${roadBand(distanceKm)}`;
  quoteBox.hidden = false;
  quoteBox.innerHTML = `<div><span>מחיר משוער</span><strong>₪${total}</strong></div><p>₪${pricing.base} דמי פתיחה + ₪${kmCharge} מרחק${weightCharge ? ` + ₪${weightCharge} משקל` : ''}</p><small>מחיר משוער בלבד לפני אישור השליחות.</small>`;
}

async function calculatePrice() {
  const pickup = pickupInput.value.trim();
  const dropoff = dropoffInput.value.trim();
  const selectedWeight = weightSelect.value;
  if (!pickup || !dropoff) {
    toast('יש להזין כתובת איסוף וכתובת יעד לפני חישוב המחיר');
    return;
  }
  if (selectedWeight === 'מעל 10 ק״ג') {
    showManualQuote();
    return;
  }

  quoteButton.disabled = true;
  quoteButton.textContent = 'מחשבים מסלול ומחיר…';
  try {
    const origin = state.pickupCoords || await geocodeAddress(pickup);
    const destination = await geocodeAddress(dropoff);
    const routeUrl = `https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=false`;
    const route = await fetchJson(routeUrl);
    const meters = route.routes?.[0]?.distance;
    if (!Number.isFinite(meters)) throw new Error('route not found');
    const distanceKm = Math.max(0.5, meters / 1000);
    const kmCharge = Math.ceil(distanceKm) * pricing.perKm;
    const weightCharge = pricing.weight[selectedWeight] ?? 0;
    const total = Math.max(pricing.minimum, pricing.base + kmCharge + weightCharge);
    showEstimate({ distanceKm, kmCharge, weightCharge, total });
  } catch {
    toast('לא הצלחנו לחשב מסלול. בדוק את שתי הכתובות ונסה שוב.');
  } finally {
    quoteButton.disabled = false;
    quoteButton.textContent = 'חשב מחיר משוער';
  }
}

async function useCurrentLocation() {
  const locationButton = document.querySelector('#share-location');
  if (!navigator.geolocation) {
    toast('שיתוף מיקום אינו נתמך בדפדפן זה. אפשר להזין כתובת ידנית.');
    return;
  }
  locationButton.disabled = true;
  locationButton.textContent = 'מאתרים את המיקום…';
  navigator.geolocation.getCurrentPosition(async position => {
    const coords = { lat: position.coords.latitude, lon: position.coords.longitude };
    state.pickupCoords = coords;
    try {
      pickupInput.value = await reverseGeocode(coords);
      toast('כתובת האיסוף זוהתה. אפשר לתקן אותה במידת הצורך.');
    } catch {
      pickupInput.value = `${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)}`;
      toast('המיקום נשמר, אך לא אותרה כתובת מלאה. אפשר להשלים ידנית.');
    } finally {
      resetEstimate();
      locationButton.disabled = false;
      locationButton.textContent = '⌖ שתף את המיקום שלי';
    }
  }, () => {
    toast('לא התקבלה הרשאה למיקום. אפשר להזין כתובת ידנית.');
    locationButton.disabled = false;
    locationButton.textContent = '⌖ שתף את המיקום שלי';
  }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
}

function updateMassageExtras() {
  const items = state.massage.location === 'home'
    ? ['<li><span>טיפול בבית הלקוח</span><b>תוספת הגעה לפי מרחק ב־WhatsApp</b></li>']
    : ['<li><span>מיקום הטיפול</span><b>בקליניקה</b></li>'];
  items.push(state.massage.iceBath
    ? '<li><span>אמבטיית קרח</span><b>₪25 · בכפוף לאישור רופא</b></li>'
    : '<li><span>אמבטיית קרח</span><b>לא נבחרה</b></li>');
  massageExtras.innerHTML = `<strong>תוספות להזמנה</strong><ul>${items.join('')}</ul>`;
}

function useMassageLocation() {
  if (!navigator.geolocation) {
    toast('שיתוף מיקום אינו נתמך בדפדפן זה. אפשר להזין כתובת ידנית.');
    return;
  }
  massageLocationButton.disabled = true;
  massageLocationButton.textContent = 'מאתרים את המיקום…';
  navigator.geolocation.getCurrentPosition(async position => {
    const coords = { lat: position.coords.latitude, lon: position.coords.longitude };
    state.massage.homeCoords = coords;
    try {
      massageAddressInput.value = await reverseGeocode(coords);
      state.massage.homeAddress = massageAddressInput.value.trim();
      toast('כתובת הטיפול זוהתה. אפשר לתקן אותה במידת הצורך.');
    } catch {
      massageAddressInput.value = `${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)}`;
      state.massage.homeAddress = massageAddressInput.value;
      toast('המיקום נשמר, אך לא אותרה כתובת מלאה. אפשר להשלים ידנית.');
    } finally {
      massageLocationButton.disabled = false;
      massageLocationButton.textContent = '⌖ שתף את המיקום שלי';
    }
  }, () => {
    toast('לא התקבלה הרשאה למיקום. אפשר להזין כתובת ידנית.');
    massageLocationButton.disabled = false;
    massageLocationButton.textContent = '⌖ שתף את המיקום שלי';
  }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
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
  if (state.massage.location === 'home' && !massageAddressInput.value.trim()) {
    toast('יש להזין כתובת לטיפול בבית הלקוח או לשתף מיקום');
    return;
  }
  if (state.massage.iceBath && !state.massage.doctorApproved) {
    toast('יש לאשר שקיים אישור רופא תקף עבור אמבטיית הקרח');
    return;
  }
  const location = state.massage.location === 'home'
    ? `טיפול בבית הלקוח: ${massageAddressInput.value.trim()}. תוספת ההגעה תיקבע לפי המרחק בשלב ה־WhatsApp.`
    : 'מיקום הטיפול: בקליניקה.';
  const iceBath = state.massage.iceBath
    ? 'אמבטיית קרח נוספה בתוספת ₪25, בכפוף לאישור הרופא שאישרת.'
    : 'ללא אמבטיית קרח.';
  showSheet('פרטי הטיפול נשמרו', `טיפול: ${state.treatment}. ${location} ${iceBath} בשלב הבא נבחר מועד ונמשיך לתיאום.`);
});

document.querySelectorAll('[data-massage-location]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-massage-location]').forEach(item => {
    item.classList.remove('is-selected');
    item.setAttribute('aria-pressed', 'false');
  });
  button.classList.add('is-selected');
  button.setAttribute('aria-pressed', 'true');
  state.massage.location = button.dataset.massageLocation;
  massageLocationFields.hidden = state.massage.location !== 'home';
  updateMassageExtras();
}));

massageAddressInput.addEventListener('input', () => {
  state.massage.homeCoords = null;
  state.massage.homeAddress = massageAddressInput.value.trim();
});
massageLocationButton.addEventListener('click', useMassageLocation);
iceBathInput.addEventListener('change', () => {
  state.massage.iceBath = iceBathInput.checked;
  if (!state.massage.iceBath) {
    doctorApprovalInput.checked = false;
    state.massage.doctorApproved = false;
  }
  medicalApproval.hidden = !state.massage.iceBath;
  updateMassageExtras();
});
doctorApprovalInput.addEventListener('change', () => { state.massage.doctorApproved = doctorApprovalInput.checked; });
updateMassageExtras();

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

pickupInput.addEventListener('input', () => { state.pickupCoords = null; resetEstimate(); });
dropoffInput.addEventListener('input', resetEstimate);
weightSelect.addEventListener('change', resetEstimate);
document.querySelector('#share-location').addEventListener('click', useCurrentLocation);
quoteButton.addEventListener('click', calculatePrice);

document.querySelector('#delivery-form').addEventListener('submit', event => {
  event.preventDefault();
  const pickup = pickupInput.value.trim();
  const dropoff = dropoffInput.value.trim();
  if (!pickup || !dropoff) {
    toast('יש להזין כתובת איסוף וכתובת יעד');
    return;
  }
  if (!state.estimate) {
    toast('לחץ על „חשב מחיר משוער” לפני המשך לסיכום');
    return;
  }
  const summary = document.querySelector('#delivery-summary');
  const price = state.estimate.manual ? 'ייקבע ידנית לאחר בדיקת המשקל' : `₪${state.estimate.total} — מחיר משוער`;
  summary.hidden = false;
  summary.innerHTML = `<strong>סיכום בקשת השליחות</strong><br>סוג: ${escapeHtml(state.package)}<br>משקל: ${escapeHtml(weightSelect.value)} · מרחק: ${escapeHtml(distanceReadout.textContent)}<br>איסוף: ${escapeHtml(pickup)}<br>יעד: ${escapeHtml(dropoff)}<br>מועד: ${escapeHtml(state.time)}<br>מחיר: ${escapeHtml(price)}<br><span>זהו מסך הדגמה — עדיין לא נשלחה בקשה אמיתית או חיוב.</span>`;
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
