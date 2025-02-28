class ThrowableObject extends MovableObject {
    width = 50;
    height = 50;


    constructor(x, y) {
        super().loadImage('./img/shoot/shadow/44.png');
        this.x = x;
        this.y = y;
        this.throw();
    }


    throw() {
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            this.x += 10;
        }, 25);
    }


    // checkCollisionsBottles() {
    //     this.level.enemies.forEach((enemy) => {
    //         if (this.character.isColliding(enemy)) {
    //             // console.log('Collision with enemy detected', enemy);
    //             this.enemies.hit();
    //         }
    //     });
    // }
}