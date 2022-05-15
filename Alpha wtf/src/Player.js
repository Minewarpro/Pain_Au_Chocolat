class Player {


    constructor(scene) {
        let me = this;
        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(50, 300, 'player');
        this.player.setDisplaySize(32,32);
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.initSpeedX = me.player.body.velocity.x
        this.initSpeedY = me.player.body.velocity.y
        this.player.setMaxVelocity(300, 300);
        this.player.name="player1"

        this.player.nbPain = 5;
        this.player.maxStock = 5;
        this.player.nbLivre = 0;

        this.player.action = 0;
        this.piment=false;
        this.slow=false;

        this.flaghaut=false;
        this.flagbas=false;
        this.flagleft=false;
        this.flagright=false;

        this.isBouncing = false;
        window.KeyEnable1=true;

        this.velocityPlayer = 300;

        this.initKeyboard();



        this.speed={
            speedDash:2,
        }

        this.dash = this.scene.tweens.add({
            targets: this.speed,
            speedDash: 0,
            ease: "Circ.easeInOut", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 300,

            onUpdate: function(){
               me.player.setVelocityX(me.initSpeedX * me.speed.speedDash)
               me.player.setVelocityY(me.initSpeedY * me.speed.speedDash)

            },
            onComplete: function(){
                me.isDashing = false;
                console.log('finish');
                me.player.body.x = 50;
                me.player.body.y = 300;
                me.player.setMaxVelocity(300);
                setTimeout(function() {
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
                me.scene.player2.player.setAngle(me.angle.angleTurn)
            },
            onComplete: function() {
                me.scene.player2.player.setAngle(0)
                window.KeyEnable2 = true;
            }
        });
        this.turn.pause()

    }

    initKeyboard() {
        let me = this;


        this.scene.input.keyboard.on('keydown', function (kevent) {
            if (window.KeyEnable1) {
                switch (kevent.keyCode) {
                    case Phaser.Input.Keyboard.KeyCodes.E:
                        me.FonctionAction()
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                        me.shiftDown = true;
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.D:
                        me.dDown = true;
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.Q:
                        me.qDown = true;
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.S:
                        me.sDown = true;
                        break;
                    case Phaser.Input.Keyboard.KeyCodes.Z:
                        me.zDown = true;
                        break;
                }
            }
        });
        this.scene.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown = false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.dDown = false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                        me.qDown = false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.S:
                        me.sDown = false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Z:
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

                //on creer une particule 'farine'=le nom donné dans le load du png dans la scene
                let particles = this.scene.add.particles('farine');
                //creer l'emitteur de particules
                this.particlesEmit = particles.createEmitter({
                    alpha: {start: 40, end: 100}, //je crois que ça donne une transparence
                    scale: {start: 0.4, end: 0.7}, //donne une taille, ici j'ai fait un start/end on peut aussi supprimer et lui donner une taille fixe
                    accelerationX: -88,
                    lifespan: {min: 60, max: 120}, //durée de vie
                    // angle: {min: 0, max: 360}, //la particules s'incline sur un certain angle
                    // rotation: {min: 0, max: 360}, //la particules rotate sur elle même
                    frequency: 500 * 5, //nombre de fois ou la particule apparait
                    // speedX: {min: -30*2, max: 88*2},
                    // radial: false,

                })
                this.particlesEmit.startFollow(this.player)
                particles.setDepth(1);
                this.scene.time.delayedCall(100, function () {
                    particles.destroy();
                });
                console.log("destroy particles")

                //on creer une particule 'farine'=le nom donné dans le load du png dans la scene
                //creer l'emitteur de particules
                this.particlesEmitEnd = particles.createEmitter({
                    alpha: {start: 40, end: 100}, //je crois que ça donne une transparence
                    scale: {start: 0.4, end: 0.7}, //donne une taille, ici j'ai fait un start/end on peut aussi supprimer et lui donner une taille fixe
                    accelerationX: 88,
                    lifespan: {min: 60, max: 120}, //durée de vie
                    // angle: {min: 0, max: 360}, //la particules s'incline sur un certain angle
                    // rotation: {min: 0, max: 360}, //la particules rotate sur elle même
                    frequency: 500 * 5, //nombre de fois ou la particule apparait
                    speedX: {min: 30 * 2, max: -88 * 2},
                    // radial: false,


                })
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
                }else if(this.slow) {
                    this.velocityPlayer = 100;
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
                }else if(this.slow) {
                    this.velocityPlayer = 100;
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
                }else if(this.slow) {
                    this.velocityPlayer = 100;
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
                }else if(this.slow) {
                    this.velocityPlayer = 100;
                }else {
                    this.velocityPlayer = 300;
                }

                this.player.setVelocityY(0);
                this.flagbas=true;
                break;
        }
    }

    stop(){
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
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
        this.scene.physics.add.collider(this.scene.player2.player, this.oeuf,function(){
            me.turn.play();
            me.oeuf.destroy();
            window.KeyEnable2 = false;
        });
    }
    flaque(){
        let me =this;
        this.beurre = this.scene.physics.add.sprite(this.player.body.x, this.player.body.y, 'beurre');
        this.beurre.setDisplaySize(64,64);
        this.beurre.body.setEnable(false);

        this.Reset = me.scene.time.addEvent({
            delay: 300,
            callback: ()=>{
                this.beurre.body.setEnable(true);
            },
            loop: false,
        })
        if (this.player.body.velocity.x===0){
            this.beurre.setAngle(90)
        }
        this.scene.physics.add.overlap(this.scene.player2.player, this.beurre,function(){
            me.scene.player2.Functionslow()
            this.Reset = me.scene.time.addEvent({
                delay: 5000,
                callback: ()=>{
                    me.scene.tweens.add({
                        targets: me.beurre,
                        duration:100,
                        scale:0,
                        onComplete: function(){
                            me.beurre.destroy()
                        }
                    });

                },
                loop: false,
            })
        });
        this.scene.physics.add.overlap(this.player, this.beurre,function(){
            me.Functionslow()
            this.Reset = me.scene.time.addEvent({
                delay: 5000,
                callback: ()=>{
                    me.scene.tweens.add({
                        targets: me.beurre,
                        duration:100,
                        scale:0,
                        onComplete: function(){
                            me.beurre.destroy()
                        }
                    });

                },
                loop: false,
            })
        });
    }

    move(){

        if (!this.isDashing){
            switch (true) {
                case this.shiftDown:
                    this.Dash();
                    break;
                case this.qDown && this.sDown:
                    if (this.piment) {
                        this.velocityPlayer = 400;
                    }else if(this.slow) {
                        this.velocityPlayer = 100;
                    }else {
                        this.velocityPlayer = 200;
                    }
                    this.bas();
                    this.moveLeft();
                    this.flagleft=false;
                    this.flagbas=false;
                    break;
                case this.dDown && this.sDown:
                    if (this.piment) {
                        this.velocityPlayer = 400;
                    }else if(this.slow) {
                        this.velocityPlayer = 100;
                    }else {
                        this.velocityPlayer = 200;
                    }
                    this.bas();
                    this.moveRight();
                    this.flagbas=false;
                    this.flagright=false;
                    break;
                case this.zDown && this.qDown:
                    if (this.piment) {
                        this.velocityPlayer = 400;
                    }else if(this.slow) {
                        this.velocityPlayer = 100;
                    }else {
                        this.velocityPlayer = 200;
                    }
                    this.haut();
                    this.moveLeft()
                    this.flagleft=false;
                    this.flaghaut=false;
                    break;
                case this.zDown && this.dDown:
                    if (this.piment) {
                        this.velocityPlayer = 400;
                    }else if(this.slow) {
                        this.velocityPlayer = 100;
                    }else {
                        this.velocityPlayer = 200;
                    }
                    this.haut()
                    this.moveRight()
                    this.flaghaut=false;
                    this.flagright=false;
                    break;
                case this.qDown:
                    this.moveLeft()
                    this.flagleft=false;
                    break;
                case this.dDown:
                    this.moveRight();
                    this.flagright=false;
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
        }


        this.moveBasRelease()
        this.moveRightRelease()
        this.moveHautRelease()
        this.moveLeftRelease()


    }
    Functionboost(){
        let me =this;

        this.velocityPlayer = 600;
        this.player.setMaxVelocity(600, 600);
        this.piment=true;
        setTimeout(function(){
            me.velocityPlayer = 300;
            me.player.setMaxVelocity(300, 300);
            me.piment=false;
        },2000)
    }
    Functionslow(){
        let me =this;
        this.velocityPlayer = 150;
        this.player.setMaxVelocity(150, 150);
        this.slow=true;
        setTimeout(function(){
            me.velocityPlayer = 300;
            me.player.setMaxVelocity(300, 300);
            me.slow=false;
        },2000)
    }
    FonctionAction(){
        switch (this.player.action) {
            case 1:
                this.tir()
                this.player.action = 0;
                break;
            case 2:
                this.flaque()
                this.player.action = 0;
                break;
            default:
                console.log("rien")
                break;

        }
    }
    }



