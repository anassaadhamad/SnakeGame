# 🐍 Advanced Snake Game

A feature-rich, modern web-based Snake game with multiple game modes, challenges, power-ups, levels, audio system, and customizable snake skins. Built with vanilla JavaScript, HTML5 Canvas, and CSS3.

![Snake Game](https://img.shields.io/badge/version-2.0-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

---

<div align="center">

## 🎮 **[► PLAY NOW! ◄](https://anassaadhamad.github.io/SnakeGame/)** 🎮

### **[👉 Click Here to Play Instantly - No Download Required! 👈](https://anassaadhamad.github.io/SnakeGame/)**

🎵 **Full Audio** • 🎨 **8 Snake Skins** • 🏆 **4 Game Modes** • ⚡ **5 Power-Ups**

**Play directly in your browser with all features unlocked!**

</div>

---

## ✨ Key Features

- 🎮 **4 Unique Game Modes** - Classic, Arcade, Survival, and Zen
- 🎯 **3 Challenge Modes** - Speed Demon, Marathon, and Perfectionist
- 🎨 **8 Snake Skins** - Customize your snake's appearance
- 🎵 **Full Audio System** - Background music and sound effects
- 🔊 **Audio Settings** - Control music and SFX volume independently
- ⚡ **5 Power-Ups** - Speed, Slow Motion, Invincibility, Multiplier, Shrink
- 🏆 **Leaderboard System** - Track top 10 high scores
- 📊 **Level Progression** - 10 levels with increasing difficulty
- ⚙️ **Centralized Config** - Easy customization via `config.js`
- 📱 **Responsive Design** - Clean, modern dark-themed UI

## 🎮 Game Modes

### Classic Mode
Traditional snake game with progressive levels (10 levels max)
- Levels progress by eating 15 food items per level
- Each level adds more obstacles and increases speed
- Power-ups enabled for strategic gameplay
- Complete all levels to win!

### Arcade Mode
Fast-paced action with portals and all features enabled
- Similar to Classic but includes teleportation portals from level 3+
- All power-ups available
- Progressive level-based gameplay
- Dynamic portal mechanics for quick escapes

### Survival Mode
Endless mode - how long can you survive?
- **NO level completion** - play indefinitely until game over
- Difficulty increases continuously as you eat food
- Speed increases every 5 food items
- New obstacles spawn every 10 food items (up to 30 total)
- Displays survival time instead of level number
- Shows total food eaten instead of progress
- **NO power-ups** (pure skill mode)
- Unique background music

### Zen Mode
Relaxed mode where walls wrap around
- No death from hitting walls (you teleport to the other side)
- Progressive levels like Classic mode
- Power-ups and portals enabled
- Perfect for casual play and practicing
- Calm, relaxing background music

## 🎯 Challenge Modes

### Speed Demon 🏃
- **Objective:** Reach 500 points within 2 minutes
- **Reward:** 500 bonus points
- **Tip:** Focus on golden food and score multipliers

### Marathon 🏃‍♂️
- **Objective:** Grow your snake to 50 segments
- **Reward:** 500 bonus points
- **Tip:** Use shrink power-ups strategically

### Perfectionist 🎯
- **Objective:** Complete 3 levels without hitting walls
- **Reward:** 500 bonus points
- **Tip:** Plan ahead and avoid risky moves

## 🎨 Snake Skins

Customize your snake with 8 unique skins:

1. **Classic Green** - Original retro style
2. **Blue Ice** - Cool ice theme with cyan eyes
3. **Red Fire** - Burning hot with yellow eyes
4. **Purple Galaxy** - Cosmic vibe with cyan eyes
5. **Golden** - Shiny gold for champions
6. **Pink Candy** - Sweet and cute
7. **Dark Shadow** - Mysterious dark with red eyes
8. **Rainbow** - Colorful gradient vibes

All skins are saved locally and persist between sessions!

## 🎵 Audio System

### Background Music
Each game mode has its own unique soundtrack:
- **Menu** - Energetic arcade theme
- **Classic Mode** - 8-bit nostalgic gameplay
- **Arcade Mode** - Fast-paced electronic
- **Survival Mode** - Intense, suspenseful
- **Zen Mode** - Calm, relaxing
- **Game Over** - Defeat jingle

### Sound Effects (17 SFX)
- **Gameplay:** eat-food, eat-golden, portal teleport
- **Power-ups:** collect, speed, slow, invincible, multiplier, shrink
- **Events:** level-complete, level-start, victory
- **UI:** button-click

### Audio Controls
- 🎵 Toggle music on/off
- 🔊 Toggle sound effects on/off
- 🎚️ Independent volume sliders (0-100%)
- 🎵 Test sound button
- Settings persist between sessions

## ⚡ Power-Ups

### Speed Boost ⚡
- Temporarily increases snake movement speed by 2x
- Duration: 7 seconds
- Strategy: Use for quick escapes

### Slow Motion 🐌
- Slows down time for better control (50% speed)
- Duration: 7 seconds
- Strategy: Perfect for tight spaces

### Invincibility 🛡️
- Makes you temporarily invulnerable to all obstacles
- Duration: 5 seconds
- Strategy: Save for dangerous situations

### Score Multiplier ✨
- Doubles all points earned
- Duration: 10 seconds
- Strategy: Combine with golden food

### Shrink 📏
- Reduces snake length by 3 segments
- Instant effect
- Strategy: Use when trapped

*Note: Power-ups have a 15% spawn chance when eating food*

## 🎲 Game Elements

| Element | Description | Points |
|---------|-------------|--------|
| 🟢 **Snake** | Your character that grows when eating | - |
| 🔴 **Red Food** | Normal food | +10 |
| 🟡 **Golden Food** | Special food (appears briefly) | +50 |
| ⬛ **Obstacles** | Avoid these or game over! | -1 life |
| 🟣 **Portals** | Teleport between connected portals | - |
| 💎 **Power-Ups** | Temporary special abilities | +25 |

## 🎮 Controls

### Keyboard
- **Arrow Keys** or **WASD** - Move the snake
- **Space** or **ESC** - Pause/Resume game
- Mouse click for menu navigation

### Auto-Focus
- Canvas automatically focuses when starting game
- No need to click canvas before playing

## 📊 Difficulty Levels

| Difficulty | Speed (ms) | Description |
|------------|-----------|-------------|
| **Easy** | 150 | Slower speed, perfect for beginners |
| **Medium** | 100 | Balanced gameplay (default) |
| **Hard** | 60 | Fast-paced for experienced players |
| **Insane** | 30 | Lightning-fast reflexes required! |

*Speed decreases by 5ms per level (faster gameplay)*

## 🏆 Scoring System

| Action | Points |
|--------|--------|
| Normal Food | **10 points** |
| Golden Food | **50 points** |
| Power-Up Collected | **25 points** |
| Level Complete | **200 bonus points** |
| Challenge Complete | **500 bonus points** |
| Score Multiplier Active | **2x all points** |

## 🚀 Getting Started

### Prerequisites
- Modern web browser with HTML5 Canvas support
- No installation or build process required!

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anassaadhamad/SnakeGame.git
```

2. Navigate to the project folder:
```bash
cd SnakeGame
```

3. Open `index.html` in your browser:
```bash
# Or simply double-click index.html
```

4. Start playing! 🎮

### Alternative
- Download ZIP file from GitHub
- Extract and open `index.html`
- No dependencies needed!

## ⚙️ Configuration

All game settings are centralized in `config.js` for easy customization:

### Canvas & Graphics
```javascript
CANVAS_WIDTH: 800,
CANVAS_HEIGHT: 600,
GRID_SIZE: 20,
```

### Game Speed
```javascript
SPEED_EASY: 150,      // Lower = faster
SPEED_MEDIUM: 100,
SPEED_HARD: 60,
SPEED_INSANE: 30,
SPEED_INCREMENT_PER_LEVEL: 5,
```

### Scoring
```javascript
POINTS_FOOD: 10,
POINTS_GOLDEN_FOOD: 50,
POINTS_POWERUP: 25,
POINTS_LEVEL_COMPLETE: 200,
POINTS_CHALLENGE_COMPLETE: 500,
```

### Power-Ups
```javascript
POWERUP_SPAWN_CHANCE: 0.15,        // 15%
POWERUP_DURATION: 7000,            // milliseconds
SPEED_BOOST_MULTIPLIER: 0.5,       // 2x faster
SLOW_MOTION_MULTIPLIER: 2,         // 50% slower
INVINCIBILITY_DURATION: 5000,
SCORE_MULTIPLIER_DURATION: 10000,
```

### Level Settings
```javascript
FOOD_PER_LEVEL: 15,
MAX_LEVEL: 10,
OBSTACLES_PER_LEVEL: 3,
```

### Audio Settings
```javascript
SOUND_ENABLED: true,
MUSIC_ENABLED: true,
SOUND_VOLUME: 0.5,    // 0.0 to 1.0
MUSIC_VOLUME: 0.3,    // 0.0 to 1.0
```

### Visual Colors
```javascript
COLORS: {
  background: "#0a0a0a",
  grid: "#1a1a1a",
  primary: "#00ff00",
  accent: "#ffd700",
  // ... and more
}
```

### Snake Skins
```javascript
SKINS: {
  CLASSIC: { head: "#00cc00", body: "#00ff00", eyes: "#000000" },
  BLUE_ICE: { head: "#0066cc", body: "#0099ff", eyes: "#ffffff" },
  // ... 6 more skins
}
```

## 🎯 How to Play

1. **Select Game Mode** - Choose from Classic, Arcade, Survival, or Zen
2. **Choose Difficulty** - Pick your preferred speed level
3. **Select Snake Skin** - Customize your appearance (optional)
4. **Optional Challenge** - Select a challenge mode for extra objectives
5. **Adjust Audio** - Configure music and sound settings (optional)
6. **Start Game** - Click "Start Game" to begin
7. **Control Snake** - Use arrow keys or WASD to move
8. **Eat Food** - Collect food to grow and earn points
9. **Avoid Obstacles** - Don't hit walls, obstacles, or yourself
10. **Collect Power-Ups** - Grab special items for temporary abilities
11. **Complete Levels** - Eat 15 food items to advance
12. **Beat High Score** - Try to beat your personal best!

## 💡 Tips & Strategies

### General Tips
- 🧠 **Plan Ahead** - Think several moves in advance to avoid trapping yourself
- 🏃 **Golden Food** - Appears randomly and disappears after 5 seconds - grab it quickly!
- 🎯 **Perfect Runs** - Complete levels without hitting walls for Perfectionist challenge
- 🔄 **Use Walls** - In Zen mode, use wall wrapping to your advantage

### Power-Up Strategies
- 🛡️ **Invincibility** - Save for when you're trapped or have many obstacles
- ⚡ **Speed Boost** - Great for reaching golden food or escaping tight spots
- 🐌 **Slow Motion** - Use in crowded areas or when length is getting difficult
- ✨ **Score Multiplier** - Combine with golden food for 100 points!
- 📏 **Shrink** - Emergency use when trapped by your own body

### Mode-Specific Tips
- **Classic:** Focus on completing levels efficiently
- **Arcade:** Master portal usage for quick escapes
- **Survival:** Prioritize survival over high scores early on
- **Zen:** Take your time and plan long routes

### Challenge Tips
- **Speed Demon:** Prioritize golden food and score multipliers
- **Marathon:** Balance growth with maneuverability; use shrink wisely
- **Perfectionist:** Play conservatively; avoid walls even if safe

## 🎨 Customization

### Changing Visual Style
Edit `styles.css` to customize:
- Colors and themes
- Animation speeds
- Button styles
- Font choices
- Glow effects

### Adding New Skins
In `config.js`, add to the `SKINS` object:
```javascript
YOUR_SKIN: {
  name: "Your Skin Name",
  head: "#RRGGBB",    // Head color
  body: "#RRGGBB",    // Body color
  eyes: "#RRGGBB",    // Eye color
  description: "Your description"
}
```

### Creating Custom Modes
In `config.js`, add to the `MODES` object:
```javascript
YOUR_MODE: {
  name: "Your Mode",
  description: "Description",
  hasObstacles: true,
  hasPowerUps: true,
  hasPortals: false,
  wallsDeath: true
}
```

## 📁 File Structure

```
SnakeGame/
├── index.html              # Main HTML structure
├── styles.css              # All styling and animations
├── game.js                 # Game logic and engine (2000+ lines)
├── config.js               # Centralized configuration
├── README.md               # This file
├── .gitignore              # Git ignore file
└── sounds/                 # Audio assets
    ├── README.md           # Sound system documentation
    ├── music/              # Background music tracks
    │   ├── README.md       # Music track details
    │   ├── menu.mp3        # Menu screen music
    │   ├── classic.mp3     # Classic mode music
    │   ├── arcade.wav      # Arcade mode music
    │   ├── survival.wav    # Survival mode music
    │   ├── zen.wav         # Zen mode music
    │   └── game-over.ogg   # Game over jingle
    └── sfx/                # Sound effects
        ├── README.md       # SFX details
        ├── button-click.wav
        ├── eat-food.wav
        ├── eat-golden.wav
        ├── level-complete.wav
        ├── level-start.wav
        ├── portal.wav
        ├── powerup-collect.wav
        ├── powerup-invincible.wav
        ├── powerup-multiplier.wav
        ├── powerup-shrink.wav
        ├── powerup-slow.mp3
        ├── powerup-speed.wav
        └── victory.ogg
```

## 🌐 Browser Compatibility

Tested and fully working on:
- ✅ **Chrome** 90+ (Recommended)
- ✅ **Firefox** 88+
- ✅ **Edge** 90+
- ✅ **Safari** 14+
- ✅ **Opera** 76+

**Requirements:**
- HTML5 Canvas support
- ES6 JavaScript support
- Web Audio API support (for sound)
- Local Storage API (for high scores)

## 📚 Learning Resources

This project demonstrates:
- 🎨 **HTML5 Canvas API** - 2D graphics rendering
- 🎮 **JavaScript Game Loops** - RequestAnimationFrame
- 🏗️ **Object-Oriented Programming** - Classes and inheritance
- 💾 **Local Storage API** - Persistent data storage
- 🎵 **Web Audio API** - Sound and music playback
- 🎨 **CSS3 Animations** - Smooth transitions and effects
- 📱 **Responsive Design** - Flexible layouts
- 🎯 **Game State Management** - Complex state handling
- 🔧 **Configuration Management** - Centralized settings
- ⌨️ **Input Handling** - Keyboard events and queuing

## 🛠️ Technical Details

### Architecture
- **Modular Design** - Separated concerns (config, logic, presentation)
- **Event-Driven** - Clean event listener management
- **State Machine** - Robust game state handling
- **Performance Optimized** - Efficient rendering and collision detection

### Data Persistence
- High scores saved to localStorage
- Settings preferences saved
- Leaderboard tracked (top 10)
- Snake skin selection saved

### Audio System
- Web Audio API implementation
- Supports multiple formats (MP3, OGG, WAV)
- Independent volume controls
- Smooth fade in/out
- Mode-specific music tracks

## 🐛 Known Issues

None currently! The game is fully tested and stable. 🎉

If you discover any bugs, feel free to:
1. Open an issue on GitHub
2. Submit a pull request with a fix
3. Contact the developer

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

### Easy Additions
- [ ] Add more snake skins
- [ ] Create new color themes
- [ ] Add more sound effects
- [ ] Design new obstacles

### Medium Additions
- [ ] New power-up types
- [ ] Additional game modes
- [ ] More challenge types
- [ ] Achievement system
- [ ] Tutorial mode

### Advanced Additions
- [ ] Multiplayer mode (local)
- [ ] Online leaderboard
- [ ] Mobile touch controls
- [ ] Replay system
- [ ] Level editor

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 Version History

### Version 2.0 (Current)
- ✅ Added full audio system (music + SFX)
- ✅ Added 8 customizable snake skins
- ✅ Added audio settings menu
- ✅ Added auto-focus feature
- ✅ Added custom cursor styles
- ✅ Improved UI/UX design
- ✅ Enhanced game mechanics

### Version 1.0
- ✅ Initial release
- ✅ 4 game modes
- ✅ 3 challenge modes
- ✅ 5 power-ups
- ✅ Level progression system
- ✅ Leaderboard system

## 📄 License

This project is **free and open source**. 

- ✅ Free to use
- ✅ Free to modify
- ✅ Free to distribute
- ✅ No attribution required (but appreciated!)
- ✅ Use in personal or commercial projects

## 👨‍💻 Developer

Created by **Anas Saad Hamad**

- 🌐 GitHub: [@anassaadhamad](https://github.com/anassaadhamad)
- 📧 Project Repo: [SnakeGame](https://github.com/anassaadhamad/SnakeGame)

## 🎮 Play Online

**[🎮 Play Now!](https://anassaadhamad.github.io/SnakeGame/)** - No download required!

Experience the full game directly in your browser with all features:
- ✨ All 4 game modes
- 🎵 Full audio system
- 🎨 8 customizable snake skins
- 🏆 Local leaderboard tracking

## ⭐ Show Your Support

If you enjoyed this game:
- ⭐ Star this repository on GitHub
- 🍴 Fork it and create your own version
- 📢 Share it with friends
- 🐛 Report bugs or suggest features
- 💝 Contribute improvements

## 🙏 Acknowledgments

- Original Snake game concept by Gremlin Industries (1976)
- Inspired by classic Nokia Snake game
- Sound effects and music from free sources
- Built with love for snake game enthusiasts ❤️

## 📬 Contact & Support

- **Issues:** [GitHub Issues](https://github.com/anassaadhamad/SnakeGame/issues)
- **Discussions:** [GitHub Discussions](https://github.com/anassaadhamad/SnakeGame/discussions)
- **Email:** Create an issue for questions

---

<div align="center">

### 🐍 Happy Gaming! 🎮

Made with ❤️ for snake game enthusiasts

**Now with sound, music, and customizable skins!** 🎵🎨

[⬆ Back to Top](#-advanced-snake-game)

</div>
