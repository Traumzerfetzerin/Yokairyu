class ThrowableObject extends MovableObject {
    width = 50;
    height = 50;


    /**
     * Initializes a new instance of the ThrowableObject class.
     * Loads the initial image and sets the initial x and y coordinates.
     * Calls the throw method to start the animation.
     * @param {number} x - The initial x position of the object.
     * @param {number} y - The initial y position of the object.
     */
    constructor(x, y) {
        super().loadImage('./img/shoot/shadow/44.png');
        this.x = x;
        this.y = y;
        this.throw();
    }



    throw() {
        this.speedY = 30;
        this.applyGravity();

        let throwInterval = setInterval(() => {
            if (thix.y > 400) {
                window.clearInterval(throwInterval);
            } else {
                this.x += 10;
            }
        }, 25);
    }


    checkBottleHitEnemy() {
        this.bottle.forEach((enemy) => {
            if (!this.isUsed && this.character.isCharacterAboveEnemy(enemy)) {
                this.isUsed = true;
                let collidingInterval = setInterval(() => {
                    if (this.character.isColliding(enemy)) {
                        this.enemyIsDead(enemy);
                        enemy.loadImage('./img/enemy/Spider/Spider_6.png');
                        this.audioSpiderDead.play();
                        this.audioSpiderDead.volume = 0.2;
                        window.clearInterval(collidingInterval);
                    };
                }, 1000 / 60);
                setTimeout(() => {
                    window.clearInterval(collidingInterval);
                }, 2000)
            }
        });
    };
}