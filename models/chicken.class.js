class Chicken extends MovableObject {
    width = 80;
    height = 80;
    y = 380;
    IMAGES_WALK = [
        // './img/enemy/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        // './img/enemy/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        // './img/enemy/3_enemies_chicken/chicken_normal/1_walk/3_w.png',


        './img/enemy/Spider/Spider_1.png',
        './img/enemy/Spider/Spider_2.png',
        './img/enemy/Spider/Spider_3.png',
        './img/enemy/Spider/Spider_4.png',
        './img/enemy/Spider/Spider_5.png',
        './img/enemy/Spider/Spider_6.png',
        './img/enemy/Spider/Spider_7.png',
        './img/enemy/Spider/Spider_8.png',
        './img/enemy/Spider/Spider_9.png',
        './img/enemy/Spider/Spider_10.png',
        './img/enemy/Spider/Spider_11.png',
        './img/enemy/Spider/Spider_12.png',
    ];

    
    constructor() {
        super().loadImage('./img/enemy/Spider/Spider_1.png');
        this.loadImages(this.IMAGES_WALK);

        this.x = 200 + Math.random() * 500; // Zahl wischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK)
        }, 100);

        this.moveLeft();
    }
}