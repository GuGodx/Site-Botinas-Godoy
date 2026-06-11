const heroCarousel = document.querySelector("[data-hero-carousel]");
const categoriasSection = document.querySelector("#categorias");
const atendimentoSection = document.querySelector("#atendimento");
const instagramAppLink = document.querySelector("[data-instagram-app]");
const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
  const mobileMenuToggle = siteHeader.querySelector("[data-mobile-menu-toggle]");
  const mobileMenu = siteHeader.querySelector("[data-mobile-menu]");
  const headerSearchToggle = siteHeader.querySelector("[data-header-search-toggle]");
  const headerSearchPanel = siteHeader.querySelector("[data-header-search-panel]");
  const headerSearchInput = headerSearchPanel?.querySelector('input[name="busca"]');

  const closeMobileMenu = () => {
    if (!mobileMenuToggle || !mobileMenu) return;
    mobileMenuToggle.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
  };

  const closeHeaderSearch = () => {
    if (!headerSearchToggle || !headerSearchPanel) return;
    headerSearchToggle.classList.remove("is-open");
    headerSearchPanel.classList.remove("is-open");
    headerSearchToggle.setAttribute("aria-expanded", "false");
  };

  mobileMenuToggle?.addEventListener("click", () => {
    if (!mobileMenu) return;
    const willOpen = !mobileMenu.classList.contains("is-open");
    closeHeaderSearch();
    mobileMenuToggle.classList.toggle("is-open", willOpen);
    mobileMenu.classList.toggle("is-open", willOpen);
    mobileMenuToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
  });

  headerSearchToggle?.addEventListener("click", () => {
    if (!headerSearchPanel) return;
    const willOpen = !headerSearchPanel.classList.contains("is-open");
    closeMobileMenu();
    headerSearchToggle.classList.toggle("is-open", willOpen);
    headerSearchPanel.classList.toggle("is-open", willOpen);
    headerSearchToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
    if (willOpen) {
      window.setTimeout(() => headerSearchInput?.focus(), 60);
    }
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) {
      closeMobileMenu();
      closeHeaderSearch();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
      closeHeaderSearch();
    }
  });

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 760px)").matches) {
      closeMobileMenu();
    }
  });
}

const homeHeaderSearch = document.querySelector("[data-home-search]");

if (homeHeaderSearch) {
  const homeSearchInput = homeHeaderSearch.querySelector("[data-home-search-input]");
  const homeSearchDropdown = homeHeaderSearch.querySelector("[data-home-search-dropdown]");
  const homeSearchItems = Array.from(homeHeaderSearch.querySelectorAll("[data-home-search-item]"));

  const normalizeHomeSearch = (value) =>
    (value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const openHomeSearch = () => {
    homeSearchDropdown?.classList.add("is-open");
  };

  const closeHomeSearch = () => {
    homeSearchDropdown?.classList.remove("is-open");
  };

  const filterHomeSearch = () => {
    const searchTerm = normalizeHomeSearch(homeSearchInput?.value);

    homeSearchItems.forEach((item) => {
      const haystack = normalizeHomeSearch(item.dataset.searchText || item.textContent);
      item.hidden = Boolean(searchTerm) && !haystack.includes(searchTerm);
    });
  };

  homeSearchInput?.addEventListener("focus", () => {
    openHomeSearch();
    filterHomeSearch();
  });

  homeSearchInput?.addEventListener("click", () => {
    openHomeSearch();
    filterHomeSearch();
  });

  homeHeaderSearch.querySelector(".home-header-search-bar")?.addEventListener("click", () => {
    openHomeSearch();
    filterHomeSearch();
  });

  homeSearchInput?.addEventListener("input", () => {
    openHomeSearch();
    filterHomeSearch();
  });

  document.addEventListener("click", (event) => {
    if (!homeHeaderSearch.contains(event.target)) {
      closeHomeSearch();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeHomeSearch();
    }
  });
}

if (instagramAppLink) {
  instagramAppLink.addEventListener("click", (event) => {
    const isMobile = window.matchMedia("(max-width: 760px)").matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) return;

    event.preventDefault();
    window.location.href = "instagram://user?username=botinasgodoy";

    window.setTimeout(() => {
      window.location.href = instagramAppLink.href;
    }, 900);
  });
}

const productPreview = document.querySelector("[data-product-preview]");

if (productPreview) {
  const previewImage = productPreview.querySelector("[data-product-preview-image]");
  const previewLine = productPreview.querySelector("[data-product-preview-line]");
  const previewTitle = productPreview.querySelector("[data-product-preview-title]");
  const previewCode = productPreview.querySelector("[data-product-preview-code]");
  const previewDescription = productPreview.querySelector("[data-product-preview-description]");
  const previewThumbs = productPreview.querySelector("[data-product-preview-thumbs]");
  const previewSpecs = productPreview.querySelector("[data-product-preview-specs]");
  const previewWhatsapp = productPreview.querySelector("[data-product-preview-whatsapp]");
  const previewClose = productPreview.querySelector("[data-product-preview-close]");

  const closeProductPreview = () => {
    if (typeof productPreview.close === "function") {
      productPreview.close();
    } else {
      productPreview.removeAttribute("open");
    }
  };

  const setPreviewImage = (image, title, index) => {
    if (previewImage) {
      previewImage.src = image;
      previewImage.alt = `${title} - foto ${index + 1}`;
    }

    previewThumbs?.querySelectorAll("[data-preview-thumb]").forEach((thumb) => {
      const isActive = thumb.dataset.previewThumb === String(index);
      thumb.classList.toggle("is-active", isActive);
      thumb.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  const renderPreviewThumbs = (images, title) => {
    if (!previewThumbs) return;

    previewThumbs.innerHTML = "";
    previewThumbs.hidden = images.length < 2;

    images.forEach((image, index) => {
      const thumbButton = document.createElement("button");
      thumbButton.type = "button";
      thumbButton.className = "product-preview-thumb";
      thumbButton.dataset.previewThumb = String(index);
      thumbButton.setAttribute("aria-label", `Ver foto ${index + 1} de ${title}`);

      const thumbImage = document.createElement("img");
      thumbImage.src = image;
      thumbImage.alt = "";

      thumbButton.appendChild(thumbImage);
      thumbButton.addEventListener("click", () => setPreviewImage(image, title, index));
      previewThumbs.appendChild(thumbButton);
    });
  };

  const renderPreviewSpecs = (specs) => {
    if (!previewSpecs) return;

    previewSpecs.innerHTML = "";
    previewSpecs.hidden = specs.length === 0;

    specs.forEach((spec) => {
      const specItem = document.createElement("span");
      specItem.textContent = spec;
      previewSpecs.appendChild(specItem);
    });
  };

  document.querySelectorAll("[data-product-view]").forEach((productCard) => {
    productCard.addEventListener("click", (event) => {
      const href = productCard.getAttribute("href");

      if (href && href !== "#") {
        return;
      }

      event.preventDefault();

      const title = productCard.dataset.productTitle || "Produto Godoy";
      const line = productCard.dataset.productLine || "Catálogo Godoy";
      const code = productCard.dataset.productCode || "";
      const image = productCard.dataset.productImage || "assets/card-placeholder.svg";
      const images = Array.from(
        new Set((productCard.dataset.productImages || image).split("|").map((item) => item.trim()).filter(Boolean))
      );
      const description = productCard.dataset.productDescription || "Espaço reservado para a foto e informações do produto.";
      const specs = (productCard.dataset.productSpecs || "").split("|").map((item) => item.trim()).filter(Boolean);

      if (previewLine) previewLine.textContent = line;
      if (previewCode) {
        previewCode.textContent = code;
        previewCode.hidden = !code;
      }
      if (previewTitle) previewTitle.textContent = title;
      if (previewDescription) previewDescription.textContent = description;
      if (previewWhatsapp) {
        const message = encodeURIComponent(`Ola, tenho interesse no produto ${title} da Botinas Godoy.`);
        previewWhatsapp.href = `https://wa.me/553532951813?text=${message}`;
      }

      renderPreviewThumbs(images, title);
      renderPreviewSpecs(specs);
      setPreviewImage(images[0] || image, title, 0);

      if (typeof productPreview.showModal === "function") {
        productPreview.showModal();
      } else {
        productPreview.setAttribute("open", "");
      }
    });
  });

  previewClose?.addEventListener("click", closeProductPreview);

  productPreview.addEventListener("click", (event) => {
    if (event.target === productPreview) {
      closeProductPreview();
    }
  });
}

const catalogFilters = document.querySelector(".catalog-filters");
const catalogFilterToggle = document.querySelector("[data-catalog-filter-toggle]");
const catalogFilterOverlay = document.querySelector("[data-catalog-filter-overlay]");
const catalogFilterClose = document.querySelector("[data-catalog-filter-close]");
const catalogBreadcrumbCurrent = document.querySelector("[data-catalog-breadcrumb-current]");
const catalogBreadcrumbSeparator = document.querySelector("[data-catalog-breadcrumb-separator]");
const catalogViewButtons = Array.from(document.querySelectorAll("[data-catalog-view]"));

if (document.body.classList.contains("catalog-page")) {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const forceCatalogTop = () => {
    window.scrollTo(0, 0);
    window.setTimeout(() => window.scrollTo(0, 0), 0);
    window.setTimeout(() => window.scrollTo(0, 0), 120);
  };

  window.addEventListener("load", forceCatalogTop);
  window.addEventListener("pageshow", forceCatalogTop);
}

if (catalogFilters) {
  const summary = catalogFilters.querySelector("[data-filter-summary] span");
  const modelSearchInput = catalogFilters.querySelector("[data-model-search]");
  const sizeSearchInput = catalogFilters.querySelector("[data-size-search]");
  const lineLinks = Array.from(catalogFilters.querySelectorAll("[data-filter-line]"));
  const sizeButtons = Array.from(catalogFilters.querySelectorAll("[data-filter-size]"));
  const catalogSections = Array.from(document.querySelectorAll(".catalog-model-section[data-line]"));
  const productCards = Array.from(document.querySelectorAll(".product-slot[data-product-view]"));
  const urlSearchParams = new URLSearchParams(window.location.search);
  const initialCatalogSearch = urlSearchParams.get("busca")?.trim() || "";
  let activeLine = "";
  let activeSize = "";

  const catalogLineLabels = {
    servico: "Linha de Serviço",
    seguranca: "Linha de Segurança",
    passeio: "Linha de Passeio",
    coturno: "Linha de Coturno",
    infantil: "Linha Infantil",
    borracha: "Linha de Borracha",
  };

  if (modelSearchInput && initialCatalogSearch) {
    modelSearchInput.value = initialCatalogSearch;
  }

  const normalizeText = (value) =>
    (value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const updateSummary = (visibleProductsCount) => {
    if (!summary) return;

    const parts = [];

    if (activeLine) {
      const currentLine = lineLinks.find((link) => link.dataset.filterLine === activeLine);
      if (currentLine) parts.push(currentLine.textContent.trim());
    }

    if (activeSize) {
      parts.push(`Tamanho ${activeSize}`);
    }

    if (modelSearchInput?.value.trim()) {
      parts.push(`Busca: ${modelSearchInput.value.trim()}`);
    }

    summary.textContent = parts.length
      ? `${parts.join(" | ")} (${visibleProductsCount} modelo${visibleProductsCount === 1 ? "" : "s"})`
      : "Modelos e tamanhos";
  };

  const syncCatalogBreadcrumb = (line) => {
    if (!catalogBreadcrumbCurrent || !catalogBreadcrumbSeparator) return;

    const label = line ? catalogLineLabels[line] : "";
    catalogBreadcrumbCurrent.textContent = label;
    catalogBreadcrumbCurrent.hidden = !label;
    catalogBreadcrumbSeparator.hidden = !label;
  };

  const applyCatalogFilters = () => {
    const searchTerm = normalizeText(modelSearchInput?.value);
    let visibleProductsCount = 0;

    productCards.forEach((card) => {
      const cardLine = normalizeText(card.dataset.productLine);
      const cardTitle = normalizeText(card.dataset.productTitle);
      const cardSizes = (card.dataset.productSizes || "")
        .split("|")
        .map((item) => item.trim())
        .filter(Boolean);

      const matchesLine = !activeLine || card.closest(".catalog-model-section")?.dataset.line === activeLine;
      const matchesSearch = !searchTerm || cardTitle.includes(searchTerm) || cardLine.includes(searchTerm);
      const matchesSize = !activeSize || cardSizes.includes(activeSize);
      const isVisible = matchesLine && matchesSearch && matchesSize;

      card.hidden = !isVisible;

      if (isVisible) visibleProductsCount += 1;
    });

    catalogSections.forEach((section) => {
      const hasVisibleProducts = Array.from(section.querySelectorAll(".product-slot[data-product-view]")).some((card) => !card.hidden);
      section.hidden = !hasVisibleProducts;
    });

    lineLinks.forEach((link) => {
      const isActive = link.dataset.filterLine === activeLine;
      link.classList.toggle("is-active", isActive);
      link.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    sizeButtons.forEach((button) => {
      const isActive = button.dataset.filterSize === activeSize;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    updateSummary(visibleProductsCount);
  };

  lineLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const nextLine = link.dataset.filterLine || "";
      activeLine = activeLine === nextLine ? "" : nextLine;
      applyCatalogFilters();
      syncCatalogBreadcrumb(activeLine);

      if (activeLine) {
        const targetSection = document.querySelector(`.catalog-model-section[data-line="${activeLine}"]`);
        targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#linha-${activeLine}`);
      } else {
        window.history.replaceState(null, "", window.location.pathname);
      }
    });
  });

  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextSize = button.dataset.filterSize || "";
      activeSize = activeSize === nextSize ? "" : nextSize;
      applyCatalogFilters();
    });
  });

  modelSearchInput?.addEventListener("input", applyCatalogFilters);

  sizeSearchInput?.addEventListener("input", () => {
    const searchTerm = normalizeText(sizeSearchInput.value);

    sizeButtons.forEach((button) => {
      const matches = !searchTerm || normalizeText(button.dataset.filterSize).includes(searchTerm);
      button.hidden = !matches;
    });
  });

  const initialHashMatch = window.location.hash.match(/^#linha-(servico|seguranca|passeio|coturno|infantil|borracha)$/);
  if (initialHashMatch) {
    activeLine = initialHashMatch[1];
  }

  applyCatalogFilters();
  syncCatalogBreadcrumb(activeLine);

  window.addEventListener("hashchange", () => {
    const hashMatch = window.location.hash.match(/^#linha-(servico|seguranca|passeio|coturno|infantil|borracha)$/);
    activeLine = hashMatch ? hashMatch[1] : "";
    applyCatalogFilters();
    syncCatalogBreadcrumb(activeLine);
  });
}

if (catalogFilters && catalogFilterToggle) {
  const syncCatalogFilterState = (isOpen) => {
    catalogFilters.classList.toggle("is-open", isOpen);
    catalogFilterToggle.classList.toggle("is-open", isOpen);
    catalogFilterOverlay?.classList.toggle("is-open", isOpen);
    catalogFilterToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  syncCatalogFilterState(false);

  catalogFilterToggle.addEventListener("click", () => {
    const isOpen = !catalogFilters.classList.contains("is-open");
    syncCatalogFilterState(isOpen);
  });

  catalogFilterClose?.addEventListener("click", () => syncCatalogFilterState(false));
  catalogFilterOverlay?.addEventListener("click", () => syncCatalogFilterState(false));

  catalogFilters.querySelectorAll("[data-filter-line], [data-filter-size]").forEach((item) => {
    item.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 760px)").matches) {
        syncCatalogFilterState(false);
      }
    });
  });

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 760px)").matches) {
      catalogFilters.classList.remove("is-open");
      catalogFilterToggle.classList.remove("is-open");
      catalogFilterOverlay?.classList.remove("is-open");
      catalogFilterToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (catalogViewButtons.length) {
  const setCatalogView = (view) => {
    const useSingle = view === "1";
    document.body.classList.toggle("catalog-view-single", useSingle);

    catalogViewButtons.forEach((button) => {
      const isActive = button.dataset.catalogView === view;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  catalogViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.catalogView || "2";
      setCatalogView(view);
    });
  });

  setCatalogView("2");
}

const productPageImage = document.querySelector("[data-product-page-image]");
const productPageThumbs = Array.from(document.querySelectorAll("[data-product-page-thumb]"));
const productPageDots = document.querySelector("[data-product-page-dots]");
const productPageMedia = document.querySelector(".product-page-main-media");
const productPageZoomOpen = document.querySelector("[data-product-page-zoom-open]");
const productPageZoomDialog = document.querySelector("[data-product-page-zoom-dialog]");
const productPageZoomImage = document.querySelector("[data-product-page-zoom-image]");
const productPageZoomClose = document.querySelector("[data-product-page-zoom-close]");
const productPageZoomPrev = document.querySelector("[data-product-page-zoom-prev]");
const productPageZoomNext = document.querySelector("[data-product-page-zoom-next]");
const measureTableOpen = document.querySelector("[data-measure-table-open]");
const measureTableDialog = document.querySelector("[data-measure-table-dialog]");
const measureTableClose = document.querySelector("[data-measure-table-close]");
const productPageSizes = Array.from(document.querySelectorAll(".product-page-sizes button"));
const relatedGrid = document.querySelector(".product-related-grid");
const relatedPrev = document.querySelector("[data-related-prev]");
const relatedNext = document.querySelector("[data-related-next]");

if (productPageImage && productPageThumbs.length) {
  let currentProductImageIndex = Math.max(
    productPageThumbs.findIndex((thumb) => thumb.classList.contains("is-active")),
    0,
  );
  let touchStartX = 0;
  let isProductImageSwitching = false;

  const syncProductGallery = (nextIndex) => {
    const normalizedIndex = (nextIndex + productPageThumbs.length) % productPageThumbs.length;
    const activeThumb = productPageThumbs[normalizedIndex];
    const nextImage = activeThumb?.dataset.image;
    if (!nextImage || isProductImageSwitching) return;

    currentProductImageIndex = normalizedIndex;

    productPageThumbs.forEach((item, index) => {
      const isActive = index === normalizedIndex;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    if (productPageDots) {
      Array.from(productPageDots.querySelectorAll(".product-page-dot")).forEach((dot, index) => {
        const isActive = index === normalizedIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    }

    if (productPageImage.getAttribute("src") === nextImage) return;

    isProductImageSwitching = true;
    productPageImage.classList.add("is-switching");

    window.setTimeout(() => {
      productPageImage.src = nextImage;
      if (productPageZoomImage) {
        productPageZoomImage.src = nextImage;
      }
    }, 110);
  };

  productPageImage.addEventListener("load", () => {
    productPageImage.classList.remove("is-switching");
    isProductImageSwitching = false;
  });

  if (productPageZoomImage) {
    productPageZoomImage.src = productPageImage.getAttribute("src");
    productPageZoomImage.alt = productPageImage.getAttribute("alt") || "";
  }

  productPageThumbs.forEach((thumb, index) => {
    thumb.setAttribute("aria-pressed", thumb.classList.contains("is-active") ? "true" : "false");
    thumb.addEventListener("click", () => syncProductGallery(index));
  });

  if (productPageDots) {
    productPageDots.innerHTML = productPageThumbs
      .map(
        (_, index) =>
          `<button class="product-page-dot${index === currentProductImageIndex ? " is-active" : ""}" type="button" aria-label="Ver foto ${index + 1}" aria-pressed="${index === currentProductImageIndex ? "true" : "false"}" data-product-page-dot="${index}"></button>`,
      )
      .join("");

    Array.from(productPageDots.querySelectorAll("[data-product-page-dot]")).forEach((dot) => {
      dot.addEventListener("click", () => {
        const nextIndex = Number(dot.getAttribute("data-product-page-dot"));
        syncProductGallery(nextIndex);
      });
    });
  }

  if (productPageMedia) {
    productPageMedia.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.changedTouches[0]?.clientX ?? 0;
      },
      { passive: true },
    );

    productPageMedia.addEventListener(
      "touchend",
      (event) => {
        const touchEndX = event.changedTouches[0]?.clientX ?? 0;
        const deltaX = touchEndX - touchStartX;

        if (Math.abs(deltaX) < 36) return;

        syncProductGallery(currentProductImageIndex + (deltaX < 0 ? 1 : -1));
      },
      { passive: true },
    );
  }

  productPageZoomPrev?.addEventListener("click", () => {
    syncProductGallery(currentProductImageIndex - 1);
  });

  productPageZoomNext?.addEventListener("click", () => {
    syncProductGallery(currentProductImageIndex + 1);
  });

  syncProductGallery(currentProductImageIndex);
}

if (productPageZoomOpen && productPageZoomDialog && productPageImage) {
  const openProductZoom = () => {
    if (productPageZoomImage) {
      productPageZoomImage.src = productPageImage.getAttribute("src") || productPageZoomImage.src;
      productPageZoomImage.alt = productPageImage.getAttribute("alt") || productPageZoomImage.alt;
    }

    if (typeof productPageZoomDialog.showModal === "function") {
      productPageZoomDialog.showModal();
    } else {
      productPageZoomDialog.setAttribute("open", "");
    }
  };

  const closeProductZoom = () => {
    if (typeof productPageZoomDialog.close === "function") {
      productPageZoomDialog.close();
    } else {
      productPageZoomDialog.removeAttribute("open");
    }
  };

  productPageZoomOpen.addEventListener("click", openProductZoom);
  productPageZoomClose?.addEventListener("click", closeProductZoom);

  productPageZoomDialog.addEventListener("click", (event) => {
    if (event.target === productPageZoomDialog) {
      closeProductZoom();
    }
  });

  productPageZoomDialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      productPageZoomPrev?.click();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      productPageZoomNext?.click();
    }
  });
}

if (measureTableOpen && measureTableDialog) {
  const openMeasureTable = () => {
    if (typeof measureTableDialog.showModal === "function") {
      measureTableDialog.showModal();
    } else {
      measureTableDialog.setAttribute("open", "");
    }
  };

  const closeMeasureTable = () => {
    if (typeof measureTableDialog.close === "function") {
      measureTableDialog.close();
    } else {
      measureTableDialog.removeAttribute("open");
    }
  };

  measureTableOpen.addEventListener("click", openMeasureTable);
  measureTableClose?.addEventListener("click", closeMeasureTable);

  measureTableDialog.addEventListener("click", (event) => {
    if (event.target === measureTableDialog) {
      closeMeasureTable();
    }
  });
}

if (productPageSizes.length) {
  productPageSizes.forEach((button) => {
    button.addEventListener("click", () => {
      productPageSizes.forEach((item) => item.classList.toggle("is-active", item === button));
    });
  });
}

if (relatedGrid && relatedPrev && relatedNext) {
  const scrollRelated = (direction) => {
    const firstCard = relatedGrid.querySelector(".product-related-card");
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 240;
    const gap = 14;
    relatedGrid.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  relatedPrev.addEventListener("click", () => scrollRelated(-1));
  relatedNext.addEventListener("click", () => scrollRelated(1));
}

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
