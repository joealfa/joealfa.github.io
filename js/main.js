// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    const isExpanded = hamburger.classList.contains("active");
    hamburger.setAttribute("aria-expanded", isExpanded);

    // Prevent body scroll when menu is open
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  // Close menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "auto";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "auto";
    }
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll effect to navigation
let lastScroll = 0;
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  } else {
    nav.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe project cards
document.querySelectorAll(".project-card, .skill-category").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Carousel functionality
const initCarousel = () => {
  // Only select carousels NOT in the modal
  const carousels = document.querySelectorAll(
    ".carousel-container:not(#snapposModal .carousel-container)"
  );

  carousels.forEach((container) => {
    const track = container.querySelector(".carousel-track");
    const slides = container.querySelectorAll(".carousel-slide");
    const indicators = container.querySelectorAll(".indicator");

    if (!track || slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Check if carousel is in project card (disable auto-play for projects page)
    const isInProjectCard = track.closest(".project-card") !== null;

    const updateCarousel = () => {
      // Update track position
      track.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Update active states
      slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentSlide);
      });

      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentSlide);
      });
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    };

    const goToSlide = (index) => {
      currentSlide = index;
      updateCarousel();
    };

    const startAutoPlay = () => {
      if (!isInProjectCard) {
        stopAutoPlay(); // Clear any existing interval first
        autoPlayInterval = setInterval(nextSlide, 5000);
      }
    };

    const stopAutoPlay = () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    };

    // Event listeners
    // Click on carousel images to advance
    slides.forEach((slide) => {
      slide.addEventListener("click", () => {
        nextSlide();
        if (!isInProjectCard) {
          stopAutoPlay();
          startAutoPlay();
        }
      });
    });

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent slide click from firing
        goToSlide(index);
        if (!isInProjectCard) {
          stopAutoPlay();
          startAutoPlay();
        }
      });
    });

    // Pause on hover (only for auto-playing carousels)
    if (!isInProjectCard) {
      track.addEventListener("mouseenter", stopAutoPlay);
      track.addEventListener("mouseleave", startAutoPlay);
    }

    // Start auto-play (only for non-project carousels)
    startAutoPlay();
  });
};

// Initialize carousel when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCarousel);
} else {
  initCarousel();
}

// Modal functions for SnapPOS screenshots
function openSnapPOSModal() {
  const modal = document.getElementById("snapposModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Initialize modal carousel
  initModalCarousel("modalCarouselTrack", "modalCarouselIndicators");
}

function closeSnapPOSModal() {
  const modal = document.getElementById("snapposModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Modal functions for Fortune Lab screenshots
function openFortuneLabModal() {
  const modal = document.getElementById("fortunelabModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Initialize modal carousel
  initModalCarousel("fortunelabCarouselTrack", "fortunelabCarouselIndicators");
}

function closeFortuneLabModal() {
  const modal = document.getElementById("fortunelabModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Modal functions for EMS screenshots
function openEMSModal() {
  const modal = document.getElementById("emsModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Initialize modal carousel
  initModalCarousel("emsCarouselTrack", "emsCarouselIndicators");
}

function closeEMSModal() {
  const modal = document.getElementById("emsModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Modal functions for Developer Tools screenshots
function openDevToolsModal() {
  const modal = document.getElementById("devtoolsModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Initialize modal carousel
  initModalCarousel("devtoolsCarouselTrack", "devtoolsCarouselIndicators");
}

function closeDevToolsModal() {
  const modal = document.getElementById("devtoolsModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Modal functions for EMS V2 screenshots
function openEMSV2Modal() {
  const modal = document.getElementById("emsv2Modal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Initialize modal carousel
  initModalCarousel("emsv2CarouselTrack", "emsv2CarouselIndicators");
}

function closeEMSV2Modal() {
  const modal = document.getElementById("emsv2Modal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Modal carousel functionality
function initModalCarousel(trackId, indicatorsId) {
  const track = document.getElementById(trackId);
  const slides = track.querySelectorAll(".carousel-slide");
  const indicators = document
    .getElementById(indicatorsId)
    .querySelectorAll(".indicator");

  let currentSlide = 0;
  const totalSlides = slides.length;

  const updateCarousel = () => {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  };

  const goToSlide = (index) => {
    currentSlide = index;
    updateCarousel();
  };

  // Click on slides to advance
  slides.forEach((slide) => {
    slide.addEventListener("click", nextSlide);
  });

  // Click on indicators to jump to slide
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", (e) => {
      e.stopPropagation();
      goToSlide(index);
    });
  });

  updateCarousel();
}

// Modal functions for MCP Server demo
function openMCPModal() {
  const modal = document.getElementById("mcpModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMCPModal() {
  const modal = document.getElementById("mcpModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
  const video = document.getElementById("mcpVideo");
  if (video) video.pause();
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSnapPOSModal();
    closeFortuneLabModal();
    closeEMSModal();
    closeDevToolsModal();
    closeEMSV2Modal();
    closeMCPModal();
  }
});
