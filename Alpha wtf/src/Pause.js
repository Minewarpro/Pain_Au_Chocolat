class Pause extends Phaser.Scene {

    constructor() {
        super('pause');
    }


    preload() {

    }

    create() {
        let me = this;
        const {width, height} = this.scale

        window.pauseUi = true;
        window.satrtUi = false;

        //BACKGROUND

        //AUDIO

        //TEXT
        window.Resume = this.add.text(width * 0.5, height * 0.55, 'Reprendre', {
            color: '#000000',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7);

        this.Pause = this.add.text(width * 0.5, height * 0.42, 'Pause', {
            color: '#000000',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: 98
        })
            .setOrigin(0.5).setAlpha(1);

        this.Option = this.add.text(width * 0.5, height * 0.62, 'Option', {
            color: '#000000',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7);


        //Rectangle Box
        this.buttonStart = this.add.rectangle(window.Resume.x, window.Resume.y, 300, 75, 0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.scene.resume('game')
                this.scene.stop();
            })
            .on('pointerover', function () {
                window.Resume.setAlpha(1)})
            .on('pointerout', function () {
                window.Resume.setAlpha(0.7)
            })

        this.buttonOption = this.add.rectangle(this.Option.x, this.Option.y, 300, 75, 0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.scene.pause();
                this.scene.launch('option1');
                this.buttonStart.disableInteractive();
                window.Resume.setAlpha(0);
                this.Pause.setAlpha(0);
                this.buttonOption.disableInteractive();
                this.Option.setAlpha(0);
                this.optionUi = false;
            })
            .on('pointerover', function () {
                me.Option.setAlpha(1)})
            .on('pointerout', function () {
                if (me.Option.alpha !== 0) {
                    me.Option.setAlpha(0.7)
                }
            })

        this.Init();
    }


    update() {

        if (this.optionUi) {

        } else {
            this.buttonStart.setInteractive();
            window.Resume.setAlpha(0.7);
            this.buttonOption.setInteractive();
            this.Option.setAlpha(0.7);
            this.Pause.setAlpha(1);
            this.optionUi = true;
        }
    }

    Init() {
        if (window.englishUi) {
            window.Resume.setText('Resume');
        }
        if (window.frenchUi) {
            window.Resume.setText('Reprendre');
        }

    }
}