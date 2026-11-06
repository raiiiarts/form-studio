
// FORM STUDIO — INTERACTIONS

// 1. Animated cursor glow
const glow = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

// 2. Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${(index % 3) * 100}ms`;
  observer.observe(element);
});

// 3. Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// 4. Interactive service card tilt
const cards = document.querySelectorAll(".service-card");

if (window.matchMedia("(pointer: fine)").matches) {
  cards.forEach((card) => {
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

// 5. Order request form
const orderForm = document.getElementById("orderForm");
const formMessage = document.getElementById("formMessage");

orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const contact = document.getElementById("customerContact").value.trim();
  const service = document.getElementById("serviceType").value;
  const description = document.getElementById("projectDescription").value.trim();
  const budget = document.getElementById("budget").value;

  if (!name || !contact || !service || !description) {
    formMessage.textContent = "Please complete all required fields.";
    return;
  }

  const request = `
FORM STUDIO — NEW PROJECT REQUEST

Customer: ${name}
Contact: ${contact}
Service: ${service}
Budget: ${budget}

PROJECT DESCRIPTION:
${description}
  `.trim();

  try {
    await navigator.clipboard.writeText(request);

    formMessage.textContent =
      "Your request has been copied! Send it to our studio through Discord. This demo form does not submit orders online yet.";

  } catch (error) {
    formMessage.textContent =
      "Your details are filled in, but copying failed. Please contact us through Discord to submit your request.";
  }
});
