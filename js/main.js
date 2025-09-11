// Main JavaScript for Portfolio Website

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Load components and initialize after loading
  loadComponents();

  // Initialize theme toggle with retry mechanism
  setTimeout(() => {
    initThemeToggleWithRetry();
  }, 1000);
});

// Load HTML components
async function loadComponents() {
  const components = [
    { id: "nav-container", file: "components/nav.html" },
    { id: "hero-container", file: "components/hero.html" },
    { id: "about-container", file: "components/about.html" },
    { id: "projects-container", file: "components/projects.html" },
    { id: "skills-container", file: "components/skills.html" },
    { id: "contact-container", file: "components/contact.html" },
    { id: "footer-container", file: "components/footer.html" },
  ];

  const loadPromises = components.map((component) => {
    return fetch(component.file)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.text();
      })
      .then((html) => {
        const element = document.getElementById(component.id);
        if (element) {
          element.innerHTML = html;
          console.log(`✅ Loaded ${component.file} into ${component.id}`);
        } else {
          console.error(`❌ Element ${component.id} not found`);
        }
      })
      .catch((error) => {
        console.error(`❌ Error loading ${component.file}:`, error);

        // Fallback: Try to load from a different path or show error
        if (
          error.message.includes("CORS") ||
          error.message.includes("Failed to fetch")
        ) {
          console.warn(
            `⚠️ CORS issue with ${component.file}. This is normal when opening HTML files directly.`
          );
          console.warn(
            `💡 For local development, use a local server: python -m http.server 8000`
          );
          console.warn(
            `🌐 For GitHub Pages, this will work fine when deployed.`
          );
        }
      });
  });

  // Wait for all components to load
  await Promise.all(loadPromises);

  // Initialize components after they're loaded
  setTimeout(() => {
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initSkillsAnimation(); // Initialize animated skills
    initContactForm();
    initSmoothScrolling();
    initProjectsScroll();

    // Initialize theme toggle after components are loaded
    initThemeToggle();
  }, 500);
}

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Check if elements exist before adding event listeners
  if (!navbar || !navToggle || !navMenu) {
    console.log("Navigation elements not found, skipping navigation init");
    return;
  }

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle && navMenu) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  // Active link highlighting
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");

        // Trigger specific animations based on section
        const section = entry.target.closest("section");
        if (section) {
          const sectionId = section.id;
          triggerSectionAnimations(sectionId);
        }
      }
    });
  }, observerOptions);

  // Add animate-on-scroll class to elements
  document
    .querySelectorAll(".project-card, .skill-category, .contact-method")
    .forEach((el) => {
      el.classList.add("animate-on-scroll");
    });

  // Observe elements with animate-on-scroll class
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // Also observe sections for component-specific animations
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Fallback: Make elements visible after a delay if animation doesn't trigger
  setTimeout(() => {
    document
      .querySelectorAll(".animate-on-scroll:not(.animated)")
      .forEach((el) => {
        el.classList.add("visible");
      });
  }, 2000);
}

// Trigger animations for specific sections
function triggerSectionAnimations(sectionId) {
  console.log(`🎯 Triggering animations for section: ${sectionId}`);

  switch (sectionId) {
    case "hero":
      // Hero animations are handled by CSS
      break;
    case "about":
      // About section animations
      animateAboutSection();
      break;
    case "projects":
      // Projects section animations
      animateProjectsSection();
      break;
    case "skills":
      // Skills animation is handled by its own observer
      break;
    case "contact":
      // Contact section animations
      animateContactSection();
      break;
  }
}

// About section animations
function animateAboutSection() {
  const aboutElements = document.querySelectorAll("#about .animate-on-scroll");
  aboutElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// Projects section animations
function animateProjectsSection() {
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0) scale(1)";
    }, index * 150);
  });
}

// Contact section animations
function animateContactSection() {
  const contactElements = document.querySelectorAll(
    "#contact .animate-on-scroll"
  );
  contactElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// Skill bars animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.getAttribute("data-width");
          progressBar.style.width = width;
          progressBar.classList.add("animate");
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => {
    skillObserver.observe(bar);
  });
}

// Contact form
function initContactForm() {
  const form = document.getElementById("contactForm");
  const contactContainer = document.getElementById("contact-container");

  console.log("🔍 Checking contact form initialization...");
  console.log("Contact container:", contactContainer);
  console.log("Contact form:", form);

  if (!form) {
    console.log("❌ Contact form not found, skipping contact form init");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = "<span>Sending...</span>";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.");
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add loading state management
function showLoading(element) {
  element.classList.add("loading");
}

function hideLoading(element) {
  element.classList.remove("loading");
}

// Projects horizontal scroll
function initProjectsScroll() {
  const projectsScroll = document.querySelector(".projects-scroll");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (!projectsScroll || !prevBtn || !nextBtn) {
    console.log(
      "Projects scroll elements not found, skipping projects scroll init"
    );
    return;
  }

  let currentIndex = 0;
  const cardWidth = 350; // Width of each card including gap
  const maxIndex = projectCards.length - 1;

  // Update button states
  function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  // Scroll to specific index
  function scrollToIndex(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    const scrollPosition = currentIndex * cardWidth;
    projectsScroll.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
    updateButtons();
  }

  // Event listeners
  prevBtn.addEventListener("click", () => {
    scrollToIndex(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    scrollToIndex(currentIndex + 1);
  });

  // Touch/swipe support
  let startX = 0;
  let isScrolling = false;

  projectsScroll.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isScrolling = true;
  });

  projectsScroll.addEventListener("touchmove", (e) => {
    if (!isScrolling) return;
    e.preventDefault();
  });

  projectsScroll.addEventListener("touchend", (e) => {
    if (!isScrolling) return;
    isScrolling = false;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      if (diff > 0) {
        scrollToIndex(currentIndex + 1);
      } else {
        scrollToIndex(currentIndex - 1);
      }
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      scrollToIndex(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      scrollToIndex(currentIndex + 1);
    }
  });

  // Auto-scroll on card click
  projectCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      scrollToIndex(index);
    });
  });

  // Initialize
  updateButtons();
}

// Simplified Theme Toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");

  if (!themeToggle || !themeIcon) {
    console.log("Theme toggle elements not found");
    return;
  }

  // Check if already initialized
  if (themeToggle.hasAttribute("data-initialized")) {
    return;
  }

  // Mark as initialized
  themeToggle.setAttribute("data-initialized", "true");

  // Get saved theme or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(themeIcon, savedTheme);

  // Theme toggle event listener
  themeToggle.addEventListener("click", (e) => {
    e.preventDefault();
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(themeIcon, newTheme);

    console.log(`Theme switched to: ${newTheme}`);
  });

  console.log("Theme toggle initialized successfully");
}

function updateThemeIcon(icon, theme) {
  if (theme === "light") {
    icon.className = "fas fa-sun theme-icon";
  } else {
    icon.className = "fas fa-moon theme-icon";
  }
}

// Theme Toggle functionality with retry mechanism
function initThemeToggleWithRetry(maxRetries = 5, delay = 200) {
  let retries = 0;

  function tryInit() {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.querySelector(".theme-icon");

    if (themeToggle && themeIcon) {
      initThemeToggle();
      return;
    }

    retries++;
    if (retries < maxRetries) {
      setTimeout(tryInit, delay);
    } else {
      console.error("Theme toggle elements not found after maximum retries");
    }
  }

  tryInit();
}

// Export functions for global access
window.PortfolioApp = {
  showLoading,
  hideLoading,
  debounce,
  initThemeToggle,
};

// Also make initThemeToggle globally accessible
window.initThemeToggle = initThemeToggle;
