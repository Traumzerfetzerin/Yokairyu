let canvas;
let world;
let collissions;
let keyboard = new Keyboard();
soundManager = new SoundManager();
let startButton = document.getElementById('startImage');

let gameStarted = false;

const startBtn = document.getElementById('start');
const touchBtn = document.getElementById('touch');
const pointerQuery = window.matchMedia('(pointer: coarse)');

let intervalId = [];


/**
 * Initializes the game by getting the canvas element and creating a new
 * World object with the canvas and Keyboard object.
 *
 * The World object is created after a delay of 1000 ms to ensure that the
 * game over screen and the winning screen are displayed before the game
 * starts.
 */
function init() {
    canvas = document.getElementById('canvas');
    initLevel();

    setTimeout(() => {
        world = new World(canvas, keyboard);
    }, 1000);
}


// Add event listener to the start button to start the game
startButton.addEventListener('click', function () {
    init();
});


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


// Add event listener to the pointer query to update touch button visibility
pointerQuery.addEventListener('change', updateTouchButtonVisibility);


// Add event listener to the start button to start the game
startBtn.addEventListener('click', () => {
    gameStarted = true;
    updateTouchButtonVisibility();
});


/**
 * Starts the game by updating the visibility of the UI elements and toggling the background sound.
 *
 * This function is called when the start button is clicked. It hides the start button, menu, footer,
 * and title text, and shows the back to menu button, soundbar, and game canvas. It also sets the
 * background image to the game background and updates the visibility of the touch button controls
 * based on the game state and pointer type.
 */
function startGame() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('start').style.display = 'none';
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('backToMenu').classList.remove('d-none');
    document.getElementById('soundbar').style.display = 'flex';
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('title').querySelector('p').classList.add('d-none');
    document.body.style.setProperty('background-image', 'url("./img/background.png")', 'important');
    updateTouchButtonVisibility();

    soundManager.toggleSounds(false);
    soundManager.updateSoundButton();
}


/**
 * Updates the UI to its game running state when the game is restarted.
 * Hides the start button, menu, footer, and the 'Impressum' link at the bottom of the page.
 * Shows the touch controls and the soundbar.
 * Also hides the 'New Game' menu and makes sure the background image is visible.
 */
function updateUIForRestart() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('start').style.display = 'flex';
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('backToMenu').classList.remove('d-none');
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('title').querySelector('p').classList.add('d-none');
    document.body.style.setProperty('background-image', 'url("./img/background.png")', 'important');
    document.getElementById('touch').style.display = 'flex';

    let newGameMenu = document.getElementById('newGameMenu');
    newGameMenu.classList.add('d-none');
    newGameMenu.style.display = 'none';
    let soundbar = document.getElementById('soundbar');
    soundbar.style.display = 'flex';
}


/**
 * Restarts the game by updating the UI, starting the game, and initializing the game state.
 *
 * This function updates the UI to reflect the game running state, starts the game loop
 * by calling startGame(), and reinitializes the game world and level by invoking init().
 */
function restartGame() {
    updateUIForRestart();
    startGame();
    init();
    stopAllSounds();
    soundManager.toggleSounds(false);
}


/**
 * Resets the UI to the menu state by hiding the game canvas, soundbar, and touch controls
 * and showing the start button, menu, and footer. Also resets the background image.
 */
function resetToMenuView() {
    document.getElementById('start').style.display = 'flex';
    document.getElementById('menu').style.bottom = '50px';
    document.getElementById('menu').classList.remove('d-none');
    document.getElementById('soundbar').style.display = 'none';
    document.getElementById('footer').classList.remove('d-none');
    document.body.style.backgroundImage = "url('./img/startscreen.png')";
    document.getElementById('touch').style.display = 'none';

    let newGameMenu = document.getElementById('newGameMenu');
    newGameMenu.classList.add('d-none');
    newGameMenu.style.display = 'none';
}


/**
 * Clears the canvas by filling it with a transparent color.
 * This is necessary to remove any previously drawn objects from the canvas.
 */
function clearCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


/**
 * Stops all playing sounds in the game.
 *
 * This function is a wrapper for the SoundManager's stopAll method.
 * It is used to stop all sounds in the game when the player navigates
 * back to the main menu.
 */
function stopAllSounds() {
    soundManager.stopAll();
}


/**
 * Navigates back to the main menu by stopping the game loop, resetting the UI,
 * clearing the canvas, and stopping all sounds.
 *
 * This function hides the game canvas and 'Back to menu' button, stops the
 * game loop by calling `world.stopGameLoop()`, resets the UI to the menu state
 * using `resetToMenuView()`, clears the canvas with `clearCanvas()`, and stops
 * all sounds by invoking `stopAllSounds()`.
 */
function backToMenu() {
    world.stopGameLoop();
    resetToMenuView();
    clearCanvas();
    stopAllSounds();

    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('backToMenu').classList.add('d-none');
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