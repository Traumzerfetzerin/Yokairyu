class Level {
    enemies;
    clouds;
    coins;
    totalCoins;
    bottles;
    totalBottles;
    backgroundObjects;
    level_end_x = 2200;


    /**
     * Initializes a new level with the specified game objects.
     *
     * @param {Array} enemies - An array of enemy objects present in the level.
     * @param {Array} clouds - An array of cloud objects for the background.
     * @param {Array} coins - An array of coin objects to be collected.
     * @param {Array} bottles - An array of bottle objects to be collected.
     * @param {Array} backgroundObjects - An array of background objects for the level.
     */
    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.totalCoins = coins.length;
        this.bottles = bottles;
        this.totalBottles = bottles.length;
        this.backgroundObjects = backgroundObjects;
    }
}
