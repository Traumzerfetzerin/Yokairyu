class StatusbarCoins extends DrawableObject {
    IMAGES = [
        // './img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        // './img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        // './img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        // './img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        // './img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        // './img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',


        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/statusbarLoot_0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/statusbarLoot_20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/statusbarLoot_40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/statusbarLoot_60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/statusbarLoot_80.png',
        '/img/7_statusbars/1_statusbar/1_statusbar_coin/green/statusbarLoot_100.png'
    ];


    /**
     * Initializes a new instance of the StatusbarCoins class.
     * Loads images for the status bar and sets its initial position
     * and dimensions. The percentage is initially set to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }
}