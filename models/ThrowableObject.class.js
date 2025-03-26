class ThrowableObject extends MovableObject {
    width = 50;
    height = 50;

    audioSpiderDead = new Audio('./audio/spiderDead.mp3');

    /**
     * Initializes a new instance of the ThrowableObject class.
     * Loads the initial image and sets the initial x and y coordinates.
     * Calls the throw method to start the animation.
     * @param {number} x - The initial x position of the object.
     * @param {number} y - The initial y position of the object.
     */
    constructor(x, y) {
        super().loadImage('./img/shoot/shadow/44.png');
        this.x = x;
        this.y = y;
        this.throw();
    }


    /**
     * Initiates the throwing animation of the object.
     * Sets the vertical speed for the throw and applies gravity.
     * The object's position is updated at a regular interval, moving it horizontally.
     * Continuously checks for collisions with enemies.
     * Stops the interval when the object goes beyond a vertical position of 500.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();

        let intervallnummer = setInterval(() => {
            this.checkBottleHitEnemy();
            // console.log(world.level.enemies[0]);
            this.x += 10;
            if (this.y > 500) {
                window.clearInterval(intervallnummer)
            }
        }, 25);
    }


    isBottleUsed = false;


    /**
     * Checks for collisions between the throwable bottle and enemies in the level.
     * If a collision is detected and the bottle has not been used yet, it marks the bottle as used.
     * If the enemy is an instance of Endboss, it reduces the enemy's energy and updates the status bar.
     * If the Endboss's energy reaches 0, it triggers the enemy's death sequence.
     * For other enemies, it directly triggers the enemy's death sequence and plays the spider dead audio.
     */
    checkBottleHitEnemy() {
        world.level.enemies.forEach((enemy) => {
            // console.log(!this.isBottleUsed && this.isColliding(enemy));
            if (!this.isBottleUsed && this.isColliding(enemy)) {
                this.isBottleUsed = true
                if (enemy instanceof Endboss) {
                    // console.log(enemy.energy);
                    enemy.hit();
                    // console.log(enemy.energy);
                    world.statusbarEndboss.setPercentage(enemy.energy);
                    if (enemy.isDead()) {
                        world.enemyIsDead(enemy);
                        enemy.clearTempCanvas();
                    }
                }
                if (!enemy instanceof Endboss) {
                    world.enemyIsDead(enemy);
                    enemy.loadImage('./img/enemy/Spider/Spider_6.png');
                    this.audioSpiderDead.play();
                    this.audioSpiderDead.volume = 0.2;
                }
            }
        });
    }
}