class Cloud extends MovableObject {
    y = 10;
    width = 500;
    height = 300;

    IMAGES_WALK = [
        './img/background/4_clouds/1.png',
        './img/background/4_clouds/2.png',
    ];


    constructor() {
        super().loadImage('./img/background/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}