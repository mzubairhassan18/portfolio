// Particle Background Configuration for Game Section

function initGameParticles() {
  console.log("Initializing game particles...");

  // Check if particles.js is loaded
  if (typeof particlesJS === "undefined") {
    console.error("particles.js not loaded");
    return;
  }

  // Particle configuration
  const particleConfig = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: [
          "#667eea",
          "#764ba2",
          "#f093fb",
          "#f5576c",
          "#4facfe",
          "#00f2fe",
        ],
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#667eea",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 80,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200, // Increased distance for stronger effect
          duration: 0.2, // Faster response
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };

  // Initialize particles
  particlesJS("particles-js", particleConfig, function () {
    console.log("Game particles initialized successfully");

    // Add mouse event debugging
    const canvas = document.querySelector("#particles-js canvas");
    if (canvas) {
      console.log("Particles canvas found, adding event listeners");

      canvas.addEventListener("mouseenter", () => {
        console.log("Mouse entered particles area");
      });

      canvas.addEventListener("mousemove", () => {
        console.log("Mouse moving over particles");
      });
    } else {
      console.error("Particles canvas not found");
    }
  });
}

// Initialize particles when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Wait a bit for the game section to be loaded
  setTimeout(() => {
    if (document.getElementById("particles-js")) {
      initGameParticles();
    }
  }, 1000);
});

// Re-initialize particles when game section is loaded dynamically
function reinitGameParticles() {
  setTimeout(() => {
    if (
      document.getElementById("particles-js") &&
      typeof particlesJS !== "undefined"
    ) {
      initGameParticles();
    }
  }, 500);
}

// Export for global access
window.initGameParticles = initGameParticles;
window.reinitGameParticles = reinitGameParticles;
