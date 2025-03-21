class Chicken extends MovableObject {
    width = 80;
    height = 80;
    y = 380;
    energy = 1;

    audioSpiderWalk = new Audio('./audio/spiderWalk.mp3');

    IMAGES_WALK = [
        // './img/enemy/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        // './img/enemy/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        // './img/enemy/3_enemies_chicken/chicken_normal/1_walk/3_w.png',


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
     * Loads the first image for the chicken and all images for the chicken's walk animation.
     * Sets the chicken's x position to a random value between 200 and 700.
     * Sets the chicken's speed to a random value between 0.15 and 0.40.
     * Starts the chicken's animation.
     */
    constructor() {
        super().loadImage('./img/enemy/Spider/Spider_1.png');
        this.loadImages(this.IMAGES_WALK);

        this.x = 200 + Math.random() * 500; // Zahl wischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
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
            // console.log(this.energy);
            if (this.energy > 0) {
                this.moveLeft();
            } else {
                window.clearInterval(moveLeft);
            }
        }, 1000 / 60);
    }


    /**
     * Starts the walking animation for the chicken.
     * 
     * This function sets up a recurring interval that plays the walking
     * animation and audio as long as the chicken's energy is greater than 0.
     * The interval updates every 100 milliseconds. If the energy reaches 0,
     * the interval is cleared, stopping the animation.
     */
    startWalkingAnimation() {
        let walkAnimation = setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES_WALK);
                this.audioSpiderWalk.play();
                this.audioSpiderWalk.volume = 0.05;
            } else {
                window.clearInterval(walkAnimation);
            }
        }, 100);
    }
}