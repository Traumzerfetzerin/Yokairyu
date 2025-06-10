class SoundManager {
    /**
     * Initializes the SoundManager class.
     * Retrieves the current mute state from local storage, and if no value is found, sets it to false.
     * Initializes all sound effects and background music.
     */
    constructor() {
        this.isMuted = JSON.parse(localStorage.getItem('isMuted')) || false;

        this.initBackgroundSound();
        this.initPlayerSounds();
        this.initMonsterSounds();
        this.initCollectSounds();
    }


    /**
     * Initializes the background sound for the game.
     * Loads the audio file for background sound, sets it to loop continuously,
     * and sets the initial volume to 0.1.
     */
    initBackgroundSound() {
        this.audioBackground = new Audio('./audio/backgroundSound.mp3');
        this.audioBackground.loop = true;
        this.audioBackground.volume = 0.1;
    }


    /**
     * Initializes sound effects for the player.
     * Loads the audio files for walking, jumping, shooting, getting hurt, and dying.
     * Sets the initial volume for each sound effect.
     */
    initPlayerSounds() {
        this.audioWalk = new Audio('./audio/playerWalk.mp3');
        this.audioWalk.volume = 0.2;

        this.audioJump = new Audio('./audio/playerJump.mp3');
        this.audioJump.volume = 0.2;

        this.audioShoot = new Audio('./audio/playerShoot.mp3');
        this.audioShoot.volume = 0.2;

        this.audioHurt = new Audio('./audio/playerHurt.mp3');
        this.audioHurt.volume = 0.1;

        this.audioDead = new Audio('./audio/playerDead.mp3');
        this.audioDead.volume = 0.05;
    }


    /**
     * Initializes sound effects for monsters in the game.
     * Loads the audio files for the spider's walk, the dragon's roar,
     * and the death sounds for both the spider and dragon.
     * Sets the initial volume for the spider's walk and dragon's roar.
     */
    initMonsterSounds() {
        this.audioSpiderWalk = new Audio('./audio/spiderWalk.mp3');
        this.audioSpiderWalk.volume = 0.1;

        this.audioDragonRoar = new Audio('./audio/dragonRoar.mp3');
        this.audioDragonRoar.volume = 0.1;

        this.audioSpiderDead = new Audio('./audio/spiderDead.mp3');
        this.audioDragonDead = new Audio('./audio/dragonGrowl.mp3');
        this.audioDragonDead.volume = 0.1;
    }


    /**
     * Initializes sound effects for collecting items in the game.
     * Loads the audio files for collecting coins and bottles.
     */
    initCollectSounds() {
        this.audioCollectShoot = new Audio('./audio/collectShoot.mp3');
        this.audioCollectLoot = new Audio('./audio/collectLoot.mp3');
    }


    /**
     * Toggles the sound state of the game. If the sound is currently enabled, it
     * disables it. If the sound is currently disabled, it enables it.
     * @param {boolean} [state] - The state of the sound. If not provided, it will
     * toggle the current state.
     */
    toggleSounds(state = !this.isMuted) {
        this.isMuted = state;

        localStorage.setItem('isMuted', JSON.stringify(this.isMuted));

        Object.values(this).forEach((elem) => {
            if (elem instanceof HTMLAudioElement) {
                this.muteMe(elem, state);
            }
        });

        this.updateSoundButton();
    }


    /**
     * Mutes a given HTMLAudioElement and pauses it.
     * 
     * @param {HTMLAudioElement} elem - The audio element to mute.
     * @param {boolean} state - The mute state. If true, the audio is muted. Otherwise, the audio is unmuted.
     */
    muteMe(elem, state) {
        elem.muted = state;
        elem.pause();
    }


    /**
     * Stops all sound effects in the game.
     * 
     * Mutes and resets all audio elements for the background sound, player sounds,
     * monster sounds, and collecting sounds.
     */
    stopAll() {
        this.stopBackgroundSound();
        this.stopPlayerSounds();
        this.stopMonsterSounds();
        this.stopCollectSounds();
    }


    /**
     * Stops the background sound effect for the game.
     * 
     * Mutes the background audio and resets its playback time to the beginning.
     */
    stopBackgroundSound() {
        if (this.audioBackground) {
            this.muteMe(this.audioBackground, true);
            this.audioBackground.currentTime = 0;
        }
    }


    /**
     * Stops the sound effects for the player in the game.
     * 
     * Mutes and resets the current time of the audio elements for walking, jumping,
     * shooting, getting hurt, and dying.
     */
    stopPlayerSounds() {
        if (this.audioWalk) {
            this.muteMe(this.audioWalk, true);
            this.audioWalk.currentTime = 0;
        }

        if (this.audioJump) {
            this.muteMe(this.audioJump, true);
            this.audioJump.currentTime = 0;
        }

        if (this.audioShoot) {
            this.muteMe(this.audioShoot, true);
            this.audioShoot.currentTime = 0;
        }

        if (this.audioHurt) {
            this.muteMe(this.audioHurt, true);
            this.audioHurt.currentTime = 0;
        }

        if (this.audioDead) {
            this.muteMe(this.audioDead, true);
            this.audioDead.currentTime = 0;
        }
    }


    /**
     * Stops the sound effects for monsters in the game.
     * 
     * Mutes and resets the current time of the audio elements for the
     * spider's walk, the dragon's roar, and the death sounds for both
     * the spider and dragon.
     */
    stopMonsterSounds() {
        if (this.audioSpiderWalk) {
            this.muteMe(this.audioSpiderWalk, true);
            this.audioSpiderWalk.currentTime = 0;
        }

        if (this.audioDragonRoar) {
            this.muteMe(this.audioDragonRoar, true);
            this.audioDragonRoar.currentTime = 0;
        }

        if (this.audioSpiderDead) {
            this.muteMe(this.audioSpiderDead, true);
            this.audioSpiderDead.currentTime = 0;
        }

        if (this.audioDragonDead) {
            this.muteMe(this.audioDragonDead, true);
            this.audioDragonDead.currentTime = 0;
        }
    }


    /**
     * Stops the sound effects for collecting items in the game.
     * 
     * Mutes and resets the current time of the audio elements for collecting
     * coins and bottles.
     */
    stopCollectSounds() {
        if (this.audioCollectShoot) {
            this.muteMe(this.audioCollectShoot, true);
            this.audioCollectShoot.currentTime = 0;
        }

        if (this.audioCollectLoot) {
            this.muteMe(this.audioCollectLoot, true);
            this.audioCollectLoot.currentTime = 0;
        }
    }


    /**
     * Updates the sound button in the UI to reflect the current state of the sound.
     * 
     * If the sound is currently muted, the button's image is set to the "no sound"
     * icon. Otherwise, the icon is set to the "sound" icon.
     */
    updateSoundButton() {
        const soundButton = document.getElementById('sound');
        if (this.isMuted) {
            soundButton.src = './img/icons/keinen-ton.png';
        } else {
            soundButton.src = './img/icons/volumen.png';
        }
    }


    /**
     * Plays a sound by its name.
     *
     * This function plays the specified sound from the sound manager's collection.
     * Optionally, the sound can be set to loop continuously.
     *
     * @param {string} name - The name of the sound to play.
     * @param {boolean} [loop=false] - Indicates whether the sound should loop.
     *                                 Defaults to false.
     */
    playSound(name, loop = false) {
        if (this[name]) {
            if (this.isMuted) return;
            this[name].loop = loop;
            this[name].play();
        }
    }
}