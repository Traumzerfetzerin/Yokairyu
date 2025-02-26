class Coins extends MovableObject {
    width = 80;
    height = 80;
    static positions = [];

    IMAGES = [
        './img/loot/shadow/19.png'
    ];

    constructor() {
        super().loadImage('./img/loot/shadow/19.png');
        this.loadImages(this.IMAGES);

        this.x = this.getNonOverlappingX(500, 2000, 90);
        this.y = 200 + Math.random() * 180;
    }

    getNonOverlappingX(min, max, spacing) {
        let x;
        let attempts = 100;
        do {
            x = min + Math.random() * (max - min);
            attempts--;
        } while (Coins.positions.some(pos => Math.abs(pos - x) < spacing) && attempts > 0);

        if (attempts > 0) {
            Coins.positions.push(x);
            return x;
        } else {
            return null;
        }
    }
}
