class Collissions {
    /**
     * Creates a new Collissions object.
     * 
     * @param {World} world - The world object to check for collisions in.
     * @param {SoundManager} soundManager - The sound manager to play sound effects with.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw the game on.
     */
    constructor(world, soundManager, canvas) {
        this.world = world;
        this.soundManager = soundManager;
        this.canvas = canvas;
    }


    /**
       * Checks if the character is colliding with an enemy and if the character is above only one enemy.
       * If the character is colliding with an enemy and is above only one enemy, the enemy is killed and the character jumps.
       * The enemy is then made to fall to the ground with the makeEnemyFall() method.
       */
    checkCharacterHitEnemy() {
        world.level.enemies.forEach((enemy, index) => {
            if (!enemy.isUsed && world.character.isCharacterAboveEnemy(enemy) && this.isCharacterAboveOnlyOneEnemy(enemy)) {
                enemy.isUsed = true;
                this.handleEnemyCollision(enemy, index);
            }
        });
    }


    /**
     * Checks if the character is above only one enemy.
     * @returns {boolean} true if the character is above only one enemy, false otherwise.
     */
    isCharacterAboveOnlyOneEnemy(enemy) {
        return world.level.enemies.filter(e => world.character.isCharacterAboveEnemy(e)).length === 1;
    }


    /**
    * Handles the collision between the character and an enemy.
    * This function checks if the character is colliding with the enemy at a fixed interval
    * of 200 milliseconds. If a collision is detected, the enemy is killed and the character
    * jumps. The enemy is then made to fall to the ground with the makeEnemyFall() method.
    * The interval is cleared after 2000 milliseconds.
    * @param {Enemy} enemy - The enemy to handle the collision for.
    * @param {number} index - The index of the enemy in the enemies array.
    */
    handleEnemyCollision(enemy, index) {
        let collidingInterval = setInterval(() => {
            if (world.character.isColliding(enemy)) {
                this.enemyIsDead(enemy);
                this.playEnemyDeathAnimation(enemy);
                world.character.jump();
                window.clearInterval(collidingInterval);

                setTimeout(() => {
                    this.makeEnemyFall(enemy, enemy.enemyName);
                }, 1000);
            }
        }, 1000 / 60);

        setTimeout(() => {
            window.clearInterval(collidingInterval);
        }, 2000);
    }


    /**
     * Begins the main game loop, periodically checking for collisions
     * and handling throwable objects. This function runs at a fixed 
     * interval of 200 milliseconds, ensuring continuous gameplay updates.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }


    /**
     * Plays the death animation and sound effect for an enemy.
     * This function loads the death image for the enemy and plays the death sound effect.
     * The volume of the sound effect is set to 0.2.
     * @param {Enemy} enemy - The enemy to play the death animation and sound for.
     */
    playEnemyDeathAnimation(enemy) {
        enemy.loadImage('./img/enemy/Spider/Spider_6.png');
        soundManager.audioSpiderDead.play();
        soundManager.audioSpiderDead.volume = 0.2;
    }


    /**
     * Makes an enemy fall to the ground after being killed.
     * This function sets the enemy's dead flag to true and its gravity to 2.
     * It then starts an interval that increases the enemy's y position by its gravity
     * at a rate of 60 times per second. If the enemy's y position exceeds the canvas
     * height, the interval is cleared and the enemy is removed from the level.
     * @param {Enemy} enemy - The enemy to make fall.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    makeEnemyFall(enemy, enemyName) {
        enemy.dead = true;
        enemy.gravity = 2;

        let fallInterval = setInterval(() => {
            enemy.y += enemy.gravity;
            if (enemy.y > canvas.height) {

                const user = world.level.enemies.findIndex(u => u.enemyName === enemyName);

                clearInterval(fallInterval);
                this.removeEnemyFromLevel(user);
            }
        }, 1000 / 60);
    }


    /**
     * Removes the enemy at the given index from the level.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    removeEnemyFromLevel(index) {
        world.level.enemies.splice(index, 1);
    }


    /**
     * Sets the energy of the given enemy to 0, effectively killing it.
     * @param {Enemy} enemy - The enemy to kill.
     */
    enemyIsDead(enemy) {
        enemy.energy = 0;
    };


    /**
     * Checks if the throw key is pressed and if the character has collected bottles.
     * If both conditions are met, a new ThrowableObject is created at the character's position,
     * the character's bottle count is decremented, and the bottle statusbar is updated.
     * If the character has no bottles, nothing is done.
     */
    checkThrowObjects() {
        if (world.keyboard.THROW) {

            if (world.character.bottlesCollected > 0) {
                let bottle = new ThrowableObject(world.character.x + 100, world.character.y)
                world.throwableObjects.push(bottle);
                world.character.bottlesCollected--;

                let collectedBottles = world.character.bottlesCollected;
                let percentBottles = (collectedBottles / world.level.totalBottles) * 100;
                world.statusbarBottle.setPercentage(percentBottles);
            }
        }
    }


    /**
     * Checks for collisions between the character and various objects in the level,
     * including enemies, coins, and bottles. If a collision is detected with an enemy,
     * the character's health is affected. If a collision is detected with a coin or bottle,
     * the character collects the item and updates the corresponding status bar.
     */
    checkCollisions() {
        this.checkCharacterHitEnemy();
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkBottleCollisions();
    }


    /**
     * Checks for collisions between the character and all enemies in the level.
     * If a collision is detected with an enemy and the character is not above the enemy,
     * the character's health is affected. The character's health status bar is updated
     * to reflect the new health value.
     */
    checkEnemyCollisions() {
        world.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && world.character.isColliding(enemy) && !world.character.isCharacterAboveEnemy(enemy)) {
                world.character.hit();
                world.statusbarHealth.setPercentage(world.character.energy);
            }
        });
    }


    /**
     * Checks for collisions between the character and all coins in the level.
     * If a collision is detected with a coin, the character collects the coin by calling the handleCoinCollision function,
     * which increments the character's coin count and updates the coin status bar to reflect the new number of coins collected.
     * The sound effect for collecting loot is also played.
     */
    checkCoinCollisions() {
        world.level.coins.forEach((coin, c) => {
            if (world.character.isColliding(coin)) {
                this.handleCoinCollision(coin, c);
                soundManager.audioCollectLoot.play();
                soundManager.audioCollectLoot.volume = 0.2;
            }
        });
    }


    /**
     * Handles the collision between the character and a coin by making the character collect the coin,
     * removing the coin from the level, and updating the coin status bar to reflect the new number of coins collected.
     * @param {Coin} coin - The coin that was collided with.
     * @param {number} index - The index of the coin in the level's coins array.
     */
    handleCoinCollision(coin, index) {
        if (coin.type === 'coin') {
            world.character.collectCoin();
            world.level.coins.splice(index, 1);

            let collectedCoins = world.character.coinsCollected;
            let percentCoins = (collectedCoins / world.level.totalCoins) * 100;
            world.statusbarCoins.setPercentage(percentCoins);
        }
    }


    /**
     * Checks for collisions between the character and all bottles in the level.
     * If a collision is detected with a bottle, the character collects the bottle by calling the handleBottleCollision function,
     * which increments the character's bottle count and updates the bottle status bar to reflect the new number of bottles collected.
     * The sound effect for collecting shoot is also played.
     */
    checkBottleCollisions() {
        world.level.bottles.forEach((bottle, b) => {
            if (world.character.isColliding(bottle)) {
                this.handleBottleCollision(bottle, b);
                soundManager.audioCollectShoot.play();
                soundManager.audioCollectShoot.volume = 0.2;

                setTimeout(() => {
                    soundManager.audioCollectShoot.pause();
                    soundManager.audioCollectShoot.currentTime = 0;
                }, 550);
            }
        });
    }


    /**
     * Handles the collision between the character and a bottle by making the character collect the bottle,
     * removing the bottle from the level, and updating the bottle status bar to reflect the new number of bottles collected.
     * @param {Bottle} bottle - The bottle that was collided with.
     * @param {number} index - The index of the bottle in the level's bottles array.
     */
    handleBottleCollision(bottle, index) {
        if (bottle.type === 'bottle') {
            world.character.collectBottle();
            world.level.bottles.splice(index, 1);

            let collectedBottles = world.character.bottlesCollected;
            let percentBottles = (collectedBottles / world.level.totalBottles) * 100;
            world.statusbarBottle.setPercentage(percentBottles);
        }
    }
}