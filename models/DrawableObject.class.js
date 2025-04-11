class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 350;
    height = 100;
    width = 100;


    // loadImage('img/test.png');

    /**
     * Loads a single image for the object.
     * @param {string} path - The path to the image to load.
     * @private
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src="img/test.png" />
        this.img.src = path;
    }


    /**
     * Draws the object onto the canvas using the ctx.drawImage method.
     * @param {CanvasRenderingContext2D} ctx - The context to draw onto.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Draws a pink frame around the object if it is an instance of Character, Chicken, Coins, Bottles, or Endboss.
     * @param {CanvasRenderingContext2D} ctx - The context to draw onto.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof Bottles || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'pink';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
     * Loads multiple images and stores them in the image cache.
     * Iterates over an array of image paths, creates an Image object for each path,
     * sets the image source, and caches the image using its path as the key.
     * 
     * @param {string[]} arr - An array of image paths to load and cache.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Sets the percentage of the object and updates the image to the corresponding frame in the IMAGES array.
     * The percentage is clamped to the range [0, 100] and the image is selected based on the resolveImageIndex method.
     * @param {number} percentage - The percentage to set.
     */
    setPercentage(percentage) {
        this.percentage = Math.max(0, Math.min(100, percentage));
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Calculates the index of the image to display based on the `percentage` property.
     * The index is determined by the following rules:
     * - 100%: 5
     * - 80% - 99%: 4
     * - 60% - 79%: 3
     * - 40% - 59%: 2
     * - 20% - 39%: 1
     * - 0% - 19%: 0
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}