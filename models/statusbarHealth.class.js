class StatusbarHealth extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png', // 0
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png' // 5
    ];

    percentage = 100;


    /**
     * Initializes a new instance of the StatusbarHealth class.
     * Loads the initial health bar image and sets its initial position and dimensions.
     * Sets the initial health percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    // setPercentage(50);

    /**
     * Sets the percentage of the health bar and updates the image to the corresponding frame in the IMAGES array.
     * The percentage should be a number between 0 and 5, inclusive.
     * The image is selected based on the resolveImageIndex method, which calculates the index
     * of the image to display based on the percentage property.
     * @param {number} percentage - The percentage to set, ranging from 0 to 5.
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Calculates the index of the image to display based on the `percentage` property.
     * The index is determined by the following rules:
     * - 100%: 5
     * - 80% - 99%: 4
     * - 60% - 79%: 3
     * - 40% - 59%: 2
     * - 20% - 39%: 1
     * - 0% - 19%: 0
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}