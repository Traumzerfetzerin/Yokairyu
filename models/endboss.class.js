class Endboss extends MovableObject {

    width = 500;
    height = 500;
    y = -20;

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


    constructor() {
        super();
        this.loadedImages = [];
        this.imagesLoaded = 0;

        this.currentHead = 1;

        this.IMAGES_WALK.forEach((src, index) => {
            const img = new Image();
            img.onload = () => {
                this.loadedImages[index] = img;
                this.imagesLoaded++;
                if (this.imagesLoaded === this.IMAGES_WALK.length) {
                    this.createCombinedImage();
                }
            };
            img.src = src;
        });

        this.x = 2000;
        this.y = 100;

        setInterval(() => {
            this.currentHead = (this.currentHead === 1) ? 2 : 1;
            this.createCombinedImage();
        }, 500);
    }


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