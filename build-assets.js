const fs = require('fs');

// 1. Minify CSS safely
const rawCss = fs.readFileSync('assets/css/styles.css', 'utf-8');
const minCss = rawCss
  // Remove multi-line comments
  .replace(/\/\*[\s\S]*?\*\//g, '')
  // Replace newlines with spaces
  .replace(/\r?\n/g, ' ')
  // Collapse consecutive whitespace
  .replace(/\s+/g, ' ')
  // Remove spaces around CSS syntax tokens
  .replace(/\s*([{}:;,>])\s*/g, (match) => match.trim())
  // Remove trailing semicolons before closing brace
  .replace(/;}/g, '}')
  .trim();

fs.writeFileSync('assets/css/styles.min.css', minCss, 'utf-8');
console.log('CSS Minification: SUCCESS (Size:', minCss.length, 'bytes)');

// 2. Prepare main.min.js safely
const jsCode = `document.addEventListener('DOMContentLoaded', () => {
  const CHECKOUT_URL = 'https://kiwify.app/ofn5te6';
  const heroScrollButtons = document.querySelectorAll('.js-scroll-to-offer');
  heroScrollButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const offerSection = document.getElementById('oferta');
      if (offerSection) {
        offerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  const checkoutButtons = document.querySelectorAll('.js-checkout-btn');
  checkoutButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (CHECKOUT_URL && CHECKOUT_URL !== '#oferta' && !CHECKOUT_URL.includes('exemplo')) {
        btn.setAttribute('href', CHECKOUT_URL);
      } else {
        const offerSection = document.getElementById('oferta');
        if (offerSection && btn.getAttribute('href') === '#oferta') {
          e.preventDefault();
          offerSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  const timerElement = document.getElementById('countdown-timer');
  function updateCountdown() {
    if (!timerElement) return;
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    let diff = endOfDay.getTime() - now.getTime();
    if (diff <= 0) {
      diff = 1000 * 60 * 60 * 6;
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const pad = (n) => String(n).padStart(2, '0');
    timerElement.textContent = \`\${pad(hours)}:\${pad(minutes)}:\${pad(seconds)}\`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
  const videoPlayer = document.getElementById('simulated-video-player');
  if (videoPlayer) {
    videoPlayer.addEventListener('click', () => {
      const checkoutBtn = document.querySelector('.offer-box-white .js-checkout-btn') || document.querySelector('.js-checkout-btn');
      if (checkoutBtn) {
        checkoutBtn.classList.remove('cta-highlight-active');
        void checkoutBtn.offsetWidth;
        checkoutBtn.classList.add('cta-highlight-active');
        checkoutBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => {
          checkoutBtn.classList.remove('cta-highlight-active');
        }, 1400);
      }
    });
  }
});`;

fs.writeFileSync('assets/js/main.min.js', jsCode, 'utf-8');
console.log('JS Minification: SUCCESS (Size:', jsCode.length, 'bytes)');
