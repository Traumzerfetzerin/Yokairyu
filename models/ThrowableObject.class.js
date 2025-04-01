class ThrowableObject extends MovableObject {
    width = 50;
    height = 50;


    /**
     * Initializes a new instance of the ThrowableObject class.
     * Loads the initial image and throws the object from the given position.
     * Also loads the sound for the animation of the spider when it is hit.
     * @param {number} x - The x position of the object.
     * @param {number} y - The y position of the object.
     */
    constructor(x, y) {
        super().loadImage('./img/shoot/shadow/44.png');
        this.x = x;
        this.y = y;
        this.throw();

        // Load the sound for the spider's death animation
        let soundManager = new SoundManager();
        soundManager.loadSound('spiderDead', './audio/spiderDead.mp3');
        this.audioSpiderDead = soundManager.sounds['spiderDead'];
        this.audioSpiderDead.volume = 0.2;
    }


    /**
     * Initiates the throwing animation of the object.
     * Sets the vertical speed for the throw and applies gravity.
     * The object's position is updated at a regular interval, moving it horizontally.
     * Continuously checks for collisions with enemies.
     * Stops the interval when the object goes beyond a vertical position of 500.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();

        let intervallnummer = setInterval(() => {
            this.checkBottleHitEnemy();
            this.x += 10;
            if (this.y > 500) {
                window.clearInterval(intervallnummer)
            }
        }, 25);
    }


    isBottleUsed = false;


    /**
     * Checks for collisions between the bottle and all enemies in the level.
     * If a collision is detected with an enemy and the bottle has not been used yet,
     * the bottle is marked as used, the enemy is hit, and the enemy's status bar is updated.
     * If the enemy is the endboss and it is dead, the endboss is removed from the level.
     * If the enemy is a spider, it is removed from the level and the spider dead sound is played.
     */
    checkBottleHitEnemy() {
        world.level.enemies.forEach((enemy) => {
            if (!this.isBottleUsed && this.isColliding(enemy)) {
                this.isBottleUsed = true;

                if (enemy instanceof Endboss) {
                    enemy.hit();
                    world.statusbarEndboss.setPercentage(enemy.energy);

                    if (enemy.isDead()) {
                        world.enemyIsDead(enemy);
                        if (enemy.clearTempCanvas) {
                            enemy.clearTempCanvas();
                        }
                    }
                }
                else {
                    world.enemyIsDead(enemy);
                    enemy.loadImage('./img/enemy/Spider/Spider_6.png');
                    soundManager.playSound('spiderDead', false);
                    this.audioSpiderDead.play();
                }
            }
        });
    }
}