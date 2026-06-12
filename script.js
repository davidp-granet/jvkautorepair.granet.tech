
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
