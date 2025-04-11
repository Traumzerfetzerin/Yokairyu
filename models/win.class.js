class WinScreen {
    /**
     * Initializes a new instance of the WinScreen class.
     * Loads the "win" image and sets a flag to track whether the image has finished loading.
     * When the image has finished loading, sets the flag to true.
     */
    constructor() {
        this.winImage = new Image();
        this.winImage.src = './img/win.png';
        this.isImageLoaded = false;


        /**
         * Called when the "win" image has finished loading.
         * Sets a flag to indicate that the image has finished loading.
         * @listens onload
         */
        this.winImage.onload = () => {
            this.isImageLoaded = true;
        };
    }


    /**
     * Draws the win screen by clearing the canvas, drawing the "win" image, and
     * displaying a message to press 'R' to restart the game.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    drawWinScreen(ctx) {
        if (this.isImageLoaded) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this.winImage, 0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "white";
            ctx.font = "bold 30px Arial";
            ctx.textAlign = "center";
            // ctx.fillText("Press 'R' to restart", canvas.width / 2, canvas.height - 50);
        }
    }


    /**
     * Hides the 'Back to menu' button, the 'Menu' container, the touch controls, and the soundbar.
     * Shows the 'Restart' button.
     */
    hideButton() {
        document.getElementById('backToMenu').classList.add('d-none');
        document.getElementById('menu').classList.add('d-none');
        document.getElementById('touch').style.display = 'none';
        document.getElementById('soundbar').style.display = 'none';
        let restart = document.getElementById('restart');
        restart.classList.remove('d-none');
        restart.style.top = '340px';
        restart.style.color = '#4FFCFD';
        restart.style.textShadow = '0 0 0 #0D3A75';
    }
}