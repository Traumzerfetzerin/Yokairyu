class Character extends MovableObject {
    width = 150;
    height = 150;
    y = 300;
    x = 0;
    speed = 5;
    world;

    // audio
    audioWalk = new Audio('./audio/playerWalk.mp3');
    audioJump = new Audio('./audio/playerJump.mp3');
    audioShoot = new Audio('./audio/playerShoot.mp3');
    audioHurt = new Audio('./audio/playerHurt.mp3');
    audioDead = new Audio('./audio/playerDead.mp3');

    offset = {
        top: 0,
        left: 15,
        right: 15,
        bottom: 0
    }

    coinsCollected = 0;
    bottlesCollected = 0;
    lastCollect = 0;


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
     * Initializes a new instance of the Character class.
     * Loads the initial image and all images for the character.
     * Applies gravity to the character.
     * Initializes all animations for the character.
     */
    constructor() {
        super().loadImage('./img/player/Kitsune/walk/remove/Walk_1-removebg-preview.png');

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
     * Plays or pauses the walking audio based on the character's walking state.
     *
     * If the character is walking, the walking audio is played if currently paused.
     * If the character is not walking, the walking audio is paused and reset to the beginning.
     *
     * @param {boolean} walking - Indicates whether the character is currently walking.
     */
    handleWalkingAudio(walking) {
        if (walking) {
            if (this.audioWalk.paused) {
                this.audioWalk.play();
                this.audioWalk.volume = 0.2;
            }
        } else {
            this.audioWalk.pause();
            this.audioWalk.currentTime = 0;
        }
    }


    /**
     * Handles the jump action for the character by calling the jump() function when the space key is pressed and the character is above the ground.
     * This function is called in the handleMovement() function.
     * It also plays the jump sound effect when the jump action is triggered.
     */
    handleJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();

            this.audioJump.currentTime = 0;
            this.audioJump.play();
            this.audioJump.volume = 0.2;

            setTimeout(() => {
                this.audioJump.pause();
                this.audioJump.currentTime = 0;
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
     * Starts the animation for the character's state by setting up a recurring
     * interval. This interval calls the handleStateAnimation function every 100ms,
     * passing in a new GameOverScreen instance. This function is responsible for
     * updating the character's animation based on its current state, such as 
     * whether it's dead, hurt, jumping, walking, or idle.
     */
    startStateAnimation() {
        let gameOverScreen = new GameOverScreen();

        setInterval(() => {
            this.handleStateAnimation(gameOverScreen);
        }, 100);
    }


    /**
     * Updates the character's animation based on its current state.
     * 
     * This function is called at a 100ms interval and takes a GameOverScreen
     * instance as a parameter. It checks if the character is dead, hurt, jumping,
     * walking, or idle, and plays the corresponding animation. If the character
     * is dead, it displays the game over screen.
     * @param {GameOverScreen} gameOverScreen - The game over screen to display
     *                                          when the character is dead.
     */
    handleStateAnimation(gameOverScreen) {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.audioDead.play();
            this.audioDead.volume = 0.05;
            // gameOverScreen.drawGameOverScreen(this.world.ctx);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.audioHurt.play();
            this.audioHurt.volume = 0.1;
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMP);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALK); // Walk animation
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
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
     * Handles the throw action for the character.
     *
     * This function checks if the throw key is pressed.
     * If so, it plays the throw animation and the shoot audio.
     * The audio is played if it is currently paused and is 
     * stopped after 2 seconds. If the throw key is not pressed, 
     * the audio is paused and reset to 1 second.
     */
    handleThrow() {
        if (this.world.keyboard.THROW) {
            this.playAnimation(this.IMAGES_THROW);

            if (this.audioShoot.paused) {
                this.audioShoot.currentTime = 1;
                this.audioShoot.play();

                setTimeout(() => {
                    this.audioShoot.pause();
                    this.audioShoot.currentTime = 1;
                }, 2000);
            }
        } else {
            this.audioShoot.pause();
            this.audioShoot.currentTime = 1;
        }
    }
}