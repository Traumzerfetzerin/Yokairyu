class Coins extends MovableObject {
    width = 80;
    height = 80;
    y = 380;

    IMAGES = [
        './img/loot/shadow/19.png'
    ]

    constructor() {
        super().loadImage('./img/loot/shadow/19.png');
        this.loadImages(this.IMAGES);

        this.x = 200 + Math.random() * 500; // Zahl wischen 200 und 700
        this.y = Math.random() * (300 - this.height - 30) - 30;
    }
}

