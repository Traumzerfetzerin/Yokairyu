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
     * Handles the movement of the character.
     * This function is called in the startMovementHandling() function.
     * It checks if the character should move left or right and if the character should jump.
     * The character can only move left if it is not at the left edge of the screen and only move right if it is not at the right edge of the screen.
     * The character can only jump if it is on the ground.
     */
    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }

        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }

        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
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
     * If the character is dead, it plays the death animation and can 
     * trigger the game over screen. If the character is hurt, it 
     * plays the hurt animation. If the character is above ground, 
     * it plays the jump animation. If the character is moving 
     * right or left, it plays the walk animation. Otherwise, it 
     * defaults to the idle animation.
     *
     * @param {GameOverScreen} gameOverScreen - The game over screen to be drawn if the character is dead.
     */
    handleStateAnimation(gameOverScreen) {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            // gameOverScreen.drawGameOverScreen(this.world.ctx);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
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
     * If the character is throwing, it plays the throw animation.
     */
    handleThrow() {
        if (this.world.keyboard.THROW) {
            this.playAnimation(this.IMAGES_THROW);
        }
    }

}