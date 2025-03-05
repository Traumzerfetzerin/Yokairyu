class Cloud extends MovableObject {
    y = 10;
    width = 500;
    height = 300;

    IMAGES_WALK = [
        './img/background/4_clouds/1.png',
        './img/background/4_clouds/2.png',
    ];


    /**
     * Initializes a new instance of the Cloud class.
     * Loads the specified image and sets its initial x position to a random value between 0 and 500.
     * Calls the animate() method to start animating the cloud.
     */
    constructor() {
        super().loadImage('./img/background/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }


    /**
     * Animates the cloud by continuously moving it to the left at a rate of 60 frames per second.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}