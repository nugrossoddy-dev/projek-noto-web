/**
 * NOTO — Marketing Website Controller
 * Public Landing Page Scripts & Seamless Navigation to Apps
 */

const CONFIG = {
  // Ganti URL ini dengan URL repository/domain aplikasi Anda di GitHub Pages
  // Contoh jika di-deploy ke GitHub Pages terpisah:
  // APP_URL: 'https://username.github.io/noto-apps/'
  // Default untuk development / local repo:
  APP_URL: '../apps/index.html'
};

// Smooth navigation to App
function goToApp(viewId = '', queryParams = {}) {
  let target = CONFIG.APP_URL;
  const params = new URLSearchParams(queryParams).toString();
  if (params) {
    target += (target.includes('?') ? '&' : '?') + params;
  }
  if (viewId) {
    target += '#' + viewId;
  }
  window.location.href = target;
}

// Plan selection from pricing cards
function selectPlan(planName, priceStr) {
  goToApp('app-premium', { plan: planName });
}

// Smooth scrolling to section
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// FAQ Accordion Toggle
function toggleFaq(el) {
  const item = el.parentElement;
  if (item) {
    item.classList.toggle('active');
  }
}

// Theme handling (Light / Dark)
const WebTheme = {
  init() {
    const saved = localStorage.getItem('noto_theme') || 'light';
    this.apply(saved);
  },
  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('noto_theme', theme);
    const btn = document.getElementById('web-theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌓';
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    this.apply(next);
  }
};

// Sync pricing if configured in shared localStorage
function syncPricing() {
  try {
    const cfg = JSON.parse(localStorage.getItem('noto_pricing_config') || 'null');
    if (cfg) {
      const mEl = document.getElementById('price-val-monthly');
      const yEl = document.getElementById('price-val-yearly');
      const sEl = document.getElementById('price-val-6month');
      if (mEl && cfg.monthly) mEl.textContent = `Rp${Number(cfg.monthly).toLocaleString('id-ID')}`;
      if (yEl && cfg.yearly) yEl.textContent = `Rp${Number(cfg.yearly).toLocaleString('id-ID')}`;
      if (sEl && cfg.sixMonth) sEl.textContent = `Rp${Number(cfg.sixMonth).toLocaleString('id-ID')}`;
    }
  } catch (e) {
    // ignore
  }
}

// Check logged in status to personalize landing page
function checkUserSession() {
  try {
    const user = JSON.parse(localStorage.getItem('noto_user') || 'null');
    if (user && user.isLoggedIn) {
      const ctaContainer = document.getElementById('nav-user-actions');
      if (ctaContainer) {
        ctaContainer.innerHTML = `
          <button class="btn btn-primary btn-sm" onclick="goToApp('app-today')" style="font-weight: 700;">
            🚀 Buka Workspace (${user.name ? user.name.split(' ')[0] : 'Saya'}) →
          </button>
        `;
      }
      const heroDirectBtn = document.getElementById('hero-direct-app-btn');
      if (heroDirectBtn) {
        heroDirectBtn.style.display = 'inline-flex';
        heroDirectBtn.textContent = `Lanjutkan ke Workspace (${user.name || 'Saya'}) →`;
      }
    }
  } catch (e) {
    // ignore
  }
}

// Redirect hash if user loaded web with #app-... or #auth-...
function checkRedirectHash() {
  const hash = window.location.hash.replace('#', '');
  if (hash.startsWith('app-') || hash.startsWith('auth-')) {
    goToApp(hash);
  }
}

// PWA Installer prompt support on website
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('btn-install-marketing');
  if (btn) btn.style.display = 'inline-flex';
});

const PWAInstaller = {
  promptInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
        const btn = document.getElementById('btn-install-marketing');
        if (btn) btn.style.display = 'none';
      });
    } else {
      // If prompt not triggered yet, open app directly
      goToApp('app-today');
    }
  }
};

// DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  WebTheme.init();
  syncPricing();
  checkUserSession();
  checkRedirectHash();
});
