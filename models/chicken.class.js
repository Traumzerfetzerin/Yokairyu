class Chicken extends MovableObject {

    width = 80;
    height = 80;
    y = 380;

    constructor() {
        super().loadImage('../img/enemy/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500; // Zahl wischen 200 und 700
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.2;
        }, 1000 / 60);
    }
}