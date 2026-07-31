
const toggle = document.querySelector('[data-nav-toggle]');
const links = document.querySelector('[data-nav-links]');
if (toggle && links) {
  toggle.addEventListener('click', event => {
    event.stopPropagation();
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

// Contact modal

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

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && contactModal && contactModal.classList.contains('is-open')) {
    closeContactModal();
  }
});

document.addEventListener('click', event => {
  const navMenu = document.querySelector('.nav-links.is-open');
  if (navMenu) {
    /** @type {HTMLElement} */
    let element;
    for (element = event.target; element !== document.body; element = element.parentElement) {
      if (event.target === navMenu) {
        return;
      }
    }

    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', false);
  }
});

// Open the contact modal from /index.html#contact or any same-page #contact link.
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#contact') {
    openContactModal();
  }
});

// Special modal

const specialModal = document.querySelector('[data-special-modal]');
const specialOpeners = document.querySelectorAll('[data-special-open]');
const specialClosers = document.querySelectorAll('[data-special-close]');
let specialModalLastFocus = null;

function openSpecialModal() {
  if (!specialModal) return;
  specialModalLastFocus = document.activeElement;
  specialModal.classList.add('is-open');
  specialModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  const dialog = specialModal.querySelector('.special-modal-dialog');
  if (dialog) dialog.focus();
}

function closeSpecialModal() {
  if (!specialModal) return;
  specialModal.classList.remove('is-open');
  specialModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (window.location.hash === '#seasonal') {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  if (specialModalLastFocus && typeof specialModalLastFocus.focus === 'function') specialModalLastFocus.focus();
}

specialOpeners.forEach((opener) => {
  opener.addEventListener('click', (event) => {
    event.preventDefault();
    if (links && links.classList.contains('is-open')) {
      links.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
    if (window.location.hash !== '#seasonal') {
      history.replaceState(null, '', '#seasonal');
    }
    openSpecialModal();
  });
});

specialClosers.forEach((closer) => closer.addEventListener('click', closeSpecialModal));
specialClosers.forEach((closer) => closer.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && specialModal && specialModal.classList.contains('is-open')) {
    event.preventDefault();
    closeSpecialModal();
  }
}));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && specialModal && specialModal.classList.contains('is-open')) {
    closeSpecialModal();
  }
});

document.addEventListener('click', event => {
  const navMenu = document.querySelector('.nav-links.is-open');
  if (navMenu) {
    /** @type {HTMLElement} */
    let element;
    for (element = event.target; element !== document.body; element = element.parentElement) {
      if (event.target === navMenu) {
        return;
      }
    }

    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', false);
  }
});

// Open the special modal from /index.html#seasonal or any same-page #seasonal link.
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#seasonal') {
    openSpecialModal();
  }
});
