class Cloud extends MovableObject {

    y = 10;
    width = 300;
    height = 150;


    constructor() {
        super().loadImage('../img/background/4_clouds/1.png');
        this.x = Math.random() * 500;
    }
}