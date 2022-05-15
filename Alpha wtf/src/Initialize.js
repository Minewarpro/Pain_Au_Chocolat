class Initialize extends Phaser.Scene {

    constructor() {
        super('Init');
    }

    create(){
        this.scene.start('start')
        window.startUi=false;
        window.pauseUi=false;
        window.frenchUi = true;
        window.englishUi = false;
        window.keyboard_QWERTY = false;
        window.keyboard_AZERTY = true;
    }
}