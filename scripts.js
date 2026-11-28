// Nav menu code

const toggle = document.querySelector('[data-nav-toggle]');
const links = document.querySelector('[data-nav-links]');
if (toggle && links) {
  toggle.addEventListener('click', event => {
    event.stopPropagation();
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

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

// End Nav menu code

// Deal modal

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
  const dealImg = document.getElementById('deal-modal-img');
  dealImg.setAttribute('src', '');

  if (!seasonalModal) return;
  seasonalModal.classList.remove('is-open');
  seasonalModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  if (seasonalModalLastFocus && typeof seasonalModalLastFocus.focus === 'function') {
    seasonalModalLastFocus.focus();
  }
}

seasonalOpeners.forEach((opener) => {
  opener.addEventListener('click', (event) => {
    event.preventDefault();

    if (links && links.classList.contains('is-open')) {
      links.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }

    if (currentDeal !== null) {
      document.getElementById('deal-modal-title').textContent = currentDeal['deal-modal-title'];
      document.getElementById('deal-modal-body').innerHTML = currentDeal['deal-modal-body'];
      const dealImg = document.getElementById('deal-modal-img');
      dealImg.setAttribute('src', currentDeal['deal-modal-image-src']);
      dealImg.setAttribute('alt', currentDeal['deal-modal-image-alt']);

      const bookBtn = document.getElementById('deal-modal-book-btn');
      if (currentDeal['bookFunc']) {
        bookBtn.onclick = currentDeal['bookFunc'];
      } else {
        bookBtn.onclick = null;
      }
    }

    openSeasonalModal();
    document.querySelector('.seasonal-modal .custom-scrollbar').scrollTo(0, 0);
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

// End Seasonal modal

const topLinks = document.querySelectorAll('a[href="/"]');
topLinks.forEach(elem => {
  elem.addEventListener('click', event => {
    event.preventDefault();
    scroll(0, 0);
    history.replaceState(null, null, new URL(location.pathname, location.origin).toString());
  });
});

// Expiration Logic

function removeExpiredElements() {
  const now = new Date();
  document.querySelectorAll('[expires]').forEach(el => {
    const expires = new Date(el.getAttribute('expires') + ' 23:59:59').getTime();
    if (!isNaN(expires) && expires < now) {
      el.remove();
    }
  });
}

removeExpiredElements();

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
    message: buildMessage(fields),

    // These are also present in the original form.
    website: clean(fields.website),
    challenge_response: clean(fields.challenge_response)
  };
}

function buildMessage(fields) {
  const customerInfo = '\n' +
    'Name: ' + clean(fields.name) + '\n' +
    'Email: ' + clean(fields.email) + '\n' +
    'Phone: ' + clean(fields.phone) + '\n';

  let checkedItems = '';
  for (const element in fields) {
    if (fields[element] === 'on') {
      checkedItems += '[x] ' + element.replaceAll('_', ' ') + '\n';
    }
  }

  if (checkedItems) {
    checkedItems = 'Services:\n' + checkedItems;
  }

  let dropOffTime = '';
  if (clean(fields.dropOffTime !== '')) {
    dropOffTime = 'Preferred drop off time:\n' + clean(new Date(fields.dropOffTime).toLocaleString()) + '\n';
  } else {
    dropOffTime = 'Preferred drop off time not specified.\n'
  }

  let dropOffCar = '';
  if (fields.dropOffCar !== '') {
    dropOffCar = '[x] ' + fields.dropOffCar + '\n';
  }

  let vehicleInfo = '';

  const vehicleBuildInfo = clean([
    clean(fields.car_color),
    clean(fields.car_year),
    clean(fields.car_make),
    clean(fields.car_model)
  ].join(' ').replace(/\s+/g, ' '));

  if (vehicleBuildInfo) {
    vehicleInfo = 'Vehicle: ' + vehicleBuildInfo + '\n';
  }

  const message = 'Message:\n' + clean(fields.message) + '\n';

  let promoCode = '';
  if (clean(fields.promo) !== '') {
    promoCode = 'Promo Code: ' + clean(fields.promo) + '\n';
  }

  return '```' +
    customerInfo +
    checkedItems +
    dropOffTime +
    dropOffCar +
    vehicleInfo +
    message +
    promoCode +
    '```';
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

function testBuildMessage() {
  console.log(buildMessage(Object.fromEntries(new FormData(form))));
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
    window.location.replace('./thanks');
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
