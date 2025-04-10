class Character extends MovableObject {
    width = 150;
    height = 150;
    y = 300;
    x = 0;
    speed = 5;
    world;


    offset = {
        top: 0,
        left: 15,
        right: 15,
        bottom: 0
    }


    coinsCollected = 0;
    bottlesCollected = 0;
    lastCollect = 0;


    // img
    IMAGES_WALK = [
        './img/player/Kitsune/walk/remove/Walk_1-removebg-preview.png',
        './img/player/Kitsune/walk/remove/Walk_2-removebg-preview.png',
        './img/player/Kitsune/walk/remove/Walk_3-removebg-preview.png',
        './img/player/Kitsune/walk/remove/Walk_4-removebg-preview.png',
        './img/player/Kitsune/walk/remove/Walk_5-removebg-preview.png',
        './img/player/Kitsune/walk/remove/Walk_6-removebg-preview.png',
        './img/player/Kitsune/walk/remove/Walk_7-removebg-preview.png',
        './img/player/Kitsune/walk/remove/Walk_8-removebg-preview.png'

        // './img/player/Kitsune/run/remove/Run_1-removebg-preview.png',
        // './img/player/Kitsune/run/remove/Run_2-removebg-preview.png',
        // './img/player/Kitsune/run/remove/Run_3-removebg-preview.png',
        // './img/player/Kitsune/run/remove/Run_4-removebg-preview.png',
        // './img/player/Kitsune/run/remove/Run_5-removebg-preview.png',
        // './img/player/Kitsune/run/remove/Run_6-removebg-preview.png',
        // './img/player/Kitsune/run/remove/Run_7-removebg-preview.png',
        // './img/player/Kitsune/run/remove/Run_8-removebg-preview.png'
    ];

    IMAGES_JUMP = [
        './img/player/Kitsune/jump/remove/Jump_1-removebg-preview.png',
        './img/player/Kitsune/jump/remove/Jump_2-removebg-preview.png',
        './img/player/Kitsune/jump/remove/Jump_3-removebg-preview.png',
        './img/player/Kitsune/jump/remove/Jump_4-removebg-preview.png',
        './img/player/Kitsune/jump/remove/Jump_5-removebg-preview.png',
        './img/player/Kitsune/jump/remove/Jump_6-removebg-preview.png',
        './img/player/Kitsune/jump/remove/Jump_7-removebg-preview.png',
        './img/player/Kitsune/jump/remove/Jump_8-removebg-preview.png',
        './img/player/Kitsune/jump/remove/Jump_9-removebg-preview.png',
        './img/player/Kitsune/jump/remove/Jump_10-removebg-preview.png'
    ];

    IMAGES_DEAD = [
        './img/player/Kitsune/dead/remove/Dead_1-removebg-preview.png',
        './img/player/Kitsune/dead/remove/Dead_2-removebg-preview.png',
        './img/player/Kitsune/dead/remove/Dead_3-removebg-preview.png',
        './img/player/Kitsune/dead/remove/Dead_4-removebg-preview.png',
        './img/player/Kitsune/dead/remove/Dead_5-removebg-preview.png',
        './img/player/Kitsune/dead/remove/Dead_6-removebg-preview.png',
        './img/player/Kitsune/dead/remove/Dead_7-removebg-preview.png',
        './img/player/Kitsune/dead/remove/Dead_8-removebg-preview.png',
        './img/player/Kitsune/dead/remove/Dead_9-removebg-preview.png',
        './img/player/Kitsune/dead/remove/Dead_10-removebg-preview.png'
    ];

    IMAGES_HURT = [
        './img/player/Kitsune/hurt/Hurt_1.png',
        './img/player/Kitsune/hurt/Hurt_2.png'
    ];

    IMAGES_THROW = [
        // './img/player/Kitsune/attack_2/remove/Attack_2_1-removebg-preview.png',
        // './img/player/Kitsune/attack_2/remove/Attack_2_2-removebg-preview.png',
        // './img/player/Kitsune/attack_2/remove/Attack_2_3-removebg-preview.png',
        // './img/player/Kitsune/attack_2/remove/Attack_2_4-removebg-preview.png',
        // './img/player/Kitsune/attack_2/remove/Attack_2_5-removebg-preview.png',
        // './img/player/Kitsune/attack_2/remove/Attack_2_6-removebg-preview.png',
        // './img/player/Kitsune/attack_2/remove/Attack_2_7-removebg-preview.png',
        // './img/player/Kitsune/attack_2/remove/Attack_2_8-removebg-preview.png',
        // './img/player/Kitsune/attack_2/remove/Attack_2_9-removebg-preview.png',
        // './img/player/Kitsune/attack_2/remove/Attack_2_10-removebg-preview.png'


        './img/player/Kitsune/attack_1/remove/Attack_1_1-removebg-preview.png',
        './img/player/Kitsune/attack_1/remove/Attack_1_2-removebg-preview.png',
        './img/player/Kitsune/attack_1/remove/Attack_1_3-removebg-preview.png',
        './img/player/Kitsune/attack_1/remove/Attack_1_4-removebg-preview.png',
        './img/player/Kitsune/attack_1/remove/Attack_1_5-removebg-preview.png',
        './img/player/Kitsune/attack_1/remove/Attack_1_6-removebg-preview.png',
        './img/player/Kitsune/attack_1/remove/Attack_1_7-removebg-preview.png',
        './img/player/Kitsune/attack_1/remove/Attack_1_8-removebg-preview.png',
        './img/player/Kitsune/attack_1/remove/Attack_1_9-removebg-preview.png',
        './img/player/Kitsune/attack_1/remove/Attack_1_10-removebg-preview.png'
    ];

    IMAGES_IDLE = [
        './img/player/Kitsune/idle/remove/Idle_1-removebg-preview.png',
        './img/player/Kitsune/idle/remove/Idle_2-removebg-preview.png',
        './img/player/Kitsune/idle/remove/Idle_3-removebg-preview.png',
        './img/player/Kitsune/idle/remove/Idle_4-removebg-preview.png',
        './img/player/Kitsune/idle/remove/Idle_5-removebg-preview.png',
        './img/player/Kitsune/idle/remove/Idle_6-removebg-preview.png',
        './img/player/Kitsune/idle/remove/Idle_7-removebg-preview.png',
        './img/player/Kitsune/idle/remove/Idle_8-removebg-preview.png'
    ]


    /**
     * Constructor for the Character class.
     * Calls the parent constructor and loads the first image of the walk animation.
     * Then it loads all other image arrays and applies gravity.
     * Finally, it initializes all animations by calling the `initAnimations` method.
     * Additionally, it loads all the sound effects that are used in the game.
     */
    constructor() {
        super().loadImage('./img/player/Kitsune/walk/remove/Walk_1-removebg-preview.png');

        // Load all images for the character
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_IDLE);

        this.applyGravity();

        this.initAnimations();
    }


    /**
     * Initializes all animations for the character.
     * This function is called in the constructor of the Character class.
     * It starts the movement handling, state animation and throw handling.
     */
    initAnimations() {
        this.startMovementHandling();
        this.startStateAnimation();
        this.startThrowHandling();
    }


    /**
     * Starts the movement handling for the character.
     * This function is called in the constructor of the Character class.
     * It starts an interval which calls the handleMovement() and updateCameraPosition() functions every 1/60th of a second.
     * This allows the character to move and the camera to follow the character.
     */
    startMovementHandling() {
        setInterval(() => {
            this.handleMovement();
            this.updateCameraPosition();
        }, 1000 / 60);
    }


    /**
     * Handles the character's movement.
     * This function is called in the interval started in the startMovementHandling() function.
     * It checks if the character can move in the given direction and if the key for the direction is pressed.
     * If the conditions are met, the character moves in the given direction and walking is set to true.
     * The character's otherDirection is also set to indicate which direction the character is moving.
     * The walking state is then passed to the handleWalkingAudio() function to handle the walking sound.
     * The character's jumping is also handled by calling the handleJump() function.
     */
    handleMovement() {
        let walking = false;

        walking = this.handleWalking(walking, 'RIGHT', false);

        walking = this.handleWalking(walking, 'LEFT', true);

        this.handleWalkingAudio(walking);

        this.handleJump();
    }


    /**
     * Handles the character's walking.
     * Checks if the character can move in the given direction and if the key for the direction is pressed.
     * If the conditions are met, the character moves in the given direction and walking is set to true.
     * The character's otherDirection is also set to indicate which direction the character is moving.
     * @param {boolean} walking - Whether the character is currently walking.
     * @param {string} direction - The direction the character is moving in. Can be 'LEFT' or 'RIGHT'.
     * @param {boolean} isLeft - Whether the character is moving to the left or not.
     * @return {boolean} Walking state of the character.
     */
    handleWalking(walking, direction, isLeft) {
        if (this.world.keyboard[direction] && (isLeft ? this.x > 0 : this.x < this.world.level.level_end_x)) {
            if (isLeft) {
                this.moveLeft();
            } else {
                this.moveRight();
            }
            this.otherDirection = isLeft;
            walking = true;
        }
        return walking;
    }


    /**
     * Handles the walking sound effect for the character.
     * If the character is walking, this function plays the walking sound effect.
     * If the character is not walking, this function stops the walking sound effect.
     * @param {boolean} walking - Whether the character is currently walking.
     */
    handleWalkingAudio(walking) {
        if (walking) {
            if (!soundManager.audioWalk || soundManager.audioWalk.paused) {
                soundManager.audioWalk.play();
            }
        } else {
            if (soundManager.audioWalk) {
                soundManager.audioWalk.pause();
                soundManager.audioWalk.currentTime = 0;
            }
        }
    }


    /**
     * Handles the character's jumping.
     * This function is called in the interval started in the startMovementHandling() function.
     * It checks if the character can jump and if the space bar is pressed.
     * If the conditions are met, the character jumps by calling the jump() function.
     * The jumping sound effect is also handled by checking if the sound exists and has not been played yet.
     * If the sound exists and has not been played yet, the sound is played and its volume is set to 0.2.
     * The sound is also paused after 2 seconds.
     */
    handleJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();

            this.audioJump = soundManager.sounds['jump'];

            // Check if the sound exists and is not already playing
            if (this.audioJump && this.audioJump.paused) {
                this.audioJump.currentTime = 0;
                this.audioJump.volume = 0.2;
                soundManager.playSound('jump', false);
            }

            // Pause the sound after 2 seconds
            setTimeout(() => {
                if (this.audioJump && !this.audioJump.paused) {
                    this.audioJump.pause();
                    this.audioJump.currentTime = 0;
                }
            }, 2000);
        }
    }


    /**
     * Updates the camera position to follow the character.
     * This function sets the camera's x position based on the character's
     * current x position, ensuring that the character is always centered
     * on the screen with an offset of 100 pixels.
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 100;
    }


    /**
     * Starts the state animation for the character.
     * This function sets up an interval that periodically calls the handleStateAnimation method.
     * It creates a GameOverScreen instance to manage the game's end state.
     * The interval updates every 100 milliseconds, ensuring that the character's state
     * animations are handled in a timely manner.
     */
    startStateAnimation() {
        let gameOverScreen = new GameOverScreen();

        // Set up an interval to handle the character's state animation
        this.animationInterval = setInterval(() => {
            this.handleStateAnimation(gameOverScreen);
        }, 100);
    }


    /**
     * Handles the character's current state and performs the corresponding animation.
     * Checks the character's state and calls the appropriate method to handle the animation.
     * If the character is dead, it stops the animation and draws the game over screen.
     * @param {GameOverScreen} gameOverScreen - The GameOverScreen instance to use for drawing the game over screen.
     */
    handleStateAnimation(gameOverScreen) {
        if (this.isDead()) {
            this.handleDeadState();
            gameOverScreen.drawGameOverScreen(this.world.ctx);
            this.stopAnimation();
            gameOverScreen.hideButton();
            soundManager.toggleSounds(true);
        } else if (this.isHurt()) {
            this.handleHurtState();
        } else if (this.isAboveGround()) {
            this.handleJumpState();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.handleWalkState();
        } else {
            this.handleIdleState();
        }
    }


    /**
     * Stops the character's animation by clearing the animation interval.
     * If the animation interval is not null, it clears the interval and sets it to null.
     */
    stopAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval); // Stop the animation interval
            this.animationInterval = null; // Reset the animation interval
        }
    }


    /**
     * Handles the character's dead state.
     * Plays the dead animation and sound effect for the character.
     * Sets the volume of the dead sound effect to 0.05 if the sound exists.
     */
    handleDeadState() {
        this.playAnimation(this.IMAGES_DEAD);
        soundManager.audioDead.play();
    }


    /**
     * Handles the character's hurt state.
     * Plays the hurt animation and sound effect for the character.
     * Sets the volume of the hurt sound effect to 0.1 if the sound exists.
     */
    handleHurtState() {
        this.playAnimation(this.IMAGES_HURT);
        soundManager.audioHurt.play();
    }


    /**
     * Handles the character's jump state.
     * Plays the jump animation for the character.
     */
    handleJumpState() {
        this.playAnimation(this.IMAGES_JUMP);
    }


    /**
     * Handles the character's walk state.
     * Plays the walk animation for the character.
     */
    handleWalkState() {
        this.playAnimation(this.IMAGES_WALK); // Walk animation
    }


    /**
     * Handles the character's idle state.
     * Plays the idle animation for the character.
     */
    handleIdleState() {
        this.playAnimation(this.IMAGES_IDLE);
    }


    /**
     * Initializes the throw handling mechanism for the character.
     * This function sets up an interval that repeatedly checks for
     * the throw action every 50ms by calling the `handleThrow` method.
     */
    startThrowHandling() {
        setInterval(() => {
            this.handleThrow();
        }, 50);
    }


    /**
     * Handles the character's throw action.
     * Checks if the throw key is pressed and if so, plays the throw animation.
     * If the throw sound is paused, sets the sound to its start time and plays it.
     * If the throw key is not pressed and the sound is not paused, pauses the sound and
     * sets it to its start time.
     */
    handleThrow() {
        if (this.world.keyboard.THROW) {
            this.playAnimation(this.IMAGES_THROW);

            this.audioShoot = soundManager.sounds['shoot'];

            if (this.audioShoot && this.audioShoot.paused) {
                this.audioShoot.currentTime = 0;
                soundManager.playSound('shoot', false);
            }
        } else if (this.audioShoot) {
            this.audioShoot.pause();
            this.audioShoot.currentTime = 0;
        }
    }
}