class GameOverScreen {

    constructor() {
        this.loseImage = new Image();
        this.loseImage.src = './img/lose.png';
        this.isImageLoaded = false;

        this.loseImage.onload = () => {
            this.isImageLoaded = true;
        };
    }


    drawGameOverScreen(ctx) {
        if (this.isImageLoaded) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this.loseImage, 0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "white";
            ctx.font = "bold 30px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Press 'R' to restart", canvas.width / 2, canvas.height - 50);
        }
    }
}
