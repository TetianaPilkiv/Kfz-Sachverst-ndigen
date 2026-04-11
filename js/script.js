const headerFixed = document.querySelector(".header");

if (headerFixed) {
  const updateHeaderState = () => {
    headerFixed.classList.toggle("header--scrolled", window.scrollY > 12);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

const slider = document.querySelector("[data-slider]");

if (slider) {
  const track = slider.querySelector("[data-slider-track]");
  const prevButton = slider.querySelector("[data-slider-prev]");
  const nextButton = slider.querySelector("[data-slider-next]");

  if (track && prevButton && nextButton) {
    const slides = Array.from(track.children);
    let currentIndex = 0;

    const getVisibleSlides = () => {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 980) return 2;
      return 3;
    };

    const updateSlider = () => {
      const visibleSlides = getVisibleSlides();
      const maxIndex = Math.max(0, slides.length - visibleSlides);
      currentIndex = Math.min(currentIndex, maxIndex);

      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = 20;
      track.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;

      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === maxIndex;
    };

    prevButton.addEventListener("click", () => {
      currentIndex -= 1;
      updateSlider();
    });

    nextButton.addEventListener("click", () => {
      currentIndex += 1;
      updateSlider();
    });

    window.addEventListener("resize", updateSlider);
    updateSlider();
  }
}

document.querySelectorAll("[data-accordion]").forEach((accordion) => {
  const items = accordion.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");

    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      items.forEach((accordionItem) => {
        accordionItem.classList.remove("is-open");
        const accordionTrigger = accordionItem.querySelector(".accordion-trigger");

        if (accordionTrigger) {
          accordionTrigger.setAttribute("aria-expanded", "false");
        }
      });

      if (!isOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
});

const revealGroups = [
  ".benefit",
  ".review-card",
  ".info-card",
  ".trust-accordion",
  ".accordion-item",
  ".contact-panel",
  ".service-card",
  ".detail-card",
  ".process-stage",
  ".case-card",
  ".testimonial-card",
  ".footer__brand",
  ".footer__contacts",
  ".footer__links",
  ".footer__socials",
  ".leistungen-intro__panel",
  ".hero__info-card"
];

const revealElements = document.querySelectorAll(revealGroups.join(", "));

if (revealElements.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealElements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 0.08}s`);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("reveal-visible");
  });
}
