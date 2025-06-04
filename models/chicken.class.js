class Chicken extends MovableObject {
    width = 80;
    height = 80;
    y = 380;
    energy = 1;
    enemyName;

    static positions = [];

    IMAGES_WALK = [
        './img/enemy/Spider/Spider_1.png',
        './img/enemy/Spider/Spider_2.png',
        './img/enemy/Spider/Spider_3.png',
        './img/enemy/Spider/Spider_4.png',
        './img/enemy/Spider/Spider_5.png',
        './img/enemy/Spider/Spider_6.png',
        './img/enemy/Spider/Spider_7.png',
        './img/enemy/Spider/Spider_8.png',
        './img/enemy/Spider/Spider_9.png',
        './img/enemy/Spider/Spider_10.png',
        './img/enemy/Spider/Spider_11.png',
        './img/enemy/Spider/Spider_12.png',
    ];


    /**
     * Initializes a new instance of the Chicken class.
     * Loads the first image of the spider and starts its animation.
     * Sets a non-overlapping random x position within a specified range.
     * The speed of the spider is set to a random value between 0.15 and 0.4.
     * The enemyName parameter is saved to the enemyName property.
     * @param {string} name - The name of the enemy to save to the enemyName property.
     */
    constructor(name) {
        super();
        this.loadImage('./img/enemy/Spider/Spider_1.png');
        this.loadImages(this.IMAGES_WALK);
        this.x = this.getNonOverlappingX(100, 1660, 90);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.enemyName = name;
        this._isDead = false;

        this.groundY = 380;
        this.y = this.groundY;
    }


    /**
     * Checks if the chicken is dead.
     * A chicken is considered dead if the `_isDead` flag is set to true.
     * 
     * @returns {boolean} True if the chicken is dead, false otherwise.
     */
    isDead() {
        return this._isDead;
    }


    /**
     * Generates a random x position within the given range that does not overlap with existing positions.
     * Attempts to find a non-overlapping position up to 1000 times.
     * 
     * @param {number} min - The minimum x position.
     * @param {number} max - The maximum x position.
     * @param {number} spacing - The minimum required spacing between positions.
     * @returns {number|null} The generated x position or null if no non-overlapping position could be found.
     */
    getNonOverlappingX(min, max, spacing) {
        let x;
        let attempts = 1000;
        do {
            x = min + Math.random() * (max - min);
            attempts--;
        } while (Coins.positions.some(pos => Math.abs(pos - x) < spacing) && attempts > 0);

        if (attempts > 0) {
            Coins.positions.push(x);
            return x;
        } else {
            return x;
        }
    }


    /**
     * Animates the chicken by starting the following animations:
     * - `startMovingLeft`: moves the chicken to the left every 1/60th of a second as long as its energy is greater than 0.
     * - `startWalkingAnimation`: starts the walking animation of the chicken.
     * - `applyGravity`: applies gravity to the chicken by continuously decreasing its vertical speed and position.
     * - `autoJump`: makes the chicken jump every 1-2 seconds if it is above the ground.
     */
    animate() {
        this.startMovingLeft();
        this.startWalkingAnimation();
        this.applyGravity();
        this.autoJump();
    }


    /**
     * Starts an interval that moves the chicken to the left every 1/60th of a second as long as its energy is greater than 0.
     * If the energy reaches 0, the interval is cleared and the chicken will stop moving to the left.
     */
    startMovingLeft() {
        let moveLeft = setInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            } else {
                window.clearInterval(moveLeft);
            }
        }, 1000 / 60);
    }


    /**
     * Starts an interval that updates the chicken's animation and plays the walk sound effect every 100 milliseconds as long as the chicken's energy is greater than 0.
     * If the energy reaches 0, the interval is cleared and the animation and sound effect will stop.
     */
    startWalkingAnimation() {
        let walkAnimation = setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES_WALK);
                soundManager.audioSpiderWalk.play();
                soundManager.audioSpiderWalk.loop = true;
            } else {
                window.clearInterval(walkAnimation);
            }
        }, 100);
    }


    /**
     * Sets an interval to jump the chicken at a random interval between 2 and 4 seconds.
     * The interval is set using the `setInterval` function and the time is determined by
     * adding a random number between 0 and 2000 to 2000.
     * If the chicken is not above the ground, the `jump` method is called to make the chicken jump.
     */
    autoJump() {
        let intervalTime = 2000 + Math.random() * 2000;
        let jumpInterval = setInterval(() => {
            if (!this.isAboveGround()) {
                this.jump();
            } else {
                window.clearInterval(jumpInterval);
            }
        }, intervalTime);
    }
}