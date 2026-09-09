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

document.querySelectorAll('[data-contact-form]').forEach((form) => {
  const status = form.querySelector('[data-form-status]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    if (data.get('website')) return;

    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const company = String(data.get('company') || '').trim();
    const reason = String(data.get('reason') || '').trim();
    const message = String(data.get('message') || '').trim();
    const recipient = ['ximena.aguirre.rdz', 'gmail.com'].join('@');
    const subject = `Portfolio inquiry: ${reason}${company ? ` from ${company}` : ''}`;
    const body = [
      `Hi Ximena,`,
      '',
      message,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || 'Not provided'}`,
      `Topic: ${reason}`
    ].join('\n');

    if (status) status.textContent = 'Your email draft is ready. Complete the send from your mail app.';
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
