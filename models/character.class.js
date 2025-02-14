class Character extends MovableObject {

    width = 150;
    height = 150;
    y = 300;
    x = 0;
    IMAGES_WALK = [
        '../img/player/Kitsune/walk/remove/Walk_1-removebg-preview.png',
        '../img/player/Kitsune/walk/remove/Walk_2-removebg-preview.png',
        '../img/player/Kitsune/walk/remove/Walk_3-removebg-preview.png',
        '../img/player/Kitsune/walk/remove/Walk_4-removebg-preview.png',
        '../img/player/Kitsune/walk/remove/Walk_5-removebg-preview.png',
        '../img/player/Kitsune/walk/remove/Walk_6-removebg-preview.png',
        '../img/player/Kitsune/walk/remove/Walk_7-removebg-preview.png',
        '../img/player/Kitsune/walk/remove/Walk_8-removebg-preview.png',
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('../img/player/Kitsune/walk/remove/Walk_1-removebg-preview.png');

        this.loadImages(this.IMAGES_WALK);

        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALK.length; // let i = 7 % 6; => 1, Rest 1
            // i = 0, 1, 2, 3, 4, 5, 6, 0
            let path = this.IMAGES_WALK[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);

    }


    jump() {

    }
}