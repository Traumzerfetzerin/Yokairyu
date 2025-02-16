class Chicken extends MovableObject {

    width = 80;
    height = 80;
    y = 380;
    IMAGES_WALK = [
        './img/enemy/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/enemy/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/enemy/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('./img/enemy/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALK);

        this.x = 200 + Math.random() * 500; // Zahl wischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK)
        }, 100);

        this.moveLeft();
    }
}