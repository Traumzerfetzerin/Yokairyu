let level1;
/**
 * Initializes the first level of the game.
 * Creates a new Level object with the given arrays of enemies, clouds, coins, bottles, and background objects.
 * The level is then stored in the level1 variable.
 * @function
 * @return {void} - Does not return a value.
 */
function initLevel() {
    level1 = new Level(
        [
            new Chicken(50),
            new Chicken(51),
            new Chicken(52),
            new Chicken(53),
            new Chicken(54),
            new Chicken(55),
            new Endboss(56),
        ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],
        [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins()
        ],
        [
            new Bottles(),
            new Bottles(),
            new Bottles()
        ],
        [
            new BackgroundObject('./img/background/Plan-5.png', -720),
            new BackgroundObject('./img/background/Plan-3.png', -720),
            new BackgroundObject('./img/background/Plan-2.png', -720),
            new BackgroundObject('./img/background/Plan-1.png', -720),

            new BackgroundObject('./img/background/Plan-5.png', 0),
            new BackgroundObject('./img/background/Plan-3.png', 0),
            new BackgroundObject('./img/background/Plan-2.png', 0),
            new BackgroundObject('./img/background/Plan-1.png', 0),

            new BackgroundObject('./img/background/Plan-5.png', 720),
            new BackgroundObject('./img/background/Plan-3.png', 720),
            new BackgroundObject('./img/background/Plan-2.png', 720),
            new BackgroundObject('./img/background/Plan-1.png', 720),

            new BackgroundObject('./img/background/Plan-5.png', 720 * 2),
            new BackgroundObject('./img/background/Plan-3.png', 720 * 2),
            new BackgroundObject('./img/background/Plan-2.png', 720 * 2),
            new BackgroundObject('./img/background/Plan-1.png', 720 * 2),

            new BackgroundObject('./img/background/Plan-5.png', 720 * 3),
            new BackgroundObject('./img/background/Plan-3.png', 720 * 3),
            new BackgroundObject('./img/background/Plan-2.png', 720 * 3),
            new BackgroundObject('./img/background/Plan-1.png', 720 * 3),

            new BackgroundObject('./img/background/Plan-5.png', 720 * 4),
            new BackgroundObject('./img/background/Plan-3.png', 720 * 4),
            new BackgroundObject('./img/background/Plan-2.png', 720 * 4),
            new BackgroundObject('./img/background/Plan-1.png', 720 * 4),

            new BackgroundObject('./img/background/Plan-5.png', 720 * 5),
            new BackgroundObject('./img/background/Plan-3.png', 720 * 5),
            new BackgroundObject('./img/background/Plan-2.png', 720 * 5),
            new BackgroundObject('./img/background/Plan-1.png', 720 * 5),
        ],
    );
}