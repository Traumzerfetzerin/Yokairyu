let canvas;
let world;
let collissions;
let keyboard = new Keyboard();
let soundManager = new SoundManager();
let startButton = document.getElementById('startImage');
soundManager.setCurrentMutedState();

let gameStarted = false;

const startBtn = document.getElementById('start');
const touchBtn = document.getElementById('touch');
const pointerQuery = window.matchMedia('(pointer: coarse)');

let intervalId = [];


/**
 * Initializes the application.
 * 
 * Gets the canvas element and assigns it to the global `canvas` variable.
 * Initializes the level by calling the `initLevel` function.
 * Starts the bottle spawner by calling the `startSpawning` method.
 * After a 1-second delay, creates a new World instance with the canvas and keyboard
 * and starts the game loop by calling the `startGameLoop` method.
 * Finally, sets the current muted state for all audio elements in the SoundManager.
 */
function init() {
    canvas = document.getElementById('canvas');

    initLevel();
    bottleSpawner.startSpawning();

    setTimeout(() => {
        world = new World(canvas, keyboard);
        world.startGameLoop();
        soundManager.setCurrentMutedState();
    }, 1000);
}


/**
 * Adds a click event listener to the start button.
 * When the button is clicked, the `init` function is called to initialize the application.
 */
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


/**
 * Adds a change event listener to the pointerQuery object.
 * When the pointer media query state changes, the `updateTouchButtonVisibility` function is called
 * to update the visibility of the touch-related button(s).
 */
pointerQuery.addEventListener('change', updateTouchButtonVisibility);


/**
 * Adds a click event listener to the startBtn element.
 * When clicked, sets `gameStarted` to true and calls `updateTouchButtonVisibility`
 * to update the UI accordingly.
 */
startBtn.addEventListener('click', () => {
    gameStarted = true;
    updateTouchButtonVisibility();
});


/**
 * Starts the game by hiding the menu, footer, and title, and showing the
 * back to menu button, soundbar, and game canvas. The touch button controls
 * are also shown if the device supports coarse pointer input (e.g., touch
 * screen).
 */
function startGame() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('start').style.display = 'none';
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('backToMenu').classList.remove('d-none');
    document.getElementById('soundbar').style.display = 'flex';
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('title').querySelector('p').classList.add('d-none');
    document.body.classList.remove('startscreen');
    document.body.classList.add('game');
    updateTouchButtonVisibility();

    soundManager.updateSoundButton();
}


/**
 * Updates the UI for a game restart by hiding the menu, footer, and title, and showing
 * the back to menu button, soundbar, and game canvas. The touch button controls are also
 * shown if the device supports coarse pointer input (e.g., touch screen). The 'New Game'
 * menu is also hidden.
 */
function updateUIForRestart() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('start').style.display = 'flex';
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('backToMenu').classList.remove('d-none');
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('title').querySelector('p').classList.add('d-none');
    document.body.classList.remove('game');
    document.body.classList.add('startscreen');
    document.getElementById('touch').style.display = 'flex';
    document.getElementById('startImage').classList.add('d-none');

    let newGameMenu = document.getElementById('newGameMenu');
    newGameMenu.classList.add('d-none');
    newGameMenu.style.display = 'none';
    let soundbar = document.getElementById('soundbar');
    soundbar.style.display = 'flex';
}


/**
 * Restarts the game by stopping the current game loop, updating the UI 
 * for a restart, and reinitializing the game after a delay.
 * 
 * If a game world is active, it stops the game loop to halt the ongoing game.
 * The UI is then updated to reflect the restart state.
 * After a 1-second delay, the game is reinitialized and started again.
 */
function restartGame() {
    if (window.world) {
        window.world.stopGameLoop();
    }

    updateUIForRestart();

    setTimeout(() => {
        init();
        startGame();
    }, 1000);
}


/**
 * Resets the UI to its main menu state by hiding the game canvas and controls and showing the main menu.
 * 
 * This function is called when the player navigates back to the main menu from the game over screen or the winning screen.
 * It hides the game canvas and controls, shows the main menu, and resets the background image to the main menu background.
 */
function resetToMenuView() {
    document.getElementById('start').style.display = 'flex';
    document.getElementById('startImage').style.display = 'flex';
    document.getElementById('menu').classList.remove('d-none');
    document.getElementById('soundbar').style.display = 'none';
    document.getElementById('footer').classList.remove('d-none');
    document.body.classList.remove('game');
    document.body.classList.add('startscreen');
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
 * Navigates the game back to the main menu.
 *
 * This function stops the game loop, resets the UI to the main menu view,
 * clears the game canvas, and stops all sounds. It also hides the game 
 * canvas and 'Back to menu' button to ensure the UI reflects the main menu state.
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


/**
 * Opens the Impressum page by removing the 'd-none' class from the Impressum element
 * and hiding the start button and footer. The body class is changed from 'startscreen' to 'game'.
 * This function is called when the 'Impressum' link is clicked in the footer.
 */
function openImpressum() {
    document.getElementById('impressum').classList.remove('d-none');
    document.getElementById('start').style.display = 'none';
    document.getElementById('footer').classList.add('d-none');
    document.body.classList.remove('startscreen');
    document.body.classList.add('game');
}


/**
 * Closes the Impressum page by re-adding the 'd-none' class to the Impressum element
 * and showing the start button and footer. The body class is changed from 'game' to 'startscreen'.
 * This function is called when the 'Back to Yokairyu' link is clicked in the Impressum page.
 */
function closeImpressum() {
    document.getElementById('impressum').classList.add('d-none');
    document.getElementById('start').style.display = 'flex';
    document.getElementById('footer').classList.remove('d-none');
    document.body.classList.add('startscreen');
    document.body.classList.remove('game');
}