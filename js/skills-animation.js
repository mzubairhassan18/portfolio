// Skills Animation JavaScript

// Skills data with icons and categories
const skillsData = [
  // Frontend
  { name: "React", icon: "⚛️", category: "frontend" },
  { name: "Vue", icon: "💚", category: "frontend" },
  { name: "Angular", icon: "🅰️", category: "frontend" },
  { name: "JavaScript", icon: "🟨", category: "frontend" },
  { name: "TypeScript", icon: "🔷", category: "frontend" },
  { name: "HTML5", icon: "🌐", category: "frontend" },
  { name: "CSS3", icon: "🎨", category: "frontend" },
  { name: "Sass", icon: "💎", category: "frontend" },
  { name: "Tailwind", icon: "🎯", category: "frontend" },
  { name: "Next.js", icon: "⚡", category: "frontend" },

  // Backend
  { name: "Node.js", icon: "🟢", category: "backend" },
  { name: "Express", icon: "🚀", category: "backend" },
  { name: "Python", icon: "🐍", category: "backend" },
  { name: "Django", icon: "🎯", category: "backend" },
  { name: "Flask", icon: "🌶️", category: "backend" },
  { name: "PHP", icon: "🐘", category: "backend" },
  { name: "Laravel", icon: "🔴", category: "backend" },
  { name: "Java", icon: "☕", category: "backend" },
  { name: "Spring", icon: "🌱", category: "backend" },
  { name: "Go", icon: "🐹", category: "backend" },

  // Database
  { name: "MySQL", icon: "🐬", category: "database" },
  { name: "PostgreSQL", icon: "🐘", category: "database" },
  { name: "MongoDB", icon: "🍃", category: "database" },
  { name: "Redis", icon: "🔴", category: "database" },
  { name: "SQLite", icon: "🗃️", category: "database" },
  { name: "Firebase", icon: "🔥", category: "database" },
  { name: "Supabase", icon: "⚡", category: "database" },

  // Tools
  { name: "Git", icon: "📚", category: "tools" },
  { name: "Docker", icon: "🐳", category: "tools" },
  { name: "AWS", icon: "☁️", category: "tools" },
  { name: "Azure", icon: "🔵", category: "tools" },
  { name: "Figma", icon: "🎨", category: "tools" },
  { name: "VS Code", icon: "💻", category: "tools" },
  { name: "Webpack", icon: "📦", category: "tools" },
  { name: "Vite", icon: "⚡", category: "tools" },
  { name: "Jest", icon: "🧪", category: "tools" },
  { name: "Cypress", icon: "🌲", category: "tools" },
];

let skillElements = [];
let animationId;
let isAnimating = false;

// Initialize skills animation
function initSkillsAnimation() {
  console.log("🎯 Setting up skills animation observer...");

  // Clear any existing animation
  destroySkillsAnimation();

  // Set up intersection observer for scroll-triggered animation
  const skillsSection = document.getElementById("skills");
  if (!skillsSection) {
    console.log("❌ Skills section not found");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(
            "🎯 Skills section is now visible, starting animations..."
          );
          startSkillsAnimation();
          // Stop observing once animation starts
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3, // Start animation when 30% of the section is visible
      rootMargin: "0px 0px -100px 0px", // Start a bit before fully in view
    }
  );

  observer.observe(skillsSection);
  console.log("✅ Skills animation observer set up");
}

// Start the actual skills animation
function startSkillsAnimation() {
  console.log("🎯 Starting skills animation...");

  const container = document.getElementById("falling-skills");
  if (!container) return;

  // Clear existing skills
  container.innerHTML = "";
  skillElements = [];

  // Create initial skills
  createSkills();

  // Start animation
  startAnimation();

  // Add click listeners
  addClickListeners();

  console.log("✅ Skills animation started");
}

// Create skill elements
function createSkills() {
  const container = document.getElementById("falling-skills");
  if (!container) return;

  // Create 15-20 skills initially
  for (let i = 0; i < 18; i++) {
    createSkillElement();
  }
}

// Create a single skill element
function createSkillElement() {
  const container = document.getElementById("falling-skills");
  if (!container) return;

  const skill = skillsData[Math.floor(Math.random() * skillsData.length)];
  const skillElement = document.createElement("div");

  skillElement.className = `skill-icon ${skill.category}`;
  skillElement.innerHTML = skill.icon;
  skillElement.setAttribute("data-skill", skill.name);
  skillElement.setAttribute("data-category", skill.category);

  // Random horizontal position with better distribution
  const containerWidth = container.offsetWidth;
  const skillWidth = 60;
  const margin = 30; // Margin from edges
  const x = margin + Math.random() * (containerWidth - skillWidth - margin * 2);
  skillElement.style.left = `${x}px`;

  // Start from very top edge
  skillElement.style.top = `-100px`;

  // Random animation duration (8-15 seconds for more realistic fall)
  const duration = 8 + Math.random() * 7;
  skillElement.style.animationDuration = `${duration}s`;

  // Random delay (0-2 seconds)
  const delay = Math.random() * 2;
  skillElement.style.animationDelay = `-${delay}s`;

  container.appendChild(skillElement);
  skillElements.push(skillElement);
}

// Start the animation loop
function startAnimation() {
  if (isAnimating) return;
  isAnimating = true;

  animationId = setInterval(() => {
    // Remove skills that have fallen off screen
    removeOffScreenSkills();

    // Add new skills periodically
    if (skillElements.length < 20) {
      createSkillElement();
    }
  }, 2000);
}

// Remove skills that are off screen
function removeOffScreenSkills() {
  const container = document.getElementById("falling-skills");
  if (!container) return;

  skillElements = skillElements.filter((skill) => {
    const rect = skill.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // If skill is below the container, remove it
    if (rect.top > containerRect.bottom + 100) {
      skill.remove();
      return false;
    }
    return true;
  });
}

// Add click listeners to skills
function addClickListeners() {
  const container = document.getElementById("falling-skills");
  if (!container) return;

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("skill-icon")) {
      handleSkillClick(e.target);
    }
  });
}

// Handle skill click - stop and enlarge
function handleSkillClick(skillElement) {
  if (skillElement.classList.contains("clicked")) return;

  skillElement.classList.add("clicked");

  // Get current position
  const rect = skillElement.getBoundingClientRect();
  const containerRect = document
    .getElementById("falling-skills")
    .getBoundingClientRect();
  const currentY = rect.top - containerRect.top;

  // Stop animation and enlarge
  skillElement.style.animation = "none";
  skillElement.style.transform = `translateY(${currentY}px) scale(1.3)`;
  skillElement.style.transition = "all 0.3s ease-out";
  skillElement.style.zIndex = "10";

  // Add ripple effect
  createRippleEffect(skillElement);

  // Add mouse leave event for free fall
  skillElement.addEventListener("mouseleave", handleSkillMouseLeave);
}

// Handle skill mouse leave - free fall
function handleSkillMouseLeave(event) {
  const skillElement = event.target;

  // Remove mouse leave listener to prevent multiple triggers
  skillElement.removeEventListener("mouseleave", handleSkillMouseLeave);

  // Get current position
  const rect = skillElement.getBoundingClientRect();
  const containerRect = document
    .getElementById("falling-skills")
    .getBoundingClientRect();
  const currentY = rect.top - containerRect.top;

  // Start free fall animation
  skillElement.style.transition =
    "transform 2s ease-in, opacity 0.5s ease-out 1.5s";
  skillElement.style.transform = `translateY(550px) rotate(180deg) scale(0.6)`;
  skillElement.style.opacity = "0";

  // Remove element after free fall completes
  setTimeout(() => {
    skillElement.remove();
    skillElements = skillElements.filter((skill) => skill !== skillElement);

    // Create new skill at top
    setTimeout(() => {
      createSkillElement();
    }, 500);
  }, 2500);
}

// Create ripple effect when skill is clicked
function createRippleEffect(skillElement) {
  const ripple = document.createElement("div");
  ripple.className = "skill-ripple";

  const rect = skillElement.getBoundingClientRect();
  const containerRect = document
    .getElementById("falling-skills")
    .getBoundingClientRect();

  ripple.style.left = `${rect.left - containerRect.left + 30}px`;
  ripple.style.top = `${rect.top - containerRect.top + 30}px`;

  document.getElementById("falling-skills").appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Pause animation when page is not visible
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    pauseAnimation();
  } else {
    resumeAnimation();
  }
});

// Pause animation
function pauseAnimation() {
  if (animationId) {
    clearInterval(animationId);
    isAnimating = false;
  }

  // Pause CSS animations
  skillElements.forEach((skill) => {
    skill.style.animationPlayState = "paused";
  });
}

// Resume animation
function resumeAnimation() {
  if (!isAnimating) {
    startAnimation();
  }

  // Resume CSS animations
  skillElements.forEach((skill) => {
    skill.style.animationPlayState = "running";
  });
}

// Clean up when component is removed
function destroySkillsAnimation() {
  if (animationId) {
    clearInterval(animationId);
    animationId = null;
  }

  isAnimating = false;
  skillElements = [];
}

// Export functions for use in main.js
window.initSkillsAnimation = initSkillsAnimation;
window.destroySkillsAnimation = destroySkillsAnimation;
