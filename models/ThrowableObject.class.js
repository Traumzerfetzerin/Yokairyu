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
            this.x += 10;
            if (this.y > 500) {
                window.clearInterval(intervallnummer)
            }
        }, 25);
    }


    isBottleUsed = false;


    /**
     * Checks for collisions between the throwable bottle and enemies in the level.
     * If a collision is detected, the bottle is marked as used. 
     * For an Endboss enemy, it inflicts a hit, updates the Endboss's health status bar, 
     * and checks if the Endboss is dead. If dead, it handles the Endboss's death and 
     * clears its temporary canvas if applicable. For other enemies, it plays the death 
     * animation and sound.
     */
    checkBottleHitEnemy() {
        world.level.enemies.forEach((enemy) => {
            if (!this.isBottleUsed && this.isColliding(enemy)) {
                this.isBottleUsed = true;

                if (enemy instanceof Endboss) {
                    enemy.hit();
                    world.statusbarEndboss.setPercentage(enemy.energy);

                    if (enemy.isDead()) {
                        world.enemyIsDead(enemy);
                        if (enemy.clearTempCanvas) {
                            enemy.clearTempCanvas();
                        }
                    }
                }
                else {
                    world.enemyIsDead(enemy);
                    enemy.loadImage('./img/enemy/Spider/Spider_6.png');
                    this.audioSpiderDead.play();
                    this.audioSpiderDead.volume = 0.2;
                }
            }
        });
    }
}