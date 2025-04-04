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
 * Starts the game by hiding the start screen, showing the game canvas
 * and soundbar, hiding the footer, and setting the background image.
 * Also enables audio on user interaction.
 */
function startGame() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('start').classList.add('d-none');
    document.getElementById('menu').style.bottom = '0px';
    document.getElementById('backToMenu').classList.remove('d-none');
    document.getElementById('soundbar').classList.add('flex');
    document.getElementById('footer').classList.add('d-none');
    document.body.style.backgroundImage = "url('./img/background.png')";
    document.getElementById('touch').style.display = 'flex';
}


/**
 * Goes back to the start screen by hiding the game canvas and showing the start
 * screen, hiding the back to menu button, hiding the dropdown control, hiding the
 * soundbar, and showing the footer. Also sets the background image to the start screen
 * image.
 */
function backToMenu() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('start').classList.remove('d-none');
    document.getElementById('menu').style.bottom = '50px';
    document.getElementById('backToMenu').classList.add('d-none');
    document.getElementById('dropdownControl').classList.add('d-none');
    document.getElementById('soundbar').classList.remove('flex');
    document.getElementById('footer').classList.remove('d-none');
    document.body.style.backgroundImage = "url('./img/startscreen.png')";
    document.getElementById('touch').style.display = 'none';
    restartGame();
}


/**
 * Toggles the display of the dropdown menu with the controls.
 * If the menu is not displayed, it is shown and the down arrow is hidden.
 * If the menu is displayed, it is hidden and the down arrow is shown.
 */
function toggleDropdown() {
    let dropdown = document.getElementById('dropdownControl');
    let dropdownImg = document.getElementById('dropdown');
    let dropdownImg1 = document.getElementById('dropdown1');
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block';
        dropdownImg.style.display = 'none';
        dropdownImg1.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
        dropdownImg1.style.display = 'none';
        dropdownImg.style.display = 'block';
    }
}


/**
 * Toggles the game canvas to full screen mode.
 * If the canvas is currently in windowed mode, it is set to full screen mode.
 * If the canvas is currently in full screen mode, it is set to windowed mode.
 * The function uses the appropriate full screen mode API depending on the
 * browser vendor (e.g. requestFullscreen for Chrome and Firefox, webkitRequestFullscreen
 * for Safari, and msRequestFullscreen for IE11).
 */
function toggleFullscreen() {
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) { /* Safari */
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { /* IE11 */
        canvas.msRequestFullscreen();
    }
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


// Keyboard event listeners
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


// Keyboard event listeners
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


// Mouse event listeners
// window.addEventListener("mousedown", (e) => {
//     if (e.button == 0 && e.target === canvas) {
//         keyboard.THROW = true;
//     }
// });


// window.addEventListener("mouseup", (e) => {
//     if (e.button == 0 && e.target === canvas) {
//         keyboard.THROW = false;
//     }
// });


/**
 * Handles touch start events on the game canvas.
 * This function prevents the default touch event behavior and checks which
 * virtual button was touched. Depending on the touched button, the corresponding
 * keyboard event is triggered.
 * @param {event} e The touch event object.
 */
function handleTouchStart(e) {
    e.preventDefault();

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    const jumpBtn = document.getElementById('jumpBtn');
    const shootBtn = document.getElementById('shootBtn');

    const leftRect = leftBtn.getBoundingClientRect();
    const rightRect = rightBtn.getBoundingClientRect();
    const jumpRect = jumpBtn.getBoundingClientRect();
    const shootRect = shootBtn.getBoundingClientRect();

    if (touchX >= leftRect.left && touchX <= leftRect.right && touchY >= leftRect.top && touchY <= leftRect.bottom) {
        keyboard.LEFT = true;
    }

    if (touchX >= rightRect.left && touchX <= rightRect.right && touchY >= rightRect.top && touchY <= rightRect.bottom) {
        keyboard.RIGHT = true;
    }

    if (touchX >= jumpRect.left && touchX <= jumpRect.right && touchY >= jumpRect.top && touchY <= jumpRect.bottom) {
        keyboard.SPACE = true;
    }

    if (touchX >= shootRect.left && touchX <= shootRect.right && touchY >= shootRect.top && touchY <= shootRect.bottom) {
        keyboard.THROW = true;
    }
}


/**
 * Resets all keyboard events to false on touch end event.
 */
function handleTouchEnd() {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.SPACE = false;
    keyboard.THROW = false;
}


const touchArea = document.getElementById('touch');
touchArea.addEventListener('touchstart', handleTouchStart, { passive: false });
touchArea.addEventListener('touchend', handleTouchEnd, { passive: false });
touchArea.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });