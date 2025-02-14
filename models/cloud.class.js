class Cloud extends MovableObject {

    y = 10;
    width = 500;
    height = 300;


    constructor() {
        super().loadImage('../img/background/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.2;
        }, 1000 / 60);
    }
}