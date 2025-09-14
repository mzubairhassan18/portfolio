// Color Match Reaction Game JavaScript

class ColorMatchGame {
  constructor() {
    console.log("ColorMatchGame constructor called");

    this.colors = [
      "red",
      "blue",
      "green",
      "yellow",
      "purple",
      "orange",
      "pink",
      "cyan",
      "lime",
      "magenta",
      "brown",
      "gray",
      "navy",
      "teal",
      "olive",
      "maroon",
      "silver",
      "gold",
    ];
    this.targetColor = "";
    this.options = [];
    this.correctOption = "";
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem("colorMatchHighScore")) || 0;
    this.gameStartTime = 0;
    this.gameActive = false;
    this.gamePaused = false;
    this.currentRound = 0;
    this.maxRounds = 10;
    this.baseRoundTime = 3000; // Starting with 3 seconds
    this.roundTime = this.baseRoundTime;
    this.timerInterval = null;
    this.timeLeft = 0;
    this.audioContext = null;
    this.backgroundMusic = null;

    this.initializeElements();
    this.setupEventListeners();
    this.updateDisplay();

    console.log("ColorMatchGame initialized successfully");
  }

  initializeElements() {
    console.log("Initializing game elements...");

    this.elements = {
      instructions: document.getElementById("game-instructions"),
      gamePlay: document.getElementById("game-play"),
      gameResult: document.getElementById("game-result"),
      targetColorDisplay: document.getElementById("target-color-display"),
      colorRectangle: document.getElementById("color-rectangle"),
      colorOptions: document.getElementById("color-options"),
      currentScore: document.getElementById("current-score"),
      highScore: document.getElementById("high-score"),
      gameTime: document.getElementById("game-time"),
      startBtn: document.getElementById("start-game"),
      retryBtn: document.getElementById("retry-game"),
      backToMenuBtn: document.getElementById("back-to-menu"),
      pauseBtn: document.getElementById("pause-game"),
      stopBtn: document.getElementById("stop-game"),
      gameControls: document.querySelector(".game-controls"), // Add the container
      resultTitle: document.getElementById("result-title"),
      resultMessage: document.getElementById("result-message"),
      finalTime: document.getElementById("final-time"),
      resultScore: document.getElementById("result-score"),
      finalScore: document.getElementById("final-score"),
    };

    // Ensure game controls start hidden
    if (this.elements.gameControls) {
      this.elements.gameControls.style.display = "none";
    }

    // Debug: Check which elements were found
    const foundElements = Object.entries(this.elements).filter(
      ([key, element]) => element !== null
    );
    console.log(
      `Found ${foundElements.length} game elements:`,
      foundElements.map(([key]) => key)
    );

    const missingElements = Object.entries(this.elements).filter(
      ([key, element]) => element === null
    );
    if (missingElements.length > 0) {
      console.warn(
        "Missing elements:",
        missingElements.map(([key]) => key)
      );
    }
  }

  setupEventListeners() {
    console.log("Setting up game event listeners...");

    if (this.elements.startBtn) {
      this.elements.startBtn.addEventListener("click", () => this.startGame());
      console.log("Start button event listener added");
    } else {
      console.error("Start button not found!");
    }

    if (this.elements.retryBtn) {
      this.elements.retryBtn.addEventListener("click", () => this.startGame());
    }

    if (this.elements.backToMenuBtn) {
      this.elements.backToMenuBtn.addEventListener("click", () =>
        this.showInstructions()
      );
    }

    if (this.elements.pauseBtn) {
      this.elements.pauseBtn.addEventListener("click", () =>
        this.togglePause()
      );
    }

    if (this.elements.stopBtn) {
      this.elements.stopBtn.addEventListener("click", () => this.endGame());
    }

    // Color circle event listeners
    const colorCircles = document.querySelectorAll(".color-circle");
    console.log(`Found ${colorCircles.length} color circles`);
    colorCircles.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleColorClick(e.target));
    });
  }

  async startGame() {
    console.log("startGame called");

    // Force reset all game state
    this.score = 0;
    this.currentRound = 0;
    this.gameActive = true;
    this.gamePaused = false;
    this.roundTime = this.baseRoundTime;

    // Clear any existing timers
    clearInterval(this.timerInterval);

    // Reset rectangle position
    if (this.elements.colorRectangle) {
      this.elements.colorRectangle.style.left = "-200px";
      this.elements.colorRectangle.className = "color-rectangle";
    }

    // Reset color circles
    const colorCircles = document.querySelectorAll(".color-circle");
    colorCircles.forEach((btn) => {
      btn.classList.remove("selected");
    });

    this.gameStartTime = Date.now();

    this.showGamePlay();
    this.startBackgroundMusic();
    this.updateDisplay();
    this.nextRound();

    console.log(
      `startGame completed: score=${this.score}, round=${this.currentRound}, active=${this.gameActive}`
    );
  }

  resetGame() {
    console.log("Resetting game...");

    this.score = 0;
    this.currentRound = 0;
    this.roundTime = this.baseRoundTime; // Reset to initial time
    this.gameActive = true;
    this.gamePaused = false;
    this.gameStartTime = Date.now();

    // Clear any existing timers
    clearInterval(this.timerInterval);

    // Reset rectangle position
    if (this.elements.colorRectangle) {
      this.elements.colorRectangle.style.left = "-200px";
      this.elements.colorRectangle.className = "color-rectangle";
    }

    // Reset color circles
    const colorCircles = document.querySelectorAll(".color-circle");
    colorCircles.forEach((btn) => {
      btn.classList.remove("selected");
    });

    // Update button visibility
    this.updateButtonVisibility();

    console.log(
      `Game reset: score=${this.score}, round=${this.currentRound}, active=${this.gameActive}`
    );
  }

  showGamePlay() {
    this.elements.instructions.style.display = "none";
    this.elements.gameResult.style.display = "none";
    this.elements.gamePlay.style.display = "block";

    // Update button visibility
    this.updateButtonVisibility();
  }

  showInstructions() {
    this.elements.gamePlay.style.display = "none";
    this.elements.gameResult.style.display = "none";
    this.elements.instructions.style.display = "block";

    // Stop background music and clear any timers
    this.stopBackgroundMusic();
    clearInterval(this.timerInterval);

    // Reset game state
    this.gameActive = false;
    this.gamePaused = false;
    this.currentRound = 0; // Reset round counter

    // Update button visibility
    this.updateButtonVisibility();
  }

  showGameResult() {
    this.elements.gamePlay.style.display = "none";
    this.elements.gameResult.style.display = "block";
    this.stopBackgroundMusic();

    // Update button visibility
    this.updateButtonVisibility();
  }

  nextRound() {
    console.log(
      `nextRound called: gameActive=${this.gameActive}, gamePaused=${this.gamePaused}, currentRound=${this.currentRound}`
    );

    if (!this.gameActive || this.gamePaused) {
      console.log("Game not active or paused, returning");
      return;
    }

    this.currentRound++;
    console.log(`Starting round ${this.currentRound}`);

    if (this.currentRound > this.maxRounds) {
      console.log("Max rounds reached, ending game");
      this.endGame();
      return;
    }

    // Update button visibility when game starts
    this.updateButtonVisibility();

    // Progressive difficulty: reduce time by 200ms each round (minimum 1 second)
    this.roundTime = Math.max(
      1000,
      this.baseRoundTime - (this.currentRound - 1) * 200
    );
    console.log(`Round ${this.currentRound}: ${this.roundTime}ms`);

    // Generate target color and options
    this.targetColor =
      this.colors[Math.floor(Math.random() * this.colors.length)];
    this.correctOption = this.targetColor;

    // Generate 3 options (1 correct, 2 random)
    this.options = [this.correctOption];
    while (this.options.length < 3) {
      const randomColor =
        this.colors[Math.floor(Math.random() * this.colors.length)];
      if (!this.options.includes(randomColor)) {
        this.options.push(randomColor);
      }
    }

    // Shuffle options
    this.options = this.options.sort(() => Math.random() - 0.5);

    // Update UI
    this.updateTargetColor();
    this.updateColorOptions();
    this.startRoundTimer();
  }

  updateTargetColor() {
    this.elements.colorRectangle.style.backgroundColor = this.targetColor;
    this.elements.colorRectangle.className = "color-rectangle";
    // Reset position to start from left
    this.elements.colorRectangle.style.left = "-200px";
  }

  updateColorOptions() {
    const colorCircles =
      this.elements.colorOptions.querySelectorAll(".color-circle");
    colorCircles.forEach((btn, index) => {
      if (index < this.options.length) {
        btn.style.backgroundColor = this.options[index];
        btn.setAttribute("data-color", this.options[index]);
        btn.classList.remove("selected");
      }
    });
  }

  startRoundTimer() {
    this.timeLeft = this.roundTime;
    this.updateRectanglePosition();

    this.timerInterval = setInterval(() => {
      this.timeLeft -= 50; // Update every 50ms for smooth animation
      this.updateRectanglePosition();

      if (this.timeLeft <= 0) {
        this.timeUp();
      }
    }, 50);
  }

  updateRectanglePosition() {
    const progress = (this.timeLeft / this.roundTime) * 100;
    // Move from left (-200px) to right (100%) as time decreases
    const containerWidth = this.elements.targetColorDisplay.offsetWidth;
    const rectangleWidth = 200;
    const maxPosition = containerWidth + rectangleWidth; // Move completely off screen to the right
    const currentPosition =
      (100 - progress) * (maxPosition / 100) - rectangleWidth;
    this.elements.colorRectangle.style.left = `${currentPosition}px`;
  }

  timeUp() {
    clearInterval(this.timerInterval);
    this.elements.colorRectangle.classList.add("wrong");
    this.playWrongSound();

    setTimeout(() => {
      this.nextRound();
    }, 1000);
  }

  handleColorClick(clickedBtn) {
    if (!this.gameActive || this.gamePaused) return;

    // Clear timer
    clearInterval(this.timerInterval);

    const clickedColor = clickedBtn.getAttribute("data-color");
    const isCorrect = clickedColor === this.correctOption;

    // Visual feedback
    clickedBtn.classList.add("selected");

    if (isCorrect) {
      this.score += 10;
      this.elements.colorRectangle.classList.add("correct");
      this.playCorrectSound();
    } else {
      this.elements.colorRectangle.classList.add("wrong");
      this.playWrongSound();
    }

    this.updateDisplay();

    // Show result briefly before next round
    setTimeout(() => {
      this.nextRound();
    }, 1000);
  }

  endGame() {
    this.gameActive = false;
    this.gamePaused = false;

    // Clear any running timer
    clearInterval(this.timerInterval);

    // Stop background music
    this.stopBackgroundMusic();

    const gameDuration = (Date.now() - this.gameStartTime) / 1000;

    // Update high score
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("colorMatchHighScore", this.highScore.toString());
    }

    // Update result display
    this.elements.finalTime.textContent = `${gameDuration.toFixed(1)}s`;
    this.elements.finalScore.textContent = this.score;

    if (this.score === this.maxRounds * 10) {
      this.elements.resultTitle.textContent = "Perfect Score!";
      this.elements.resultMessage.textContent =
        "Amazing! You got every question right!";
    } else if (this.score >= this.maxRounds * 7) {
      this.elements.resultTitle.textContent = "Great Job!";
      this.elements.resultMessage.textContent = "Excellent performance!";
    } else if (this.score >= this.maxRounds * 5) {
      this.elements.resultTitle.textContent = "Good Work!";
      this.elements.resultMessage.textContent = "Nice job! Keep practicing!";
    } else {
      this.elements.resultTitle.textContent = "Keep Trying!";
      this.elements.resultMessage.textContent = "Practice makes perfect!";
    }

    // Play completion sound
    this.playCompletionSound();

    this.showGameResult();
    this.updateDisplay();
  }

  togglePause() {
    this.gamePaused = !this.gamePaused;

    if (this.gamePaused) {
      // Change to play icon (resume)
      this.elements.pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      this.elements.pauseBtn.title = "Resume";
      this.stopBackgroundMusic();
      clearInterval(this.timerInterval);
    } else {
      // Change to pause icon
      this.elements.pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      this.elements.pauseBtn.title = "Pause";
      this.startBackgroundMusic();
      // Resume timer if game is active
      if (this.gameActive && this.timeLeft > 0) {
        this.startRoundTimer();
      }
    }
  }

  updateDisplay() {
    this.elements.currentScore.textContent = this.score;
    this.elements.highScore.textContent = this.highScore;

    if (this.gameActive && !this.gamePaused) {
      const elapsed = (Date.now() - this.gameStartTime) / 1000;
      this.elements.gameTime.textContent = `${elapsed.toFixed(1)}s`;
    }

    // Update button visibility whenever display is updated
    this.updateButtonVisibility();
  }

  // Dedicated method to manage button visibility
  updateButtonVisibility() {
    console.log(
      `Button visibility check: gameActive=${this.gameActive}, currentRound=${this.currentRound}`
    );

    // Hide/show the entire game-controls container
    if (this.elements.gameControls) {
      if (this.gameActive && this.currentRound > 0) {
        // Show buttons only when game is active and has started
        console.log("Showing game controls");
        this.elements.gameControls.style.display = "flex";
      } else {
        // Hide buttons in all other cases
        console.log("Hiding game controls");
        this.elements.gameControls.style.display = "none";
      }
    } else {
      console.log("Game controls container not found!");
    }
  }

  startBackgroundMusic() {
    try {
      // Stop any existing background music first
      this.stopBackgroundMusic();

      // Use the spaceship arcade soundtrack
      this.playBackgroundMusicFile();
    } catch (error) {
      console.log("Audio not supported or blocked");
    }
  }

  // Method for playing the spaceship arcade soundtrack
  playBackgroundMusicFile() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }

    // Create audio element for the spaceship arcade soundtrack
    this.backgroundMusic = new Audio(
      "audio/spaceship-arcade-shooter-game-background-soundtrack-318508.mp3"
    );
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3; // Adjust volume (0.0 to 1.0)

    // Play the audio
    this.backgroundMusic.play().catch((error) => {
      console.log("Background music failed to play:", error);
    });
  }

  createBackgroundMusic() {
    if (!this.audioContext) return;

    // Create a pleasant ambient tone
    const oscillator1 = this.audioContext.createOscillator();
    const oscillator2 = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    oscillator1.connect(filter);
    oscillator2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Gentle frequencies
    oscillator1.frequency.setValueAtTime(220, this.audioContext.currentTime); // A3
    oscillator2.frequency.setValueAtTime(330, this.audioContext.currentTime); // E4

    oscillator1.type = "sine";
    oscillator2.type = "sine";

    // Low-pass filter for softer sound
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      0.05,
      this.audioContext.currentTime + 0.5
    );

    oscillator1.start();
    oscillator2.start();

    this.backgroundMusic = { oscillator1, oscillator2, gainNode };
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      try {
        // Check if it's an Audio element (file) or Web Audio API object
        if (this.backgroundMusic.pause) {
          // It's an Audio element (file)
          this.backgroundMusic.pause();
          this.backgroundMusic.currentTime = 0;
        } else if (this.backgroundMusic.gainNode) {
          // It's a Web Audio API object (generated)
          this.backgroundMusic.gainNode.gain.linearRampToValueAtTime(
            0,
            this.audioContext.currentTime + 0.1
          );
          setTimeout(() => {
            if (this.backgroundMusic) {
              try {
                this.backgroundMusic.oscillator1.stop();
                this.backgroundMusic.oscillator2.stop();
              } catch (e) {
                // Oscillators might already be stopped
              }
              this.backgroundMusic = null;
            }
          }, 100);
        }
      } catch (error) {
        // Audio context might be closed
        this.backgroundMusic = null;
      }
    }
  }

  playCorrectSound() {
    // Use generated sound for correct answers
    this.playCorrectSoundGenerated();
  }

  // Method for playing sound files
  playSoundFile(filePath, volume = 0.5) {
    try {
      const audio = new Audio(filePath);
      audio.volume = volume;
      audio.play().catch((error) => {
        console.log(`Sound file failed to play: ${filePath}`, error);
      });
    } catch (error) {
      console.log("Error playing sound file:", error);
    }
  }

  // Play completion sound when game finishes
  playCompletionSound() {
    try {
      // Play the preview.mp3 file for game completion
      this.playSoundFile("audio/preview.mp3", 0.6); // Slightly louder for celebration
    } catch (error) {
      console.log("Completion sound failed to play:", error);
    }
  }

  // Generated audio method for correct sound
  playCorrectSoundGenerated() {
    if (!this.audioContext) return;

    // Create a pleasant success sound
    const oscillator1 = this.audioContext.createOscillator();
    const oscillator2 = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Success chord (C major)
    oscillator1.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
    oscillator2.frequency.setValueAtTime(659.25, this.audioContext.currentTime); // E5

    oscillator1.type = "sine";
    oscillator2.type = "sine";

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      0.2,
      this.audioContext.currentTime + 0.01
    );
    gainNode.gain.linearRampToValueAtTime(
      0,
      this.audioContext.currentTime + 0.3
    );

    oscillator1.start();
    oscillator2.start();
    oscillator1.stop(this.audioContext.currentTime + 0.3);
    oscillator2.stop(this.audioContext.currentTime + 0.3);
  }

  playWrongSound() {
    if (!this.audioContext) return;

    // Create a subtle error sound
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Low, descending tone
    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(
      150,
      this.audioContext.currentTime + 0.2
    );
    oscillator.type = "triangle";

    // Low-pass filter for softer sound
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      0.15,
      this.audioContext.currentTime + 0.01
    );
    gainNode.gain.linearRampToValueAtTime(
      0,
      this.audioContext.currentTime + 0.25
    );

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.25);
  }
}

// Initialize game function
function initColorMatchGame() {
  console.log("Attempting to initialize Color Match Game...");

  // Only initialize if game elements exist
  if (document.getElementById("game-instructions")) {
    // Check if game is already initialized
    if (window.colorMatchGame) {
      console.log("Game already initialized, cleaning up previous instance...");
      // Clean up previous instance
      if (window.colorMatchGame.stopBackgroundMusic) {
        window.colorMatchGame.stopBackgroundMusic();
      }
      if (window.colorMatchGame.timerInterval) {
        clearInterval(window.colorMatchGame.timerInterval);
      }
    }

    window.colorMatchGame = new ColorMatchGame();
    console.log("Color Match Game initialized successfully");
  } else {
    console.log("Game elements not found, retrying...");
    // Retry after a short delay
    setTimeout(initColorMatchGame, 500);
  }
}

// Initialize game when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initColorMatchGame();
});

// Also try to initialize after components are loaded
setTimeout(initColorMatchGame, 2000);

// Export for global access
window.ColorMatchGame = ColorMatchGame;
window.initColorMatchGame = initColorMatchGame;
