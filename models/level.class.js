class Level {
    enemies;
    clouds;
    coins;
    totalCoins;
    bottles;
    totalBottles;
    backgroundObjects;
    level_end_x = 2200;

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
