class SoundManager {
    /**
     * Initializes a new instance of the SoundManager class.
     * Sets up audio elements for various sounds used in the game.
     * Each sound is associated with a key in the 'sounds' object for easy access.
     * The sounds include background music, player actions, monster sounds, and collect item sounds.
     * The background sound is set to loop continuously.
     */
    constructor() {
        this.isMuted = false;

        // Background-Sound
        this.audioBackground = new Audio('./audio/backgroundSound.mp3');
        this.audioBackground.loop = true;
        this.audioBackground.volume = 0.1;

        // Player-Sounds
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

        // Monster-Sounds
        this.audioSpiderWalk = new Audio('./audio/spiderWalk.mp3');
        this.audioSpiderWalk.volume = 0.1;

        this.audioDragonRoar = new Audio('./audio/dragonRoar.mp3');
        this.audioDragonRoar.volume = 0.1;

        this.audioSpiderDead = new Audio('./audio/spiderDead.mp3');

        this.audioDragonDead = new Audio('./audio/dragonGrowl.mp3');

        // Collect-Sounds
        this.audioCollectShoot = new Audio('./audio/collectShoot.mp3');
        
        this.audioCollectLoot = new Audio('./audio/collectLoot.mp3');
    }


    /**
     * Toggles the mute state of all sounds in the game.
     * 
     * If the mute state is true, all sounds are muted. If the mute state is false,
     * all sounds are unmuted.
     * 
     * If no value is provided, the mute state is toggled.
     * @param {boolean} [state] - The mute state. If not provided, the mute state is toggled.
     */
    toggleSounds(state = !this.isMuted) {
        this.isMuted = state;

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
     * Updates the sound button icon based on the mute state.
     *
     * If the sound is muted, the button icon is changed to the muted icon.
     * Otherwise, the button icon is set to the volume icon.
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
            this[name].loop = loop;
            this[name].play();
        } else {
            console.warn(`Sound ${name} not found!`);
        }
    }
}