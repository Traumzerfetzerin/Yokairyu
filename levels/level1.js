const level1 = new Level(
    [
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        new Endboss(),
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
        // new Bottles(),
        // new Bottles(),
        // new Bottles(),
        // new Bottles(),
        // new Bottles(),
        new Bottles()
    ],

    [
        new BackgroundObject('./img/background/Plan-5.png', -720),
        new BackgroundObject('./img/background/Plan-3.png', -720),
        new BackgroundObject('./img/background/Plan-2.png', -720),
        new BackgroundObject('./img/background/Plan-1.png', -720),

        new BackgroundObject('./img/background/Plan-5.png', 0),
        // new BackgroundObject('./img/background/Plan-4.png', 0),
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
    ],
);