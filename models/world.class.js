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
    collissions = new Collissions();

    isUsed = false;
    animationId = null;
    gameRunning = false;


    /**
     * Creates a new World object.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element to draw the game on.
     * @param {Keyboard} keyboard - The Keyboard object to handle user input.
     * 
     * Sets the World object's id to the current timestamp and assigns it to the window.activeWorldId attribute.
     * Sets the canvas and keyboard attributes to the passed in values.
     * Calls the setWorld(), collissions.run(), and startBackgroundSound() methods to initialize the game.
     */
    constructor(canvas, keyboard) {

        this.worldId = Date.now();
        window.activeWorldId = this.worldId;

        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.setWorld();
        this.collissions.run();
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
     * The main game loop function.
     * 
     * This function is called recursively using the requestAnimationFrame method.
     * It is responsible for clearing the canvas, drawing the background objects, translating the camera to the character's position,
     * drawing the character, drawing the dynamic objects, resetting the camera translation, drawing the fixed objects, and requesting the next frame.
     * If the character is dead or the worldId does not match the activeWorldId, the game loop is cancelled.
     * @private
     */
    draw() {

        if (this.worldId !== window.activeWorldId) {
            cancelAnimationFrame(this.animationId);
            return;
        }

        if (!this.character) {
            cancelAnimationFrame(this.animationId);
            return;
        }

        if (this.character.isDead()) {
            cancelAnimationFrame(this.animationId);
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


    /**
     * Starts the game loop by calling the draw() method.
     * The draw() method is responsible for clearing the canvas, drawing the background objects, translating the camera to the character's position,
     * drawing the character, drawing the dynamic objects, resetting the camera translation, drawing the fixed objects, and requesting the next frame.
     * @todo This function could be private, but it is currently called by the `startGame` function in the game.js file.
     */
    startGameLoop() {
        this.draw();
    }


    /**
     * Clears all intervals in the range of 1 to 9998, which are 
     * all the intervals set by the game. This is necessary to 
     * stop the game from running when the game is over.
     * @todo This is a temporary solution until we figure out how to keep track of the intervals.
     */
    clearAllInterval() {
        for (let i = 1; i < 9999; i++) {
            window.clearInterval(i);
        }
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
     * The enemies are updated before being drawn, and the endboss is updated in addition to the other enemies.
     * @private
     */
    drawDynamicObjects() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.update(this.character);
            }
        });
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.throwableObjects);
    }


    /**
     * Requests the next frame of the game loop using the requestAnimationFrame method.
     * This method is used to ensure smooth animations and to save resources by only drawing
     * the game world when necessary.
     * @private
     */
    requestNextFrame() {
        this.animationId = requestAnimationFrame(() => this.draw());
    }


    /**
     * Stops the game loop and clears all intervals set by the game.
     * This is called when the game is over and we want to stop the game from running.
     * It cancels the current animation frame and sets the gameRunning flag to false.
     * It also clears all intervals in the range of 1 to 9998, which are all the intervals
     * set by the game. This is necessary to stop the game from running when the game is over.
     * @todo This is a temporary solution until we figure out how to keep track of the intervals.
     */
    stopGameLoop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.gameRunning = false;
        this.clearAllInterval();
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

        // mo.drawFrame(this.ctx);

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