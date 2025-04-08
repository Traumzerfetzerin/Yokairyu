class WinScreen {

    constructor() {
        this.winImage = new Image();
        this.winImage.src = './img/win.png';
        this.isImageLoaded = false;

        this.winImage.onload = () => {
            this.isImageLoaded = true;
        };
    }

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