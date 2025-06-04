class StatusbarEndboss extends DrawableObject {
    percentage = 100;

    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/statusBarEndbooss_0.png',
        './img/7_statusbars/2_statusbar_endboss/statusBarEndbooss_20.png',
        './img/7_statusbars/2_statusbar_endboss/statusBarEndbooss_40.png',
        './img/7_statusbars/2_statusbar_endboss/statusBarEndbooss_60.png',
        './img/7_statusbars/2_statusbar_endboss/statusBarEndbooss_80.png',
        './img/7_statusbars/2_statusbar_endboss/statusBarEndbooss_100.png',
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
        this.y = 60;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    /**
     * Sets the percentage of the endboss's status bar and updates the image to the corresponding frame in the IMAGES array.
     * The percentage should be a number between 0 and 5, inclusive.
     * The image is selected based on the resolveImageIndex method, which calculates the index
     * of the image to display based on the percentage property.
     * @param {number} percentage - The percentage to set, ranging from 0 to 5.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
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