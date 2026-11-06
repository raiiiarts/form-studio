// FORM Studio interactions
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");
  const year = document.getElementById("year");
  const form = document.getElementById("project-form");

  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        nav.classList.remove("is-open");
      });
    });
  }

  // Scroll reveal, with a graceful fallback for browsers without IntersectionObserver.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Small client-side guardrails. Formspree handles the actual submission and server validation.
  if (form) {
    form.addEventListener("submit", (event) => {
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');

      if (email && !email.validity.valid) {
        event.preventDefault();
        email.focus();
      } else if (message && message.value.trim().length < 10) {
        event.preventDefault();
        message.setCustomValidity("Please add a little more detail (at least 10 characters).");
        message.reportValidity();
        message.addEventListener("input", () => message.setCustomValidity(""), { once: true });
      }
    });
  }
});
