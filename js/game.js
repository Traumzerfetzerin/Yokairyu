let canvas;
let world;
let keyboard = new Keyboard();


/**
 * Initializes the game by getting the canvas element and creating a new
 * World object with the canvas and Keyboard object.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * Reloads the current webpage to restart the game.
 * This function is triggered to refresh the game environment
 * by reloading the browser, effectively resetting all game
 * states and progress.
 */
function restartGame() {
    location.reload();
}


window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39 || e.keyCode == 68) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37 || e.keyCode == 65) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38 || e.keyCode == 87) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40 || e.keyCode == 83) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 69) {
        keyboard.THROW = true;
    }

    if (e.keyCode == 82) {
        keyboard.RELOAD = true;
        restartGame();
    }
});


window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39 || e.keyCode == 68) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37 || e.keyCode == 65) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38 || e.keyCode == 87) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40 || e.keyCode == 83) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 69) {
        keyboard.THROW = false;
    }

    if (e.keyCode == 82) {
        keyboard.RELOAD = false;
        restartGame();
    }
});


window.addEventListener("mousedown", (e) => {
    if (e.button == 0) {
        keyboard.THROW = true;
    }
});


window.addEventListener("mouseup", (e) => {
    if (e.button == 0) {
        keyboard.THROW = false;
    }
});