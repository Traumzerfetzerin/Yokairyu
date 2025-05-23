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
        document.getElementById('newGameMenu').classList.remove('d-none');
        let newGameMenu = document.getElementById('newGameMenu');
        newGameMenu.classList.remove('d-none');
        newGameMenu.style.top = '-90px';
        newGameMenu.style.color = '#4FFCFD';
        newGameMenu.style.textShadow = '0 0 0 #0D3A75';
        newGameMenu.style.position = 'absolute';
        newGameMenu.style.fontSize = '50px';
        newGameMenu.style.zIndex = '1';
        newGameMenu.style.width = '100%';
        newGameMenu.style.display = 'flex';
        newGameMenu.style.justifyContent = 'center';
        newGameMenu.style.alignItems = 'center';
    }
}