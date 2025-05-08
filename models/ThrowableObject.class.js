class ThrowableObject extends MovableObject {
    
    width = 50;
    height = 50;

    isBottleUsed = false;

    showWinScreen = false;

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
     * Handles the collision between a throwable object and the endboss.
     * Decreases the endboss's energy and updates the endboss status bar.
     * If the endboss is dead, it plays the dragon death sound, clears its temporary canvas,
     * shows the win screen, and stops sound effects.
     * @param {Endboss} enemy - The endboss to hit.
     */
    handleEndbossHit(enemy) {
        enemy.hit();
        world.statusbarEndboss.setPercentage(enemy.energy);

        if (enemy.isDead()) {
            world.enemyIsDead(enemy);
            soundManager.audioDragonDead.play();
            if (enemy.clearTempCanvas) {
                enemy.clearTempCanvas();
                setTimeout(() => {
                    world.showWinScreen = true;
                    world.winScreen.hideButton();
                    soundManager.toggleSounds(true);
                }, 1000);
            }
        }
    }


    /**
     * Handles the collision between a throwable object and a normal enemy.
     * Sets the enemy's energy to 0, plays the enemy's death animation, and
     * plays the spider death sound effect.
     * @param {Enemy} enemy - The normal enemy to hit.
     */
    handleNormalEnemyHit(enemy) {
        world.enemyIsDead(enemy);
        enemy.loadImage('./img/enemy/Spider/Spider_6.png');
        soundManager.audioSpiderDead.play();
        setTimeout(() => {
            world.makeEnemyFall(enemy);
        }, 1000);
    }
}