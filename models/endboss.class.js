class Endboss extends MovableObject {
    width = 500;
    height = 500;
    y = -20;

    audioDragonRoar = new Audio('./audio/DragonRoar.mp3');

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


    startAnimationEndboss() {
        setInterval(() => {
            this.toggleHead();
            this.createCombinedImage();

            if (this.isCharacterInRange()) {
                this.audioDragonRoar.play();
                this.audioDragonRoar.volume = 0.5;
            }
        }, 500);
    }


    isCharacterInRange() {
        // Hier prüfst du, ob der Charakter nahe genug an dem Drachen ist.
        // Zum Beispiel, wenn der Charakter X-Koordinate zwischen 1900 und 2100 hat:
        // return this.world.character.x > 1900 && this.world.character.x < 2100;
    }


    /**
     * Toggles the current head of the endboss between 1 and 2.
     */
    toggleHead() {
        this.currentHead = this.currentHead === 1 ? 2 : 1;
    }


    /**
     * Creates a combined image of the endboss by drawing the body and 
     * its components (e.g., head, paws, wings) onto a temporary canvas.
     * The body is drawn at a fixed position, while the head toggles 
     * between two images based on the current state. Other components 
     * are drawn at their respective positions. The resulting image is 
     * stored in this.img for rendering.
     */
    createCombinedImage() {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        tempCanvas.width = 2000;
        tempCanvas.height = 2000;

        tempCtx.drawImage(this.loadedImages[0], 500, 400);

        if (this.currentHead === 1) {
            tempCtx.drawImage(this.loadedImages[1], 750, 50);
        } else {
            tempCtx.drawImage(this.loadedImages[2], 750, 50);
        }

        tempCtx.drawImage(this.loadedImages[3], 600, 1100);
        tempCtx.drawImage(this.loadedImages[4], 300, 250);
        tempCtx.drawImage(this.loadedImages[5], 1350, 1110);
        tempCtx.drawImage(this.loadedImages[6], 1410, 265);

        this.img = tempCanvas;
    }
}