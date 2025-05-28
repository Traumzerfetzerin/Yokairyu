class StatusbarBottle extends DrawableObject {
    IMAGES = [
        // './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        // './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        // './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        // './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        // './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        // './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',

        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/statusbarBottle_0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/statusbarBottle_20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/statusbarBottle_40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/statusbarBottle_60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/statusbarBottle_80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/statusbarBottle_100.png'
    ]


    /**
     * Initializes a new instance of the StatusbarBottle class.
     * Loads images for the status bar and sets its initial position
     * and dimensions. The percentage is initially set to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 400;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0)
    }
}