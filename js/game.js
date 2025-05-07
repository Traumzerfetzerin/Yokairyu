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

    soundManager.initBackgroundSound();
    soundManager.initPlayerSounds();
    soundManager.initMonsterSounds();
    soundManager.initCollectSounds();

    soundManager.isMuted = false;
    soundManager.updateSoundButton();
}



function restartGame() {
    if (typeof world !== 'undefined' && world && typeof world.stopGameLoop === 'function') {
        world.stopGameLoop();
    } else {
        return;
    }
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
 * Stops the game loop and performs cleanup tasks.
 *
 * This function checks if a 'world' object exists and if its method
 * 'stopGameLoop' is available, it invokes the method to stop the game loop.
 * It then hides the canvas and the 'Back to Menu' button by adding the
 * 'd-none' class, effectively cleaning up the game view.
 */
function stopGameLoopAndCleanup() {
    if (typeof world !== 'undefined' && world && typeof world.stopGameLoop === 'function') {
        world.stopGameLoop();
    } else {
        return;
    }

    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('backToMenu').classList.add('d-none');
}


/**
 * Resets the game view to the main menu.
 *
 * This function makes the start button, menu, and footer visible while hiding
 * the touch controls and new game menu. It also updates the background image
 * to the start screen and ensures the soundbar is not displayed in a flex layout.
 */
function resetToMenuView() {
    document.getElementById('start').classList.remove('d-none');
    document.getElementById('menu').style.bottom = '50px';
    document.getElementById('menu').classList.remove('d-none');
    document.getElementById('soundbar').classList.remove('flex');
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
 * Navigates the game back to the main menu.
 *
 * This function stops the current game loop, resets the view to the menu,
 * clears the canvas, and stops all playing sounds. It ensures that the game
 * is properly cleaned up and ready for a new session when the player returns
 * to the main menu.
 */
function backToMenu() {
    stopGameLoopAndCleanup();
    resetToMenuView();
    clearCanvas();
    stopAllSounds();
}


// function backToMenu() {
//     if (typeof world !== 'undefined' && world && typeof world.stopGameLoop === 'function') {
//         world.stopGameLoop();
//     } else {
//         return;
//     }

//     document.getElementById('canvas').classList.add('d-none');
//     document.getElementById('start').classList.remove('d-none');
//     document.getElementById('menu').style.bottom = '50px';
//     document.getElementById('menu').classList.remove('d-none');
//     document.getElementById('backToMenu').classList.add('d-none');
//     document.getElementById('soundbar').classList.remove('flex');
//     document.getElementById('footer').classList.remove('d-none');
//     document.body.style.backgroundImage = "url('./img/startscreen.png')";
//     document.getElementById('touch').style.display = 'none';

//     let newGameMenu = document.getElementById('newGameMenu');
//     newGameMenu.classList.add('d-none');
//     newGameMenu.style.display = 'none';

//     canvas = document.getElementById('canvas');
//     ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     soundManager.stopAll();
// }


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