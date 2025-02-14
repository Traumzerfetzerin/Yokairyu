class MovableObject {

    x = 120;
    y = 350;
    img;
    height = 100;
    width = 100;


    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src="img/test.png" />
        this.img.src = path;
    }


    moveRight() {
        console.log('Moving right');

    }


    moveLeft() {

    }
}