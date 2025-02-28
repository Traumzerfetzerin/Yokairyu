class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarBottle = new StatusbarBottle();
    throwableObjects = [];
    gameOverScreen = new GameOverScreen();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }


    checkThrowObjects() {
        if (this.keyboard.THROW) {

            if (this.character.bottlesCollected > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y)
                this.throwableObjects.push(bottle);
                this.character.bottlesCollected--;
            }
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                // console.log('Collision with enemy detected', enemy);
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });

        this.level.coins.forEach((coin, c) => {
            if (this.character.isColliding(coin)) {
                // console.log('Collision with coin recognised', coin);
                if (coin.type === 'coin') {
                    this.character.collectCoin();
                    this.level.coins.splice(c, 1);

                    let collectedCoins = this.character.coinsCollected;
                    let percentCoins = (collectedCoins / this.level.totalCoins) * 100;
                    this.statusbarCoins.setPercentage(percentCoins);
                }
            }
        });

        this.level.bottles.forEach((bottle, b) => {
            if (this.character.isColliding(bottle)) {
                // console.log('Collision with bottle recognised', bottle);
                if (bottle.type === 'bottle') {
                    this.character.collectBottle();
                    this.level.bottles.splice(b, 1);

                    let collectedBottles = this.character.bottlesCollected;
                    let percentBottles = (collectedBottles / this.level.totalBottles) * 100;
                    this.statusbarBottle.setPercentage(percentBottles);
                }
            }
        });
    }



    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // back
        // ----- space for fixed objects -----
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottle);

        this.ctx.translate(this.camera_x, 0); // forwards

        this.addToMap(this.character);

        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);

        this.addObjectToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}