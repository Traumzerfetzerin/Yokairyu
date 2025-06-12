class BottleSpawner {
    /**
     * Initializes a new instance of the BottleSpawner class.
     * Sets the `bottleIntervalStarted` property to false, which indicates that the bottle spawning interval has not yet been started.
     */
    constructor() {
        this.bottleIntervalStarted = false;
    }


    /**
     * Starts the bottle spawning mechanism.
     * If the bottle spawning interval has already been started, this function does nothing.
     * Otherwise, it sets the `bottleIntervalStarted` property to true and starts an interval that
     * creates a new bottle every 10 seconds and adds it to the level's bottle array, if the level
     * and its bottle array exist.
     */
    startSpawning() {
        if (this.bottleIntervalStarted) return;

        this.bottleIntervalStarted = true;

        this.spawnIntervalId = setInterval(() => {
            let bottle = new Bottles();
            bottle.x = bottle.getNonOverlappingX(500, 1660, 90);
            if (world !== undefined && world.level && world.level.bottles) {
                world.level.bottles.push(bottle);
            }
        }, 2000);
    }


    /**
     * Stops the bottle spawning mechanism.
     * Clears the interval that was used to spawn bottles and sets the `bottleIntervalStarted` property to false.
     */
    stopSpawning() {
        clearInterval(this.spawnIntervalId);
        this.bottleIntervalStarted = false;
    }
}
