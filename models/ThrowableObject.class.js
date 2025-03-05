class ThrowableObject extends MovableObject {
    width = 50;
    height = 50;


    /**
     * Initializes a new instance of the ThrowableObject class.
     * Loads the initial image and sets the initial x and y coordinates.
     * Calls the throw method to start the animation.
     * @param {number} x - The initial x position of the object.
     * @param {number} y - The initial y position of the object.
     */
    constructor(x, y) {
        super().loadImage('./img/shoot/shadow/44.png');
        this.x = x;
        this.y = y;
        this.throw();
    }


    /**
     * Animates the object being thrown by setting its vertical speed to 30, applying gravity, and moving it horizontally to the right at a rate of 40 pixels per second.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}