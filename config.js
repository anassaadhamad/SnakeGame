// ==========================================
// SNAKE GAME - CENTRALIZED CONFIGURATION
// ==========================================
// Change any game settings here easily

const CONFIG = {
  // === GAME CANVAS ===
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  GRID_SIZE: 20,

  // === GAME SPEEDS (lower = faster) ===
  SPEED_EASY: 150,
  SPEED_MEDIUM: 100,
  SPEED_HARD: 60,
  SPEED_INSANE: 30,
  SPEED_INCREMENT_PER_LEVEL: 5,

  // === SCORING ===
  POINTS_FOOD: 10,
  POINTS_GOLDEN_FOOD: 50,
  POINTS_POWERUP: 25,
  POINTS_LEVEL_COMPLETE: 200,
  POINTS_CHALLENGE_COMPLETE: 500,

  // === SNAKE SETTINGS ===
  INITIAL_SNAKE_LENGTH: 3,
  SNAKE_COLOR: "#00ff00",
  SNAKE_HEAD_COLOR: "#00cc00",

  // === FOOD SETTINGS ===
  FOOD_COLOR: "#ff0000",
  GOLDEN_FOOD_COLOR: "#ffd700",
  GOLDEN_FOOD_PROBABILITY: 0.1,
  GOLDEN_FOOD_DURATION: 5000, // milliseconds

  // === POWER-UPS ===
  POWERUP_SPAWN_CHANCE: 0.15,
  POWERUP_DURATION: 7000,
  SPEED_BOOST_MULTIPLIER: 0.5,
  SLOW_MOTION_MULTIPLIER: 2,
  INVINCIBILITY_DURATION: 5000,
  SCORE_MULTIPLIER_DURATION: 10000,

  // === LEVELS ===
  FOOD_PER_LEVEL: 15,
  MAX_LEVEL: 10,

  // === OBSTACLES ===
  OBSTACLES_PER_LEVEL: 3,
  OBSTACLE_COLOR: "#666666",

  // === PORTAL SETTINGS ===
  PORTAL_COLOR_A: "#9b59b6",
  PORTAL_COLOR_B: "#3498db",

  // === GAME MODES ===
  MODES: {
    CLASSIC: {
      name: "Classic",
      description: "Traditional snake game with levels",
      hasObstacles: true,
      hasPowerUps: true,
      hasPortals: false,
      wallsDeath: true,
    },
    ARCADE: {
      name: "Arcade",
      description: "Fast-paced with power-ups and challenges",
      hasObstacles: true,
      hasPowerUps: true,
      hasPortals: true,
      wallsDeath: true,
    },
    SURVIVAL: {
      name: "Survival",
      description: "How long can you survive?",
      hasObstacles: true,
      hasPowerUps: false,
      hasPortals: false,
      wallsDeath: true,
      continuousSpeed: true,
    },
    ZEN: {
      name: "Zen",
      description: "Relaxed mode - walls wrap around",
      hasObstacles: false,
      hasPowerUps: true,
      hasPortals: true,
      wallsDeath: false,
    },
  },

  // === CHALLENGES ===
  CHALLENGES: {
    SPEED_DEMON: {
      name: "Speed Demon",
      description: "Reach 500 points in under 2 minutes",
      target: 500,
      timeLimit: 120000,
    },
    MARATHON: {
      name: "Marathon",
      description: "Grow to 50 segments",
      target: 50,
      type: "length",
    },
    PERFECTIONIST: {
      name: "Perfectionist",
      description: "Complete 3 levels without hitting walls",
      target: 3,
      type: "perfect",
    },
  },

  // === SNAKE SKINS ===
  SKINS: {
    CLASSIC: {
      name: "Classic Green",
      head: "#00cc00",
      body: "#00ff00",
      eyes: "#000000",
      description: "Original snake style",
    },
    BLUE_ICE: {
      name: "Blue Ice",
      head: "#0066cc",
      body: "#0099ff",
      eyes: "#ffffff",
      description: "Cool ice theme",
    },
    RED_FIRE: {
      name: "Red Fire",
      head: "#cc0000",
      body: "#ff3333",
      eyes: "#ffff00",
      description: "Burning hot",
    },
    PURPLE_GALAXY: {
      name: "Purple Galaxy",
      head: "#6600cc",
      body: "#9933ff",
      eyes: "#00ffff",
      description: "Cosmic vibe",
    },
    GOLDEN: {
      name: "Golden",
      head: "#cc9900",
      body: "#ffd700",
      eyes: "#000000",
      description: "Shiny gold",
    },
    PINK_CANDY: {
      name: "Pink Candy",
      head: "#ff1493",
      body: "#ff69b4",
      eyes: "#ffffff",
      description: "Sweet and cute",
    },
    DARK_SHADOW: {
      name: "Dark Shadow",
      head: "#1a1a1a",
      body: "#333333",
      eyes: "#ff0000",
      description: "Mysterious dark",
    },
    RAINBOW: {
      name: "Rainbow",
      head: "#ff0066",
      body: "#00ff99",
      eyes: "#ffff00",
      description: "Colorful vibes",
    },
  },

  // === VISUAL SETTINGS ===
  COLORS: {
    background: "#0a0a0a",
    grid: "#1a1a1a",
    text: "#ffffff",
    textSecondary: "#888888",
    primary: "#00ff00",
    secondary: "#ff0000",
    accent: "#ffd700",
    warning: "#ff6b6b",
    success: "#51cf66",
  },

  // === SOUND SETTINGS ===
  SOUND_ENABLED: true,
  MUSIC_ENABLED: true,
  SOUND_VOLUME: 0.5,
  MUSIC_VOLUME: 0.3,

  // === LOCAL STORAGE ===
  STORAGE_KEY_HIGHSCORE: "snakeHighScore",
  STORAGE_KEY_SETTINGS: "snakeSettings",
  STORAGE_KEY_LEADERBOARD: "snakeLeaderboard",
  STORAGE_KEY_SKIN: "snakeSkin",
  MAX_LEADERBOARD_ENTRIES: 10,
};

// Freeze configuration to prevent accidental modifications
Object.freeze(CONFIG);
