class Cloud extends MovableObject {

    y = 10;
    width = 300;
    height = 150;


    constructor() {
        super().loadImage('../img/background/Plan-4.png');
        this.x = Math.random() * 500;
    }
}