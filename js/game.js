let canvas;
let world;
let keyboard = new Keyboard();

audioBackground = new Audio('./audio/backgroundSound.mp3');


/**
 * Initializes the game by getting the canvas element and creating a new
 * World object with the canvas and Keyboard object.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function startGame() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('start').classList.add('d-none');
    document.getElementById('backToMenu').classList.remove('d-none');
    document.getElementById('soundbar').classList.add('flex');
    document.getElementById('footer').classList.add('d-none');
    document.body.style.backgroundImage = "url('./img/background.png')";
    enableAudioOnUserInteraction();
}

function backToMenu() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('start').classList.remove('d-none');
    document.getElementById('backToMenu').classList.add('d-none');
    document.getElementById('dropdownControl').classList.add('d-none');
    document.getElementById('soundbar').classList.remove('flex');
    document.getElementById('footer').classList.remove('d-none');
    document.body.style.backgroundImage = "url('./img/startscreen.png')";
}

function toggleSound() {
    let img = document.getElementById('sound');
    if (img.src.includes("volumen.png")) {
        img.src = "./img/icons/keinen-ton.png";
    }

    else {
        img.src = "./img/icons/volumen.png";
    }
}
// if (audioBackground.paused) {
//     audioBackground.play();
// } else {
//     audioBackground.pause();
// }


/**
 * Enables audio playback on user interaction, i.e. on a click or key press event.
 * This is necessary because autoplaying audio is not allowed in most browsers.
 * Once the audio has been started, the event listeners are removed.
 */
function enableAudioOnUserInteraction() {
    let playAudio = () => {
        this.audioBackground.loop = true;
        this.audioBackground.volume = 0.1;

        this.audioBackground.play().then(() => {
            console.log("Audio started.");
        }).catch(error => {
            console.log("Error during playback:", error);
        });

        document.removeEventListener("click", playAudio);
        document.removeEventListener("keydown", playAudio);
    };

    document.addEventListener("click", playAudio, { once: true });
    document.addEventListener("keydown", playAudio, { once: true });
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

canvas = document.getElementById('canvas');
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
window.addEventListener("mousedown", (e) => {
    if (e.button == 0 && e.target === canvas) {
        keyboard.THROW = true;
    }
});


window.addEventListener("mouseup", (e) => {
    if (e.button == 0 && e.target === canvas) {
        keyboard.THROW = false;
    }
});