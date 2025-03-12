class StatusbarEndboss extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/0.png',
        './img/7_statusbars/2_statusbar_endboss/20.png',
        './img/7_statusbars/2_statusbar_endboss/40.png',
        './img/7_statusbars/2_statusbar_endboss/60.png',
        './img/7_statusbars/2_statusbar_endboss/80.png',
        './img/7_statusbars/2_statusbar_endboss/blue.png',
    ];


    /**
     * Initializes a new instance of the StatusbarEndboss class.
     * Loads images for the status bar and sets its initial position
     * and dimensions. The percentage is initially set to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }
}