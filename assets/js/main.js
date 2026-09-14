const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.dataset.open = String(!open);
  });
}

const currentPath = window.location.pathname.replace(/index\.html$/, '');
document.querySelectorAll('[data-nav] a').forEach((link) => {
  const linkPath = new URL(link.href).pathname.replace(/index\.html$/, '');
  const active = linkPath === '/' ? currentPath === '/' : currentPath.startsWith(linkPath);
  if (active) link.setAttribute('aria-current', 'page');
});

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('has-js');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
}

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('[data-kind]').forEach((item) => {
      item.hidden = value !== 'all' && item.dataset.kind !== value;
    });
  });
});

document.querySelectorAll('[data-print]').forEach((button) => {
  button.addEventListener('click', () => window.print());
});
