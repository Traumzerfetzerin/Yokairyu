class Chicken extends MovableObject {

    constructor() {
        super().loadImage('../img/enemy/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500; // Zahl wischen 200 und 700
    }
}