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
    throwableObjects = [];
    gameOverScreen = new GameOverScreen();
    
    audioCollectLoot = new Audio('./audio/collectShoot.mp3');


    /**
     * Initializes the World object with the given canvas and keyboard.
     * Sets up the context and canvas attributes, and calls the draw() and setWorld() methods.
     * @param {HTMLCanvasElement} canvas - The canvas to draw on.
     * @param {Keyboard} keyboard - The keyboard object to handle user input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * Sets the world of the character to this World object.
     * This allows the character to access the World object's attributes and methods.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Runs the game loop by checking for collisions and throw objects at an interval of 200ms.
     * This method is called once when the World object is constructed, and sets up the game loop.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }


    /**
     * Checks for collisions between the character and any bottles that are currently 
     * in the level. If a collision is detected, the character collects the bottle and
     * the bottle is removed from the level.
     */
    checkCollisionsBottles() {

    }


    /**
     * Checks if the character is throwing and if they have any bottles to throw.
     * If both conditions are true, a new ThrowableObject is created at the character's
     * current position and added to the array of throwable objects, and the character's
     * bottle count is decremented by 1.
     */
    checkThrowObjects() {
        if (this.keyboard.THROW) {

            if (this.character.bottlesCollected > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y)
                this.throwableObjects.push(bottle);
                this.character.bottlesCollected--;
            }
        }
    }


    /**
     * Checks for collisions between the character and various objects in the level.
     * This function checks for enemy, coin, and bottle collisions by calling the 
     * respective collision handling functions.
     */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkBottleCollisions();
    }


    /**
     * Checks for collisions between the character and all enemies in the level.
     * If a collision is detected, the character's hit function is called, and
     * the health status bar is updated to reflect the character's new energy.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * Checks for collisions between the character and all coins in the level.
     * If a collision is detected, the character collects the coin by calling the
     * handleCoinCollision function, which increments the character's coin count and
     * updates the health status bar to reflect the new coin count.
     */
    checkCoinCollisions() {
        this.level.coins.forEach((coin, c) => {
            if (this.character.isColliding(coin)) {
                this.handleCoinCollision(coin, c);
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
     * If a collision is detected, the character collects the bottle by calling the
     * handleBottleCollision function, which increments the character's bottle count
     * and updates the bottle status bar to reflect the new number of bottles collected.
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, b) => {
            if (this.character.isColliding(bottle)) {
                this.handleBottleCollision(bottle, b);
                this.audioCollectLoot.play();
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
     * Clears the canvas, translates the canvas to the character's position, draws the background objects,
     * resets the canvas translation, draws the fixed objects, translates the canvas again, draws the character,
     * draws the dynamic objects, resets the canvas translation again, and requests the next frame.
     */
    draw() {
        this.clearCanvas();
        this.translateCamera();

        this.drawBackgroundObjects();
        this.resetCameraTranslation();

        this.drawFixedObjects();
        this.translateCamera();

        this.drawCharacter();
        this.drawDynamicObjects();
        this.resetCameraTranslation();

        this.requestNextFrame();
    }


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


    /**
     * Requests the next frame by scheduling the draw() method to be called as soon as
     * possible. This is used to create an animation loop by continuously calling
     * requestAnimationFrame() with the draw() method as the callback.
     * @private
     */
    requestNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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