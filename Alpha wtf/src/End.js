class End extends Phaser.Scene {

    constructor() {
        super('end');
    }

    preload(){

    }

    create(){
        this.add.text(640,360,'End')

        if(window.vendeurWin){
            this.add.text(640,560,'Le marchand de saucisse à gagné')
        }
        else if(window.P1Win){
            this.add.text(640,560,'Les Pains au chocolats ont gagnés')
        }
        else{
            this.add.text(640,560,'Les Chocolatines au chocolats ont gagnés')
        }
    }
}