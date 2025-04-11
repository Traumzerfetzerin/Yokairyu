class Endboss extends MovableObject {
    width = 500;
    height = 500;
    y = -20;
    energy = 100;

    IMAGES_WALK = [
        // './img/endboss/4_enemie_boss_chicken/2_alert/G5.png',
        // './img/endboss/4_enemie_boss_chicken/2_alert/G6.png',
        // './img/endboss/4_enemie_boss_chicken/2_alert/G7.png',
        // './img/endboss/4_enemie_boss_chicken/2_alert/G8.png',
        // './img/endboss/4_enemie_boss_chicken/2_alert/G9.png',
        // './img/endboss/4_enemie_boss_chicken/2_alert/G10.png',
        // './img/endboss/4_enemie_boss_chicken/2_alert/G11.png',
        // './img/endboss/4_enemie_boss_chicken/2_alert/G12.png'

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
        this.x = 2000;
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

    
    animateEndboss;


    /**
     * Starts the animation for the endboss.
     * This function is called in the constructor of the Endboss class.
     * It toggles the current head of the endboss between 1 and 2 every 500 milliseconds and
     * creates a combined image with the current head and the body of the endboss.
     * If the character is in range of the endboss (i.e. x > 1660 and x < 2000) and the
     * dragon roar sound has not been played yet, it plays the sound and sets the volume to 0.5.
     * @private
     */
    startAnimationEndboss() {
        let hasPlayedDragonRoar = false;

        this.animateEndboss = setInterval(() => {
            this.toggleHead();
            this.createCombinedImage();

            if (this.isCharacterInRange() && !hasPlayedDragonRoar) {
                soundManager.playSound('dragonRoar', false);
                hasPlayedDragonRoar = true;
            }
        }, 500);
    }


    /**
     * Checks if the character is in range of the endboss.
     * @return {boolean} true if the character is in range, false otherwise.
     */
    isCharacterInRange() {
        return world.character.x > 1660 && world.character.x < 2000;
    }


    /**
     * Toggles the current head of the endboss between 1 and 2.
     */
    toggleHead() {
        this.currentHead = this.currentHead === 1 ? 2 : 1;
    }


    tempCanvas = document.createElement('canvas');
    tempCtx = this.tempCanvas.getContext('2d');


    /**
     * Creates a combined image with the current head and the body of the endboss.
     * This function is called in the animateEndboss function every 500 milliseconds.
     * It creates a temporary canvas with the width and height of 2000.
     * It then draws the body of the endboss at the position (500, 400) and the wings at the position (600, 1100).
     * If the current head is 1, it draws the first head at the position (750, 50), otherwise it draws the second head at the same position.
     * It then draws the tail at the position (1350, 1110) and the legs at the position (1410, 265).
     * Finally, it sets the combined image as the img property of the endboss.
     */
    createCombinedImage() {
        this.tempCanvas.width = 2000;
        this.tempCanvas.height = 2000;

        this.tempCtx.drawImage(this.loadedImages[0], 500, 400);

        if (this.currentHead === 1) {
            this.tempCtx.drawImage(this.loadedImages[1], 750, 50);
        } else {
            this.tempCtx.drawImage(this.loadedImages[2], 750, 50);
        }

        this.tempCtx.drawImage(this.loadedImages[3], 600, 1100);
        this.tempCtx.drawImage(this.loadedImages[4], 300, 250);
        this.tempCtx.drawImage(this.loadedImages[5], 1350, 1110);
        this.tempCtx.drawImage(this.loadedImages[6], 1410, 265);

        this.img = this.tempCanvas;
    }


    // hitEndboss() {
    //     this.tempCtx.beginPath();
    //     this.tempCtx.fillStyle = "rgba(255, 0, 0, 0.5)";
    //     this.tempCtx.fillRect(2000, 100, 500, 500);
    //     this.tempCtx.stroke();
    // }


    /**
     * Clears the temporary canvas by calling clearInterval on the animateEndboss
     * interval and then clearing the canvas context with clearRect.
     */
    clearTempCanvas() {
        clearInterval(this.animateEndboss);
        this.tempCtx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
    }
}