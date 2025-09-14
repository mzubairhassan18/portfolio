// Welcome Modal JavaScript

// Array of inspiring life quotes including Islamic wisdom
const lifeQuotes = [
  // Islamic Quotes - Prophet Muhammad (PBUH)
  {
    quote: "The best of people are those who benefit others.",
    author: "Prophet Muhammad (PBUH)",
  },
  {
    quote:
      "Whoever believes in Allah and the Last Day should speak good or remain silent.",
    author: "Prophet Muhammad (PBUH)",
  },
  {
    quote:
      "The believer is not one who eats his fill while his neighbor goes hungry.",
    author: "Prophet Muhammad (PBUH)",
  },
  {
    quote: "The best charity is that given when one is healthy and wealthy.",
    author: "Prophet Muhammad (PBUH)",
  },
  {
    quote:
      "Actions are according to intentions, and everyone will get what was intended.",
    author: "Prophet Muhammad (PBUH)",
  },
  {
    quote:
      "The strong believer is better and more beloved to Allah than the weak believer.",
    author: "Prophet Muhammad (PBUH)",
  },
  {
    quote: "Seek knowledge from the cradle to the grave.",
    author: "Prophet Muhammad (PBUH)",
  },
  {
    quote: "The best of you are those who are best to their families.",
    author: "Prophet Muhammad (PBUH)",
  },

  // Sahaba (Companions) Quotes
  {
    quote: "Knowledge without action is like a tree without fruit.",
    author: "Umar ibn al-Khattab (RA)",
  },
  {
    quote:
      "The best of deeds is that which is done consistently, even if it is small.",
    author: "Aisha (RA)",
  },
  {
    quote: "Do not be a slave to others when Allah has created you free.",
    author: "Ali ibn Abi Talib (RA)",
  },
  {
    quote:
      "The believer is like a bee that eats only good things and produces only good things.",
    author: "Abu Bakr (RA)",
  },
  {
    quote: "Patience is the key to relief.",
    author: "Umar ibn al-Khattab (RA)",
  },
  {
    quote: "The best of people are those who are most beneficial to others.",
    author: "Abu Bakr (RA)",
  },

  // Modern Inspirational Quotes
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote:
      "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    quote:
      "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    author: "Roy T. Bennett",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    quote: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    quote:
      "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  {
    quote: "Your limitation—it's only your imagination.",
    author: "Unknown",
  },
  {
    quote: "Great things never come from comfort zones.",
    author: "Unknown",
  },
  {
    quote: "Dream it. Wish it. Do it.",
    author: "Unknown",
  },
  {
    quote: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown",
  },
  {
    quote:
      "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown",
  },
  {
    quote: "Dream bigger. Do bigger.",
    author: "Unknown",
  },
  {
    quote: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown",
  },
  {
    quote: "Wake up with determination. Go to bed with satisfaction.",
    author: "Unknown",
  },
  {
    quote: "Do something today that your future self will thank you for.",
    author: "Unknown",
  },
];

// Function to get a random quote
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * lifeQuotes.length);
  return lifeQuotes[randomIndex];
}

// Function to display a random quote
function displayRandomQuote() {
  const quoteElement = document.getElementById("life-quote");
  const authorElement = document.getElementById("quote-author");

  if (quoteElement && authorElement) {
    const randomQuote = getRandomQuote();

    // Add fade out effect
    quoteElement.style.opacity = "0";
    authorElement.style.opacity = "0";

    setTimeout(() => {
      quoteElement.textContent = randomQuote.quote;
      authorElement.textContent = `— ${randomQuote.author}`;

      // Add fade in effect
      quoteElement.style.opacity = "1";
      authorElement.style.opacity = "1";

      // Add animation class
      quoteElement.classList.add("quote-fade-in");
      authorElement.classList.add("quote-fade-in");

      // Remove animation class after animation completes
      setTimeout(() => {
        quoteElement.classList.remove("quote-fade-in");
        authorElement.classList.remove("quote-fade-in");
      }, 800);
    }, 300);
  }
}

// Function to show the welcome modal
function showWelcomeModal() {
  const modal = document.getElementById("welcome-modal");
  if (modal) {
    // Display a random quote
    displayRandomQuote();

    // Show the modal with animation
    modal.classList.add("show");

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    // Add some sparkle effect
    createSparkleEffect();
  }
}

// Function to close the welcome modal
function closeWelcomeModal() {
  const modal = document.getElementById("welcome-modal");
  if (modal) {
    modal.classList.remove("show");

    // Restore body scroll
    document.body.style.overflow = "";
  }
}

// Function to create sparkle effect
function createSparkleEffect() {
  const modal = document.getElementById("welcome-modal");
  if (!modal) return;

  // Create sparkles
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #667eea;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10001;
        animation: sparkleAnimation 2s ease-out forwards;
      `;

      // Random position around the modal
      const rect = modal.getBoundingClientRect();
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height;

      sparkle.style.left = x + "px";
      sparkle.style.top = y + "px";

      document.body.appendChild(sparkle);

      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 2000);
    }, i * 200);
  }
}

// Add sparkle animation CSS
function addSparkleAnimation() {
  if (!document.getElementById("sparkle-styles")) {
    const style = document.createElement("style");
    style.id = "sparkle-styles";
    style.textContent = `
      @keyframes sparkleAnimation {
        0% {
          opacity: 0;
          transform: scale(0) rotate(0deg);
        }
        50% {
          opacity: 1;
          transform: scale(1) rotate(180deg);
        }
        100% {
          opacity: 0;
          transform: scale(0) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Function to initialize the welcome modal
function initWelcomeModal() {
  // Add sparkle animation styles
  addSparkleAnimation();

  // Show modal after 3 seconds on every page load
  setTimeout(() => {
    showWelcomeModal();
  }, 3000);

  // Add click outside to close functionality
  const modal = document.getElementById("welcome-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeWelcomeModal();
      }
    });
  }

  // Add keyboard support (ESC to close)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = document.getElementById("welcome-modal");
      if (modal && modal.classList.contains("show")) {
        closeWelcomeModal();
      }
    }
  });
}

// Function to reset welcome modal (for testing purposes)
function resetWelcomeModal() {
  localStorage.removeItem("welcomeModalSeen");
  console.log("Welcome modal reset. It will show again on next page load.");
}

// Make functions globally accessible
window.showWelcomeModal = showWelcomeModal;
window.closeWelcomeModal = closeWelcomeModal;
window.displayRandomQuote = displayRandomQuote;
window.resetWelcomeModal = resetWelcomeModal;

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Small delay to ensure all other components are loaded
  setTimeout(() => {
    initWelcomeModal();
  }, 1000);
});

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initWelcomeModal,
    showWelcomeModal,
    closeWelcomeModal,
    displayRandomQuote,
    resetWelcomeModal,
    lifeQuotes,
  };
}
