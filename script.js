const carousel = document.querySelector("[data-carousel]");
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");
const dotsContainer = document.querySelector("[data-carousel-dots]");

const heroCarousel = document.querySelector("[data-hero-carousel]");

if (heroCarousel) {
  const heroTrack = heroCarousel.querySelector("[data-hero-track]");
  const heroSlides = Array.from(heroCarousel.querySelectorAll("[data-hero-slide]"));
  const heroDotsContainer = heroCarousel.querySelector("[data-hero-dots]");
  let activeHeroIndex = 0;
  let autoHeroTimer;

  const goToHeroSlide = (index) => {
    if (!heroTrack || !heroSlides.length) return;

    activeHeroIndex = (index + heroSlides.length) % heroSlides.length;
    heroTrack.style.transform = `translateX(-${activeHeroIndex * 100}%)`;

    heroSlides.forEach((slide, slideIndex) => {
      slide.setAttribute("aria-hidden", slideIndex === activeHeroIndex ? "false" : "true");
    });

    heroDotsContainer?.querySelectorAll(".hero-carousel-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeHeroIndex);
      dot.setAttribute("aria-current", dotIndex === activeHeroIndex ? "true" : "false");
    });
  };

  const nextHeroSlide = () => goToHeroSlide(activeHeroIndex + 1);
  const prevHeroSlide = () => goToHeroSlide(activeHeroIndex - 1);

  const startHeroAutoPlay = () => {
    window.clearInterval(autoHeroTimer);
    if (heroSlides.length <= 1) return;
    autoHeroTimer = window.setInterval(nextHeroSlide, 5000);
  };

  heroSlides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "hero-carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para banner ${index + 1}`);
    dot.innerHTML = `
      <span class="hero-progress-ring" aria-hidden="true"></span>
      <span class="hero-dot-core" aria-hidden="true"></span>
    `;
    dot.addEventListener("click", () => {
      goToHeroSlide(index);
      startHeroAutoPlay();
    });
    heroDotsContainer?.appendChild(dot);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearInterval(autoHeroTimer);
    } else {
      startHeroAutoPlay();
    }
  });

  goToHeroSlide(0);
  startHeroAutoPlay();
}

if (carousel && prevButton && nextButton && dotsContainer) {
  const cards = Array.from(carousel.children);

  const getStep = () => {
    const firstCard = cards[0];
    if (!firstCard) return carousel.clientWidth;
    const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
    return firstCard.getBoundingClientRect().width + gap;
  };

  const getActiveIndex = () => {
    const step = getStep();
    return step ? Math.round(carousel.scrollLeft / step) : 0;
  };

  const updateDots = () => {
    const activeIndex = getActiveIndex();
    dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });
  };

  cards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para categoria ${index + 1}`);
    dot.addEventListener("click", () => {
      carousel.scrollTo({
        left: getStep() * index,
        behavior: "smooth",
      });
    });
    dotsContainer.appendChild(dot);
  });

  prevButton.addEventListener("click", () => {
    carousel.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    carousel.scrollBy({ left: getStep(), behavior: "smooth" });
  });

  carousel.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateDots);
  });

  window.addEventListener("resize", updateDots);
  updateDots();
}

const featureCarousel = document.querySelector("[data-feature-carousel]");

if (featureCarousel) {
  const track = featureCarousel.querySelector("[data-feature-track]");
  const slides = Array.from(featureCarousel.querySelectorAll("[data-feature-slide]"));
  const prevFeatureButton = featureCarousel.querySelector("[data-feature-prev]");
  const nextFeatureButton = featureCarousel.querySelector("[data-feature-next]");
  const featureDotsContainer = featureCarousel.querySelector("[data-feature-dots]");
  let activeFeatureIndex = 0;
  let autoFeatureTimer;

  const goToFeatureSlide = (index) => {
    if (!track || !slides.length) return;

    activeFeatureIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeFeatureIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      slide.setAttribute("aria-hidden", slideIndex === activeFeatureIndex ? "false" : "true");
      slide.tabIndex = slideIndex === activeFeatureIndex ? 0 : -1;
    });

    featureDotsContainer?.querySelectorAll(".carousel-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeFeatureIndex);
      dot.setAttribute("aria-current", dotIndex === activeFeatureIndex ? "true" : "false");
    });
  };

  const nextFeatureSlide = () => goToFeatureSlide(activeFeatureIndex + 1);
  const prevFeatureSlide = () => goToFeatureSlide(activeFeatureIndex - 1);

  const startFeatureAutoPlay = () => {
    window.clearInterval(autoFeatureTimer);
    autoFeatureTimer = window.setInterval(nextFeatureSlide, 5000);
  };

  const restartFeatureAutoPlay = () => {
    startFeatureAutoPlay();
  };

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para card ${index + 1}`);
    dot.addEventListener("click", () => {
      goToFeatureSlide(index);
      restartFeatureAutoPlay();
    });
    featureDotsContainer?.appendChild(dot);
  });

  prevFeatureButton?.addEventListener("click", () => {
    prevFeatureSlide();
    restartFeatureAutoPlay();
  });

  nextFeatureButton?.addEventListener("click", () => {
    nextFeatureSlide();
    restartFeatureAutoPlay();
  });

  featureCarousel.addEventListener("mouseenter", () => window.clearInterval(autoFeatureTimer));
  featureCarousel.addEventListener("mouseleave", startFeatureAutoPlay);
  featureCarousel.addEventListener("focusin", () => window.clearInterval(autoFeatureTimer));
  featureCarousel.addEventListener("focusout", startFeatureAutoPlay);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearInterval(autoFeatureTimer);
    } else {
      startFeatureAutoPlay();
    }
  });

  goToFeatureSlide(0);
  startFeatureAutoPlay();
}
