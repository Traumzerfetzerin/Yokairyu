let canvas;
let world;

let keyboard = new Keyboard();
soundManager = new SoundManager();
let startButton = document.getElementById('startImage');


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


// Event-Listener, um das Spiel zu starten, wenn der Start-Button geklickt wird
startButton.addEventListener('click', function () {
    init();  // init wird hier global aufgerufen
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
 * Starts the game by hiding the start menu, showing the game canvas and the soundbar,
 * and updating the visibility of the touch button controls based on the game state and pointer type.
 * Also sets the background image of the game to the background.png image.
 */
function startGame() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('start').classList.add('d-none');
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('backToMenu').classList.remove('d-none');
    document.getElementById('soundbar').classList.add('flex');
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('title').querySelector('p').classList.add('d-none');
    document.body.style.setProperty('background-image', 'url("./img/background.png")', 'important');
    updateTouchButtonVisibility();
}


/**
 * Restarts the game by setting up the initial UI and game state.
 * - Shows the game canvas and hides the start menu.
 * - Resets the background image to the default game background.
 * - Hides the footer and the start title description.
 * - Displays the 'Back to menu' button and touch controls.
 * - Hides the new game menu.
 * - Initializes and un-mutes the sound manager, and updates the sound button.
 * - Clears the canvas and initializes the game world.
 */
function restartGame() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('start').classList.add('d-none');
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

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    soundManager.initBackgroundSound();
    soundManager.initPlayerSounds();
    soundManager.initMonsterSounds();
    soundManager.initCollectSounds();

    soundManager.isMuted = false;
    soundManager.updateSoundButton();

    init();
}


pointerQuery.addEventListener('change', updateTouchButtonVisibility);


/**
 * Goes back to the start menu, stopping the game loop, hiding the game canvas, and
 * showing the start menu and soundbar. Also clears the canvas and resets the
 * background image to the start screen image.
 */
function backToMenu() {
    if (typeof world !== 'undefined' && world && typeof world.stopGameLoop === 'function') {
        world.stopGameLoop();
    } else {
        return;
    }

    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('start').classList.remove('d-none');
    document.getElementById('menu').style.bottom = '50px';
    document.getElementById('menu').classList.remove('d-none');
    document.getElementById('backToMenu').classList.add('d-none');
    document.getElementById('soundbar').classList.remove('flex');
    document.getElementById('footer').classList.remove('d-none');
    document.body.style.backgroundImage = "url('./img/startscreen.png')";
    document.getElementById('touch').style.display = 'none';

    let newGameMenu = document.getElementById('newGameMenu');
    newGameMenu.classList.add('d-none');
    newGameMenu.style.display = 'none';

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    soundManager.stopAll();
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