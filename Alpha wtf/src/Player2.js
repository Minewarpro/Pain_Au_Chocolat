class Player2 {


    constructor(scene) {
        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(500, 300, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.scene.physics.add.collider(this.player, this.scene.platforms);


        this.flaghaut=false;
        this.flagbas=false;
        this.flagleft=false;
        this.flagright=false;

        this.initKeyboard();
    }

    initKeyboard() {
        let me = this;


        this.scene.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown = true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.dDown = true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.qDown = true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.DOWN:
                    me.sDown = true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.UP:
                    me.zDown = true;
                    break;
            }
        });
        this.scene.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown = false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.dDown = false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.qDown = false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.DOWN:
                    me.sDown = false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.UP:
                    me.zDown = false;
                    break;
            }
        });
    }

    haut(){
        this.player.setVelocityY(-300);
    }
    bas(){
        this.player.setVelocityY(300);
    }
    moveRight(){
        this.player.setVelocityX(300);
        this.player.setFlipX(false);
    }
    moveLeft(){
        this.player.setVelocityX(-300);
        this.player.setFlipX(true);
    }

    moveLeftRelease(){
        // ralenti gauche
        switch(true){
            case this.flagleft:
                // fais rien
                break;
            case !this.qDown:
                this.player.setVelocityX(0);
                this.flagleft=true;
                break;
        }
    }
    moveRightRelease(){
        // ralenti gauche
        switch(true){
            case this.flagright:
                // fais rien
                break;
            case !this.dDown:
                this.player.setVelocityX(0);
                this.flagright=true;
                break;
        }
    }
    moveHautRelease(){
        // ralenti gauche
        switch(true){
            case this.flaghaut:
                // fais rien
                break;
            case !this.zDown:
                this.player.setVelocityY(0);
                this.flaghaut=true;
                break;
        }
    }
    moveBasRelease(){
        // ralenti gauche
        switch(true){
            case this.flagbas:
                // fais rien
                break;
            case !this.sDown:
                this.player.setVelocityY(0);
                this.flagbas=true;
                break;
        }
    }
    stop(){
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
    }

    move(){

        switch (true) {
            case this.qDown && this.sDown:
                this.moveLeft()
                this.bas()
                this.flagX=false;
                this.flagleft=false;
                this.flagbas=false;
                break;
            case this.dDown && this.sDown:
                this.moveRight();
                this.bas()
                this.flagbas=false;
                this.flagright = false;
                break;
            case this.zDown && this.qDown:
                this.haut()
                this.moveLeft()
                this.flagleft=false;
                this.flaghaut=true;
                break;
            case this.zDown && this.dDown:
                this.haut();
                this.moveRight()
                this.flagright = false;
                break;
            case this.qDown:
                this.moveLeft()
                this.flagleft=false;
                break;
            case this.dDown:
                this.moveRight();
                break;
            case this.zDown:
                this.haut()
                this.flaghaut=false;
                break;
            case this.sDown:
                this.bas();
                this.flagbas=false;
                break;
            default:
                this.stop();
                break;
        }

        this.moveBasRelease()
        this.moveRightRelease()
        this.moveHautRelease()
        this.moveLeftRelease()


    }

}



