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

  // צילומי המסך: חצים + נקודות עמודים (במחשב רואים 4 בשורה, החץ מזיז 4)
  document.querySelectorAll('.shots').forEach((row) => {
    const box = document.createElement('div');
    box.className = 'shots-box';
    row.parentNode.insertBefore(box, row);
    box.appendChild(row);
    const rtl = document.documentElement.dir === 'rtl';
    const chev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
    const mk = (cls, label, d) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'shots-arrow ' + cls; b.setAttribute('aria-label', label);
      b.innerHTML = cls === 'next' ? chev.replace('M15 5l-7 7 7 7', 'M9 5l7 7-7 7') : chev;
      b.addEventListener('click', () => row.scrollBy({ left: d * (rtl ? -1 : 1) * (row.clientWidth + 22), behavior: 'smooth' }));
      box.appendChild(b);
      return b;
    };
    const prev = mk('prev', rtl ? 'הקודמים' : 'Previous', -1);
    const next = mk('next', rtl ? 'הבאים' : 'Next', 1);
    const dots = document.createElement('div');
    dots.className = 'shots-dots'; dots.setAttribute('aria-hidden', 'true');
    box.after(dots);
    const update = () => {
      const max = row.scrollWidth - row.clientWidth;
      const pos = Math.abs(row.scrollLeft);
      prev.disabled = pos < 4;
      next.disabled = pos > max - 4;
      const pages = Math.max(1, Math.round(row.scrollWidth / row.clientWidth));
      if (dots.children.length !== pages) dots.innerHTML = '<span></span>'.repeat(pages);
      const cur = max > 0 ? Math.round((pos / max) * (pages - 1)) : 0;
      [...dots.children].forEach((d, k) => d.classList.toggle('on', k === cur));
    };
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  });
});
