class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collect = 0;
    lastCollect = 100;


    /**
     * Applies gravity to the movable object by continuously decreasing its vertical 
     * speed and position. This function is called at a regular interval, simulating 
     * the effect of gravity on the object. If the object is above the ground or has 
     * upward speed, its vertical position (y) is updated by subtracting the current 
     * vertical speed (speedY). The vertical speed is then decreased by the acceleration 
     * value to simulate the effect of gravity.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * Checks if the object is above the ground.
     * If the object is an instance of ThrowableObject, it will always return true.
     * Otherwise, it will return true if the object's y position is less than 300.
     * @return {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // throwable object should always fall
            return true;
        } else {
            return this.y < 300;
        }
    }


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }


    // character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    // isColliding(mo) {
    //     return this.x + this.width > mo.x &&
    //         this.y + this.height > mo.y &&
    //         this.x < mo.x + mo.width &&
    //         this.y < mo.y + mo.height;
    // }


    /**
     * Reduces the energy of the object by 5.
     * If the energy reaches 0 or below, it is set to 0.
     * The last hit time is recorded as the current time in milliseconds.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Determines if the object is currently in a hurt state.
     * The object is considered hurt if less than 1 second has passed 
     * since the last hit was recorded. This function calculates the 
     * time elapsed since the last hit and checks if it is less than 
     * the specified threshold.
     * 
     * @returns {boolean} True if the object is hurt, false otherwise.
     */

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in s
        return timepassed < 1;
    }


    /**
     * Determines if the object is currently dead.
     * The object is considered dead if its energy is equal to 0.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Plays an animation by cycling through an array of image paths.
     * Updates the current image of the object to the next image in the provided array.
     * The index of the image to display is calculated using the modulus operator
     * to ensure it wraps around at the end of the array.
     *
     * @param {string[]} images - An array of image paths to cycle through for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
        // i = 0, 1, 2, 3, 4, 5, 6, 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Moves the object to the right by adding the object's speed to its current x position.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves the object to the left by subtracting the object's speed from its current x position.
     * If the object moves beyond the left edge of the screen, it is repositioned to the right edge
     * of the screen, creating a looping effect.
     */
    moveLeft() {
        this.x -= this.speed;
        if (this.x < -this.width) {
            this.x = window.innerWidth; // Setzt es rechts neu an
        }
    }


    /**
     * Makes the object jump by setting its vertical speed to 30.
     */
    jump() {
        this.speedY = 30;
    }


    /**
     * Increments the coins collected counter by 1 and logs the current
     * number of coins collected to the console.
     */
    collectCoin() {
        this.coinsCollected++;
        console.log('Coins collected: ', this.coinsCollected);

    }


    /**
     * Increments the bottles collected counter by 1 and logs the current
     * number of bottles collected to the console.
     */
    collectBottle() {
        this.bottlesCollected++;
        console.log('Bottles collected: ', this.bottlesCollected);
    }
}