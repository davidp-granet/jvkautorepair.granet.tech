
const toggle = document.querySelector('[data-nav-toggle]');
const links = document.querySelector('[data-nav-links]');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('is-visible'));
}

const mailForm = document.querySelector('[data-mail-form]');
if (mailForm) {
  mailForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(mailForm);
    const subject = encodeURIComponent('Website message for JVK Auto');
    const body = encodeURIComponent(`Name: ${data.get('name') || ''}\nEmail: ${data.get('email') || ''}\nPhone: ${data.get('phone') || ''}\n\nMessage:\n${data.get('message') || ''}`);
    window.location.href = `mailto:jvkautoservice@gmail.com?subject=${subject}&body=${body}`;
  });
}


const contactModal = document.querySelector('[data-contact-modal]');
const contactOpeners = document.querySelectorAll('[data-contact-open]');
const contactClosers = document.querySelectorAll('[data-contact-close]');
let lastContactFocus = null;

function openContactModal() {
  if (!contactModal) return;
  lastContactFocus = document.activeElement;
  contactModal.classList.add('is-open');
  contactModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  const dialog = contactModal.querySelector('.contact-modal-dialog');
  if (dialog) dialog.focus();
}

function closeContactModal() {
  if (!contactModal) return;
  contactModal.classList.remove('is-open');
  contactModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (window.location.hash === '#contact') {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  if (lastContactFocus && typeof lastContactFocus.focus === 'function') lastContactFocus.focus();
}

contactOpeners.forEach((opener) => {
  opener.addEventListener('click', (event) => {
    event.preventDefault();
    if (links && links.classList.contains('is-open')) {
      links.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
    if (window.location.hash !== '#contact') {
      history.replaceState(null, '', '#contact');
    }
    openContactModal();
  });
});
contactClosers.forEach((closer) => closer.addEventListener('click', closeContactModal));
contactClosers.forEach((closer) => closer.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && contactModal && contactModal.classList.contains('is-open')) {
    event.preventDefault();
    closeContactModal();
  }
}));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && contactModal && contactModal.classList.contains('is-open')) {
    closeContactModal();
  }
});


// Open the contact modal from /index.html#contact or any same-page #contact link.
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#contact') {
    openContactModal();
  }
});
