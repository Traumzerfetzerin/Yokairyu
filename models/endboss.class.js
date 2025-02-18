class Endboss extends MovableObject {

    width = 500;
    height = 500;
    y = -20;

    IMAGES_WALK = [
        './img/endboss/4_enemie_boss_chicken/2_alert/G5.png',
        './img/endboss/4_enemie_boss_chicken/2_alert/G6.png',
        './img/endboss/4_enemie_boss_chicken/2_alert/G7.png',
        './img/endboss/4_enemie_boss_chicken/2_alert/G8.png',
        './img/endboss/4_enemie_boss_chicken/2_alert/G9.png',
        './img/endboss/4_enemie_boss_chicken/2_alert/G10.png',
        './img/endboss/4_enemie_boss_chicken/2_alert/G11.png',
        './img/endboss/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.x = 2000;
        this.animate();
    }

    animate(){
        setInterval(()=> {
            this.playAnimation(this.IMAGES_WALK);
        }, 200);
    }
}