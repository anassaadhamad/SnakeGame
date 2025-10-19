// ==========================================
// ADVANCED SNAKE GAME - GAME LOGIC
// ==========================================

class SnakeGame {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    // Set canvas size
    this.canvas.width = CONFIG.CANVAS_WIDTH;
    this.canvas.height = CONFIG.CANVAS_HEIGHT;

    // Calculate grid dimensions
    this.gridWidth = CONFIG.CANVAS_WIDTH / CONFIG.GRID_SIZE;
    this.gridHeight = CONFIG.CANVAS_HEIGHT / CONFIG.GRID_SIZE;

    // Game state
    this.gameState = "menu"; // menu, playing, paused, gameOver
    this.score = 0;
    this.level = 1;
    this.foodEaten = 0;
    this.foodPerLevel = CONFIG.FOOD_PER_LEVEL;

    // Settings
    this.selectedMode = "CLASSIC";
    this.selectedDifficulty = "MEDIUM";
    this.selectedChallenge = null;
    this.selectedSkin = "CLASSIC";

    // Game objects
    this.snake = [];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.food = null;
    this.goldenFood = null;
    this.powerUp = null;
    this.obstacles = [];
    this.portals = [];

    // Active effects
    this.activeEffects = [];
    this.scoreMultiplier = 1;
    this.isInvincible = false;

    // Challenge tracking
    this.challengeStartTime = null;
    this.perfectLevels = 0;
    this.wallHits = 0;
    this.levelStartWallHits = 0; // Track wall hits at start of each level

    // Survival mode tracking
    this.survivalStartTime = null;
    this.survivalFoodCount = 0;
    this.lastSpeedIncrease = 0;

    // Level notification for auto-continue
    this.levelNotification = null;

    // Countdown system
    this.isCountingDown = false;
    this.countdownValue = 0;

    // Animation
    this.lastUpdateTime = 0;
    this.gameSpeed = CONFIG.SPEED_MEDIUM;
    this.animationId = null;

    // Input handling
    this.inputQueue = [];
    this.lastDirectionProcessed = { x: 1, y: 0 };

    // Audio system
    this.audioContext = null;
    this.currentMusic = null;
    this.sounds = {};
    this.musicTracks = {};

    // Mobile support
    this.isMobile = this.detectMobile();
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;

    this.initializeEventListeners();
    this.loadHighScore();
    this.loadSkin();
    this.updateHighScoreDisplay();
    this.updateChallengeAvailability();
    this.initializeAudio();
    this.initializeMobileControls();
  }

  // === INITIALIZATION ===
  initializeEventListeners() {
    // Menu buttons
    document
      .getElementById("startGame")
      .addEventListener("click", () => this.startGame());
    document
      .getElementById("viewLeaderboard")
      .addEventListener("click", () => this.showLeaderboard());
    document
      .getElementById("howToPlay")
      .addEventListener("click", () => this.showHowToPlay());

    // Game buttons
    document
      .getElementById("pauseBtn")
      .addEventListener("click", () => this.togglePause());
    document
      .getElementById("resumeGame")
      .addEventListener("click", () => this.togglePause());
    document
      .getElementById("quitGame")
      .addEventListener("click", () => this.quitToMenu());
    document
      .getElementById("nextLevel")
      .addEventListener("click", () => this.startNextLevel());

    // Game over buttons
    document
      .getElementById("playAgain")
      .addEventListener("click", () => this.startGame());
    document
      .getElementById("backToMenu")
      .addEventListener("click", () => this.showMainMenu());

    // Other buttons
    document
      .getElementById("closeLeaderboard")
      .addEventListener("click", () => this.showMainMenu());
    document
      .getElementById("closeHowToPlay")
      .addEventListener("click", () => this.showMainMenu());
    document
      .getElementById("openSettings")
      .addEventListener("click", () => this.showSettings());
    document
      .getElementById("closeSettings")
      .addEventListener("click", () => this.showMainMenu());

    // Mode selection
    document.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document
          .querySelectorAll(".mode-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedMode = btn.dataset.mode;
        this.updateChallengeAvailability();
      });
    });

    // Difficulty selection
    document.querySelectorAll(".diff-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document
          .querySelectorAll(".diff-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedDifficulty = btn.dataset.difficulty;
      });
    });

    // Challenge selection
    document.querySelectorAll(".challenge-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document
          .querySelectorAll(".challenge-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const challenge = btn.dataset.challenge;
        this.selectedChallenge = challenge === "none" ? null : challenge;
      });
    });

    // Mode selection - update challenge availability
    document.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.updateChallengeAvailability();
      });
    });

    // Skin selection
    document.querySelectorAll(".skin-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document
          .querySelectorAll(".skin-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedSkin = btn.dataset.skin;
        this.saveSkin();
      });
    });

    // Settings controls
    document.getElementById("musicToggle").addEventListener("change", (e) => {
      this.toggleMusic(e.target.checked);
    });

    document.getElementById("soundToggle").addEventListener("change", (e) => {
      this.toggleSound(e.target.checked);
    });

    document.getElementById("musicVolume").addEventListener("input", (e) => {
      this.setMusicVolume(e.target.value / 100);
      document.getElementById("musicVolumeValue").textContent =
        e.target.value + "%";
    });

    document.getElementById("soundVolume").addEventListener("input", (e) => {
      this.setSoundVolume(e.target.value / 100);
      document.getElementById("soundVolumeValue").textContent =
        e.target.value + "%";
    });

    document.getElementById("testSound").addEventListener("click", () => {
      this.playSound("eatFood");
    });

    // Keyboard controls
    document.addEventListener("keydown", (e) => this.handleKeyPress(e));
  }

  handleKeyPress(e) {
    if (this.gameState !== "playing" && this.gameState !== "paused") return;

    // Pause controls
    if (e.key === " " || e.key === "Escape") {
      e.preventDefault();
      this.togglePause();
      return;
    }

    if (this.gameState === "paused") return;

    // Movement controls
    let newDirection = null;

    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        newDirection = { x: 0, y: -1 };
        e.preventDefault();
        break;
      case "ArrowDown":
      case "s":
      case "S":
        newDirection = { x: 0, y: 1 };
        e.preventDefault();
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        newDirection = { x: -1, y: 0 };
        e.preventDefault();
        break;
      case "ArrowRight":
      case "d":
      case "D":
        newDirection = { x: 1, y: 0 };
        e.preventDefault();
        break;
    }

    if (newDirection) {
      // Add to input queue
      if (this.inputQueue.length < 3) {
        this.inputQueue.push(newDirection);
      }
    }
  }

  // === MOBILE DEVICE DETECTION ===
  detectMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for mobile devices
    const isMobileDevice =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase()
      );

    // Check for touch capability
    const hasTouchScreen =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;

    // Check for small screen
    const isSmallScreen = window.innerWidth <= 768;

    return isMobileDevice || (hasTouchScreen && isSmallScreen);
  }

  // === MOBILE CONTROLS INITIALIZATION ===
  initializeMobileControls() {
    // Always initialize touch controls, let CSS handle visibility
    const mobileControls = document.getElementById("mobileControls");
    const controlHint = document.getElementById("controlHint");

    // Update control hint for mobile
    if (this.isMobile && controlHint) {
      controlHint.textContent = "Swipe or use D-pad to move";
    }

    console.log("Initializing mobile controls. isMobile:", this.isMobile);

    // Add touch swipe listeners to canvas
    this.canvas.addEventListener(
      "touchstart",
      (e) => this.handleTouchStart(e),
      {
        passive: false,
      }
    );
    this.canvas.addEventListener("touchmove", (e) => this.handleTouchMove(e), {
      passive: false,
    });
    this.canvas.addEventListener("touchend", (e) => this.handleTouchEnd(e), {
      passive: false,
    });

    // Add D-pad button listeners with both touch and click
    const addDpadListener = (id, direction, isCenter = false) => {
      const btn = document.getElementById(id);
      if (!btn) {
        console.error(`Button ${id} not found`);
        return;
      }

      const handler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`D-pad ${id} pressed`);

        if (isCenter) {
          this.togglePause();
        } else {
          this.handleDirectionInput(direction);
        }
      };

      // Add both touchstart and click for maximum compatibility
      btn.addEventListener("touchstart", handler, { passive: false });
      btn.addEventListener("click", handler);

      // Add visual feedback
      btn.addEventListener(
        "touchstart",
        () => {
          btn.style.transform = "scale(0.95)";
        },
        { passive: true }
      );

      btn.addEventListener(
        "touchend",
        () => {
          btn.style.transform = "scale(1)";
        },
        { passive: true }
      );
    };

    // Attach listeners to all D-pad buttons
    addDpadListener("dpadUp", { x: 0, y: -1 });
    addDpadListener("dpadDown", { x: 0, y: 1 });
    addDpadListener("dpadLeft", { x: -1, y: 0 });
    addDpadListener("dpadRight", { x: 1, y: 0 });
    addDpadListener("dpadCenter", null, true);

    console.log("Mobile controls initialized successfully");
  }

  // === TOUCH SWIPE HANDLERS ===
  handleTouchStart(e) {
    if (this.gameState !== "playing") return;

    e.preventDefault();
    const touch = e.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
  }

  handleTouchMove(e) {
    if (this.gameState !== "playing") return;
    e.preventDefault();
  }

  handleTouchEnd(e) {
    if (this.gameState !== "playing") return;

    e.preventDefault();
    const touch = e.changedTouches[0];
    this.touchEndX = touch.clientX;
    this.touchEndY = touch.clientY;

    this.handleSwipeGesture();
  }

  handleSwipeGesture() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    const minSwipeDistance = 30; // Minimum distance for a swipe

    // Check if swipe distance is significant
    if (
      Math.abs(deltaX) < minSwipeDistance &&
      Math.abs(deltaY) < minSwipeDistance
    ) {
      return;
    }

    let newDirection = null;

    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0) {
        newDirection = { x: 1, y: 0 }; // Right
      } else {
        newDirection = { x: -1, y: 0 }; // Left
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        newDirection = { x: 0, y: 1 }; // Down
      } else {
        newDirection = { x: 0, y: -1 }; // Up
      }
    }

    if (newDirection) {
      this.handleDirectionInput(newDirection);
    }
  }

  handleDirectionInput(newDirection) {
    console.log(
      "Direction input received:",
      newDirection,
      "Game state:",
      this.gameState
    );

    if (this.gameState !== "playing") {
      console.log("Game not playing, ignoring input");
      return;
    }

    // Prevent 180-degree turns
    const lastDir = this.lastDirectionProcessed;
    if (
      (newDirection.x === -lastDir.x && newDirection.y === lastDir.y) ||
      (newDirection.y === -lastDir.y && newDirection.x === lastDir.x)
    ) {
      console.log("180-degree turn prevented");
      return;
    }

    // Add to input queue
    if (this.inputQueue.length < 3) {
      this.inputQueue.push(newDirection);
      console.log(
        "Direction added to queue. Queue length:",
        this.inputQueue.length
      );
    }
  }

  // === GAME STATE MANAGEMENT ===
  startGame() {
    // Validate challenge-mode compatibility
    if (
      this.selectedChallenge === "PERFECTIONIST" &&
      this.selectedMode === "SURVIVAL"
    ) {
      alert(
        "Perfectionist challenge requires levels and cannot be played in Survival mode. Please select a different challenge or mode."
      );
      return;
    }

    // Play game music based on selected mode
    const musicMap = {
      CLASSIC: "classic",
      ARCADE: "arcade",
      SURVIVAL: "survival",
      ZEN: "zen",
    };
    this.playMusic(musicMap[this.selectedMode] || "classic");

    // Reset game state
    this.score = 0;
    this.level = 1;
    this.foodEaten = 0;
    this.wallHits = 0;
    this.perfectLevels = 0;
    this.scoreMultiplier = 1;
    this.isInvincible = false;
    this.activeEffects = [];
    this.inputQueue = [];

    // Survival mode specific
    this.survivalStartTime = Date.now();
    this.survivalFoodCount = 0;
    this.lastSpeedIncrease = 0;

    // Set speed based on difficulty
    this.gameSpeed = CONFIG[`SPEED_${this.selectedDifficulty}`];

    // Initialize snake
    const centerX = Math.floor(this.gridWidth / 2);
    const centerY = Math.floor(this.gridHeight / 2);
    this.snake = [];
    for (let i = 0; i < CONFIG.INITIAL_SNAKE_LENGTH; i++) {
      this.snake.push({ x: centerX - i, y: centerY });
    }

    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.lastDirectionProcessed = { x: 1, y: 0 };

    // Track wall hits from level start for Perfectionist challenge
    this.levelStartWallHits = 0;

    // Initialize game objects
    this.obstacles = [];
    this.portals = [];
    this.powerUp = null;
    this.goldenFood = null;

    this.spawnFood();
    this.generateLevelObstacles();

    // Challenge setup
    if (this.selectedChallenge) {
      this.challengeStartTime = Date.now();
    }

    // Show game screen
    this.gameState = "playing";
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    // Show mobile controls if on mobile device
    if (this.isMobile) {
      document.getElementById("mobileControls").style.display = "block";
    }

    // Update UI labels based on mode
    this.updateUILabels();
    this.updateUI();

    // Auto-focus and scroll to game canvas
    this.focusOnGame();

    // Start countdown before gameplay
    this.startCountdown();
  }

  startNextLevel() {
    this.level++;
    this.foodEaten = 0;

    // Track wall hits at start of level for Perfectionist challenge
    this.levelStartWallHits = this.wallHits;

    this.obstacles = [];
    this.portals = [];
    this.goldenFood = null;
    this.powerUp = null;

    // Increase speed
    this.gameSpeed = Math.max(
      30,
      this.gameSpeed - CONFIG.SPEED_INCREMENT_PER_LEVEL
    );

    // Generate new obstacles
    this.generateLevelObstacles();

    // Generate portals for Arcade mode
    if (CONFIG.MODES[this.selectedMode].hasPortals && this.level >= 3) {
      this.generatePortals();
    }

    document.getElementById("levelCompleteOverlay").style.display = "none";

    // Resume music
    if (this.currentMusic) {
      this.currentMusic.play().catch((e) => {});
    }
    this.playSound("levelStart");

    // Start countdown before next level
    this.startCountdown();
  }

  togglePause() {
    if (this.gameState === "playing") {
      this.gameState = "paused";
      document.getElementById("pauseOverlay").style.display = "flex";
      cancelAnimationFrame(this.animationId);

      // Pause music
      if (this.currentMusic) {
        this.currentMusic.pause();
      }
      this.playSound("pause");
    } else if (this.gameState === "paused") {
      document.getElementById("pauseOverlay").style.display = "none";
      this.playSound("resume");

      // Resume music
      if (this.currentMusic) {
        this.currentMusic.play().catch((e) => {});
      }

      // Start countdown before resuming
      this.startCountdown();
    }
  }

  quitToMenu() {
    cancelAnimationFrame(this.animationId);

    // Clear countdown if active
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.isCountingDown = false;
    }

    this.gameState = "menu";

    // Switch back to menu music
    this.playMusic("menu");

    this.showMainMenu();
  }

  gameOver() {
    cancelAnimationFrame(this.animationId);
    this.gameState = "gameOver";

    // Play game over music
    this.playMusic("gameover");

    // Play appropriate death sound
    if (
      this.wallHits > 0 ||
      this.obstacles.some(
        (obs) => obs.x === this.snake[0].x && obs.y === this.snake[0].y
      )
    ) {
      this.playSound("hitWall");
    } else {
      this.playSound("hitSelf");
    }

    // Update high score
    this.updateHighScore();

    // Save to leaderboard
    this.saveToLeaderboard();

    // Check challenge completion
    this.checkChallengeCompletion();

    // Display game over screen
    document.getElementById("finalScore").textContent = this.score;
    document.getElementById("finalLevel").textContent = this.level;
    document.getElementById("finalLength").textContent = this.snake.length;

    // Game over message
    let message = this.getGameOverMessage();
    document.getElementById("gameOverMessage").textContent = message;

    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "block";
  }

  getGameOverMessage() {
    if (this.selectedMode === "SURVIVAL") {
      const survivalTime = Math.floor(
        (Date.now() - this.survivalStartTime) / 1000
      );
      const minutes = Math.floor(survivalTime / 60);
      const seconds = survivalTime % 60;
      return `You survived for ${minutes}:${seconds
        .toString()
        .padStart(2, "0")} and ate ${this.survivalFoodCount} food items!`;
    }

    if (this.score > this.highScore) {
      return "🎉 NEW HIGH SCORE! Amazing performance!";
    } else if (this.score > this.highScore * 0.8) {
      return "Great job! Almost beat your high score!";
    } else if (this.level >= 5) {
      return "Impressive! You made it far!";
    } else if (this.snake.length >= 20) {
      return "That's a long snake! Well done!";
    } else {
      return "Keep practicing! You'll get better!";
    }
  }

  showMainMenu() {
    document.getElementById("mainMenu").style.display = "block";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("leaderboardScreen").style.display = "none";
    document.getElementById("howToPlayScreen").style.display = "none";
    document.getElementById("settingsScreen").style.display = "none";

    // Play menu music
    this.playMusic("menu");
  }

  showLeaderboard() {
    this.displayLeaderboard();
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("leaderboardScreen").style.display = "block";
  }

  showHowToPlay() {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("howToPlayScreen").style.display = "block";
  }

  showSettings() {
    this.loadSettings();
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("settingsScreen").style.display = "block";
  }

  // === COUNTDOWN SYSTEM ===
  startCountdown() {
    this.isCountingDown = true;
    this.countdownValue = 3;
    this.gameState = "countdown";

    this.countdownInterval = setInterval(() => {
      this.countdownValue--;

      if (this.countdownValue <= 0) {
        clearInterval(this.countdownInterval);
        this.isCountingDown = false;
        this.gameState = "playing";
        this.lastUpdateTime = Date.now();
        this.gameLoop();
      }
    }, 1000); // 1 second intervals

    // Draw countdown
    this.drawCountdown();
  }

  drawCountdown() {
    if (!this.isCountingDown) return;

    // Clear canvas
    this.ctx.fillStyle = CONFIG.COLORS.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw grid and game objects (frozen state)
    this.drawGrid();

    // Draw obstacles
    if (CONFIG.MODES[this.selectedMode].hasObstacles) {
      this.obstacles.forEach((obs) =>
        this.drawCell(obs.x, obs.y, CONFIG.OBSTACLE_COLOR)
      );
    }

    // Draw portals
    this.portals.forEach((portal, index) => {
      const color = index === 0 ? CONFIG.PORTAL_COLOR_A : CONFIG.PORTAL_COLOR_B;
      this.drawPortal(portal.x, portal.y, color);
    });

    // Draw food
    if (this.food) {
      this.drawApple(this.food.x, this.food.y);
    }

    // Draw golden food
    if (this.goldenFood) {
      this.drawGoldenCoin(this.goldenFood.x, this.goldenFood.y);
    }

    // Draw power-up
    if (this.powerUp) {
      this.drawPowerUp(this.powerUp);
    }

    // Draw snake
    const skin = CONFIG.SKINS[this.selectedSkin];
    this.snake.forEach((segment, index) => {
      const color = index === 0 ? skin.head : skin.body;
      this.drawCell(segment.x, segment.y, color);

      if (index === 0) {
        this.drawSnakeHead(segment, skin.eyes);
      }
    });

    // Draw countdown number
    this.ctx.save();
    this.ctx.fillStyle = "#00ff00";
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 8;
    this.ctx.font = "bold 120px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    const text =
      this.countdownValue > 0 ? this.countdownValue.toString() : "GO!";
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    // Shadow for better visibility
    this.ctx.shadowBlur = 30;
    this.ctx.shadowColor = "#00ff00";

    // Outline
    this.ctx.strokeText(text, centerX, centerY);
    // Fill
    this.ctx.fillText(text, centerX, centerY);

    this.ctx.restore();

    // Continue drawing countdown
    if (this.isCountingDown) {
      requestAnimationFrame(() => this.drawCountdown());
    }
  }

  // === GAME LOOP ===
  gameLoop() {
    if (this.gameState !== "playing") return;

    const currentTime = Date.now();
    const deltaTime = currentTime - this.lastUpdateTime;

    // Apply slow motion or speed boost effects
    let effectiveSpeed = this.gameSpeed;
    const slowEffect = this.activeEffects.find((e) => e.type === "slow");
    const speedEffect = this.activeEffects.find((e) => e.type === "speed");

    if (slowEffect) effectiveSpeed *= CONFIG.SLOW_MOTION_MULTIPLIER;
    if (speedEffect) effectiveSpeed *= CONFIG.SPEED_BOOST_MULTIPLIER;

    if (deltaTime >= effectiveSpeed) {
      this.update();
      this.lastUpdateTime = currentTime;
    }

    this.draw();
    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    // Process input queue
    if (this.inputQueue.length > 0) {
      const newDir = this.inputQueue.shift();
      // Prevent 180-degree turns
      if (
        newDir.x !== -this.lastDirectionProcessed.x ||
        newDir.y !== -this.lastDirectionProcessed.y
      ) {
        this.direction = newDir;
        this.lastDirectionProcessed = newDir;
      }
    }

    // Update effects
    this.updateEffects();

    // Move snake
    const head = { ...this.snake[0] };
    head.x += this.direction.x;
    head.y += this.direction.y;

    // Check wall collision
    const mode = CONFIG.MODES[this.selectedMode];
    if (mode.wallsDeath) {
      if (
        head.x < 0 ||
        head.x >= this.gridWidth ||
        head.y < 0 ||
        head.y >= this.gridHeight
      ) {
        if (!this.isInvincible) {
          this.wallHits++;
          this.gameOver();
          return;
        } else {
          // Wrap around when invincible
          head.x = (head.x + this.gridWidth) % this.gridWidth;
          head.y = (head.y + this.gridHeight) % this.gridHeight;
        }
      }
    } else {
      // Zen mode - walls wrap around
      head.x = (head.x + this.gridWidth) % this.gridWidth;
      head.y = (head.y + this.gridHeight) % this.gridHeight;
    }

    // Check portal collision
    const portal = this.portals.find((p) => p.x === head.x && p.y === head.y);
    if (portal) {
      const otherPortal = this.portals.find((p) => p !== portal);
      if (otherPortal) {
        head.x = otherPortal.x;
        head.y = otherPortal.y;
        this.playSound("portal");
      }
    }

    // Check self collision
    if (
      !this.isInvincible &&
      this.snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      this.gameOver();
      return;
    }

    // Check obstacle collision
    if (!this.isInvincible && mode.hasObstacles) {
      if (this.obstacles.some((obs) => obs.x === head.x && obs.y === head.y)) {
        this.wallHits++;
        this.gameOver();
        return;
      }
    }

    // Add new head
    this.snake.unshift(head);

    // Check food collision
    let foodEaten = false;
    if (this.food && head.x === this.food.x && head.y === this.food.y) {
      this.eatFood(CONFIG.POINTS_FOOD);
      foodEaten = true;
    } else if (
      this.goldenFood &&
      head.x === this.goldenFood.x &&
      head.y === this.goldenFood.y
    ) {
      this.eatFood(CONFIG.POINTS_GOLDEN_FOOD);
      this.goldenFood = null;
      foodEaten = true;
    } else {
      // Remove tail if no food eaten
      this.snake.pop();
    }

    // Check power-up collision
    if (
      this.powerUp &&
      head.x === this.powerUp.x &&
      head.y === this.powerUp.y
    ) {
      this.collectPowerUp(this.powerUp);
      this.powerUp = null;
    }

    // Check golden food expiration
    if (
      this.goldenFood &&
      Date.now() - this.goldenFood.spawnTime > CONFIG.GOLDEN_FOOD_DURATION
    ) {
      this.goldenFood = null;
    }

    // Update UI
    this.updateUI();

    // Check level completion (not for Survival mode)
    if (
      this.selectedMode !== "SURVIVAL" &&
      this.foodEaten >= this.foodPerLevel
    ) {
      this.completeLevel();
    }

    // Check challenge progress
    if (this.selectedChallenge) {
      this.updateChallengeProgress();
    }
  }

  eatFood(points) {
    this.score += Math.floor(points * this.scoreMultiplier);
    this.foodEaten++;

    // Play eating sound
    if (points === CONFIG.POINTS_GOLDEN_FOOD) {
      this.playSound("eatGolden");
    } else {
      this.playSound("eatFood");
    }

    this.spawnFood();

    // Survival mode: increase difficulty progressively
    if (this.selectedMode === "SURVIVAL") {
      this.survivalFoodCount++;

      // Every 5 food items, increase speed
      if (this.survivalFoodCount % 5 === 0) {
        this.gameSpeed = Math.max(20, this.gameSpeed - 3);
      }

      // Every 10 food items, add an obstacle
      if (this.survivalFoodCount % 10 === 0 && this.obstacles.length < 30) {
        const obstacle = this.getRandomEmptyPosition();
        this.obstacles.push(obstacle);
      }
    }

    // Chance to spawn power-up
    if (
      CONFIG.MODES[this.selectedMode].hasPowerUps &&
      Math.random() < CONFIG.POWERUP_SPAWN_CHANCE
    ) {
      this.spawnPowerUp();
    }
  }

  completeLevel() {
    // Survival mode doesn't have level completion
    if (this.selectedMode === "SURVIVAL") {
      return; // Endless mode
    }

    this.score += CONFIG.POINTS_LEVEL_COMPLETE;

    // Play level complete sound
    this.playSound("levelComplete");

    // Track perfect levels (for Perfectionist challenge)
    // A perfect level = completing a level without hitting ANY walls or obstacles during that level
    const wallHitsThisLevel = this.wallHits - this.levelStartWallHits;

    if (wallHitsThisLevel === 0) {
      this.perfectLevels++;
      console.log(
        `Perfect level ${this.level}! Total perfect levels: ${this.perfectLevels}`
      );
    }

    if (this.level >= CONFIG.MAX_LEVEL) {
      // Game won!
      this.score += CONFIG.POINTS_CHALLENGE_COMPLETE;
      this.playSound("victory"); // Play victory sound when beating all levels!
      this.gameOver();
    } else {
      // Check if we should auto-continue for time-based challenges
      if (this.shouldAutoContinueLevel()) {
        // Auto-advance to next level without pausing (for Speed Demon, Marathon)
        this.autoAdvanceLevel();
      } else {
        // Normal level completion with pause
        this.gameState = "levelComplete";
        document.getElementById("levelCompleteOverlay").style.display = "flex";
        cancelAnimationFrame(this.animationId);

        // Pause music during level complete screen
        if (this.currentMusic) {
          this.currentMusic.pause();
        }
      }
    }
  }

  shouldAutoContinueLevel() {
    // Speed Demon and Marathon challenges should continue without pausing
    // Perfectionist needs to pause to show level completion
    if (this.selectedChallenge === "SPEED_DEMON") return true;
    if (this.selectedChallenge === "MARATHON") return true;
    return false;
  }

  autoAdvanceLevel() {
    // Advance to next level without pausing the game
    this.level++;
    this.foodEaten = 0;

    // Track wall hits at start of level for Perfectionist challenge
    this.levelStartWallHits = this.wallHits;

    // Clear old game objects
    this.obstacles = [];
    this.portals = [];
    this.goldenFood = null;
    this.powerUp = null;

    // Increase speed
    this.gameSpeed = Math.max(
      30,
      this.gameSpeed - CONFIG.SPEED_INCREMENT_PER_LEVEL
    );

    // Generate new obstacles
    this.generateLevelObstacles();

    // Generate portals for Arcade mode
    if (CONFIG.MODES[this.selectedMode].hasPortals && this.level >= 3) {
      this.generatePortals();
    }

    // Show brief level notification without pausing
    this.showLevelNotification();

    // Update UI to show new level
    this.updateUI();

    // Game continues without pausing!
  }

  showLevelNotification() {
    // Create a brief non-intrusive level notification
    this.levelNotification = {
      level: this.level,
      startTime: Date.now(),
      duration: 2000, // Show for 2 seconds
    };
  }

  // === DRAWING ===
  draw() {
    // Clear canvas
    this.ctx.fillStyle = CONFIG.COLORS.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw grid
    this.drawGrid();

    // Draw level notification if active (for auto-continue)
    if (this.levelNotification) {
      const elapsed = Date.now() - this.levelNotification.startTime;
      if (elapsed < this.levelNotification.duration) {
        this.drawLevelNotification(
          this.levelNotification.level,
          elapsed / this.levelNotification.duration
        );
      } else {
        this.levelNotification = null;
      }
    }

    // Draw obstacles
    if (CONFIG.MODES[this.selectedMode].hasObstacles) {
      this.obstacles.forEach((obs) =>
        this.drawCell(obs.x, obs.y, CONFIG.OBSTACLE_COLOR)
      );
    }

    // Draw portals
    this.portals.forEach((portal, index) => {
      const color = index === 0 ? CONFIG.PORTAL_COLOR_A : CONFIG.PORTAL_COLOR_B;
      this.drawPortal(portal.x, portal.y, color);
    });

    // Draw food
    if (this.food) {
      this.drawApple(this.food.x, this.food.y);
    }

    // Draw golden food
    if (this.goldenFood) {
      this.drawGoldenCoin(this.goldenFood.x, this.goldenFood.y);
    }

    // Draw power-up
    if (this.powerUp) {
      this.drawPowerUp(this.powerUp);
    }

    // Draw snake with selected skin
    const skin = CONFIG.SKINS[this.selectedSkin];
    this.snake.forEach((segment, index) => {
      const color = index === 0 ? skin.head : skin.body;
      this.drawCell(segment.x, segment.y, color);

      // Draw eyes on head
      if (index === 0) {
        this.drawSnakeHead(segment, skin.eyes);
      }
    });
  }

  drawGrid() {
    this.ctx.strokeStyle = CONFIG.COLORS.grid;
    this.ctx.lineWidth = 1;

    for (let x = 0; x < this.gridWidth; x++) {
      for (let y = 0; y < this.gridHeight; y++) {
        this.ctx.strokeRect(
          x * CONFIG.GRID_SIZE,
          y * CONFIG.GRID_SIZE,
          CONFIG.GRID_SIZE,
          CONFIG.GRID_SIZE
        );
      }
    }
  }

  drawCell(x, y, color, glow = false) {
    if (glow) {
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = color;
    }

    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x * CONFIG.GRID_SIZE + 1,
      y * CONFIG.GRID_SIZE + 1,
      CONFIG.GRID_SIZE - 2,
      CONFIG.GRID_SIZE - 2
    );

    if (glow) {
      this.ctx.shadowBlur = 0;
    }
  }

  drawSnakeHead(head, eyeColor = "#000000") {
    const centerX = head.x * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;
    const centerY = head.y * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;

    // Draw eyes with skin-specific color
    this.ctx.fillStyle = eyeColor;
    const eyeSize = 3;
    const eyeOffset = 5;

    if (this.direction.x !== 0) {
      // Horizontal movement
      this.ctx.fillRect(
        centerX - eyeOffset,
        centerY - eyeOffset,
        eyeSize,
        eyeSize
      );
      this.ctx.fillRect(
        centerX - eyeOffset,
        centerY + eyeOffset - eyeSize,
        eyeSize,
        eyeSize
      );
    } else {
      // Vertical movement
      this.ctx.fillRect(
        centerX - eyeOffset,
        centerY - eyeOffset,
        eyeSize,
        eyeSize
      );
      this.ctx.fillRect(
        centerX + eyeOffset - eyeSize,
        centerY - eyeOffset,
        eyeSize,
        eyeSize
      );
    }
  }

  drawPortal(x, y, color) {
    const centerX = x * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;
    const centerY = y * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;

    this.ctx.fillStyle = color;
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = color;

    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, CONFIG.GRID_SIZE / 2 - 2, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.shadowBlur = 0;
  }

  drawPowerUp(powerUp) {
    const x = powerUp.x * CONFIG.GRID_SIZE;
    const y = powerUp.y * CONFIG.GRID_SIZE;
    const centerX = x + CONFIG.GRID_SIZE / 2;
    const centerY = y + CONFIG.GRID_SIZE / 2;

    this.ctx.save();
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = powerUp.color;

    // Draw background circle
    this.ctx.fillStyle = powerUp.color + "40"; // Semi-transparent
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, CONFIG.GRID_SIZE / 2 - 2, 0, Math.PI * 2);
    this.ctx.fill();

    // Draw icon based on power-up type
    this.ctx.fillStyle = powerUp.color;
    this.ctx.strokeStyle = powerUp.color;
    this.ctx.lineWidth = 2;

    switch (powerUp.type) {
      case "speed":
        // Lightning bolt
        this.drawLightningBolt(centerX, centerY);
        break;
      case "slow":
        // Clock
        this.drawClock(centerX, centerY);
        break;
      case "invincible":
        // Shield
        this.drawShield(centerX, centerY);
        break;
      case "multiplier":
        // Star
        this.drawStar(centerX, centerY);
        break;
      case "shrink":
        // Down arrows
        this.drawShrinkArrows(centerX, centerY);
        break;
    }

    this.ctx.shadowBlur = 0;
    this.ctx.restore();
  }

  drawLightningBolt(x, y) {
    // Lightning bolt shape
    const size = 8;
    this.ctx.beginPath();
    this.ctx.moveTo(x - 2, y - size);
    this.ctx.lineTo(x + 3, y - 2);
    this.ctx.lineTo(x - 1, y);
    this.ctx.lineTo(x + 4, y + size);
    this.ctx.lineTo(x, y + 2);
    this.ctx.lineTo(x + 2, y);
    this.ctx.lineTo(x - 3, y - 4);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawClock(x, y) {
    const radius = 6;
    // Clock circle
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.stroke();

    // Clock hands
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y - 4);
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + 3, y);
    this.ctx.stroke();
  }

  drawShield(x, y) {
    const size = 7;
    // Shield shape
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - size);
    this.ctx.quadraticCurveTo(x + size, y - size, x + size, y);
    this.ctx.quadraticCurveTo(x + size, y + size, x, y + size + 2);
    this.ctx.quadraticCurveTo(x - size, y + size, x - size, y);
    this.ctx.quadraticCurveTo(x - size, y - size, x, y - size);
    this.ctx.closePath();
    this.ctx.fill();

    // Shield line
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - size);
    this.ctx.lineTo(x, y + size);
    this.ctx.stroke();
  }

  drawStar(x, y) {
    const size = 7;
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size / 2;

    this.ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes - Math.PI / 2;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);

      if (i === 0) {
        this.ctx.moveTo(px, py);
      } else {
        this.ctx.lineTo(px, py);
      }
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawShrinkArrows(x, y) {
    const size = 5;
    // Two inward arrows (compression symbol)
    this.ctx.lineWidth = 2;

    // Left arrow pointing right
    this.ctx.beginPath();
    this.ctx.moveTo(x - 6, y - 4);
    this.ctx.lineTo(x - 2, y);
    this.ctx.lineTo(x - 6, y + 4);
    this.ctx.stroke();

    // Right arrow pointing left
    this.ctx.beginPath();
    this.ctx.moveTo(x + 6, y - 4);
    this.ctx.lineTo(x + 2, y);
    this.ctx.lineTo(x + 6, y + 4);
    this.ctx.stroke();
  }

  drawApple(gridX, gridY) {
    const x = gridX * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;
    const y = gridY * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;

    this.ctx.save();

    // Apple body
    this.ctx.fillStyle = CONFIG.FOOD_COLOR;
    this.ctx.beginPath();
    this.ctx.arc(x, y + 1, 7, 0, Math.PI * 2);
    this.ctx.fill();

    // Leaf
    this.ctx.fillStyle = "#00cc00";
    this.ctx.beginPath();
    this.ctx.moveTo(x + 2, y - 5);
    this.ctx.quadraticCurveTo(x + 5, y - 7, x + 4, y - 3);
    this.ctx.quadraticCurveTo(x + 3, y - 4, x + 2, y - 5);
    this.ctx.fill();

    // Stem
    this.ctx.strokeStyle = "#8B4513";
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - 6);
    this.ctx.lineTo(x + 2, y - 7);
    this.ctx.stroke();

    // Highlight
    this.ctx.fillStyle = "#ff6666";
    this.ctx.beginPath();
    this.ctx.arc(x - 2, y - 1, 2, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }

  drawGoldenCoin(gridX, gridY) {
    const x = gridX * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;
    const y = gridY * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;

    this.ctx.save();
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = CONFIG.GOLDEN_FOOD_COLOR;

    // Outer circle (coin)
    this.ctx.fillStyle = CONFIG.GOLDEN_FOOD_COLOR;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 8, 0, Math.PI * 2);
    this.ctx.fill();

    // Inner circle (detail)
    this.ctx.strokeStyle = "#FFE55C";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0, Math.PI * 2);
    this.ctx.stroke();

    // Dollar sign or star
    this.ctx.fillStyle = "#CC8800";
    this.ctx.font = "bold 12px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("★", x, y);

    this.ctx.restore();
  }

  drawLevelNotification(level, progress) {
    // Draw a semi-transparent notification at top of canvas
    const alpha =
      progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1;

    this.ctx.save();
    this.ctx.globalAlpha = alpha * 0.9;

    // Background
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(this.canvas.width / 2 - 150, 80, 300, 60);

    // Border
    this.ctx.strokeStyle = "#ffd700";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(this.canvas.width / 2 - 150, 80, 300, 60);

    // Text
    this.ctx.fillStyle = "#ffd700";
    this.ctx.font = "bold 28px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(`LEVEL ${level}`, this.canvas.width / 2, 110);

    this.ctx.restore();
  }

  // === SPAWNING ===
  spawnFood() {
    this.food = this.getRandomEmptyPosition();

    // Chance to spawn golden food
    if (Math.random() < CONFIG.GOLDEN_FOOD_PROBABILITY) {
      this.goldenFood = {
        ...this.getRandomEmptyPosition(),
        spawnTime: Date.now(),
      };
    }
  }

  spawnPowerUp() {
    if (this.powerUp) return;

    const types = [
      { type: "speed", color: "#00ffff", icon: "⚡", name: "Speed Boost" },
      { type: "slow", color: "#ff00ff", icon: "🐌", name: "Slow Motion" },
      {
        type: "invincible",
        color: "#ffff00",
        icon: "🛡️",
        name: "Invincibility",
      },
      { type: "multiplier", color: "#ff8800", icon: "✨", name: "2x Score" },
      { type: "shrink", color: "#00ff88", icon: "📏", name: "Shrink" },
    ];

    const powerUpType = types[Math.floor(Math.random() * types.length)];
    this.powerUp = {
      ...this.getRandomEmptyPosition(),
      ...powerUpType,
    };
  }

  getRandomEmptyPosition() {
    let position;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      position = {
        x: Math.floor(Math.random() * this.gridWidth),
        y: Math.floor(Math.random() * this.gridHeight),
      };
      attempts++;
    } while (attempts < maxAttempts && this.isPositionOccupied(position));

    return position;
  }

  isPositionOccupied(pos) {
    // Check snake
    if (
      this.snake.some((segment) => segment.x === pos.x && segment.y === pos.y)
    ) {
      return true;
    }

    // Check obstacles
    if (this.obstacles.some((obs) => obs.x === pos.x && obs.y === pos.y)) {
      return true;
    }

    // Check food
    if (this.food && this.food.x === pos.x && this.food.y === pos.y) {
      return true;
    }

    // Check portals
    if (
      this.portals.some((portal) => portal.x === pos.x && portal.y === pos.y)
    ) {
      return true;
    }

    return false;
  }

  generateLevelObstacles() {
    if (!CONFIG.MODES[this.selectedMode].hasObstacles) return;

    const obstacleCount = Math.min(CONFIG.OBSTACLES_PER_LEVEL * this.level, 20);

    for (let i = 0; i < obstacleCount; i++) {
      const obstacle = this.getRandomEmptyPosition();
      this.obstacles.push(obstacle);
    }
  }

  generatePortals() {
    if (this.portals.length > 0) return;

    const portal1 = this.getRandomEmptyPosition();
    const portal2 = this.getRandomEmptyPosition();

    this.portals = [portal1, portal2];
  }

  // === POWER-UPS ===
  collectPowerUp(powerUp) {
    this.score += CONFIG.POINTS_POWERUP;

    // Play generic collect sound first
    this.playSound("powerupCollect");

    switch (powerUp.type) {
      case "speed":
        this.addEffect("speed", CONFIG.POWERUP_DURATION, "⚡", "Speed Boost");
        this.playSound("powerupSpeed");
        break;
      case "slow":
        this.addEffect("slow", CONFIG.POWERUP_DURATION, "🐌", "Slow Motion");
        this.playSound("powerupSlow");
        break;
      case "invincible":
        this.isInvincible = true;
        this.addEffect(
          "invincible",
          CONFIG.INVINCIBILITY_DURATION,
          "🛡️",
          "Invincible"
        );
        this.playSound("powerupInvincible");
        setTimeout(() => {
          this.isInvincible = false;
        }, CONFIG.INVINCIBILITY_DURATION);
        break;
      case "multiplier":
        this.scoreMultiplier = 2;
        this.addEffect(
          "multiplier",
          CONFIG.SCORE_MULTIPLIER_DURATION,
          "✨",
          "2x Score"
        );
        this.playSound("powerupMultiplier");
        setTimeout(() => {
          this.scoreMultiplier = 1;
        }, CONFIG.SCORE_MULTIPLIER_DURATION);
        break;
      case "shrink":
        if (this.snake.length > 5) {
          this.snake = this.snake.slice(0, this.snake.length - 3);
        }
        this.playSound("powerupShrink");
        break;
    }
  }

  addEffect(type, duration, icon, name) {
    const effect = {
      type,
      icon,
      name,
      endTime: Date.now() + duration,
      duration,
    };

    this.activeEffects.push(effect);
    this.updateEffectsDisplay();
  }

  updateEffects() {
    const currentTime = Date.now();
    this.activeEffects = this.activeEffects.filter(
      (effect) => effect.endTime > currentTime
    );
    this.updateEffectsDisplay();
  }

  updateEffectsDisplay() {
    const container = document.getElementById("effectsContainer");
    container.innerHTML = "";

    this.activeEffects.forEach((effect) => {
      const timeLeft = Math.ceil((effect.endTime - Date.now()) / 1000);
      const badge = document.createElement("div");
      badge.className = "effect-badge";
      badge.style.borderColor = this.getEffectColor(effect.type);
      badge.innerHTML = `
                <span class="effect-icon">${effect.icon}</span>
                <span>${effect.name}</span>
                <span class="effect-timer">${timeLeft}s</span>
            `;
      container.appendChild(badge);
    });
  }

  getEffectColor(type) {
    const colors = {
      speed: "#00ffff",
      slow: "#ff00ff",
      invincible: "#ffff00",
      multiplier: "#ff8800",
    };
    return colors[type] || "#ffffff";
  }

  // === FOCUS MANAGEMENT ===
  focusOnGame() {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      // Scroll game canvas into view smoothly
      const gameScreen = document.getElementById("gameScreen");
      const canvas = this.canvas;

      // Scroll to show the game info and canvas centered
      gameScreen.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });

      // Focus the canvas for keyboard input
      canvas.focus();

      // Alternative: scroll to canvas specifically
      setTimeout(() => {
        canvas.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 100);
    }, 100);
  }

  // === CHALLENGE AVAILABILITY ===
  updateChallengeAvailability() {
    const challenges = document.querySelectorAll(".challenge-btn");

    challenges.forEach((btn) => {
      const challenge = btn.dataset.challenge;

      // PERFECTIONIST doesn't work with SURVIVAL mode (no levels)
      if (challenge === "PERFECTIONIST" && this.selectedMode === "SURVIVAL") {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        // Cursor is now handled by CSS :disabled state
        btn.title = "Not available in Survival mode (requires levels)";

        // If this challenge was selected, deselect it
        if (btn.classList.contains("active")) {
          btn.classList.remove("active");
          document
            .querySelector('.challenge-btn[data-challenge="none"]')
            .classList.add("active");
          this.selectedChallenge = null;
        }
      } else {
        btn.disabled = false;
        btn.style.opacity = "1";
        // Cursor is now handled by CSS
        btn.title = "";
      }
    });
  }

  // === UI UPDATES ===
  updateUILabels() {
    // Update labels based on game mode
    if (this.selectedMode === "SURVIVAL") {
      document.getElementById("levelLabel").textContent = "Time";
      document.getElementById("foodLabel").textContent = "Eaten";
    } else {
      document.getElementById("levelLabel").textContent = "Level";
      document.getElementById("foodLabel").textContent = "Food";
    }
  }

  updateUI() {
    document.getElementById("score").textContent = this.score;

    // Update level display based on mode
    if (this.selectedMode === "SURVIVAL") {
      const survivalTime = Math.floor(
        (Date.now() - this.survivalStartTime) / 1000
      );
      const minutes = Math.floor(survivalTime / 60);
      const seconds = survivalTime % 60;
      document.getElementById("level").textContent = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      document.getElementById("level").textContent = this.level;
    }

    document.getElementById("length").textContent = this.snake.length;

    // Update food count based on mode
    if (this.selectedMode === "SURVIVAL") {
      document.getElementById("foodCount").textContent = this.survivalFoodCount;
    } else {
      document.getElementById(
        "foodCount"
      ).textContent = `${this.foodEaten}/${this.foodPerLevel}`;
    }
  }

  updateChallengeProgress() {
    const challenge = CONFIG.CHALLENGES[this.selectedChallenge];
    const progressDiv = document.getElementById("challengeProgress");
    const labelDiv = document.getElementById("challengeLabel");
    const barDiv = document.getElementById("challengeBar");

    progressDiv.style.display = "block";

    let progress = 0;
    let label = "";

    switch (this.selectedChallenge) {
      case "SPEED_DEMON":
        const timeElapsed = Date.now() - this.challengeStartTime;
        const timeLeft = Math.max(0, challenge.timeLimit - timeElapsed);
        progress = (this.score / challenge.target) * 100;
        label = `Speed Demon: ${this.score}/${
          challenge.target
        } points - ${Math.ceil(timeLeft / 1000)}s left`;

        if (timeLeft <= 0 && this.score < challenge.target) {
          this.gameOver();
        }
        break;

      case "MARATHON":
        progress = (this.snake.length / challenge.target) * 100;
        label = `Marathon: ${this.snake.length}/${challenge.target} segments`;

        if (this.snake.length >= challenge.target) {
          this.score += CONFIG.POINTS_CHALLENGE_COMPLETE;
          this.gameOver();
        }
        break;

      case "PERFECTIONIST":
        // Only track in modes with levels
        if (this.selectedMode !== "SURVIVAL") {
          progress = (this.perfectLevels / challenge.target) * 100;
          label = `Perfectionist: ${this.perfectLevels}/${challenge.target} perfect levels`;

          if (this.perfectLevels >= challenge.target) {
            this.score += CONFIG.POINTS_CHALLENGE_COMPLETE;
            this.gameOver();
          }
        }
        break;
    }

    labelDiv.textContent = label;
    barDiv.style.width = Math.min(100, progress) + "%";
  }

  checkChallengeCompletion() {
    if (!this.selectedChallenge) return;

    const challenge = CONFIG.CHALLENGES[this.selectedChallenge];
    const resultDiv = document.getElementById("challengeResult");
    let success = false;

    switch (this.selectedChallenge) {
      case "SPEED_DEMON":
        success = this.score >= challenge.target;
        break;
      case "MARATHON":
        success = this.snake.length >= challenge.target;
        break;
      case "PERFECTIONIST":
        success = this.perfectLevels >= challenge.target;
        break;
    }

    if (success) {
      resultDiv.textContent = `🏆 Challenge Complete: ${challenge.name}!`;
      resultDiv.className = "challenge-result success";
      this.playSound("challengeComplete");
    } else {
      resultDiv.textContent = `Challenge Failed: ${challenge.name}`;
      resultDiv.className = "challenge-result failed";
      this.playSound("challengeFailed");
    }

    resultDiv.style.display = "block";
  }

  // === SCORE MANAGEMENT ===
  loadHighScore() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEY_HIGHSCORE);
    this.highScore = saved ? parseInt(saved) : 0;
  }

  updateHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem(
        CONFIG.STORAGE_KEY_HIGHSCORE,
        this.highScore.toString()
      );
      this.updateHighScoreDisplay();
    }
  }

  updateHighScoreDisplay() {
    document.getElementById("highScore").textContent = this.highScore;
  }

  // === AUDIO SYSTEM ===
  initializeAudio() {
    // Load settings from localStorage
    const settings = this.loadSettings();

    // Load music tracks
    this.musicTracks = {
      menu: new Audio("sounds/music/menu.mp3"),
      classic: new Audio("sounds/music/classic.mp3"),
      arcade: new Audio("sounds/music/arcade.wav"),
      survival: new Audio("sounds/music/survival.wav"),
      zen: new Audio("sounds/music/zen.wav"),
      gameover: new Audio("sounds/music/game-over.ogg"),
    };

    // Set music properties
    Object.values(this.musicTracks).forEach((music) => {
      music.volume = settings.musicVolume;
      music.loop = true;
    });

    // Game over music shouldn't loop
    if (this.musicTracks.gameover) {
      this.musicTracks.gameover.loop = false;
    }

    // Load sound effects
    this.sounds = {
      eatFood: new Audio("sounds/sfx/eat-food.wav"),
      eatGolden: new Audio("sounds/sfx/eat-golden.wav"),
      powerupCollect: new Audio("sounds/sfx/powerup-collect.wav"),
      powerupSpeed: new Audio("sounds/sfx/powerup-speed.wav"),
      powerupSlow: new Audio("sounds/sfx/powerup-slow.mp3"),
      powerupInvincible: new Audio("sounds/sfx/powerup-invincible.wav"),
      powerupMultiplier: new Audio("sounds/sfx/powerup-multiplier.wav"),
      powerupShrink: new Audio("sounds/sfx/powerup-shrink.wav"),
      hitWall: new Audio("sounds/sfx/hit-wall.mp3"),
      hitSelf: new Audio("sounds/sfx/hit-self.mp3"),
      portal: new Audio("sounds/sfx/portal.wav"),
      levelComplete: new Audio("sounds/sfx/level-complete.wav"),
      levelStart: new Audio("sounds/sfx/level-start.wav"),
      challengeComplete: new Audio("sounds/sfx/challenge-complete.mp3"),
      challengeFailed: new Audio("sounds/sfx/challenge-failed.mp3"),
      buttonClick: new Audio("sounds/sfx/button-click.wav"),
      pause: new Audio("sounds/sfx/pause.mp3"),
      resume: new Audio("sounds/sfx/resume.mp3"),
      victory: new Audio("sounds/sfx/victory.ogg"),
    };

    // Set sound effect volumes
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = settings.soundVolume;
    });

    // Store current settings
    this.musicEnabled = settings.musicEnabled;
    this.soundEnabled = settings.soundEnabled;
    this.musicVolume = settings.musicVolume;
    this.soundVolume = settings.soundVolume;

    // Start menu music if enabled
    this.playMusic("menu");

    // Add click sounds to all buttons
    this.addButtonSounds();
  }

  playMusic(trackName) {
    if (!this.musicEnabled) return;

    // Stop current music
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
    }

    // Play new music
    const track = this.musicTracks[trackName];
    if (track) {
      this.currentMusic = track;
      track.volume = this.musicVolume;

      // Handle errors gracefully (file might not exist yet)
      track.play().catch((error) => {
        console.log(
          `Music "${trackName}" not found - that's okay, add it later!`
        );
      });
    }
  }

  playSound(soundName) {
    if (!this.soundEnabled) return;

    const sound = this.sounds[soundName];
    if (sound) {
      // Clone for overlapping sounds
      const soundClone = sound.cloneNode();
      soundClone.volume = this.soundVolume;

      soundClone.play().catch((error) => {
        console.log(
          `Sound "${soundName}" not found - that's okay, add it later!`
        );
      });
    }
  }

  addButtonSounds() {
    // Add click sounds to all buttons
    const buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.playSound("buttonClick");
      });
    });
  }

  stopAllMusic() {
    Object.values(this.musicTracks).forEach((music) => {
      music.pause();
      music.currentTime = 0;
    });
    this.currentMusic = null;
  }

  // === SETTINGS MANAGEMENT ===
  loadSettings() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEY_SETTINGS);
    let settings;

    if (saved) {
      settings = JSON.parse(saved);
    } else {
      // Default settings
      settings = {
        musicEnabled: CONFIG.MUSIC_ENABLED,
        soundEnabled: CONFIG.SOUND_ENABLED,
        musicVolume: CONFIG.MUSIC_VOLUME,
        soundVolume: CONFIG.SOUND_VOLUME,
      };
    }

    // Update UI elements
    document.getElementById("musicToggle").checked = settings.musicEnabled;
    document.getElementById("soundToggle").checked = settings.soundEnabled;
    document.getElementById("musicVolume").value = settings.musicVolume * 100;
    document.getElementById("soundVolume").value = settings.soundVolume * 100;
    document.getElementById("musicVolumeValue").textContent =
      Math.round(settings.musicVolume * 100) + "%";
    document.getElementById("soundVolumeValue").textContent =
      Math.round(settings.soundVolume * 100) + "%";

    return settings;
  }

  saveSettings() {
    const settings = {
      musicEnabled: this.musicEnabled,
      soundEnabled: this.soundEnabled,
      musicVolume: this.musicVolume,
      soundVolume: this.soundVolume,
    };

    localStorage.setItem(CONFIG.STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }

  toggleMusic(enabled) {
    this.musicEnabled = enabled;
    this.saveSettings();

    if (!enabled && this.currentMusic) {
      this.currentMusic.pause();
    } else if (enabled && this.currentMusic) {
      this.currentMusic.play().catch((e) => {});
    }
  }

  toggleSound(enabled) {
    this.soundEnabled = enabled;
    this.saveSettings();
  }

  setMusicVolume(volume) {
    this.musicVolume = volume;
    this.saveSettings();

    // Update all music tracks
    Object.values(this.musicTracks).forEach((music) => {
      music.volume = volume;
    });

    // Update current playing music
    if (this.currentMusic) {
      this.currentMusic.volume = volume;
    }
  }

  setSoundVolume(volume) {
    this.soundVolume = volume;
    this.saveSettings();

    // Update all sound effects
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = volume;
    });
  }

  // === SKIN MANAGEMENT ===
  loadSkin() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEY_SKIN);
    if (saved && CONFIG.SKINS[saved]) {
      this.selectedSkin = saved;
      // Update UI to show selected skin
      setTimeout(() => {
        const skinBtn = document.querySelector(
          `.skin-btn[data-skin="${saved}"]`
        );
        if (skinBtn) {
          document
            .querySelectorAll(".skin-btn")
            .forEach((b) => b.classList.remove("active"));
          skinBtn.classList.add("active");
        }
      }, 100);
    }
  }

  saveSkin() {
    localStorage.setItem(CONFIG.STORAGE_KEY_SKIN, this.selectedSkin);
  }

  saveToLeaderboard() {
    let leaderboard = JSON.parse(
      localStorage.getItem(CONFIG.STORAGE_KEY_LEADERBOARD) || "[]"
    );

    const entry = {
      score: this.score,
      level: this.level,
      length: this.snake.length,
      mode: this.selectedMode,
      difficulty: this.selectedDifficulty,
      date: new Date().toLocaleDateString(),
    };

    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, CONFIG.MAX_LEADERBOARD_ENTRIES);

    localStorage.setItem(
      CONFIG.STORAGE_KEY_LEADERBOARD,
      JSON.stringify(leaderboard)
    );
  }

  displayLeaderboard() {
    const leaderboard = JSON.parse(
      localStorage.getItem(CONFIG.STORAGE_KEY_LEADERBOARD) || "[]"
    );
    const container = document.getElementById("leaderboardList");

    if (leaderboard.length === 0) {
      container.innerHTML =
        '<div class="leaderboard-empty">No scores yet. Be the first to play!</div>';
      return;
    }

    container.innerHTML = leaderboard
      .map((entry, index) => {
        const rank = index + 1;
        const topClass = rank <= 3 ? "top-3" : "";
        return `
                <div class="leaderboard-entry ${topClass}">
                    <div class="entry-rank">#${rank}</div>
                    <div class="entry-info">
                        <div class="entry-score">${entry.score} points</div>
                        <div class="entry-details">
                            Level ${entry.level} • Length ${entry.length} • ${entry.mode} • ${entry.difficulty} • ${entry.date}
                        </div>
                    </div>
                </div>
            `;
      })
      .join("");
  }
}

// === INITIALIZE GAME ===
let game;

window.addEventListener("DOMContentLoaded", () => {
  game = new SnakeGame();
});
