/**
 * Adds a keydown event listener to the window object.
 * When a key is pressed, the `handleKeyDown` function is called to handle the keyboard input.
 */
window.addEventListener("keydown", handleKeyDown);

/**
 * Handles keydown events for the game controls.
 * Maps specific key codes to their corresponding action handlers,
 * such as moving right, left, up, down, jumping, throwing, and reloading.
 * @param {KeyboardEvent} e - The event object representing the keydown event.
 */
function handleKeyDown(e) {
    switch (e.keyCode) {
        case 39:
        case 68:
            handleRight();
            break;
        case 37:
        case 65:
            handleLeft();
            break;
        case 32:
            handleSpace();
            break;
        case 69:
            handleThrow();
            break;
        case 82:
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


/**
 * Adds a keyup event listener to the window object.
 * When a key is released, the `handleKeyUp` function is invoked to handle the event.
 */
window.addEventListener("keyup", handleKeyUp);


/**
 * Handles keyup events for movement and action keys.
 * This function is called in response to a keyup event and is used to release the
 * corresponding key flag when a key is released.
 * @param {event} e The keyup event object.
 */
function handleKeyUp(e) {
    switch (e.keyCode) {
        case 39:
        case 68:
            releaseRight();
            break;
        case 37:
        case 65:
            releaseLeft();
            break;
        case 32:
            releaseSpace();
            break;
        case 69:
            releaseThrow();
            break;
        case 82:
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


/**
 * Selects the element with the ID 'touch' and assigns it to `touchArea`.
 * Adds touch event listeners to handle user interactions:
 * - 'touchstart': calls `handleTouchStart` when a touch starts.
 * - 'touchend': calls `handleTouchEnd` when a touch ends.
 * - 'touchmove': prevents the default behavior to disable scrolling or other default actions during touch movement.
 * 
 * All listeners are added with `{ passive: false }` to allow calling `preventDefault()` within the event handlers.
 */
const touchArea = document.getElementById('touch');
touchArea.addEventListener('touchstart', handleTouchStart, { passive: false });
touchArea.addEventListener('touchend', handleTouchEnd, { passive: false });
touchArea.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });