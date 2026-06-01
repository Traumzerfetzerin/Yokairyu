# 🐉 Yokairyu

Yokairyu is a 2D side-scrolling platform game developed with **HTML5 Canvas**, **JavaScript**, and **Object-Oriented Programming (OOP)** principles.

The name combines the Japanese words **"Yokai"** (supernatural creature) and **"Ryū"** (dragon), creating the mythical world of Yokairyu.

## 🎮 Features

* Side-scrolling platform gameplay
* Keyboard and touch controls
* Collectible coins and items
* Projectile attack system
* Enemy AI and boss battles
* Health and status bars
* Sound effects and audio management
* Fullscreen mode
* Mobile-friendly controls
* Win and Game Over screens
* Responsive design

## 🚀 Technologies Used

* HTML5 Canvas
* CSS3
* JavaScript (ES6)
* Object-Oriented Programming (OOP)

## 🏗️ Architecture

The project follows an object-oriented architecture with separate classes for:

* Character
* Enemies
* End Boss
* Collectibles
* Throwable Objects
* Collision Detection
* World Management
* Sound Management
* Status Bars
* Levels

## 📂 Project Structure

```text
Yokairyu/
│
├── index.html
├── style.css
├── responsive.css
│
├── js/
│   ├── game.js
│   ├── handling.js
│   └── fullscreen.js
│
├── levels/
│   └── level1.js
│
├── models/
│   ├── world.class.js
│   ├── character.class.js
│   ├── endboss.class.js
│   ├── chicken.class.js
│   ├── collisions.class.js
│   ├── ThrowableObject.class.js
│   ├── soundManager.class.js
│   └── ...
│
├── img/
│   ├── icons/
│   └── assets/
│
└── README.md
```

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/yokairyu.git
```

2. Navigate to the project folder:

```bash
cd yokairyu
```

3. Start a local server and open the project in your browser.

Example using VS Code Live Server:

```text
Right Click → Open with Live Server
```

## 🎮 Controls

| Action     | Key   |
| ---------- | ----- |
| Move Left  | A / ← |
| Move Right | D / → |
| Jump       | Space |
| Shoot      | E     |
| Restart    | R     |

Mobile devices use touch controls displayed on the screen.

## 🏆 Objective

Navigate through the world, collect valuable items, defeat enemies, and overcome the final boss to complete the adventure.

## 📸 Screenshots

Add screenshots of your game here:

```markdown
![Start Screen](img/screenshots/startscreen.png)

![Gameplay](img/screenshots/gameplay.png)

![Boss Fight](img/screenshots/bossfight.png)
```

## 🔧 Future Improvements

* Additional levels
* More enemy types
* Save game functionality
* Character upgrades
* Achievement system
* Multiplayer mode
* Improved animations

## 🤝 Contributing

Contributions and suggestions are welcome. Feel free to fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.
