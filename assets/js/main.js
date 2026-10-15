/**
 * AULA SECRETA - FAZENDO ACONTECER
 * Scripts de Interatividade e Conversão
 */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================================
  // CONFIGURAÇÃO DO CHECKOUT
  // Substitua este link pelo seu link da Kiwify, Hotmart, Eduzz, etc.
  // ============================================================
  const CHECKOUT_URL = 'https://kiwify.app/ofn5te6'; // Insira aqui o link final de checkout

  // ============================================================
  // ROLAGEM SUAVE ATÉ A OFERTA (BOTÃO DA HERO SECTION)
  // ============================================================
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

  // Aplicar link nos botões que levam ao checkout
  const checkoutButtons = document.querySelectorAll('.js-checkout-btn');
  checkoutButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (CHECKOUT_URL && CHECKOUT_URL !== '#oferta' && !CHECKOUT_URL.includes('exemplo')) {
        // Se já tiver uma URL real configurada, redireciona diretamente
        btn.setAttribute('href', CHECKOUT_URL);
      } else {
        // Se ainda for demonstração/ancoragem interna, rola suavemente até a oferta
        const offerSection = document.getElementById('oferta');
        if (offerSection && btn.getAttribute('href') === '#oferta') {
          e.preventDefault();
          offerSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ============================================================
  // 1. CONTADOR REGRESSIVO DINÂMICO (Até 23:59 de Hoje)
  // ============================================================
  const timerElement = document.getElementById('countdown-timer');

  function updateCountdown() {
    if (!timerElement) return;

    const now = new Date();
    // Define o fim para as 23:59:59 do dia atual
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    
    let diff = endOfDay.getTime() - now.getTime();

    if (diff <= 0) {
      diff = 1000 * 60 * 60 * 6; // Mantém a urgência ativa
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    timerElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ============================================================
  // 2. MOCKUP DE PLAYER DE VÍDEO INTERATIVO (OFERTA FINAL)
  // ============================================================
  const videoPlayer = document.getElementById('simulated-video-player');
  if (videoPlayer) {
    videoPlayer.addEventListener('click', () => {
      const checkoutBtn = document.querySelector('.offer-box-white .js-checkout-btn') || document.querySelector('.js-checkout-btn');
      if (checkoutBtn) {
        // Dispara o leve destaque no botão de compra
        checkoutBtn.classList.remove('cta-highlight-active');
        void checkoutBtn.offsetWidth; // Força reflow do navegador
        checkoutBtn.classList.add('cta-highlight-active');

        // Garante que o botão esteja visível na tela
        checkoutBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Remove a classe após a animação
        setTimeout(() => {
          checkoutBtn.classList.remove('cta-highlight-active');
        }, 1400);
      }
    });
  }
});
