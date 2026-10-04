const pricing = { base: 20, perKm: 5, minimum: 25, weight: { under2: 0, twoToFive: 5, fiveToTen: 10 } };
const business = { whatsapp: '9725487641111' };
const settingsKey = 'callphon.settings.v1';
const profileKey = 'callphon.profile.v1';

const translations = {
  he: {
    app: { title: 'CALLPHON | שליחויות פרטיות', description: 'CALLPHON — שליחויות פרטיות, מהירות ואחראיות.' },
    brand: { tagline: 'שליחויות פרטיות' },
    home: { question: 'מה תרצה היום?', services: 'בחירת שליחות', chooseMassage: 'בחר סוג טיפול', massageSub: 'רוגע שמתחיל עכשיו', chooseDelivery: 'בחר סוג שליחות', deliverySub: 'מגיעים עד אליך', welcome: 'ברוך שובך' },
    images: { massage: 'מעסה ומטופל במהלך עיסוי מקצועי', delivery: 'שליח על אופניים עם חבילה' },
    nav: { label: 'ניווט תחתון', home: 'בית', orders: 'ההזמנות שלי', profile: 'פרופיל' },
    menu: { label: 'תפריט ראשי', massage: 'בחירת טיפול', delivery: 'בקשת שליחות' },
    contact: { whatsapp: 'צור קשר ב־WhatsApp', heroEyebrow: 'שליחות או שאלה? אנחנו כאן בשבילך', heroWhatsapp: 'שלחו לנו הודעה ב־WhatsApp', pending: 'פתיחת WhatsApp עם CALLPHON', unavailable: 'לא ניתן לפתוח כרגע את WhatsApp.' },
    settings: { label: 'הגדרות', title: 'הגדרות תצוגה', language: 'שפה', theme: 'מראה', light: 'בהיר', dark: 'כהה' },
    carousel: {
      label: 'מסרי שליחויות', tabs: 'בחירת מסר בקרוסלה', slideAria: 'שקופית {n} מתוך {total}', tabAria: 'הצג שקופית {n}',
      delivery1: { eyebrow: 'קו שליחויות חדש', title: 'אחריות ואמינות בכל מסירה', text: 'מגיעים אליך בדיוק כשחשוב.', alt: 'לקוחה מקבלת חבילה משליח אופניים בפתח הבית' },
      massage1: { eyebrow: 'זמן לעצמך', title: 'הרשה לעצמך לטפל בך', text: 'מגע מקצועי לשחרור, איזון וחידוש כוחות.', alt: 'מעסה מעניק עיסוי מקצועי למטופל בחדר טיפול רגוע' },
      delivery2: { eyebrow: 'יחס אישי', title: 'שירות שתכירו ותוקירו', text: 'כל שליחות מקבלת את תשומת הלב שלה.', alt: 'שליח מוסר חבילה אישית לעסק מקומי' },
      cupping: { eyebrow: 'טיפול ממוקד', title: 'שילוב כוסות רוח לשחרור עמוק', text: 'טיפול אישי שמתחיל בהקשבה לגוף.', alt: 'מעסה מניח כוסות רוח לאורך גב המטופל בטיפול מקצועי' },
      delivery3: { eyebrow: 'בדרך שלך', title: 'מוסרים באחריות. מגיעים באמינות.', text: 'מהדלת שלך ועד היעד — בידיים טובות.', alt: 'שליח מוסר חבילת מתנה ללקוחה בפתח הבית' },
      reflexology: { eyebrow: 'איזון שמתחיל בכפות הרגליים', title: 'רוגע עמוק. חידוש כוחות.', text: 'רפלקסולוגיה שמחזירה אותך לעצמך.', alt: 'מעסה מבצע טיפול רפלקסולוגיה למטופל רגוע' }
    },
    massage: { heading: 'בחירת טיפול', subheading: 'קח רגע לעצמך. אנחנו כאן בשבילך.', introTitle: 'איזה טיפול יעשה לך טוב היום?', introText: 'בחר טיפול ונמשיך יחד לקביעת המועד המתאים.', types: 'סוגי הטיפול שלנו', location: 'מיקום הטיפול', clinic: 'בקליניקה', home: 'בבית הלקוח', address: 'כתובת הטיפול', addressPlaceholder: 'רחוב, מספר ועיר', travelNote: 'תוספת ההגעה תחושב לפי מרחק ותתואם איתך בשלב ה־WhatsApp.', before: 'לפני הטיפול', iceBath: 'אמבטיית קרח לפני הטיפול', iceBathSub: 'תוספת להתאוששות ולרענון לפני העיסוי', doctorApproval: 'יש בידי אישור רופא תקף', doctorApprovalSub: 'אני מבין/ה שאמבטיית קרח תתווסף רק בכפוף לאישור רופא.', continue: 'המשך לסיכום הטיפול', extras: 'תוספות להזמנה', homeVisit: 'טיפול בבית הלקוח', travelWhatsapp: 'תוספת הגעה לפי מרחק ב־WhatsApp', notChosen: 'לא נבחרה', selectedTitle: 'פרטי הטיפול נשמרו', selectedText: 'טיפול: {treatment}. {location} {iceBath} בשלב הבא נבחר מועד ונמשיך לתיאום.', clinicSummary: 'מיקום הטיפול: בקליניקה.', homeSummary: 'טיפול בבית הלקוח: {address}. תוספת ההגעה תיקבע לפי המרחק בשלב ה־WhatsApp.', iceBathSummary: 'אמבטיית קרח נוספה בתוספת ₪25, בכפוף לאישור הרופא שאישרת.', noIceBath: 'ללא אמבטיית קרח.', missingAddress: 'יש להזין כתובת לטיפול בבית הלקוח או לשתף מיקום.', missingDoctor: 'יש לאשר שקיים אישור רופא תקף עבור אמבטיית הקרח.' },
    treatment: { reflexology: 'רפלקסולוגיה', reflexologySub: 'איזון, הקלה ורוגע דרך כפות הרגליים', swedish: 'עיסוי שבדי מרגיע ומשחרר', swedishSub: 'מגע עדין לשחרור מתח והחזרת אנרגיה', sports: 'עיסוי ספורטאים עמוק', sportsSub: 'לעומס שרירי, התאוששות וטווח תנועה', cupping: 'שילוב כוסות רוח', cuppingSub: 'טיפול ממוקד לשחרור והמרצת הגוף' },
    location: { share: '⌖ שתף את המיקום שלי', locating: 'מאתרים את המיקום…', unsupported: 'שיתוף מיקום אינו נתמך בדפדפן זה. אפשר להזין כתובת ידנית.', denied: 'לא התקבלה הרשאה למיקום. אפשר להזין כתובת ידנית.', detected: 'כתובת האיסוף זוהתה. אפשר לתקן אותה במידת הצורך.', detectedMassage: 'כתובת הטיפול זוהתה. אפשר לתקן אותה במידת הצורך.', saved: 'המיקום נשמר, אך לא אותרה כתובת מלאה. אפשר להשלים ידנית.' },
    delivery: { heading: 'בקשת שליחות', subheading: 'כמה פרטים ונוכל להתקדם.', introTitle: 'מה נשלח היום?', introText: 'בחר את סוג המשלוח, את נקודות האיסוף והיעד — ואנחנו נדאג להמשך.', package: 'סוג המשלוח', details: 'פרטי השליחות', weight: 'משקל משוער', distance: 'מרחק נסיעה', distancePending: 'ייחשב לפי מסלול', pickup: 'כתובת איסוף', dropoff: 'כתובת יעד', addressPlaceholder: 'רחוב, מספר ועיר', when: 'מתי?', quote: 'חשב מחיר משוער', quoteLoading: 'מחשבים מסלול ומחיר…', continue: 'המשך לסיכום', missingAddress: 'יש להזין כתובת איסוף וכתובת יעד לפני חישוב המחיר.', routeFail: 'לא הצלחנו לחשב מסלול. בדוק את שתי הכתובות ונסה שוב.', manual: 'נדרש תמחור ידני', manualText: 'במשלוחים מעל 10 ק״ג ניצור איתך קשר עם הצעת מחיר מותאמת.', estimated: 'מחיר משוער', estimateOnly: 'מחיר משוער בלבד לפני אישור השליחות.', submitAddress: 'יש להזין כתובת איסוף וכתובת יעד.', submitQuote: 'לחץ על „חשב מחיר משוער” לפני המשך לסיכום.', summaryTitle: 'סיכום בקשת השליחות', type: 'סוג', weightLabel: 'משקל', distanceLabel: 'מרחק', pickupLabel: 'איסוף', dropoffLabel: 'יעד', timeLabel: 'מועד', priceLabel: 'מחיר', demo: 'זהו מסך הדגמה — עדיין לא נשלחה בקשה אמיתית או חיוב.', bandShort: 'עד 3 ק״מ', bandMedium: '3–8 ק״מ', bandLong: '8–15 ק״מ', bandExtra: 'מעל 15 ק״מ' },
    package: { small: 'חבילה קטנה', smallSub: 'מסמכים, מתנה או ציוד קל', medium: 'חבילה בינונית', mediumSub: 'קופסה או שקית גדולה' },
    weight: { under2: 'עד 2 ק״ג', twoToFive: '2–5 ק״ג', fiveToTen: '5–10 ק״ג', overTen: 'מעל 10 ק״ג' },
    time: { now: 'עכשיו', scheduled: 'מתוזמן' },
    orders: { heading: 'ההזמנות שלי', text: 'בשלב הבא יוצגו כאן התורים והשליחויות שלך.' },
    profile: { heading: 'הפרופיל שלי', subheading: 'כמה פרטים קטנים לחוויה אישית יותר.', introTitle: 'נעים להכיר', introText: 'בחר/י אווטר או העלה/י תמונה, ושמור/י את הפרטים לתצוגה אישית במכשיר זה.', uploadPhoto: 'העלה תמונה', firstName: 'שם פרטי', namePlaceholder: 'איך נעים לפנות אליך?', email: 'כתובת מייל', phone: 'טלפון נייד', gender: 'איך לפנות אליך?', female: 'אישה', male: 'גבר', avatar: 'בחר/י אווטר', localNote: 'גרסת הכנה: הפרטים נשמרים מקומית במכשיר זה בלבד, עד לחיבור מאובטח ל־Firebase.', save: 'שמור פרופיל להדגמה', missing: 'יש למלא שם, מייל, טלפון ולבחור אופן פנייה.', invalidEmail: 'יש להזין כתובת מייל תקינה.', invalidPhone: 'יש להזין מספר טלפון תקין.', saved: 'הפרופיל נשמר לתצוגה אישית במכשיר זה. Firebase יופעל לפני ההשקה.' },
    sheet: { close: 'חזרה לבחירה' }, backHome: 'חזרה לדף הבית'
  },
  en: {
    app: { title: 'CALLPHON | Private Delivery', description: 'CALLPHON — private, fast and reliable delivery.' },
    brand: { tagline: 'Private Delivery' },
    home: { question: 'What would you like today?', services: 'Choose a delivery', chooseMassage: 'Choose a treatment', massageSub: 'Your calm begins now', chooseDelivery: 'Choose a delivery', deliverySub: 'We come to you', welcome: 'Welcome back' },
    images: { massage: 'Therapist and client during a professional massage', delivery: 'Bicycle courier with a package' },
    nav: { label: 'Bottom navigation', home: 'Home', orders: 'My bookings', profile: 'Profile' },
    menu: { label: 'Main menu', massage: 'Choose a treatment', delivery: 'Delivery request' },
    contact: { whatsapp: 'Contact us on WhatsApp', heroEyebrow: 'Delivery or a question? We are here', heroWhatsapp: 'Message us on WhatsApp', pending: 'Open WhatsApp with CALLPHON', unavailable: 'WhatsApp is not available right now.' },
    settings: { label: 'Settings', title: 'Display settings', language: 'Language', theme: 'Appearance', light: 'Light', dark: 'Dark' },
    carousel: {
      label: 'Delivery messages', tabs: 'Choose a carousel message', slideAria: 'Slide {n} of {total}', tabAria: 'Open slide {n}',
      delivery1: { eyebrow: 'A new delivery line', title: 'Responsibility and reliability in every handoff', text: 'We arrive when it matters most.', alt: 'Customer receiving a package from a bicycle courier at her door' },
      massage1: { eyebrow: 'Time for yourself', title: 'Give yourself the care you deserve', text: 'Professional touch for release, balance and renewed energy.', alt: 'Therapist giving a professional massage to a client in a calm room' },
      delivery2: { eyebrow: 'Personal attention', title: 'Service you will know and appreciate', text: 'Every delivery gets the attention it deserves.', alt: 'Courier handing a personal package to a local business' },
      cupping: { eyebrow: 'Focused care', title: 'Cupping therapy for deep release', text: 'Personal care that starts by listening to your body.', alt: 'Therapist applying cupping cups along a client back' },
      delivery3: { eyebrow: 'Your way', title: 'Delivered responsibly. Arriving reliably.', text: 'From your door to the destination — in good hands.', alt: 'Courier handing a gift package to a customer at her door' },
      reflexology: { eyebrow: 'Balance starts at your feet', title: 'Deep calm. Renewed energy.', text: 'Reflexology that brings you back to yourself.', alt: 'Therapist giving reflexology to a relaxed client' }
    },
    massage: { heading: 'Choose a treatment', subheading: 'Take a moment for yourself. We are here for you.', introTitle: 'What treatment would feel good today?', introText: 'Choose a treatment and we will find a suitable time together.', types: 'Our treatments', location: 'Treatment location', clinic: 'At the clinic', home: 'At your home', address: 'Treatment address', addressPlaceholder: 'Street, number and city', travelNote: 'The travel supplement is calculated by distance and coordinated on WhatsApp.', before: 'Before the treatment', iceBath: 'Ice bath before treatment', iceBathSub: 'An extra for recovery and refreshment before the massage', doctorApproval: 'I have valid doctor approval', doctorApprovalSub: 'I understand an ice bath can only be added with doctor approval.', continue: 'Continue to treatment summary', extras: 'Booking extras', homeVisit: 'Treatment at your home', travelWhatsapp: 'Travel supplement by distance on WhatsApp', notChosen: 'Not selected', selectedTitle: 'Treatment details saved', selectedText: 'Treatment: {treatment}. {location} {iceBath} Next, we will choose a time and coordinate.', clinicSummary: 'Treatment location: clinic.', homeSummary: 'Treatment at your home: {address}. The travel supplement will be set by distance on WhatsApp.', iceBathSummary: 'Ice bath added for ₪25, subject to the doctor approval you confirmed.', noIceBath: 'No ice bath.', missingAddress: 'Enter a home-treatment address or share your location.', missingDoctor: 'Confirm that you have valid doctor approval for the ice bath.' },
    treatment: { reflexology: 'Reflexology', reflexologySub: 'Balance, comfort and calm through the feet', swedish: 'Relaxing Swedish massage', swedishSub: 'Gentle touch to release tension and restore energy', sports: 'Deep sports massage', sportsSub: 'For muscle load, recovery and range of motion', cupping: 'Cupping therapy', cuppingSub: 'Focused care for release and body refreshment' },
    location: { share: '⌖ Share my location', locating: 'Finding your location…', unsupported: 'Location sharing is not supported in this browser. You can enter an address manually.', denied: 'Location permission was not granted. You can enter an address manually.', detected: 'Pickup address found. You can correct it if needed.', detectedMassage: 'Treatment address found. You can correct it if needed.', saved: 'Location saved, but no full address was found. You can complete it manually.' },
    delivery: { heading: 'Delivery request', subheading: 'A few details and we can get started.', introTitle: 'What are we sending today?', introText: 'Choose the delivery type, pickup and destination — we will take it from there.', package: 'Delivery type', details: 'Delivery details', weight: 'Estimated weight', distance: 'Driving distance', distancePending: 'Calculated by route', pickup: 'Pickup address', dropoff: 'Destination address', addressPlaceholder: 'Street, number and city', when: 'When?', quote: 'Calculate estimated price', quoteLoading: 'Calculating route and price…', continue: 'Continue to summary', missingAddress: 'Enter pickup and destination addresses before calculating the price.', routeFail: 'We could not calculate a route. Check both addresses and try again.', manual: 'Manual quote required', manualText: 'For deliveries above 10 kg, we will contact you with a tailored quote.', estimated: 'Estimated price', estimateOnly: 'Estimated price only before delivery confirmation.', submitAddress: 'Enter pickup and destination addresses.', submitQuote: 'Select “Calculate estimated price” before continuing.', summaryTitle: 'Delivery request summary', type: 'Type', weightLabel: 'Weight', distanceLabel: 'Distance', pickupLabel: 'Pickup', dropoffLabel: 'Destination', timeLabel: 'Time', priceLabel: 'Price', demo: 'This is a demo screen — no live request or payment has been sent.', bandShort: 'Up to 3 km', bandMedium: '3–8 km', bandLong: '8–15 km', bandExtra: 'Over 15 km' },
    package: { small: 'Small package', smallSub: 'Documents, a gift or light items', medium: 'Medium package', mediumSub: 'A box or a large bag' },
    weight: { under2: 'Up to 2 kg', twoToFive: '2–5 kg', fiveToTen: '5–10 kg', overTen: 'Over 10 kg' },
    time: { now: 'Now', scheduled: 'Scheduled' },
    orders: { heading: 'My bookings', text: 'Your appointments and deliveries will appear here in the next stage.' },
    profile: { heading: 'My profile', subheading: 'A few details for a more personal experience.', introTitle: 'Nice to meet you', introText: 'Choose an avatar or upload a photo, then save your details for a personal preview on this device.', uploadPhoto: 'Upload a photo', firstName: 'First name', namePlaceholder: 'How should we address you?', email: 'Email address', phone: 'Mobile phone', gender: 'How should we address you?', female: 'Woman', male: 'Man', avatar: 'Choose an avatar', localNote: 'Preparation mode: details are saved only on this device until Firebase is connected securely.', save: 'Save demo profile', missing: 'Enter your name, email, phone number and select how we should address you.', invalidEmail: 'Enter a valid email address.', invalidPhone: 'Enter a valid phone number.', saved: 'Your profile was saved for a personal preview on this device. Firebase will be activated before launch.' },
    sheet: { close: 'Back to selection' }, backHome: 'Back to home'
  }
};

function getStored(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}

let settings = { language: 'he', theme: 'light', ...getStored(settingsKey, {}) };
let profile = { firstName: '', email: '', phone: '', gender: '', avatar: '🌿', photo: '', ...getStored(profileKey, {}) };
const state = {
  treatment: '', package: 'small', time: 'now', pickupCoords: null, estimate: null,
};

const pages = [...document.querySelectorAll('[data-page]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const toastBox = document.querySelector('#toast');
const sheet = document.querySelector('#sheet');
const app = document.querySelector('#app');
const sheetClose = document.querySelector('#sheet-close');
const menuBackdrop = document.querySelector('#menu-backdrop');
const menuOpen = document.querySelector('#menu-open');
const menuClose = document.querySelector('#menu-close');
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
const profileForm = document.querySelector('#profile-form');
const profileFirstName = document.querySelector('#profile-first-name');
const profileEmail = document.querySelector('#profile-email');
const profilePhone = document.querySelector('#profile-phone');
const profilePhoto = document.querySelector('#profile-photo');
const profilePhotoPreview = document.querySelector('#profile-photo-preview');
const profileAvatarPreview = document.querySelector('#profile-avatar-preview');
let toastTimer;
let priorFocus;
let menuFocus;

function valueAt(object, path) { return path.split('.').reduce((value, key) => value && value[key], object); }
function t(key) { return valueAt(translations[settings.language], key) || valueAt(translations.he, key) || key; }
function format(template, values) { return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? ''); }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]); }

function saveSettings() { localStorage.setItem(settingsKey, JSON.stringify(settings)); }
function saveLocalProfile() {
  const safeProfile = { firstName: profile.firstName, gender: profile.gender, avatar: profile.avatar };
  localStorage.setItem(profileKey, JSON.stringify(safeProfile));
}

function applySettings() {
  document.documentElement.lang = settings.language;
  document.documentElement.dir = settings.language === 'he' ? 'rtl' : 'ltr';
  document.documentElement.dataset.theme = settings.theme;
  document.title = t('app.title');
  document.querySelector('meta[name="description"]').content = t('app.description');
  document.querySelector('meta[name="theme-color"]').content = settings.theme === 'dark' ? '#0f211b' : '#17483a';
  document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = t(element.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-i18n-alt]').forEach(element => { element.alt = t(element.dataset.i18nAlt); });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => { element.setAttribute('aria-label', t(element.dataset.i18nAria)); });
  document.querySelectorAll('[data-language-choice]').forEach(button => button.classList.toggle('is-selected', button.dataset.languageChoice === settings.language));
  document.querySelectorAll('[data-theme-choice]').forEach(button => button.classList.toggle('is-selected', button.dataset.themeChoice === settings.theme));
  updateGreeting();
  if (state.estimate?.manual) showManualQuote();
  if (state.estimate && !state.estimate.manual) showEstimate(state.estimate);
  renderProfile();
  showCarouselSlide(activeCarouselSlide);
}

function updateGreeting() {
  const greeting = document.querySelector('#welcome-heading');
  greeting.textContent = profile.firstName ? `${t('home.welcome')}, ${profile.firstName}` : t('home.welcome');
}

function activePage() {
  const requested = (window.location.hash || '#home').slice(1);
  return pages.some(page => page.dataset.page === requested) ? requested : 'home';
}

function renderPage(name = activePage()) {
  pages.forEach(page => page.classList.toggle('is-active', page.dataset.page === name));
  navLinks.forEach(link => link.classList.toggle('is-active', link.dataset.target === name));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function navigate(name) { window.location.hash = name; closeMenu(); }

function toast(message) {
  toastBox.textContent = message;
  toastBox.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastBox.classList.remove('is-visible'), 2800);
}

function showSheet(title, text) {
  closeMenu();
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

function openMenu() {
  menuFocus = document.activeElement;
  menuBackdrop.classList.add('is-visible');
  menuBackdrop.setAttribute('aria-hidden', 'false');
  app.inert = true;
  menuClose.focus();
}
function closeMenu() {
  if (!menuBackdrop.classList.contains('is-visible')) return;
  menuBackdrop.classList.remove('is-visible');
  menuBackdrop.setAttribute('aria-hidden', 'true');
  app.inert = false;
  menuFocus?.focus();
}

function roadBand(distanceKm) {
  if (distanceKm <= 3) return t('delivery.bandShort');
  if (distanceKm <= 8) return t('delivery.bandMedium');
  if (distanceKm <= 15) return t('delivery.bandLong');
  return t('delivery.bandExtra');
}
function resetEstimate() {
  state.estimate = null;
  quoteBox.hidden = true;
  quoteBox.innerHTML = '';
  distanceReadout.textContent = t('delivery.distancePending');
}
async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('service unavailable');
  return response.json();
}
async function geocodeAddress(address) {
  const endpoint = new URL('https://nominatim.openstreetmap.org/search');
  endpoint.search = new URLSearchParams({ format: 'jsonv2', limit: '1', countrycodes: 'il', 'accept-language': settings.language, q: address });
  const results = await fetchJson(endpoint);
  if (!results[0]) throw new Error('address not found');
  return { lat: Number(results[0].lat), lon: Number(results[0].lon) };
}
async function reverseGeocode({ lat, lon }) {
  const endpoint = new URL('https://nominatim.openstreetmap.org/reverse');
  endpoint.search = new URLSearchParams({ format: 'jsonv2', 'accept-language': settings.language, lat, lon });
  const result = await fetchJson(endpoint);
  if (!result.display_name) throw new Error('address not found');
  return result.display_name;
}
function showManualQuote() {
  state.estimate = { manual: true };
  distanceReadout.textContent = t('delivery.manual');
  quoteBox.hidden = false;
  quoteBox.innerHTML = `<strong>${escapeHtml(t('delivery.manual'))}</strong><span>${escapeHtml(t('delivery.manualText'))}</span>`;
}
function showEstimate({ distanceKm, kmCharge, weightCharge, total }) {
  state.estimate = { distanceKm, kmCharge, weightCharge, total, manual: false };
  distanceReadout.textContent = `${distanceKm.toFixed(1)} km · ${roadBand(distanceKm)}`;
  quoteBox.hidden = false;
  quoteBox.innerHTML = `<div><span>${escapeHtml(t('delivery.estimated'))}</span><strong>₪${total}</strong></div><p>₪${pricing.base} + ₪${kmCharge}${weightCharge ? ` + ₪${weightCharge}` : ''}</p><small>${escapeHtml(t('delivery.estimateOnly'))}</small>`;
}
async function calculatePrice() {
  const pickup = pickupInput.value.trim();
  const dropoff = dropoffInput.value.trim();
  const selectedWeight = weightSelect.value;
  if (!pickup || !dropoff) { toast(t('delivery.missingAddress')); return; }
  if (selectedWeight === 'overTen') { showManualQuote(); return; }
  quoteButton.disabled = true;
  quoteButton.textContent = t('delivery.quoteLoading');
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
  } catch { toast(t('delivery.routeFail')); }
  finally { quoteButton.disabled = false; quoteButton.textContent = t('delivery.quote'); }
}
async function useCurrentLocation() {
  const locationButton = document.querySelector('#share-location');
  if (!navigator.geolocation) { toast(t('location.unsupported')); return; }
  locationButton.disabled = true;
  locationButton.textContent = t('location.locating');
  navigator.geolocation.getCurrentPosition(async position => {
    const coords = { lat: position.coords.latitude, lon: position.coords.longitude };
    state.pickupCoords = coords;
    try { pickupInput.value = await reverseGeocode(coords); toast(t('location.detected')); }
    catch { pickupInput.value = `${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)}`; toast(t('location.saved')); }
    finally { resetEstimate(); locationButton.disabled = false; locationButton.textContent = t('location.share'); }
  }, () => { toast(t('location.denied')); locationButton.disabled = false; locationButton.textContent = t('location.share'); }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
}

function updateMassageExtras() {
  const items = state.massage.location === 'home'
    ? [`<li><span>${escapeHtml(t('massage.homeVisit'))}</span><b>${escapeHtml(t('massage.travelWhatsapp'))}</b></li>`]
    : [`<li><span>${escapeHtml(t('massage.location'))}</span><b>${escapeHtml(t('massage.clinic'))}</b></li>`];
  items.push(state.massage.iceBath
    ? `<li><span>${escapeHtml(t('massage.iceBath'))}</span><b>₪25 · ${escapeHtml(t('massage.doctorApproval'))}</b></li>`
    : `<li><span>${escapeHtml(t('massage.iceBath'))}</span><b>${escapeHtml(t('massage.notChosen'))}</b></li>`);
  massageExtras.innerHTML = `<strong>${escapeHtml(t('massage.extras'))}</strong><ul>${items.join('')}</ul>`;
}
async function useMassageLocation() {
  if (!navigator.geolocation) { toast(t('location.unsupported')); return; }
  massageLocationButton.disabled = true;
  massageLocationButton.textContent = t('location.locating');
  navigator.geolocation.getCurrentPosition(async position => {
    const coords = { lat: position.coords.latitude, lon: position.coords.longitude };
    state.massage.homeCoords = coords;
    try { massageAddressInput.value = await reverseGeocode(coords); state.massage.homeAddress = massageAddressInput.value.trim(); toast(t('location.detectedMassage')); }
    catch { massageAddressInput.value = `${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)}`; state.massage.homeAddress = massageAddressInput.value; toast(t('location.saved')); }
    finally { massageLocationButton.disabled = false; massageLocationButton.textContent = t('location.share'); }
  }, () => { toast(t('location.denied')); massageLocationButton.disabled = false; massageLocationButton.textContent = t('location.share'); }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
}

function renderProfile(options = {}) {
  const syncFields = options.syncFields !== false;
  if (syncFields) {
    profileFirstName.value = profile.firstName || '';
    profileEmail.value = profile.email || '';
    profilePhone.value = profile.phone || '';
  }
  profileAvatarPreview.textContent = profile.avatar || '🌿';
  profilePhotoPreview.hidden = !profile.photo;
  if (profile.photo) profilePhotoPreview.src = profile.photo;
  document.querySelectorAll('[data-avatar]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.avatar === profile.avatar)));
  document.querySelectorAll('[data-gender]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.gender === profile.gender)));
}
function resetPhotoPreview() {
  profile.photo = '';
  profilePhotoPreview.hidden = true;
  profilePhotoPreview.removeAttribute('src');
}
function handleProfilePhoto(event) {
  const [file] = event.target.files;
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) { toast(settings.language === 'he' ? 'יש לבחור תמונה עד 2MB.' : 'Choose an image up to 2MB.'); event.target.value = ''; return; }
  const reader = new FileReader();
  reader.addEventListener('load', () => { profile.photo = String(reader.result); profilePhotoPreview.src = profile.photo; profilePhotoPreview.hidden = false; });
  reader.readAsDataURL(file);
}
function saveProfile(event) {
  event.preventDefault();
  const firstName = profileFirstName.value.trim();
  const email = profileEmail.value.trim();
  const phone = profilePhone.value.trim();
  if (!firstName || !email || !phone || !profile.gender) { toast(t('profile.missing')); return; }
  if (!/^\S+@\S+\.\S+$/.test(email)) { toast(t('profile.invalidEmail')); return; }
  if (phone.replace(/\D/g, '').length < 8) { toast(t('profile.invalidPhone')); return; }
  profile = { ...profile, firstName, email, phone };
  saveLocalProfile();
  updateGreeting();
  toast(t('profile.saved'));
  navigate('home');
}

menuOpen.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuBackdrop.addEventListener('click', event => { if (event.target === menuBackdrop) closeMenu(); });
document.querySelectorAll('[data-target]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.target)));
document.querySelectorAll('[data-language-choice]').forEach(button => button.addEventListener('click', () => { settings.language = button.dataset.languageChoice; saveSettings(); applySettings(); }));
document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => { settings.theme = button.dataset.themeChoice; saveSettings(); applySettings(); }));
function openWhatsapp() {
  if (!business.whatsapp) { toast(t('contact.unavailable')); return; }
  window.open(`https://wa.me/${business.whatsapp}`, '_blank', 'noopener');
}
document.querySelector('#whatsapp-contact').addEventListener('click', openWhatsapp);
document.querySelector('#whatsapp-hero').addEventListener('click', openWhatsapp);
window.addEventListener('hashchange', () => renderPage());
document.addEventListener('DOMContentLoaded', () => { applySettings(); renderPage(); });


document.querySelectorAll('.package-option').forEach(option => option.addEventListener('click', () => {
  document.querySelectorAll('.package-option').forEach(item => { item.classList.remove('is-selected'); item.setAttribute('aria-pressed', 'false'); });
  option.classList.add('is-selected'); option.setAttribute('aria-pressed', 'true'); state.package = option.dataset.package;
}));
document.querySelectorAll('[data-time]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-time]').forEach(item => { item.classList.remove('is-selected'); item.setAttribute('aria-pressed', 'false'); });
  button.classList.add('is-selected'); button.setAttribute('aria-pressed', 'true'); state.time = button.dataset.time;
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
  if (!pickup || !dropoff) { toast(t('delivery.submitAddress')); return; }
  if (!state.estimate) { toast(t('delivery.submitQuote')); return; }
  const summary = document.querySelector('#delivery-summary');
  const price = state.estimate.manual ? t('delivery.manual') : `₪${state.estimate.total} — ${t('delivery.estimated')}`;
  summary.hidden = false;
  summary.innerHTML = `<strong>${escapeHtml(t('delivery.summaryTitle'))}</strong><br>${escapeHtml(t('delivery.type'))}: ${escapeHtml(t(`package.${state.package}`))}<br>${escapeHtml(t('delivery.weightLabel'))}: ${escapeHtml(t(`weight.${weightSelect.value}`))} · ${escapeHtml(t('delivery.distanceLabel'))}: ${escapeHtml(distanceReadout.textContent)}<br>${escapeHtml(t('delivery.pickupLabel'))}: ${escapeHtml(pickup)}<br>${escapeHtml(t('delivery.dropoffLabel'))}: ${escapeHtml(dropoff)}<br>${escapeHtml(t('delivery.timeLabel'))}: ${escapeHtml(t(`time.${state.time}`))}<br>${escapeHtml(t('delivery.priceLabel'))}: ${escapeHtml(price)}<br><span>${escapeHtml(t('delivery.demo'))}</span>`;
  summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

profileForm.addEventListener('submit', saveProfile);
document.querySelector('#profile-photo-trigger').addEventListener('click', () => profilePhoto.click());
document.querySelector('#profile-photo-button').addEventListener('click', () => profilePhoto.click());
profilePhoto.addEventListener('change', handleProfilePhoto);
document.querySelectorAll('[data-avatar]').forEach(button => button.addEventListener('click', () => { profile.avatar = button.dataset.avatar; resetPhotoPreview(); renderProfile({ syncFields: false }); }));
document.querySelectorAll('[data-gender]').forEach(button => button.addEventListener('click', () => { profile.gender = button.dataset.gender; renderProfile({ syncFields: false }); }));

sheetClose.addEventListener('click', closeSheet);
sheet.addEventListener('click', event => { if (event.target === sheet) closeSheet(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && sheet.classList.contains('is-visible')) closeSheet();
  if (event.key === 'Escape' && menuBackdrop.classList.contains('is-visible')) closeMenu();
});

const serviceCarousel = document.querySelector('#service-carousel');
const carouselSlides = [...document.querySelectorAll('[data-carousel-slide]')];
const carouselControls = [...document.querySelectorAll('[data-carousel-control]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeCarouselSlide = 0;
let carouselTimer;
function showCarouselSlide(index) {
  if (!carouselSlides.length) return;
  activeCarouselSlide = (index + carouselSlides.length) % carouselSlides.length;
  carouselSlides.forEach((slide, itemIndex) => {
    const isActive = itemIndex === activeCarouselSlide;
    slide.classList.toggle('is-active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));
    slide.setAttribute('aria-label', format(t('carousel.slideAria'), { n: itemIndex + 1, total: carouselSlides.length }));
  });
  carouselControls.forEach((control, itemIndex) => {
    const isActive = itemIndex === activeCarouselSlide;
    control.classList.toggle('is-active', isActive);
    control.setAttribute('aria-selected', String(isActive));
    control.setAttribute('aria-label', format(t('carousel.tabAria'), { n: itemIndex + 1 }));
  });
}
function pauseCarousel() { clearInterval(carouselTimer); }
function startCarousel() { pauseCarousel(); if (!reducedMotion.matches && carouselSlides.length > 1) carouselTimer = window.setInterval(() => showCarouselSlide(activeCarouselSlide + 1), 5200); }
if (serviceCarousel && carouselSlides.length) {
  showCarouselSlide(0);
  carouselControls.forEach(control => control.addEventListener('click', () => { showCarouselSlide(Number(control.dataset.carouselControl)); startCarousel(); }));
  serviceCarousel.addEventListener('mouseenter', pauseCarousel);
  serviceCarousel.addEventListener('mouseleave', startCarousel);
  serviceCarousel.addEventListener('focusin', pauseCarousel);
  serviceCarousel.addEventListener('focusout', startCarousel);
  document.addEventListener('visibilitychange', () => document.hidden ? pauseCarousel() : startCarousel());
  reducedMotion.addEventListener('change', startCarousel);
  startCarousel();
}

applySettings();
renderPage();
