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
     * Checks for collisions between the throwable object and all enemies in the level.
     * If a collision is detected and the bottle is not already used, the collision is handled.
     * Marks the bottle as used and handles the hit differently based on whether the enemy is an Endboss or a normal enemy.
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
     * Handles the collision between a throwable object and a normal enemy.
     * Marks the enemy as dead, sets its energy to 0, plays the enemy's death animation,
     * and plays the spider death sound effect. After a delay, the enemy is made to fall.
     * @param {Enemy} enemy - The enemy to handle the hit for.
     */
    handleNormalEnemyHit(enemy) {
        enemy._isDead = true;   // hier setzen!
        enemy.energy = 0;
        enemy.loadImage('./img/enemy/Spider/Spider_6.png');
        soundManager.audioSpiderDead.play();

        setTimeout(() => {
            this.makeEnemyFall(enemy);
        }, 1000);
    }


    /**
     * Handles the collision between a throwable object and a normal enemy.
     * Sets the enemy's energy to 0, plays the enemy's death animation, and
     * plays the spider death sound effect.
     * @param {Enemy} enemy - The normal enemy to hit.
     */
    handleNormalEnemyHit(enemy) {
        this.enemyIsDead(enemy);
        enemy.loadImage('./img/enemy/Spider/Spider_6.png');
        soundManager.audioSpiderDead.play();
        setTimeout(() => {
            this.makeEnemyFall(enemy);
        }, 1000);
    }


    /**
     * Sets the energy of the given enemy to 0, effectively killing it.
     * @param {Enemy} enemy - The enemy to kill.
     */
    enemyIsDead(enemy) {
        enemy.energy = 0;
    };


    /**
     * Makes an enemy fall to the ground by setting its dead flag and gravity. 
     * The enemy's y position is checked and incremented by its gravity value 
     * at a rate of 60 times per second. Once the enemy has fallen a specified 
     * distance, it is removed from the level. If the enemy's y position is 
     * not a valid number, the interval is cleared.
     * @param {Enemy} enemy - The enemy to make fall.
     */
    makeEnemyFall(enemy) {
        enemy._isDead = true;
        enemy.gravity = 4;

        if (typeof enemy.y !== 'number' || isNaN(enemy.y)) {
            enemy.y = 0;
        }

        const startY = enemy.y;

        let fallInterval = setInterval(() => {
            if (typeof enemy.y !== 'number' || isNaN(enemy.y)) {
                clearInterval(fallInterval);
                return;
            }

            enemy.y += enemy.gravity;

            if (enemy.y > startY + 200) {
                clearInterval(fallInterval);
                this.removeEnemyFromLevel(enemy);
            }
        }, 1000 / 60);
    }


    /**
     * Removes the given enemy from the level.
     * Finds the index of the given enemy in the enemies array and
     * removes it from the array if it exists.
     * @param {Enemy} enemy - The enemy to remove from the level.
     */
    removeEnemyFromLevel(enemy) {
        const index = world.level.enemies.indexOf(enemy);
        if (index !== -1) {
            world.level.enemies.splice(index, 1);
        }
    }
}