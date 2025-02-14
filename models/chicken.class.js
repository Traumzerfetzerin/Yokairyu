class Chicken extends MovableObject {

    width = 80;
    height = 80;
    y = 380;
    IMAGES_WALK = [
        '../img/enemy/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/enemy/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/enemy/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('../img/enemy/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALK);

        this.x = 200 + Math.random() * 500; // Zahl wischen 200 und 700
        this.animate();
        this.animateWalk();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.2;
        }, 1000 / 60);
    }

    animateWalk() { // Chicken
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALK.length; // let i = 7 % 6; => 1, Rest 1
            // i = 0, 1, 2, 3, 4, 5, 6, 0
            let path = this.IMAGES_WALK[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }
}