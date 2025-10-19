# 🐍 Advanced Snake Game

A feature-rich, modern web-based Snake game with multiple game modes, challenges, power-ups, and levels. Built with vanilla JavaScript, HTML5 Canvas, and CSS3.

## 🎮 Features

### Game Modes
- **Classic Mode**: Traditional snake game with progressive levels (10 levels max)
  - Levels progress by eating 15 food items per level
  - Each level adds more obstacles and increases speed
  - Complete all levels to win!

- **Arcade Mode**: Fast-paced action with portals and all features enabled
  - Similar to Classic but includes teleportation portals from level 3+
  - All power-ups available
  - Progressive level-based gameplay

- **Survival Mode**: Endless mode - how long can you survive?
  - NO level completion - play indefinitely until game over
  - Difficulty increases continuously as you eat food
  - Speed increases every 5 food items
  - New obstacles spawn every 10 food items (up to 30 total)
  - Displays survival time instead of level number
  - Shows total food eaten instead of progress
  - NO power-ups (pure skill mode)

- **Zen Mode**: Relaxed mode where walls wrap around
  - No death from hitting walls (you teleport to the other side)
  - Progressive levels like Classic mode
  - Power-ups and portals enabled
  - Perfect for casual play

### Difficulty Levels
- **Easy**: Slower speed, perfect for beginners
- **Medium**: Balanced gameplay
- **Hard**: Fast-paced for experienced players
- **Insane**: Lightning-fast reflexes required!

### Power-Ups
- ⚡ **Speed Boost**: Temporarily increases snake movement speed
- 🐌 **Slow Motion**: Slows down time for better control
- 🛡️ **Invincibility**: Makes you temporarily invulnerable
- ✨ **Score Multiplier**: Doubles all points for 10 seconds
- 📏 **Shrink**: Reduces snake length by 3 segments

### Game Elements
- 🟢 **Snake**: Your character that grows when eating
- 🔴 **Red Food**: Normal food (+10 points)
- 🟡 **Golden Food**: Special food that appears briefly (+50 points)
- ⬛ **Obstacles**: Avoid these or game over!
- 🟣 **Portals**: Teleport between connected portals (Arcade mode)

### Challenges
- **Speed Demon**: Reach 500 points within 2 minutes
- **Marathon**: Grow your snake to 50 segments
- **Perfectionist**: Complete 3 levels without hitting walls

### Additional Features
- 🏆 Leaderboard with top 10 scores
- 💾 Local storage for high scores
- 📊 Real-time stats tracking
- 🎯 Level progression system
- ⏸️ Pause/Resume functionality
- 📱 Responsive design
- ⌨️ Multiple control schemes (Arrow keys & WASD)

## 🚀 Getting Started

### Installation

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Start playing!

No build process, dependencies, or server required!

### Controls

- **Arrow Keys** or **WASD**: Move the snake
- **Space** or **ESC**: Pause/Resume game
- Click buttons for menu navigation

## ⚙️ Configuration

All game settings can be easily modified in the `config.js` file:

```javascript
// Example: Change game speed
SPEED_MEDIUM: 100,  // Lower = faster

// Example: Modify scoring
POINTS_FOOD: 10,
POINTS_GOLDEN_FOOD: 50,

// Example: Adjust power-up behavior
POWERUP_DURATION: 7000,  // milliseconds
```

### Key Configuration Options

- **Canvas Size**: `CANVAS_WIDTH`, `CANVAS_HEIGHT`
- **Game Speeds**: `SPEED_EASY`, `SPEED_MEDIUM`, `SPEED_HARD`, `SPEED_INSANE`
- **Scoring**: Points for food, power-ups, and level completion
- **Power-Up Settings**: Spawn chance, duration, effects
- **Level Settings**: Food per level, obstacles per level
- **Visual Colors**: Customizable color scheme

## 🎯 How to Play

1. **Select Game Mode**: Choose from Classic, Arcade, Survival, or Zen
2. **Choose Difficulty**: Pick your preferred speed level
3. **Optional Challenge**: Select a challenge mode for extra objectives
4. **Start Game**: Click "Start Game" to begin
5. **Control Snake**: Use arrow keys or WASD to move
6. **Eat Food**: Collect food to grow and earn points
7. **Avoid Obstacles**: Don't hit walls, obstacles, or yourself
8. **Collect Power-Ups**: Grab special items for temporary abilities
9. **Complete Levels**: Eat 15 food items to advance to the next level
10. **Beat High Score**: Try to beat your personal best!

## 🏆 Tips & Strategies

- **Plan Ahead**: Think several moves in advance to avoid trapping yourself
- **Golden Food**: Appears randomly and disappears after 5 seconds - grab it quickly!
- **Power-Ups**: Save invincibility for tight situations
- **Portal Strategy**: In Arcade mode, use portals to escape danger
- **Level Progression**: Each level increases speed and adds more obstacles
- **Perfect Runs**: Complete levels without hitting walls for Perfectionist challenge

## 📊 Scoring System

- Normal Food: **10 points**
- Golden Food: **50 points**
- Power-Up Collected: **25 points**
- Level Complete: **200 bonus points**
- Challenge Complete: **500 bonus points**
- Score Multiplier: **2x all points** (when active)

## 🎨 Customization

The game features a modern, dark-themed UI with:
- Smooth animations and transitions
- Glowing effects for special items
- Responsive layout for different screen sizes
- Clean, intuitive interface

You can customize the visual style by editing `styles.css`.

## 📱 Browser Compatibility

Tested and working on:
- Chrome (recommended)
- Firefox
- Edge
- Safari
- Opera

Requires a modern browser with HTML5 Canvas support.

## 🔧 File Structure

```
SnakeGame/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── game.js         # Game logic and engine
├── config.js       # Centralized configuration
└── README.md       # This file
```

## 🎓 Learning Resources

This game demonstrates:
- HTML5 Canvas API
- JavaScript game loops
- Object-oriented programming
- Local storage API
- CSS animations
- Responsive design
- Game state management

## 📝 License

This project is free to use, modify, and distribute. No attribution required.

## 🤝 Contributing

Feel free to fork, modify, and improve this game! Some ideas:
- Add sound effects
- Create new power-ups
- Design new obstacles
- Add multiplayer mode
- Implement custom skins
- Create more challenges

## 🐛 Known Issues

None currently! If you find a bug, feel free to fix it.

## 🎮 Enjoy!

Have fun playing! Try to beat all the challenges and reach the top of the leaderboard!

---

Made with ❤️ for snake game enthusiasts

