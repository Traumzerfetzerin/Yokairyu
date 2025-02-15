class MovableObject {

    x = 120;
    y = 350;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;


    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src="img/test.png" />
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    moveRight() {
        console.log('Moving right');
    }


    moveLeft() {
        this.interval = setInterval(() => {
            this.x -= this.speed;
            if (this.x < -this.width) {
                this.x = window.innerWidth; // Setzt es rechts neu an
            }
        }, 1000 / 60);
    }
}