class option extends Phaser.Scene {

    constructor() {
        super('option');
    }

    preload(){

    }

    create(){
        let me = this;
        const {width, height} = this.scale

        window.change=false;





        this.OptionExit = this.add.text(width * 0.08, height * 0.1, 'Quitter', {
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7);

        this.AZERTY = this.add.text(width * 0.2, height * 0.3, 'AZERTY', {
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7)
            .setTint(0xff0000);

        this.QWERTY = this.add.text(width * 0.2, height * 0.5, 'QWERTY', {
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7);

        this.English = this.add.text(width * 0.5, height * 0.5, 'Anglais', {
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7);

        this.French = this.add.text(width * 0.5, height * 0.3, 'Français', {
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7)
            .setTint(0xff0000);


        this.buttonOptionExit = this.add.rectangle(this.OptionExit.x, this.OptionExit.y, 300, 75, 0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                if (window.startUi) {
                    this.scene.stop();
                    this.scene.resume('start')
                } else if (window.pauseUi) {
                    this.scene.stop();
                    this.scene.resume('pause')
                }
            })
            .on('pointerover', function () {
                me.OptionExit.setAlpha(1)
            })
            .on('pointerout', function () {
                if (me.OptionExit.alpha !== 0) {
                    me.OptionExit.setAlpha(0.7)
                }
            })

        this.buttonQWERTY = this.add.rectangle(this.QWERTY.x, this.QWERTY.y, 300, 75, 0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                window.keyboard_QWERTY = true;
                window.keyboard_AZERTY = false;
                this.keyboard();
            })
            .on('pointerover', function () {
                me.QWERTY.setAlpha(1)
            })
            .on('pointerout', function () {
                if (me.QWERTY.alpha !== 0) {
                    me.QWERTY.setAlpha(0.7)
                }
            })

        this.buttonAZERTY = this.add.rectangle(this.AZERTY.x, this.AZERTY.y, 300, 75, 0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                window.keyboard_QWERTY = false;
                window.keyboard_AZERTY = true;
                this.keyboard();
            })
            .on('pointerover', function () {
                me.AZERTY.setAlpha(1)
            })
            .on('pointerout', function () {
                if (me.AZERTY.alpha !== 0) {
                    me.AZERTY.setAlpha(0.7)
                }
            })

        this.buttonEnglish = this.add.rectangle(this.English.x, this.English.y, 300, 75, 0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                window.englishUi = true;
                window.frenchUi = false;
                this.english()
            })
            .on('pointerover', function () {
                me.English.setAlpha(1)
            })
            .on('pointerout', function () {
                if (me.English.alpha !== 0) {
                    me.English.setAlpha(0.7)
                }
            })

        this.buttonFrench = this.add.rectangle(this.French.x, this.French.y, 300, 75, 0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                window.frenchUi = true;
                window.englishUi = false;
                this.french()
            })
            .on('pointerover', function () {
                me.French.setAlpha(1)
            })
            .on('pointerout', function () {
                if (me.French.alpha !== 0) {
                    me.French.setAlpha(0.7)
                }
            })

        if (window.englishUi) {
            this.english();
        }
        if (window.frenchUi) {
            this.french();
        }
        this.keyboard();

    }
    keyboard(){
        if(window.keyboard_AZERTY){
            this.AZERTY.setTint(0xff0000);
            this.QWERTY.setTint(0xffffff);
        } else if (window.keyboard_QWERTY){
            this.QWERTY.setTint(0xff0000);
            this.AZERTY.setTint(0xffffff);
        }

    }

    english(){
        console.log('setEnglish')
        this.English.setTint(0xff0000);
        this.French.setTint(0xffffff);
        this.English.setText('English');
        this.OptionExit.setText('Exit');
        this.French.setText('French');
        if (window.startUi){
            window.Play.setText('Start Game');
        }
        if (window.pauseUi){
            window.Resume.setText('Resume');
        }
        window.change=true;
    }

    french(){
        console.log('setFrench')
        this.French.setTint(0xff0000);
        this.English.setTint(0xffffff);
        this.English.setText('Anglais');
        this.OptionExit.setText('Quitter');
        this.French.setText('Français');
        if (window.startUi){
            window.Play.setText('Commencer à Jouer');
        }
        if (window.pauseUi){
            window.Resume.setText('Reprendre');
        }
        window.change=true;
    }

    update(){
    }

}