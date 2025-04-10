class ThrowableObject extends MovableObject {
    width = 50;
    height = 50;


    /**
     * Initializes a new instance of the ThrowableObject class.
     * Loads the initial image and throws the object from the given position.
     * Also loads the sound for the animation of the spider when it is hit.
     * @param {number} x - The x position of the object.
     * @param {number} y - The y position of the object.
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

    showWinScreen = false;


    /**
     * Checks if the throwable object is colliding with any enemies in the level.
     * If a collision is detected and the object has not been used, the collision is handled.
     * If the enemy is an instance of Endboss, it calls the handleEndbossHit function.
     * Otherwise, it calls the handleNormalEnemyHit function.
     */
    checkBottleHitEnemy() {
        world.level.enemies.forEach((enemy) => {
            if (!this.isBottleUsed && this.isColliding(enemy)) {
                this.isBottleUsed = true;

                if (enemy instanceof Endboss) {
                    this.handleEndbossHit(enemy);
                } else {
                    this.handleNormalEnemyHit(enemy);
                }
            }
        });
    }


    /**
     * Handles the hit on the endboss by a throwable object.
     * Makes the endboss take damage and updates the status bar.
     * If the endboss is killed, removes it from the level and shows the win screen.
     * @param {Endboss} enemy - The endboss that was hit.
     */
    handleEndbossHit(enemy) {
        enemy.hit();
        world.statusbarEndboss.setPercentage(enemy.energy);

        if (enemy.isDead()) {
            world.enemyIsDead(enemy);
            soundManager.audioDragonDead.play();
            if (enemy.clearTempCanvas) {
                enemy.clearTempCanvas();
                world.showWinScreen = true;
                world.winScreen.hideButton();
                // soundManager.toggleSounds();
            }
        }
    }


    /**
     * Handles the hit on a normal enemy by a throwable object.
     * This function marks the enemy as dead, updates its image to the death image,
     * and plays the spider death sound effect.
     * @param {MovableObject} enemy - The enemy object that has been hit.
     */
    handleNormalEnemyHit(enemy) {
        world.enemyIsDead(enemy);
        enemy.loadImage('./img/enemy/Spider/Spider_6.png');
        soundManager.audioSpiderDead.play();
    }
}