class Bottles extends MovableObject {
    width = 80;
    height = 80;
    y = 380;
    x = 0;
    static positions = [];

    IMAGES = [
        './img/shoot/shadow/44.png'
    ]


    /**
     * Initializes a new instance of the Bottles class.
     * Loads the initial image and all images for the bottles.
     * Sets a non-overlapping random x position within a specified range.
     * Initializes the bottle type.
     */
    constructor() {
        super().loadImage('./img/shoot/shadow/44.png');
        this.loadImages(this.IMAGES);

        this.x = this.getNonOverlappingX(500, 2000, 90);

        this.type = 'bottle';
    }


    /**
     * Generates a random x position within the given range that does not overlap with already existing bottle positions.
     * Tries up to 100 times to find a non-overlapping position, and if it fails, returns null.
     * @param {number} min - The minimum x position.
     * @param {number} max - The maximum x position.
     * @param {number} spacing - The minimum required spacing between bottles.
     * @returns {number|null} The generated x position or null if no non-overlapping position could be found.
     */
    getNonOverlappingX(min, max, spacing) {
        let x;
        let attempts = 100;
        do {
            x = min + Math.random() * (max - min);
            attempts--;
        } while (Bottles.positions.some(pos => Math.abs(pos - x) < spacing) && attempts > 0);

        if (attempts > 0) {
            Bottles.positions.push(x);
            return x;
        } else {
            return null;
        }
    }
}