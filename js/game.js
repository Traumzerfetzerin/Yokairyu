let canvas;
let world;
initLevel();
let keyboard = new Keyboard();
soundManager = new SoundManager();


/**
 * Initializes the game by getting the canvas element and creating a new
 * World object with the canvas and Keyboard object.
 */
// function init() {
//     canvas = document.getElementById('canvas');
//     world = new World(canvas, keyboard);
// }

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById('startImage');

    /**
     * Initializes the game by creating a new World object
     * and linking it to the keyboard and canvas.
     */
    function init() {
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);

    }

    startButton.addEventListener('click', function () {
        init();
    });
});


let gameStarted = false;

const startBtn = document.getElementById('start');
const touchBtn = document.getElementById('touch');
const pointerQuery = window.matchMedia('(pointer: coarse)');


/**
 * Updates the visibility of the touch button controls based on the game state and pointer type.
 *
 * If the game has started and the device supports coarse pointer input (e.g., touch screen),
 * the touch button controls are displayed. Otherwise, they are hidden.
 */
function updateTouchButtonVisibility() {
    if (gameStarted && pointerQuery.matches) {
        touchBtn.style.display = 'flex';
    } else {
        touchBtn.style.display = 'none';
    }
}


// Add event listener to the start button to start the game
startBtn.addEventListener('click', () => {
    gameStarted = true;
    updateTouchButtonVisibility();
});


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
    updateTouchButtonVisibility();
}


pointerQuery.addEventListener('change', updateTouchButtonVisibility);


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
 * Requests the browser to display the specified element in fullscreen mode.
 * 
 * This function attempts to switch the given element to fullscreen by calling
 * the appropriate method for the current browser. It first checks for the modern
 * `requestFullscreen` method, then checks for vendor-prefixed implementations
 * for WebKit and Internet Explorer.
 * 
 * @param {HTMLElement} element - The DOM element to be displayed in fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}


/**
 * Exits fullscreen mode by calling the appropriate method for the current
 * browser. This method first checks for the modern `exitFullscreen` method,
 * then checks for vendor-prefixed implementations for WebKit and Internet
 * Explorer.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


/**
 * Toggles the fullscreen mode for the game container element.
 *
 * If the game is not currently in fullscreen mode, this function requests
 * fullscreen for the game container. If the game is already in fullscreen
 * mode, it exits fullscreen. The function checks for support of the modern
 * `fullscreenElement` property and its vendor-prefixed implementations.
 */
function toggleFullscreen() {
    const container = document.getElementById('game');

    const isFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;

    if (!isFullscreen) {
        enterFullscreen(container);
    } else {
        exitFullscreen();
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
window.addEventListener("keydown", handleKeyDown);

/**
 * Handles keydown events for the game controls.
 * Maps specific key codes to their corresponding action handlers,
 * such as moving right, left, up, down, jumping, throwing, and reloading.
 * @param {KeyboardEvent} e - The event object representing the keydown event.
 */
function handleKeyDown(e) {
    switch (e.keyCode) {
        case 39: // right arrow
        case 68: // D
            handleRight();
            break;
        case 37: // left arrow
        case 65: // A
            handleLeft();
            break;
        case 32: // space
            handleSpace();
            break;
        case 69: // E
            handleThrow();
            break;
        case 82: // R
            handleReload();
            break;
    }
}


/**
 * Activates the right movement control by setting the RIGHT key flag to true.
 * This function is typically called in response to a keydown event for the right arrow key or 'D' key.
 */
function handleRight() {
    keyboard.RIGHT = true;
}


/**
 * Activates the left movement control by setting the LEFT key flag to true.
 * This function is typically called in response to a keydown event for the left arrow key or 'A' key.
 */
function handleLeft() {
    keyboard.LEFT = true;
}


/**
 * Activates the jump control by setting the SPACE key flag to true.
 * This function is typically called in response to a keydown event for the space key.
 */
function handleSpace() {
    keyboard.SPACE = true;
}


/**
 * Activates the throw control by setting the THROW key flag to true.
 * This function is typically called in response to a keydown event for the 'E' key.
 */
function handleThrow() {
    keyboard.THROW = true;
}


/**
 * Handles the reload control by setting the RELOAD key flag to true.
 * This function is typically called in response to a keydown event for the 'R' key.
 * It also reloads the current webpage to restart the game.
 */
function handleReload() {
    keyboard.RELOAD = true;
    restartGame();
}


// Keyboard event listeners
window.addEventListener("keyup", handleKeyUp);

/**
 * Handles keyup events for movement and action keys.
 * This function is called in response to a keyup event and is used to release the
 * corresponding key flag when a key is released.
 * @param {event} e The keyup event object.
 */
function handleKeyUp(e) {
    switch (e.keyCode) {
        case 39: // arrow right
        case 68: // D
            releaseRight();
            break;
        case 37: // arrow left
        case 65: // A
            releaseLeft();
            break;
        case 32: // space
            releaseSpace();
            break;
        case 69: // E
            releaseThrow();
            break;
        case 82: // R
            releaseReload();
            break;
    }
}


/**
 * Releases the right movement control by setting the RIGHT key flag to false.
 * This function is typically called in response to a keyup event for the right arrow key or 'D' key.
 */
function releaseRight() {
    keyboard.RIGHT = false;
}


/**
 * Releases the left movement control by setting the LEFT key flag to false.
 * This function is typically called in response to a keyup event for the left arrow key or 'A' key.
 */
function releaseLeft() {
    keyboard.LEFT = false;
}


/**
 * Releases the jump control by setting the SPACE key flag to false.
 * This function is typically called in response to a keyup event for the space key.
 */
function releaseSpace() {
    keyboard.SPACE = false;
}


/**
 * Releases the throw control by setting the THROW key flag to false.
 * This function is typically called in response to a keyup event for the 'E' key.
 */
function releaseThrow() {
    keyboard.THROW = false;
}


/**
 * Releases the reload control by setting the RELOAD key flag to false.
 * This function is typically called in response to a keyup event for the 'R' key.
 * It also restarts the game by calling the restartGame function.
 */
function releaseReload() {
    keyboard.RELOAD = false;
    restartGame();
}


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
 * Handles the touchstart event for touch controls.
 * 
 * Prevents the default behavior of the event and determines the touch
 * coordinates. Checks if the touch event occurred on any of the control
 * buttons ('leftBtn', 'rightBtn', 'jumpBtn', 'shootBtn') and triggers the
 * corresponding action handlers if a button is touched.
 * 
 * @param {TouchEvent} e - The event object representing the touchstart event.
 */
function handleTouchStart(e) {
    e.preventDefault();

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    if (isTouchOnButton('leftBtn', touchX, touchY)) {
        handleTouchLeft();
    }

    if (isTouchOnButton('rightBtn', touchX, touchY)) {
        handleTouchRight();
    }

    if (isTouchOnButton('jumpBtn', touchX, touchY)) {
        handleTouchJump();
    }

    if (isTouchOnButton('shootBtn', touchX, touchY)) {
        handleTouchShoot();
    }
}


/**
 * Checks if the given touch coordinates are within the bounds of the
 * specified button element.
 * 
 * @param {string} buttonId - The id of the button element to check.
 * @param {number} x - The x coordinate of the touch.
 * @param {number} y - The y coordinate of the touch.
 * @returns {boolean} True if the touch is within the button bounds, false
 * otherwise.
 */
function isTouchOnButton(buttonId, x, y) {
    const btn = document.getElementById(buttonId);
    if (!btn) return false;

    const rect = btn.getBoundingClientRect();
    return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
    );
}


/**
 * Activates the left movement control by setting the LEFT key flag to true.
 * This function is typically called in response to a touchstart event on the left control button.
 */
function handleTouchLeft() {
    keyboard.LEFT = true;
}


/**
 * Activates the right movement control by setting the RIGHT key flag to true.
 * This function is typically called in response to a touchstart event on the right control button.
 */
function handleTouchRight() {
    keyboard.RIGHT = true;
}


/**
 * Activates the jump control by setting the SPACE key flag to true.
 * This function is typically called in response to a touchstart event on the jump control button.
 */
function handleTouchJump() {
    keyboard.SPACE = true;
}


/**
 * Activates the throw control by setting the THROW key flag to true.
 * This function is typically called in response to a touchstart event on the shoot control button.
 */
function handleTouchShoot() {
    keyboard.THROW = true;
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


// Touch event listeners
const touchArea = document.getElementById('touch');
touchArea.addEventListener('touchstart', handleTouchStart, { passive: false });
touchArea.addEventListener('touchend', handleTouchEnd, { passive: false });
touchArea.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });