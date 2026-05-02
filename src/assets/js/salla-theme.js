// ============================================================
// Catly Theme — Main JS
// Hooks into Salla SDK (auto-injected via {% hook 'body:end' %})
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initCartBadge();
  initLazyLoading();
  initMobileMenu();
});

// === Cart Badge — live update ===
function initCartBadge() {
  if (typeof salla === 'undefined') return;

  salla.cart.event.onUpdated((summary) => {
    const badge = document.querySelector('[data-cart-badge]');
    if (!badge) return;

    const count = summary.count || 0;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });

  salla.cart.event.onItemAdded((response) => {
    const badge = document.querySelector('[data-cart-badge]');
    if (badge) badge.classList.add('badge-bump');
    setTimeout(() => badge?.classList.remove('badge-bump'), 300);
  });
}

// === Lazy load images that lack the attribute ===
function initLazyLoading() {
  document.querySelectorAll('img:not([loading])').forEach((img) => {
    if (!img.closest('.hero')) {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    }
  });
}

// === Mobile menu toggle ===
function initMobileMenu() {
  const trigger = document.querySelector('[data-mobile-menu-trigger]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!trigger || !menu) return;

  trigger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
}

// === Quantity stepper ===
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-qty-increase]')) {
    const input = e.target.parentElement.querySelector('input');
    if (input) input.value = parseInt(input.value || 0) + 1;
    input?.dispatchEvent(new Event('change', { bubbles: true }));
  }
  if (e.target.matches('[data-qty-decrease]')) {
    const input = e.target.parentElement.querySelector('input');
    if (input && parseInt(input.value || 0) > 1) {
      input.value = parseInt(input.value) - 1;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
});
