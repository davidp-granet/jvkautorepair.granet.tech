
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

// Clicking anywhere closes the nav menu.
document.addEventListener('click', event => {
  const navMenu = document.querySelector('.nav-links.is-open');
  if (!navMenu) {
    return;
  }

  for (
    let /** @type {HTMLElement} */ element = event.target;
    element !== document.body;
    element = element.parentElement
  ) {
    if (event.target === navMenu) {
      return;
    }
  }

  links.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', false);
});

// Open the contact modal from /index.html#contact or any same-page #contact link.
/*
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#contact') {
    openContactModal();
  }
});
*/

// Seasonal modal

const seasonalModal = document.querySelector('[data-seasonal-modal]');
const seasonalOpeners = document.querySelectorAll('[data-seasonal-open]');
const seasonalClosers = document.querySelectorAll('[data-seasonal-close]');
let seasonalModalLastFocus = null;

function openSeasonalModal() {
  if (!seasonalModal) return;
  seasonalModalLastFocus = document.activeElement;
  seasonalModal.classList.add('is-open');
  seasonalModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  const dialog = seasonalModal.querySelector('.seasonal-modal-dialog');
  if (dialog) dialog.focus();
}

function closeSeasonalModal() {
  if (!seasonalModal) return;
  seasonalModal.classList.remove('is-open');
  seasonalModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (window.location.hash === '#seasonal') {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  if (seasonalModalLastFocus && typeof seasonalModalLastFocus.focus === 'function') seasonalModalLastFocus.focus();
}

seasonalOpeners.forEach((opener) => {
  opener.addEventListener('click', (event) => {
    event.preventDefault();
    if (links && links.classList.contains('is-open')) {
      links.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
    if (window.location.hash !== '#seasonal') {
      history.replaceState(null, '', '#seasonal');
    }
    openSeasonalModal();
  });
});

seasonalClosers.forEach((closer) => closer.addEventListener('click', closeSeasonalModal));
seasonalClosers.forEach((closer) => closer.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && seasonalModal && seasonalModal.classList.contains('is-open')) {
    event.preventDefault();
    closeSeasonalModal();
  }
}));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && seasonalModal && seasonalModal.classList.contains('is-open')) {
    closeSeasonalModal();
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

// Open the seasonal modal from /index.html#seasonal or any same-page #seasonal link.
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#seasonal') {
    openSeasonalModal();
  }
});

// End Seasonal modal

const topLinks = document.querySelectorAll('a[href="/"]');
topLinks.forEach(elem => {
  elem.addEventListener('click', event => {
    event.preventDefault();
    scroll(0, 0);
    history.replaceState(null, null, new URL(location.pathname, location.origin).toString());
  });
});

// Contact form

const ENDPOINT =
  "https://mercury.granet.tech/api/intake/public/845cd9c0f5c5b6d904ff09a8c9a4289e/";

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitButton = form.querySelector('button[type="submit"]');

function showStatus(message, state = "") {
  status.textContent = message;
  status.dataset.state = state;
}

function setSubmitting(isSubmitting) {
  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting
    ? "Sending..."
    : "Send request";
}

function clean(value) {
  return String(value || "").trim();
}

function buildPayload() {
  const fields = Object.fromEntries(new FormData(form));

  return {
    // A unique ID lets the server distinguish one submission from another.
    submission_request_id: crypto.randomUUID(),

    name: clean(fields.name),
    email: clean(fields.email),
    phone: clean(fields.phone),
    // service: clean(fields.service),
    message: buildMessage(fields),

    // These are also present in the original form.
    website: clean(fields.website),
    challenge_response: clean(fields.challenge_response)
  };
}

function buildMessage(fields) {
  let checkedItems = '';
  for (const element in fields) {
    if (fields[element] === 'on') {
      checkedItems += '\n[x] ' + element.replaceAll('_', ' ');
    }
  }

  let promoCode = '';
  if (clean(fields.promo) !== '') {
    promoCode = '\nPromo: ' + clean(fields.promo);
  }

  return clean(fields.message) + '\n' + promoCode + checkedItems;
}

function validate(payload) {
  if (payload.name < 2) {
    return "Please enter your name.";
  }

  if (!payload.email && !payload.phone) {
    return "Please provide an email address or phone number.";
  }

  if (
    payload.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
  ) {
    return "Please enter a valid email address.";
  }

  if (payload.message.length < 10) {
    return "Please tell us a little more about what you need.";
  }

  return "";
}

form.addEventListener("submit", async (event) => {
  // Stop the browser from doing a normal form POST / page navigation.
  event.preventDefault();

  const payload = buildPayload();
  const validationError = validate(payload);

  if (validationError) {
    showStatus(validationError, "error");
    return;
  }

  setSubmitting(true);
  showStatus("Sending your request...");

  try {
    // Send the form data to Mercury as JSON.
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      credentials: "omit"
    });

    let result = null;

    try {
      result = await response.json();
    } catch {
      // Leave result as null if the response body is not JSON.
    }

    if (!response.ok) {
      const message =
        result?.error ||
        "The request could not be submitted. Please review it and try again.";

      showStatus(message, "error");
      return;
    }

    // The original code expects Mercury to accept the request with HTTP 202
    // and return { ok: true, receipt_id: "..." }.
    if (
      response.status !== 202 ||
      result?.ok !== true ||
      typeof result?.receipt_id !== "string" ||
      !result.receipt_id
    ) {
      showStatus(
        "The server responded, but the response could not be verified.",
        "error"
      );
      return;
    }

    // Success: clear the form and remain on this page.
    form.reset();
    showStatus("Request received. We will follow up shortly.", "success");
  } catch (error) {
    // fetch() reaches this block for network/CORS/connectivity failures.
    showStatus(
      "The connection was interrupted. Please try again.",
      "error"
    );
  } finally {
    setSubmitting(false);
  }
});
