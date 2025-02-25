class Bottles extends MovableObject {
    width = 80;
    height = 80;
    y = 400;
    x = 0;

    IMAGES = [
        './img/shoot/shadow/44.png'
    ]

    constructor() {
        super().loadImage('./img/shoot/shadow/44.png');
        this.loadImages(this.IMAGES);

        this.x = 200 + Math.random() * 500; // Zahl wischen 200 und 700

    }
}