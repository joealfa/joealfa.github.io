// Smooth scroll for navigation
document.addEventListener("DOMContentLoaded", async () => {
  // Inject resume/nav.html into #resume-nav for consistency across pages
  const navMount = document.getElementById("resume-nav");
  if (navMount) {
    try {
      const resp = await fetch("./nav.html", { cache: "no-cache" });
      if (resp.ok) {
        navMount.innerHTML = await resp.text();
      }
    } catch (e) {
      // noop: keep page usable even if nav fails to load
    }
  }

  // Setup hamburger menu functionality
  const setupHamburgerMenu = () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
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
  };

  // Add scroll effect to navigation (after potential injection)
  const setupScrollEffect = () => {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        nav.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
      } else {
        nav.style.boxShadow = "none";
      }
    });
  };

  // If nav was injected, wait a tick, else attach immediately
  setTimeout(() => {
    setupScrollEffect();
    setupHamburgerMenu();
  }, 0);
});
