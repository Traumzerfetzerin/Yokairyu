class GameOverScreen {
    /**
     * Initializes a new instance of the GameOverScreen class.
     * Loads the "lose" image and sets a flag to track whether the image has finished loading.
     * When the image has finished loading, sets the flag to true.
     */
    constructor() {
        this.loseImage = new Image();
        this.loseImage.src = './img/lose.png';
        this.isImageLoaded = false;


        /**
         * Called when the "lose" image has finished loading.
         * Sets a flag to indicate that the image has finished loading.
         * @listens onload
         */
        this.loseImage.onload = () => {
            this.isImageLoaded = true;
        };
    }


    /**
     * Draws the game over screen by clearing the canvas, drawing the "lose" image, and
     * displaying a message to press 'R' to restart the game.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    drawGameOverScreen(ctx) {
        if (this.isImageLoaded) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this.loseImage, 0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "white";
            ctx.font = "bold 30px Arial";
            ctx.textAlign = "center";
            // ctx.fillText("Press 'R' to restart", canvas.width / 2, canvas.height - 50);
        } return;
    }

    hideButton() {
        document.getElementById('backToMenu').classList.add('d-none');
        document.getElementById('menu').classList.add('d-none');
        document.getElementById('touch').style.display = 'none';
        document.getElementById('soundbar').style.display = 'none';
        document.getElementById('restart').classList.remove('d-none');
    }
}
