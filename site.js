// הגדרות האתר — מקום אחד לעדכן קישורים.
// null = עוד אין קישור, והכפתור יציג "בקרוב".
const SITE = {
  buyUrl: null,          // קישור לרכישת הלוח באתר החנות הקיים
  appStoreUrl: null,     // יתעדכן כשהאפליקציה תעלה ל-App Store
  playStoreUrl: null,    // יתעדכן כשהאפליקציה תעלה ל-Google Play
  email: 'hello@quishrish.com',
};

document.addEventListener('DOMContentLoaded', () => {
  // תפריט במובייל
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    links.addEventListener('click', (e) => { if (e.target.tagName === 'A') links.classList.remove('open'); });
  }

  // קישורים שמגיעים מההגדרות
  document.querySelectorAll('[data-link]').forEach((el) => {
    const url = SITE[el.dataset.link];
    if (url) {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener';
    } else {
      el.removeAttribute('href');
      el.setAttribute('aria-disabled', 'true');
      if (el.dataset.soon) el.textContent = el.dataset.soon;
    }
  });
  document.querySelectorAll('[data-email]').forEach((el) => {
    el.textContent = SITE.email;
    el.href = 'mailto:' + SITE.email;
  });
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
});
