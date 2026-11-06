
/* =================================
   FORM STUDIO
   Main Website Script
================================= */

// CONFIGURATION
const CONFIG = {
  formEndpoint: "https://formspree.io/f/xnppyjdg",
  animationSpeed: 100
};


/* =================================
   1. CURSOR GLOW
================================= */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}


/* =================================
   2. SCROLL REVEAL ANIMATIONS
================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach((element, index) => {
  element.style.transitionDelay =
    `${(index % 3) * CONFIG.animationSpeed}ms`;

  revealObserver.observe(element);
});


/* =================================
   3. MOBILE NAVIGATION
================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* =================================
   4. SERVICE CARD ANIMATIONS
================================= */

const serviceCards = document.querySelectorAll(".service-card");

if (window.matchMedia("(pointer: fine)").matches) {
  serviceCards.forEach((card) => {

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -5;
      const rotateY = ((x / rect.width) - 0.5) * 5;

      card.style.transform =
        `perspective(800px) translateY(-7px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });

  });
}


/* =================================
   5. PORTFOLIO HOVER EFFECTS
================================= */

const portfolioCards = document.querySelectorAll(".portfolio-card");

portfolioCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("active");
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("active");
  });
});


/* =================================
   6. FORM VALIDATION
================================= */

const orderForm = document.getElementById("orderForm");
const formMessage = document.getElementById("formMessage");
const submitButton = orderForm?.querySelector('button[type="submit"]');
const submitText = document.getElementById("submitText");

function showMessage(message, type = "normal") {
  if (!formMessage) return;

  formMessage.textContent = message;

  formMessage.style.color =
    type === "success" ? "#a5e6b1" :
    type === "error" ? "#ff9999" : "#aaaaaa";
}


/* =================================
   7. FORM SUBMISSION
================================= */

if (orderForm) {

  orderForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (!orderForm.reportValidity()) {
      return;
    }

    if (CONFIG.formEndpoint.includes("YOUR_FORM_ID")) {
      showMessage(
        "Our order system is being configured. Please try again later.",
        "error"
      );
      return;
    }

    const originalText = submitText?.textContent ||
      "Submit project request ↗";

    submitButton.disabled = true;

    if (submitText) {
      submitText.textContent = "Sending request...";
    }

    showMessage("Submitting your project request...");

    try {

      const response = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        body: new FormData(orderForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("The server rejected the request.");
      }

      orderForm.reset();

      showMessage(
        "Your request has been sent! Thank you for choosing FORM Studio.",
        "success"
      );

    } catch (error) {

      console.error("FORM Studio submission error:", error);

      showMessage(
        "We couldn't send your request. Please try again later.",
        "error"
      );

    } finally {

      submitButton.disabled = false;

      if (submitText) {
        submitText.textContent = originalText;
      }

    }

  });

}


/* =================================
   8. SMOOTH SECTION NAVIGATION
================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =================================
   9. COPYRIGHT YEAR
================================= */

const copyright = document.querySelector(".footer");

if (copyright) {
  const yearText = copyright.querySelector(".copyright-year");

  if (yearText) {
    yearText.textContent = new Date().getFullYear();
  }
}


/* =================================
   FORM STUDIO INITIALIZED
================================= */

console.log("FORM Studio website initialized.");
