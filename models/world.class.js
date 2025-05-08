class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarBottle = new StatusbarBottle();
    statusbarEndboss = new StatusbarEndboss();
    throwableObjects = [];
    gameOverScreen = new GameOverScreen();
    winScreen = new WinScreen();


    /**
     * Initializes a new instance of the World class.
     * Sets up the canvas, drawing context, and keyboard.
     * Calls the draw, setWorld, and run methods to start the game loop.
     * Loads sound effects for the spider's death, collecting coins, and shooting bottles.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     * @param {Keyboard} keyboard - The keyboard object to read input from.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.draw();
        this.setWorld();
        this.run();
        this.startBackgroundSound();
    }


    /**
     * Starts the background sound effect for the game.
     * 
     * Plays the background audio and sets its volume to 0.2.
     */
    startBackgroundSound() {
        soundManager.audioBackground.play();
        soundManager.audioBackground.volume = 0.2;
    }


    /**
     * Sets the world of the character to this World object.
     * This allows the character to access the World object's attributes and methods.
     */
    setWorld() {
        this.character.world = this;
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


    isUsed = false;

    /**
     * Checks if the character is colliding with an enemy and if the character is above only one enemy.
     * If the character is colliding with an enemy and is above only one enemy, the enemy is killed and the character jumps.
     * The enemy is then made to fall to the ground with the makeEnemyFall() method.
     */
    checkCharacterHitEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            if (!enemy.isUsed && this.character.isCharacterAboveEnemy(enemy) && this.isCharacterAboveOnlyOneEnemy(enemy)) {
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
        return this.level.enemies.filter(e => this.character.isCharacterAboveEnemy(e)).length === 1;
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
            if (this.character.isColliding(enemy)) {
                this.enemyIsDead(enemy);
                this.playEnemyDeathAnimation(enemy);
                this.character.jump();
                window.clearInterval(collidingInterval);

                setTimeout(() => {
                    this.makeEnemyFall(enemy, index);
                }, 1000);
            }
        }, 1000 / 60);

        setTimeout(() => {
            window.clearInterval(collidingInterval);
        }, 2000);
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
    makeEnemyFall(enemy, index) {
        enemy.dead = true;
        enemy.gravity = 2;

        let fallInterval = setInterval(() => {
            enemy.y += enemy.gravity;
            if (enemy.y > canvas.height) {
                clearInterval(fallInterval);
                this.removeEnemyFromLevel(index);
            }
        }, 1000 / 60);
    }


    /**
     * Removes the enemy at the given index from the level.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    removeEnemyFromLevel(index) {
        this.level.enemies.splice(index, 1);
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
        if (this.keyboard.THROW) {

            if (this.character.bottlesCollected > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y)
                this.throwableObjects.push(bottle);
                this.character.bottlesCollected--;

                let collectedBottles = this.character.bottlesCollected;
                let percentBottles = (collectedBottles / this.level.totalBottles) * 100;
                this.statusbarBottle.setPercentage(percentBottles);
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
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && this.character.isColliding(enemy) && !this.character.isCharacterAboveEnemy(enemy)) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
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
        this.level.coins.forEach((coin, c) => {
            if (this.character.isColliding(coin)) {
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
            this.character.collectCoin();
            this.level.coins.splice(index, 1);

            let collectedCoins = this.character.coinsCollected;
            let percentCoins = (collectedCoins / this.level.totalCoins) * 100;
            this.statusbarCoins.setPercentage(percentCoins);
        }
    }


    /**
     * Checks for collisions between the character and all bottles in the level.
     * If a collision is detected with a bottle, the character collects the bottle by calling the handleBottleCollision function,
     * which increments the character's bottle count and updates the bottle status bar to reflect the new number of bottles collected.
     * The sound effect for collecting shoot is also played.
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, b) => {
            if (this.character.isColliding(bottle)) {
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
            this.character.collectBottle();
            this.level.bottles.splice(index, 1);

            let collectedBottles = this.character.bottlesCollected;
            let percentBottles = (collectedBottles / this.level.totalBottles) * 100;
            this.statusbarBottle.setPercentage(percentBottles);
        }
    }


    /**
     * Draws the game world on the canvas by first checking if the character
     * is dead or if the win screen should be displayed. If neither condition
     * is met, it clears the canvas, sets the camera translation, and draws
     * background objects, the character, dynamic objects, and fixed objects
     * in the correct order. Finally, it requests the next animation frame
     * to continue the game loop.
     */
    draw() {
        if (this.character.isDead()) {
            return;
        }
        if (this.showWinScreen) {
            this.winScreen.drawWinScreen(this.ctx);
            return;
        }
        this.clearCanvas();
        this.translateCamera();
        this.drawBackgroundObjects();
        this.resetCameraTranslation();
        this.translateCamera();
        this.drawCharacter();
        this.drawDynamicObjects();
        this.resetCameraTranslation();
        this.drawFixedObjects();
        this.translateCamera();
        this.resetCameraTranslation();
        this.requestNextFrame();
    }


    // clearAllIntervalls() {
    //     for (let i = 1; i < 9999; i++) {
    //         window.clearInterval(i);
    //     }
    // }


    /**
     * Clears the canvas by filling it with a transparent color.
     * This is necessary to remove any previously drawn objects from the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * Translates the canvas context horizontally by the current camera position.
     * This allows the camera to follow the character by moving the view window
     * across the game world.
     */
    translateCamera() {
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * Resets the canvas translation by translating the canvas context by the negative
     * of the current camera position. This is necessary to reset the camera's position
     * after drawing the character, dynamic objects, and status bars.
     */
    resetCameraTranslation() {
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Draws all the background objects in the current level.
     * @private
     */
    drawBackgroundObjects() {
        this.addObjectToMap(this.level.backgroundObjects);
    }


    /**
     * Draws all the fixed objects in the game, which are the health status bar, coin status bar, and bottle status bar.
     * These objects are drawn in the same position on the screen regardless of the character's position.
     * @private
     */
    drawFixedObjects() {
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarEndboss);
    }


    /**
     * Draws the character at its current position on the game world.
     * This is called after the camera translation is set and before it is reset.
     * @private
     */
    drawCharacter() {
        this.addToMap(this.character);
    }


    /**
     * Draws all the dynamic objects in the game, which are the enemies, clouds, coins, bottles, and throwable objects.
     * These objects are drawn at their current positions on the game world.
     * @private
     */
    drawDynamicObjects() {
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.throwableObjects);
    }


    // requestNextFrame() {
    //     let self = this;
    //     requestAnimationFrame(function () {
    //         self.draw();
    //     });
    // }

    animationId = null;


    /**
     * Requests the next animation frame by calling requestAnimationFrame.
     * This method is used to implement the game loop by continuously
     * calling the draw() method to update and render the game world.
     * @private
     */
    requestNextFrame() {
        this.animationId = requestAnimationFrame(() => this.draw());
    }


    /**
     * Stops the game loop by canceling the current animation frame request.
     * This method is used to pause the game when the character is dead or
     * the win screen should be displayed.
     * @private
     */
    stopGameLoop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }


    /**
     * Adds an array of drawable objects to the map, which will be drawn
     * when the draw() method is called. This is a convenience method
     * that calls addToMap() for each object in the array.
     * @param {DrawableObject[]} objects - An array of drawable objects to add to the map.
     */
    addObjectToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
     * Adds a single drawable object to the map. If the object is facing the opposite direction,
     * it temporarily flips the image to draw it correctly, then flips it back. The object is drawn
     * onto the canvas and, if applicable, its frame is drawn as well.
     * 
     * @param {DrawableObject} mo - The drawable object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Temporarily flips the image of a drawable object to draw it facing the opposite
     * direction. This is done by saving the current state of the canvas context,
     * translating it to the right edge of the image, scaling it horizontally by -1,
     * and then negating the object's x coordinate. This effectively flips the image
     * so that it appears to be facing the opposite direction.
     * @param {DrawableObject} mo - The drawable object whose image to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Restores the original orientation of the drawable object after being flipped.
     * This is done by negating the object's x coordinate again and restoring the
     * previous state of the canvas context, which was saved before flipping.
     * 
     * @param {DrawableObject} mo - The drawable object whose image to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}