class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    
    /**
     * Initializes a new instance of the BackgroundObject class.
     * Loads the specified image and sets its initial x and y coordinates.
     * The y coordinate is calculated based on the height of the object.
     * 
     * @param {string} imagePath - The path to the image to load.
     * @param {number} x - The initial x position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // 480 - 400 = 80
    }
}