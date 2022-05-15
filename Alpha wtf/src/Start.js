class Start extends Phaser.Scene {

    constructor() {
        super('start');
    }

    preload(){
        this.load.image('ecranTitre', 'Alpha wtf/assets/images/VSMENU.png');

    }

    create(){
        let me = this;
        const {width, height}= this.scale

        this.optionUi = true;
        window.startUi = true;

        //ECRAN TITRE
        this.ecranTitre = this.add.image(0, 0, 'ecranTitre').setOrigin(0, 0);


        //SOUNDS

        //TEXT
        window.Play = this.add.text(width*0.5,height*0.55,'Commencer à Jouer',{
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize : 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7);

        this.Option = this.add.text(width*0.5,height*0.65,'Option',{
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize : 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7);


        //Rectangle Box
        this.buttonStart = this.add.rectangle( window.Play.x, window.Play.y,300,75,0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,()=> {
                this.scene.start('game')
                window.startUi = false;
            })
            .on('pointerover', function () {
                window.Play.setAlpha(1)
            })
            .on('pointerout', function () {
                window.Play.setAlpha(0.7)
            })

        this.buttonOption = this.add.rectangle( this.Option.x, this.Option.y,300,75,0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,()=> {
                this.scene.pause();
                this.scene.launch('option');
                //this.ecranTitre.setAlpha(0.4);
                this.buttonStart.disableInteractive();
                window.Play.setAlpha(0);
                this.buttonOption.disableInteractive();
                this.Option.setAlpha(0);
                this.optionUi = false;
            })
            .on('pointerover', function () {
                me.Option.setAlpha(1)
            })
            .on('pointerout', function () {
                if (me.Option.alpha !==0) {
                    me.Option.setAlpha(0.7)
                }
            })


    }

    update(){


        if (this.optionUi){

        } else {
            this.ecranTitre.setAlpha(1);
            this.buttonStart.setInteractive();
            window.Play.setAlpha(0.7);
            this.buttonOption.setInteractive();
            this.Option.setAlpha(0.7);
            this.optionUi = true;
        }
    }

}