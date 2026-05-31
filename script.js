const heroCarousel = document.querySelector("[data-hero-carousel]");
const categoriasSection = document.querySelector("#categorias");
const atendimentoSection = document.querySelector("#atendimento");

const scrollToCategorias = (smooth = true) => {
  if (!categoriasSection) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  categoriasSection.scrollIntoView({
    behavior: smooth && !prefersReducedMotion ? "smooth" : "auto",
    block: "center",
  });
};

const scrollToAtendimento = (smooth = true) => {
  if (!atendimentoSection) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  atendimentoSection.scrollIntoView({
    behavior: smooth && !prefersReducedMotion ? "smooth" : "auto",
    block: "center",
  });
};

document.querySelectorAll('a[href="#categorias"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!categoriasSection) return;

    event.preventDefault();
    scrollToCategorias();

    if (window.location.hash !== "#categorias") {
      window.history.pushState(null, "", "#categorias");
    }
  });
});

document.querySelectorAll('a[href="#atendimento"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!atendimentoSection) return;

    event.preventDefault();
    scrollToAtendimento();

    if (window.location.hash !== "#atendimento") {
      window.history.pushState(null, "", "#atendimento");
    }
  });
});

if (window.location.hash === "#categorias") {
  window.setTimeout(() => scrollToCategorias(false), 80);
}

if (window.location.hash === "#atendimento") {
  window.setTimeout(() => scrollToAtendimento(false), 80);
}

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

const featureCarousel = document.querySelector("[data-feature-carousel]");

if (featureCarousel) {
  const track = featureCarousel.querySelector("[data-feature-track]");
  const slides = Array.from(featureCarousel.querySelectorAll("[data-feature-slide]"));
  const prevFeatureButton = featureCarousel.querySelector("[data-feature-prev]");
  const nextFeatureButton = featureCarousel.querySelector("[data-feature-next]");
  const featureDotsContainer = featureCarousel.querySelector("[data-feature-dots]");
  const modernFeatureIndex = slides.findIndex((slide) => slide.matches("[data-feature-modern]"));
  const historyFeatureIndex = slides.findIndex((slide) => slide.matches("[data-feature-history]"));
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

  const showFeatureAt = (index, smooth = true) => {
    if (index < 0) return;

    goToFeatureSlide(index);
    window.clearInterval(autoFeatureTimer);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      featureCarousel.scrollIntoView({
        behavior: smooth && !prefersReducedMotion ? "smooth" : "auto",
        block: "center",
      });
    }, 40);
  };

  const showModernFeature = (smooth = true) => {
    showFeatureAt(modernFeatureIndex, smooth);
  };

  const showHistoryFeature = (smooth = true) => {
    showFeatureAt(historyFeatureIndex, smooth);
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

  document.querySelectorAll('a[href="#historia-godoy"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (historyFeatureIndex < 0) return;

      event.preventDefault();
      showHistoryFeature();

      if (window.location.hash !== "#historia-godoy") {
        window.history.pushState(null, "", "#historia-godoy");
      }
    });
  });

  document.querySelectorAll('a[href="#botinas-modernas"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (modernFeatureIndex < 0) return;

      event.preventDefault();
      showModernFeature();

      if (window.location.hash !== "#botinas-modernas") {
        window.history.pushState(null, "", "#botinas-modernas");
      }
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearInterval(autoFeatureTimer);
    } else {
      startFeatureAutoPlay();
    }
  });

  if (window.location.hash === "#historia-godoy") {
    showHistoryFeature(false);
  } else if (window.location.hash === "#botinas-modernas") {
    showModernFeature(false);
  } else {
    goToFeatureSlide(0);
    startFeatureAutoPlay();
  }
}
