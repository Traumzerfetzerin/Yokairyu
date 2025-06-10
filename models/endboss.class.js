class Endboss extends MovableObject {
    width = 500;
    height = 500;
    y = -20;
    energy = 100;

    offset = {
        top: 100,
        left: 100,
        right: 100,
        bottom: 100
    }

    animateEndboss;
    hasPlayedDragonRoar = false;

    tempCanvas = document.createElement('canvas');
    tempCtx = this.tempCanvas.getContext('2d');

    IMAGES_WALK = [
        './img/endboss/Dragon/Body.png',
        './img/endboss/Dragon/Head_1.png',
        './img/endboss/Dragon/Head_2.png',
        './img/endboss/Dragon/Left_paw.png',
        './img/endboss/Dragon/Left_wing.png',
        './img/endboss/Dragon/Right_paw.png',
        './img/endboss/Dragon/Right_wing.png'
    ];


    /**
     * Initializes a new instance of the Endboss class.
     * Loads all images for the endboss and starts its animation.
     * The endboss is positioned at (2000, 100) by default.
     * The sound for the endboss's roar is also loaded.
     */
    constructor() {
        super();
        this.loadedImages = [];
        this.imagesLoaded = 0;
        this.currentHead = 1;
        this.x = 3000;
        this.y = 100;

        this.loadImages();
        this.startAnimationEndboss();
    }


    /**
     * Loads all images for the endboss by looping through the array
     * `this.IMAGES_WALK` and calling `this.loadImage()` for each image.
     * This function is called in the constructor of the Endboss class.
     */
    loadImages() {
        this.IMAGES_WALK.forEach((src, index) => {
            this.loadImage(src, index);
        });
    }


    /**
     * Loads a single image for the endboss.
     * @param {string} src URL of the image to load.
     * @param {number} index Index of the image in `this.IMAGES_WALK`.
     * @private
     */
    loadImage(src, index) {
        const img = new Image();
        img.onload = () => this.onImageLoaded(img, index);
        img.src = src;
    }


    /**
     * Called when a single image for the endboss has finished loading.
     * @param {HTMLImageElement} img The loaded image.
     * @param {number} index The index of the image in `this.IMAGES_WALK`.
     * @private
     */
    onImageLoaded(img, index) {
        this.loadedImages[index] = img;
        this.imagesLoaded++;

        if (this.imagesLoaded === this.IMAGES_WALK.length) {
            this.createCombinedImage();
        }
    }


    /**
     * Starts the animation of the endboss by creating an interval that calls `toggleHead`
     * and `createCombinedImage` every 500 milliseconds. If the character is within
     * range of the endboss and the dragon roar sound hasn't been played yet, it plays
     * the sound and sets a flag to not play it again.
     */
    startAnimationEndboss() {
        this.animateEndboss = setInterval(() => {
            this.toggleHead();
            this.createCombinedImage();

            if (this.isCharacterInRange() && !this.hasPlayedDragonRoar) {
                soundManager.audioDragonRoar.play();
                this.hasPlayedDragonRoar = true;
            }
        }, 500);
    }


    /**
     * Checks if the character is within a specified range of the Endboss.
     * The range is defined by the character's x position being greater than 2000 and less than 3000.
     * @return {boolean} True if the character is within range, false otherwise.
     */
    isCharacterInRange() {
        if (world?.character && world.character.x > 2000 && world.character.x < 3000) {
            return true;
        }
        return false;
    }


    /**
     * Toggles the current head of the endboss between 1 and 2.
     */
    toggleHead() {
        this.currentHead = this.currentHead === 1 ? 2 : 1;
    }


    /**
     * Creates a combined image for the endboss by drawing all its parts (body, head, left and right paws and wings) onto a temporary canvas.
     * The temporary canvas is then assigned to the `img` property of the Endboss object.
     * This function is called every 500 milliseconds by the `startAnimationEndboss` method.
     * @private
     */
    createCombinedImage() {
        this.prepareCanvas();
        this.drawAllParts();
        this.img = this.tempCanvas;
    }


    /**
     * Prepares the temporary canvas by setting its width and height to 2000.
     * This is necessary to ensure that the endboss's parts are drawn at the correct size.
     * @private
     */
    prepareCanvas() {
        this.tempCanvas.width = 2000;
        this.tempCanvas.height = 2000;
    }


    /**
     * Draws all the parts of the endboss onto the temporary canvas.
     * This method is called by the `createCombinedImage` method and is responsible for drawing
     * all the parts of the endboss (body, head, left and right paws and wings) onto the temporary
     * canvas. The order in which the parts are drawn is important, since the parts drawn later
     * will be drawn on top of the parts drawn earlier. The parts are drawn in the following order:
     * body, head, left paw, left wing, right paw, right wing.
     * @private
     */
    drawAllParts() {
        this.drawBody();
        this.drawHead();
        this.drawLeftPaw();
        this.drawLeftWing();
        this.drawRightPaw();
        this.drawRightWing();
    }


    /**
     * Draws an image onto the temporary canvas if it is a complete image.
     * @param {HTMLImageElement} img - The image to draw.
     * @param {number} x - The x position to draw the image at.
     * @param {number} y - The y position to draw the image at.
     * @private
     */
    drawSafe(img, x, y) {
        if (img instanceof HTMLImageElement && img.complete) {
            this.tempCtx.drawImage(img, x, y);
        }
    }


    /**
     * Draws the body of the endboss onto the temporary canvas at the position (500,400).
     * The body is drawn at index 0 of the `loadedImages` array.
     * @private
     */
    drawBody() {
        this.drawSafe(this.loadedImages[0], 500, 400);
    }


    /**
     * Draws the head of the endboss onto the temporary canvas at the position (750,50).
     * The head is drawn at either index 1 or 2 of the `loadedImages` array, depending on the
     * value of `this.currentHead`, which is toggled between 1 and 2 by the `toggleHead` method.
     * @private
     */
    drawHead() {
        const headIndex = this.currentHead === 1 ? 1 : 2;
        this.drawSafe(this.loadedImages[headIndex], 750, 50);
    }


    /**
     * Draws the left paw of the endboss onto the temporary canvas
     * at the position (600, 1100). The left paw is drawn using the
     * image at index 3 of the `loadedImages` array.
     * @private
     */
    drawLeftPaw() {
        this.drawSafe(this.loadedImages[3], 600, 1100);
    }


    /**
     * Draws the left wing of the endboss onto the temporary canvas
     * at the position (300, 250). The left wing is drawn using the
     * image at index 4 of the `loadedImages` array.
     * @private
     */
    drawLeftWing() {
        this.drawSafe(this.loadedImages[4], 300, 250);
    }


    /**
     * Draws the right paw of the endboss onto the temporary canvas
     * at the position (1350, 1110). The right paw is drawn using the
     * image at index 5 of the `loadedImages` array.
     * @private
     */
    drawRightPaw() {
        this.drawSafe(this.loadedImages[5], 1350, 1110);
    }


    /**
     * Draws the right wing of the endboss onto the temporary canvas
     * at the position (1410, 265). The right wing is drawn using the
     * image at index 6 of the `loadedImages` array.
     * @private
     */
    drawRightWing() {
        this.drawSafe(this.loadedImages[6], 1410, 265);
    }


    /**
     * Clears the temporary canvas by calling clearInterval on the animateEndboss
     * interval and then clearing the canvas context with clearRect.
     */
    clearTempCanvas() {
        clearInterval(this.animateEndboss);
        this.tempCtx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
    }
}