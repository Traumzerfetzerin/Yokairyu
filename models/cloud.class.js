class Cloud extends MovableObject {
    y = 10;
    width = 500;
    height = 300;

    static positions = [];

    IMAGES_WALK = [
        './img/background/4_clouds/1.png',
        './img/background/4_clouds/2.png',
    ];


    /**
     * Initializes a new instance of the Cloud class.
     * Loads the first image for the cloud and starts its animation.
     * Sets a non-overlapping random x position within a specified range.
     */
    constructor() {
        super().loadImage('./img/background/4_clouds/1.png');
        this.animate();
        this.x = this.getNonOverlappingX(0, 2000, 90);
    }


    /**
     * Animates the cloud by continuously moving it to the left at a rate of 60 frames per second.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


    /**
     * Generates a random x position within the given range that does not overlap with existing cloud positions.
     * Attempts to find a non-overlapping position up to 100 times; returns null if unsuccessful.
     * @param {number} min - The minimum x position.
     * @param {number} max - The maximum x position.
     * @param {number} spacing - The minimum required spacing between clouds.
     * @returns {number|null} The generated x position or null if no non-overlapping position could be found.
     */
    getNonOverlappingX(min, max, spacing) {
        let x;
        let attempts = 100;
        do {
            x = min + Math.random() * (max - min);
            attempts--;
        } while (Cloud.positions.some(pos => Math.abs(pos - x) < spacing) && attempts > 0);

        if (attempts > 0) {
            Cloud.positions.push(x);
            return x;
        } else {
            return x;
        }
    }
}