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
     * Validates if the draw loop should continue.
     * 
     * Checks if the World object's id matches the currently active World object's id.
     * If not, it cancels the current animation frame and returns false.
     * It also checks if the character is dead or if the character attribute is null.
     * If either condition is true, it cancels the current animation frame and returns false.
     * If the conditions are not met, it returns true, indicating that the draw loop should continue.
     * @return {boolean} - True if the draw loop should continue, false otherwise.
     */
    validateDraw() {
        if (this.worldId !== window.activeWorldId) {
            cancelAnimationFrame(this.animationId);
            return false;
        }

        if (!this.character || this.character.isDead()) {
            cancelAnimationFrame(this.animationId);
            return false;
        }

        return true;
    }


    /**
     * Renders the game scene by drawing the background objects, character, dynamic objects, and fixed objects.
     * The canvas is cleared first, then the camera is translated to the character's position.
     * The background objects are drawn, followed by the character and dynamic objects.
     * The camera translation is then reset, and the fixed objects are drawn.
     * Finally, the camera translation is reset again to its original position.
     */
    renderScene() {
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
    }


    /**
     * Draws the game scene by calling the renderScene() method and then
     * requesting the next frame by calling the requestNextFrame() method.
     * If the draw loop should not continue (i.e. the game is over or the active
     * World object has changed), the draw() method simply returns and does not
     * draw the scene or request the next frame.
     */
    draw() {
        if (!this.validateDraw()) return;

        this.renderScene();
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
     * Draws all dynamic objects in the game world.
     * 
     * This includes enemies, clouds, coins, bottles, and throwable objects.
     * Each enemy is checked to see if it is an instance of Endboss; if so,
     * the enemy is updated based on the character's position.
     * The objects are added to the map for rendering by calling addObjectToMap().
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
     * Requests the next frame of the game by calling requestAnimationFrame.
     * The requestAnimationFrame function calls the draw() method of the World
     * object, which in turn calls the renderScene() method to render the game.
     */
    requestNextFrame() {
        this.animationId = requestAnimationFrame(() => this.draw());
    }


    /**
     * Stops the game loop by canceling the current animation frame and clearing all intervals.
     * This method is called when the character is dead, or when the game is paused or stopped.
     * @private
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