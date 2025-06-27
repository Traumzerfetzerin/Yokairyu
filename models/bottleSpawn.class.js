class BottleSpawner {
    /**
     * Initializes a new instance of the BottleSpawner class.
     * Sets the bottleIntervalStarted flag to false.
     * Sets up a repeating interval that checks if the bottle array is empty every 1000 milliseconds.
     */
    constructor() {
        this.bottleIntervalStarted = false;

        setInterval(() => {
            this.checkForEmptyBottleArray();
        }, 1000);
    }


    /**
     * Starts the bottle spawning mechanism.
     * If the bottle spawning interval has already been started, this method does nothing.
     * Otherwise, it sets the `bottleIntervalStarted` property to true and starts an interval that
     * spawns a bottle every 2000 milliseconds.
     * The interval spawns a bottle at a random non-overlapping position between 500 and 1660 on the x-axis.
     * If the world and its level are defined, the spawned bottle is added to the level's bottles array.
     * If the world or level are not yet defined, a warning is logged to the console.
     */
    startSpawning() {
        if (this.bottleIntervalStarted) return;

        this.bottleIntervalStarted = true;

        this.spawnIntervalId = setInterval(() => {
            let bottle = new Bottles();
            bottle.x = bottle.getNonOverlappingX(500, 1660, 90);

            if (world !== undefined && world.level && world.level.bottles) {
                world.level.bottles.push(bottle);
            } else {
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


    /**
     * Checks if the bottle array in the world.level is empty and restarts the bottle spawning if so.
     * If the world or level are not yet defined, this method does nothing.
     * @private
     */
    checkForEmptyBottleArray() {
        if (typeof world === 'undefined' || !world.level || !Array.isArray(world.level.bottles)) {
            return;
        }

        if (world.level.bottles.length === 0) {
            this.bottleIntervalStarted = false;
            this.startSpawning();
        }
    }
}
