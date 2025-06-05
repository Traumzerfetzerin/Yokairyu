class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 200;
    lastHit = 0;
    collect = 0;
    lastCollect = 100;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }


    /**
     * Applies gravity to the object by accelerating it downward.
     * The object's vertical speed is increased by the acceleration value,
     * and the object's position is updated accordingly.
     * If the object is not above the ground, its vertical speed is reset to 0 and its position is set to the ground level.
     * The interval is set to 25 times per second.
     */
    applyGravity() {
        setInterval(() => {
            if (this._isDead) return;

            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

            if (!this.isAboveGround()) {
                this.y = this.groundY;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }


    /**
     * Checks if the object is above the ground.
     * If the object is an instance of ThrowableObject, this function will always return true.
     * Otherwise, it will return true if the object's y position is less than its groundY property.
     * @returns {boolean} - True if the object is above the ground, false if not.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < this.groundY;
        }
    }


    /**
     * Checks if the object is colliding with another object.
     * The collision check is done by comparing the object's bounding box with the other object's bounding box.
     * The bounding box is defined by the object's x and y coordinates as well as its width and height.
     * The offset object can be used to adjust the bounding box of the object.
     * @param {MovableObject} mo - The other object to check for collision with.
     * @return {boolean} True if the object is colliding with the other object, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * Checks if the character is above an enemy.
     * The collision check is done by comparing the character's bounding box with the enemy's bounding box.
     * The bounding box is defined by the character's x and y coordinates as well as its width and height.
     * The character is considered above the enemy if its bottom edge is higher than the enemy's top edge
     * and its left and right edges are inside the enemy's left and right edges.
     * @param {MovableObject} mo - The enemy object to check for collision with.
     * @return {boolean} True if the character is above the enemy, false otherwise.
     */
    isCharacterAboveEnemy(mo) {
        return this.y + this.height < mo.y && this.x + this.width > mo.x && this.x < mo.x + mo.width;
    }


    /**
     * Reduces the energy of the object by 5 and checks if the energy has dropped to 0 or below.
     * If the energy is 0 or less, the object is marked as dead. Otherwise, the time of the last hit 
     * is recorded. Logs messages indicating the new energy level and death status.
     */
    hit() {
        this.energy -= 10;

        if (this.energy <= 20) {
            this.energy = 20;
            this.dead = true;
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
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * Checks if the object is currently dead.
     * The object is marked as dead when its energy drops to 0 or below.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.dead === true;
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
        let i = this.currentImage % images.length;
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
            this.x = window.innerWidth;
        }
    }


    /**
     * Makes the object jump by setting its vertical speed to 30.
     */
    jump() {
        this.speedY = 25;
    }


    /**
     * Increments the coins collected counter by 1.
     */
    collectCoin() {
        this.coinsCollected++;
    }


    /**
     * Increments the bottles collected counter by 1.
     */
    collectBottle() {
        this.bottlesCollected++;
    }
}