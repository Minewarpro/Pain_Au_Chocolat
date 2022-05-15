class Player2 {


    constructor(scene) {
        let me = this;
        this.scene = scene
        this.cameras = scene
        this.player = this.scene.physics.add.sprite(500, 300, 'player');
        this.player.setDisplaySize(32, 32);
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.initSpeedX = me.player.body.velocity.x
        this.initSpeedY = me.player.body.velocity.y
        this.player.setMaxVelocity(300, 300);
        this.player.name="player2"

        this.player.nbPain = 5;
        this.player.maxStock = 5;
        this.player.nbLivre = 0;

        this.player.action = 0;
        this.piment=false;
        this.player.boost = false;

        this.flaghaut = false;
        this.flagbas = false;
        this.flagleft = false;
        this.flagright = false;

        this.isBouncing = false;
        window.KeyEnable2=true;

        this.velocityPlayer = 300;

        this.initKeyboard();


        this.speed = {
            speedDash: 2,
        }

        this.dash = this.scene.tweens.add({
            targets: this.speed,
            speedDash: 0,
            ease: "Circ.easeInOut", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 300,

            onUpdate: function () {
                me.player.setVelocityX(me.initSpeedX * me.speed.speedDash)
                me.player.setVelocityY(me.initSpeedY * me.speed.speedDash)

            },
            onComplete: function () {
                me.isDashing = false;
                console.log('finish');
                me.player.body.x = 50;
                me.player.body.y = 300;
                me.player.setMaxVelocity(300);
                setTimeout(function () {
                    me.dashIsUp = true
                    me.flagDash = false;
                    console.log('dash op')
                }, 1000)
            }
        });

        this.angle={
            angleTurn:0,
        }

        this.turn = this.scene.tweens.add({
            targets: this.angle,
            angleTurn: 1200,
            duration:1000,
            onUpdate: function (){
                    me.scene.player1.player.setAngle(me.angle.angleTurn)
            },
            onComplete: function() {
                me.scene.player1.player.setAngle(0)
                window.KeyEnable1 = true;
            }
        });
        this.turn.pause()

    }
    initKeyboard() {
        let me = this;


            this.scene.input.keyboard.on('keydown', function (kevent) {
                if (window.KeyEnable2) {
                    switch (kevent.keyCode) {
                        case Phaser.Input.Keyboard.KeyCodes.M:
                            me.FonctionAction()

                            break;
                        case Phaser.Input.Keyboard.KeyCodes.ENTER:
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
                }
            });
            this.scene.input.keyboard.on('keyup', function (kevent) {
                switch (kevent.keyCode) {
                    case Phaser.Input.Keyboard.KeyCodes.ENTER:
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
                    case Phaser.Input.Keyboard.KeyCodes.ESC:
                        me.Pdown = true;
                        me.scene.Pauseflag = false;
                        break;
                }
            });
    }

    Dash() {
        let me = this;
        if (this.dashIsUp) {
            if (this.flagDash) {

            } else {
                me.player.body.setMaxVelocityY(1000);
                this.dashIsUp = false;
                this.flagDash = true;
                this.isDashing = true;


                this.initSpeedX = me.player.body.velocity.x
                this.initSpeedY = me.player.body.velocity.y
                this.player.setMaxVelocity(600);
                this.dash.play();

            }
        }
    }
    haut(){
        this.player.setVelocityY(this.velocityPlayer * -1);
    }
    bas(){
        this.player.setVelocityY(this.velocityPlayer);
    }
    moveRight(){
        this.player.setVelocityX(this.velocityPlayer);
        this.player.setFlipX(false);
    }
    moveLeft(){
        this.player.setVelocityX(this.velocityPlayer * -1);
        this.player.setFlipX(true);

    }

    moveLeftRelease(){
        // ralenti gauche
        switch(true){
            case this.flagleft:
                // fais rien
                break;
            case !this.qDown:
                if (this.piment) {
                    this.velocityPlayer = 600;
                }else {
                    this.velocityPlayer = 300;
                }
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
                if (this.piment) {
                    this.velocityPlayer = 600;
                }else {
                    this.velocityPlayer = 300;
                }
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
                if (this.piment) {
                    this.velocityPlayer = 600;
                }else {
                    this.velocityPlayer = 300;
                }
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
                if (this.piment) {
                    this.velocityPlayer = 600;
                }else {
                    this.velocityPlayer = 300;
                }
                this.player.setVelocityY(0);
                this.flagbas=true;
                break;
        }
    }

    stop() {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
    }

    move() {

            if (!this.isDashing) {
                switch (true) {
                    case this.shiftDown:
                        this.Dash();
                        break;
                    case this.qDown && this.sDown:
                        if (this.piment) {
                            this.velocityPlayer = 400;
                        } else {
                            this.velocityPlayer = 200;
                        }
                        this.bas();
                        this.moveLeft();
                        this.flagleft = false;
                        this.flagbas = false;
                        break;
                    case this.dDown && this.sDown:
                        if (this.piment) {
                            this.velocityPlayer = 400;
                        }else {
                            this.velocityPlayer = 200;
                        }
                        this.bas();
                        this.moveRight();
                        this.flagbas = false;
                        this.flagright = false;
                        break;
                    case this.zDown && this.qDown:
                        if (this.piment) {
                            this.velocityPlayer = 400;
                        }else {
                            this.velocityPlayer = 200;
                        }
                        this.haut();
                        this.moveLeft()
                        this.flagleft = false;
                        this.flaghaut = false;
                        break;
                    case this.zDown && this.dDown:
                        if (this.piment) {
                            this.velocityPlayer = 400;
                        }else {
                            this.velocityPlayer = 200;
                        }
                        this.haut()
                        this.moveRight()
                        this.flaghaut = false;
                        this.flagright = false;
                        break;
                    case this.qDown:
                        this.moveLeft()
                        this.flagleft = false;
                        break;
                    case this.dDown:
                        this.moveRight();
                        this.flagright = false;
                        break;
                    case this.zDown:
                        this.haut()
                        this.flaghaut = false;
                        break;
                    case this.sDown:
                        this.bas();
                        this.flagbas = false;
                        break;
                    default:
                        this.stop();
                        break;
                }
            }

            this.moveBasRelease()
            this.moveRightRelease()
            this.moveHautRelease()
            this.moveLeftRelease()


        }

    tir(){
        let me =this;
        this.oeuf = this.scene.physics.add.sprite(this.player.body.x, this.player.body.y, 'spike');
        this.oeuf.setDisplaySize(20,20);
        if (this.player.body.velocity.x===0 && this.player.body.velocity.y===0){
            this.oeuf.setVelocityY(400);
        } else {
            this.oeuf.setVelocityX(this.player.body.velocity.x * 2);
            this.oeuf.setVelocityY(this.player.body.velocity.y * 2);
        }
        this.scene.physics.add.collider(this.scene.player1.player, this.oeuf,function(){
            me.turn.play();
            me.oeuf.destroy();
            window.KeyEnable1 = false;
        });
    }
    Functionboost(){
        let me =this;
console.log("rkjgs")
        this.velocityPlayer = 600;
        this.player.setMaxVelocity(600, 600);
        this.piment=true;
        setTimeout(function(){
            me.velocityPlayer = 300;
            me.player.setMaxVelocity(300, 300);
            me.piment=false;
        },2000)
    }
    FonctionAction(){

        let me = this;
        console.log(this.player.action)
        switch (this.player.action) {
            case 1:
                me.tir()
                this.player.action = 0;
                break;
            case 2:
                me.scene.Flaque2()
                this.player.action = 0;
                break;
            case 3:
                console.log("tape J2")
                this.player.action = 0;
                break;
            default:
                console.log("rien J2")
                break;

        }

    }
}



