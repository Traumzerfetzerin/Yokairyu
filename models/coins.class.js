class Coins extends MovableObject {
    
    width = 80;
    height = 80;
    static positions = [];

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    }

    IMAGES = [
        './img/loot/shadow/19.png'
    ];


    /**
     * Initializes a new instance of the Coins class.
     * Loads the initial image and all images for the coins.
     * Sets a non-overlapping random x position within a specified range.
     * Initializes the coin type.
     */
    constructor() {
        super().loadImage('./img/loot/shadow/19.png');
        this.loadImages(this.IMAGES);

        this.x = this.getNonOverlappingX(500, 1660, 90);
        this.y = 100 + Math.random() * 100;

        this.type = 'coin';
    }

    
    /**
     * Generates a random x position within the given range that does not overlap with existing coin positions.
     * Attempts to find a non-overlapping position up to 100 times; returns null if unsuccessful.
     * @param {number} min - The minimum x position.
     * @param {number} max - The maximum x position.
     * @param {number} spacing - The minimum required spacing between coins.
     * @returns {number|null} The generated x position or null if no non-overlapping position could be found.
     */
    getNonOverlappingX(min, max, spacing) {
        let x;
        let attempts = 1000;
        do {
            x = min + Math.random() * (max - min);
            attempts--;
        } while (Coins.positions.some(pos => Math.abs(pos - x) < spacing) && attempts > 0);

        if (attempts > 0) {
            Coins.positions.push(x);
            return x;
        } else {
            return x;
        }
    }
}
