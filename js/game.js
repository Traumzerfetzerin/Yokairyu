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