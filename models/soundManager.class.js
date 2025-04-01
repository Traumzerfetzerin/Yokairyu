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
        this.sounds = {};

        // Background-Sound
        this.audioBackground = new Audio('./audio/backgroundSound.mp3');
        this.audioBackground.loop = true;

        // Player-Sounds
        this.audioWalk = new Audio('./audio/playerWalk.mp3');
        this.audioJump = new Audio('./audio/playerJump.mp3');
        this.audioShoot = new Audio('./audio/playerShoot.mp3');
        this.audioHurt = new Audio('./audio/playerHurt.mp3');
        this.audioDead = new Audio('./audio/playerDead.mp3');

        // Monster-Sounds
        this.audioSpiderWalk = new Audio('./audio/spiderWalk.mp3');
        this.audioDragonRoar = new Audio('./audio/dragonRoar.mp3');
        this.audioSpiderDead = new Audio('./audio/spiderDead.mp3');

        // Collect-Sounds
        this.audioCollectShoot = new Audio('./audio/collectShoot.mp3');
        this.audioCollectLoot = new Audio('./audio/collectLoot.mp3');

        // Add sounds to the sound manager
        this.addSound('background', this.audioBackground);
        this.addSound('walk', this.audioWalk);
        this.addSound('jump', this.audioJump);
        this.addSound('shoot', this.audioShoot);
        this.addSound('hurt', this.audioHurt);
        this.addSound('dead', this.audioDead);
        this.addSound('spiderWalk', this.audioSpiderWalk);
        this.addSound('dragonRoar', this.audioDragonRoar);
        this.addSound('spiderDead', this.audioSpiderDead);
        this.addSound('collectShoot', this.audioCollectShoot);
        this.addSound('collectLoot', this.audioCollectLoot);
    }


    /**
     * Adds a sound to the sound manager's collection.
     *
     * @param {string} name - The unique name or identifier for the sound.
     * @param {HTMLAudioElement} sound - The audio element representing the sound to be added.
     */
    addSound(name, sound) {
        this.sounds[name] = sound;
    }


    /**
     * Toggles the mute state of all sounds.
     *
     * If the sound is currently playing, it is muted.
     * If the sound is currently muted, it is unmuted.
     *
     * The mute state of all sounds is updated in the {@link SoundManager#sounds} object.
     * The sound button icon is also updated based on the mute state.
     */
    toggleSounds() {
        this.isMuted = !this.isMuted;

        Object.values(this.sounds).forEach((sound) => {
            sound.muted = this.isMuted;
        });

        this.updateSoundButton();
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
        if (this.sounds[name]) {
            this.sounds[name].loop = loop;
            this.sounds[name].play();
        } else {
            console.warn(`Sound ${name} not found!`);
        }
    }


    /**
     * Loads a single sound effect.
     * @param {string} name Unique name or identifier for the sound.
     * @param {string} src URL of the sound file to load.
     */
    loadSound(name, src) {
        const audio = new Audio(src);
        this.sounds[name] = audio;
    }
}


// Create an instance of SoundManager and assign it to the global window object
window.soundManager = new SoundManager();