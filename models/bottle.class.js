class Bottles extends MovableObject {
    width = 80;
    height = 80;
    y = 380;
    x = 0;
    static positions = [];

    IMAGES = [
        './img/shoot/shadow/44.png'
    ]


    constructor() {
        super().loadImage('./img/shoot/shadow/44.png');
        this.loadImages(this.IMAGES);

        this.x = this.getNonOverlappingX(500, 2000, 90);

        this.type = 'bottle';
    }


    getNonOverlappingX(min, max, spacing) {
        let x;
        let attempts = 100;
        do {
            x = min + Math.random() * (max - min);
            attempts--;
        } while (Bottles.positions.some(pos => Math.abs(pos - x) < spacing) && attempts > 0);

        if (attempts > 0) {
            Bottles.positions.push(x);
            return x;
        } else {
            return null;
        }
    }
}