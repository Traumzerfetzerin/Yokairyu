class Chicken extends MovableObject {
    width = 80;
    height = 80;
    y = 380;
    energy = 1;
    enemyName;

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
     * Loads the initial image and all images for the chicken's walk animation.
     * Sets a random x position and speed, and starts the animation.
     * 
     * @param {string} name - The name of the enemy chicken.
     */
    constructor(name) {
        super().loadImage('./img/enemy/Spider/Spider_1.png');
        this.loadImages(this.IMAGES_WALK);

        this.x = 500 + Math.random() * 500; // random x position between 200 and 700
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();

        this.enemyName = name;
    }


    /**
     * Animates the chicken by continuously moving it to the left and playing the walk animation.
     */
    animate() {
        this.startMovingLeft();
        this.startWalkingAnimation();
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
}