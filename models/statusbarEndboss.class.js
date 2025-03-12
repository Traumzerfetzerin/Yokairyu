class StatusbarEndboss extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/green.png'
    ];



    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }
}