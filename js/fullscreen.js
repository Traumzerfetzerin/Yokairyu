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