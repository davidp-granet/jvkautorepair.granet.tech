// Deal that is currently being shown in the opened modal
currentDeal = null;

deals = {
  '10-percent-off-labor-deal': {
    'deal-modal-title': 'Save 10% on labor, up to $50',
    'deal-modal-body': `
      <p>🦃 Thank you for trusting us with your ride.</p>
      <p>As Thanksgiving arrives, we are grateful for our customers and the opportunity to serve you.</p>
      <p>
        Save 10% on labor, up to $50.<br>
        Plus a FREE safety check.
      </p>
      <p>Offer valid: NOV 22-30, 2026.</p>
      <p>📞 Call <a href="tel:+16034212678" style="color: var(--red);">(603) 421-2678</a> to book with JVK Auto Service & Sales.</p>
      <p>
        MUST MENTION THIS AD TO RECEIVE DISCOUNT.<br>
        One discount per vehicle. Cannot be combined. Visual checks only; diagnostic testing extra.
      </p>
    `,
    'deal-modal-image-src': 'assets/specials/2026/fall/10-percent-off-labor-deal-q75.webp',
    'deal-modal-image-alt': 'Save 10% on labor, up to $50',
  },
  'free-safety-check': {
    'deal-modal-title': 'Free safety check',
    'deal-modal-body': `
      <p>
        Heading out for Thanksgiving visits? Add a vehicle check to your holiday preparations.
        Schedule a free safety check at JVK Auto Service & Sales. Mention this ad to receive the offer.
        Valid November 1-30, 2026. Schedule your appointment with our team.
      </p>
    `,
    'deal-modal-image-src': 'assets/specials/2026/fall/2026-11-02-free-safety-check-q75.webp',
    'deal-modal-image-alt': 'Schedule a free safety check at JVK Auto Service & Sales.',
  },
  '20-off-syn-oil-change': {
    'deal-modal-title': '$20 off a full synthetic oil change',
    'deal-modal-body': `
      <p>
        From everyday commutes to holiday visits, we appreciate being part of your journey.
        Thank you for choosing JVK.
        Save $20 on a full synthetic oil change at JVK Auto Service & Sales.
        Mention this ad to receive the offer.
        Valid November 1-30, 2026. Schedule your appointment with our team.
      </p>
    `,
    'deal-modal-image-src': 'assets/specials/2026/fall/syn-oil-change-q75.webp',
    'deal-modal-image-alt': '$20 off a full synthetic oil change',
    'bookFunc': () => {
      document.getElementById('Oil_change').checked = true;
    }
  },
  '10-off-oil-change': {
    'deal-modal-title': '$10 off a regular oil change',
    'deal-modal-body': `
      <p>
        Before the Thanksgiving travel rush, check whether your vehicle is due for an oil change.
        Save $10 on a regular oil change at JVK Auto Service & Sales.
        Mention this ad to receive the offer. Valid November 1–30, 2026.
        Schedule your appointment with our team.
      </p>
    `,
    'deal-modal-image-src': 'assets/specials/2026/fall/2026-11-02-oil-change-q75.webp',
    'deal-modal-image-alt': '$10 off a regular oil change',
    'bookFunc': () => {
      document.getElementById('Oil_change').checked = true;
    }
  },
  'holiday-giveback': {
    'deal-modal-title': 'Starting November 27, get 15% off qualifying repairs and maintenance of $100 or more, up to $100 off. Book in advance!',
    'deal-modal-body': `
      <p>UPDATE: The Holiday Giveback is extended through December 31, 2026.</p>
      <p>🎄 A holiday thank-you is coming from JVK Auto Service and Sales!</p>
      <p>
        Starting November 27, get 15% off qualifying repairs and maintenance of $100 or more, up to $100 off.
        You can also book a free Holiday Road Trip Check by appointment, with no purchase required.
        Book ahead for November 27 through December 31, 2026.
      </p>
      <p>📍 We're at <a href="https://maps.app.goo.gl/dwxkVYmWBmCTRs2DA" target="_blank" rel="noopener" style="color: var(--red);">6 Folsom Rd in Derry, NH.</a></p>
      <p>Minimum spend before taxes and fees. One discount per customer. Cannot be combined with other offers.</p>
    `,
    'deal-modal-image-src': 'assets/specials/2026/fall/holiday_giveback_q75.webp',
    'deal-modal-image-alt': 'The Holiday Giveback is extended through December 31, 2026.'
  },
  'diehard-battery': {
    'deal-modal-title': 'Get up to $25 back with the purchase and installation of a qualifying DieHard battery!',
    'deal-modal-body': `
      <p>
        It's that time of year when the temperature drops and older car batteries start failing, but JVK Auto Service and Sales can help!
        Get up to $25 back with the purchase and installation of a qualifying DieHard battery, now through January 31, 2027.
      </p>
    `,
    'deal-modal-image-src': 'assets/specials/2026/fall/2026-11-01-q75.webp',
    'deal-modal-image-alt': 'Get up to $25 back with the purchase and installation of a qualifying DieHard battery!',
    'bookFunc': () => {
      document.getElementById('Battery_service').checked = true;
    }
  }
};
