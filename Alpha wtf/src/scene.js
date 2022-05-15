class scene extends Phaser.Scene {

    constructor() {
        super('game');
    }

    preload() {
        this.load.image('background', 'Alpha wtf/assets/images/Base.jpg');
        this.load.image('spike', 'Alpha wtf/assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'Alpha wtf/assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('pnj', 'Alpha wtf/assets/images/pnj.png');
        this.load.image('tilesSol', 'Alpha wtf/assets/tilesets/objet.png');
        this.load.image('tilesBat', 'Alpha wtf/assets/tilesets/TileSetBat.png');
        this.load.image('voitureTurbo', 'Alpha wtf/assets/images/voitureturbo.png');
        this.load.image('voiture', 'Alpha wtf/assets/images/voiture.png');
        this.load.image('amis', 'Alpha wtf/assets/images/amis.png');
        this.load.image('beurre', 'Alpha wtf/assets/images/Beurre.png');
        this.load.image('chef', 'Alpha wtf/assets/images/Chef.png');
        this.load.image('cercle', 'Alpha wtf/assets/images/Cercle.png');
        this.load.image('oeuf', 'Alpha wtf/assets/images/Oeuf.png');
        this.load.image('Oeuficon', 'Alpha wtf/assets/images/OeufUp.png');
        this.load.image('BeurreIcon', 'Alpha wtf/assets/images/BeurreUp.png');

        //J1
        this.load.image('J1-1', 'Alpha wtf/assets/animation/J2/J21.png')
        this.load.image('J1-2', 'Alpha wtf/assets/animation/J2/J22.png')
        this.load.image('J1-3', 'Alpha wtf/assets/animation/J2/J23.png')
        this.load.image('J1-4', 'Alpha wtf/assets/animation/J2/J24.png')
        this.load.image('J1Idle', 'Alpha wtf/assets/animation/J2/IdleJ2.png')

        //J2
        this.load.image('J2-1', 'Alpha wtf/assets/animation/J1/J11.png')
        this.load.image('J2-2', 'Alpha wtf/assets/animation/J1/J12.png')
        this.load.image('J2-3', 'Alpha wtf/assets/animation/J1/J13.png')
        this.load.image('J2-4', 'Alpha wtf/assets/animation/J1/J14.png')
        this.load.image('J2Idle', 'Alpha wtf/assets/animation/J1/IdleJ1.png')

        //Zone ami
        this.load.spritesheet('ami',  'Alpha wtf/assets/animation/zoneAmi/mainsVertes.png', {frameWidth: 128, frameHeight: 96})


        for(var i = 1; i < 6; i++) {
            this.load.image('Box'+i, 'Alpha wtf/assets/animation/box/Box'+i+'.png');
        }

        for(var i = 1; i < 5; i++) {
            this.load.image('PNJ1'+i, 'Alpha wtf/assets/images/PNJ2ANIM_0'+i+'.png');
        }

        for(var i = 1; i < 5; i++) {
            this.load.image('PNJ2'+i, 'Alpha wtf/assets/images/PNJ1Violet_0'+i+'.png');
        }

        for(var i = 1; i < 5; i++) {
            this.load.image('PNJ3'+i, 'Alpha wtf/assets/images/PNJFemme_0'+i+'.png');
        }

        for(var i = 1; i < 5; i++) {
            this.load.image('PNJ4'+i, 'Alpha wtf/assets/images/PNJF2_0'+i+'.png');
        }

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'Alpha wtf/assets/tilemaps/level1.json');
        this.load.image('tilesTreeBush', 'Alpha wtf/assets/tilesets/TileSetTreeBush.png');

        this.load.image('background', 'Alpha wtf/assets/images/Base.jpg');

        // Load FX pour particules etc
        this.load.image('farine', 'Alpha wtf/assets/images/farine.png');

        // Load des son
        this.load.audio('ambiance',['Alpha wtf/assets/son/ambiance-ville.wav']);
        this.load.audio('BInventaire',['Alpha wtf/assets/son/bonus-inventaire.wav']);

        this.load.audio('client',['Alpha wtf/assets/son/client.wav']);
        this.load.audio('crash',['Alpha wtf/assets/son/crash.wav']);
        this.load.audio('dash',['Alpha wtf/assets/son/dash2.wav']);
        this.load.audio('glissade',['Alpha wtf/assets/son/glissade.wav']);
        this.load.audio('pain',['Alpha wtf/assets/son/pain.wav']);
        this.load.audio('musique',['Alpha wtf/assets/son/Musique.wav']);

    }


    create() {
        //son
        this.ambiance = this.sound.add('ambiance',{ loop: true, volume:1});
        this.musique = this.sound.add('musique',{ loop: true, volume:0.6});
        if(this.temp === this.temp){
            this.ambiance.play()
            this.musique.play()
        }

        this.hit = this.sound.add('crash',{ loop: false, volume:1.2});

        this.client = this.sound.add('client',{ loop: false, volume:1.2});

        this.glissade = this.sound.add('glissade',{ loop: true, volume:1.2});

        this.BInventaire = this.sound.add('BInventaire',{ loop: false, volume:1.2});


        let me = this;
        this.temp = 0;
        this.temp = 1800;
        this.vendeurFLag=false;
        this.Pauseflag = false;

        window.vendeurWin=false;
        window.P1Win=false;
        window.P2Win=false;

        this.flag=false;
        const map = this.make.tilemap({key: 'map'});

        const tilesetSol = map.addTilesetImage('TilesetObjet', 'tilesSol');
        this.platforms = map.createStaticLayer('Sol', tilesetSol);

        const tilesetTreeBush = map.addTilesetImage('TileSetTreeBush', 'tilesTreeBush');


        const tilesetBat = map.addTilesetImage('TileSetBat', 'tilesBat');
        this.platforms = map.createStaticLayer('Bat', tilesetBat);

        this.player1 = new Player(this)

        this.player2 = new Player2(this)

        this.pnj = new Pnjia(this, this.player1, this.player2)

        this.vendeur = new Vendeur(this, this.player1, this.player2)
        this.vendeur.vendeur.setVisible(false);
        this.vendeur.vendeur.body.setEnable(false);

        this.collide = new Collide(this, this.player1, this.player2, this.pnj, this.vendeur)

        this.recupPain = new RecupPain(this, this.player1, this.player2)

        this.item = new Item(this, this.player1, this.player2, this.recupPain)

        this.voitures = new Voitures(this, this.player1, this.player2, this.pnj)

        this.playerCollider = this.physics.add.collider(this.player1.player, this.player2.player, this.tuch,null,this)
        this.playerColliderVendeur1 = this.physics.add.collider(this.player1.player, this.vendeur.vendeur, this.tuchVendeur,null,this)
        this.playerColliderVendeur2 = this.physics.add.collider(this.player2.player, this.vendeur.vendeur, this.tuchVendeur,null,this)

        this.platforms = map.createStaticLayer('TreeBush', tilesetTreeBush);

        this.initialTime = 180;

        this.text1 = this.add.text(433, 80, this.player1.player.nbLivre).setFontSize(24);

        this.text2 = this.add.text(880, 80, this.player2.player.nbLivre).setFontSize(24);

        this.text3 = this.add.text(1170,690, this.vendeur.nbLivree).setFontSize(24);

        this.text = this.add.text(643, 70, this.formatTime(this.initialTime)).setFontSize(24);

        // Each 1000 ms call onEvent
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

        this.OeufIcon = this.add.sprite(940,80,'Oeuficon')
        this.OeufIcon.setDisplaySize(40,40)
        this.OeufIcon.setVisible(false)


        this.BeurreIcon = this.physics.add.sprite(433-30,80,'BeurreIcon')
        this.BeurreIcon.setDisplaySize(40,40)
        this.BeurreIcon.setVisible(false)

        this.speed={
            speedDash:3,
        }

        this.angle={
            angleTurn:0,
        }

        this.bump = this.tweens.add({
            targets: this.speed,
            speedDash: 0,
            ease: "Circ.easeInOut", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 300,

            onUpdate: function(){
                if(me.player2.isBouncing){
                    me.player2.player.setVelocityX(me.initSpeedX * me.speed.speedDash)
                    me.player2.player.setVelocityY(me.initSpeedY * me.speed.speedDash)
                }
                if (me.player1.isBouncing) {
                    me.player1.player.setVelocityX(me.initSpeedX * me.speed.speedDash)
                    me.player1.player.setVelocityY(me.initSpeedY * me.speed.speedDash)
                }
            },
            onComplete: function(){
                if(me.player2.isBouncing){
                    me.player2.isBouncing = false;
                    me.player2.player.setMaxVelocity(300);
                    window.KeyEnable2 = true;
                }
                if (me.player1.isBouncing) {
                    me.player1.isBouncing = false;
                    me.player1.player.setMaxVelocity(300);
                    window.KeyEnable1 = true;
                }

                me.playerCollider = me.physics.add.collider(me.player1.player, me.player2.player, me.tuch,null,me)

            }
        });
        this.turn = this.tweens.add({
            targets: this.angle,
            angleTurn: 1200,
            duration:300,
            onUpdate: function (){
                if(me.player2.isBouncing) {
                    me.player2.player.setAngle(me.angle.angleTurn)
                }
                else if (me.player1.isBouncing) {
                    me.player1.player.setAngle(me.angle.angleTurn)
                }
            },
            onComplete: function(){
                me.player2.player.setAngle(0)
                me.player1.player.setAngle(0)
            }
        });

        this.bump.pause();
        this.turn.pause();

        this.center = this.physics.add.sprite(671,391);
        this.cameras.main.startFollow(this.center)

    }
    BonusSound(){
        this.BInventaire.play()
    }
    Hitsound(){
        this.hit.play()
    }
    SoundClient(){
        this.client.play()
    }
    SoundGlissade(){
        this.glissade.play()
    }

    onEvent ()
    {
        this.initialTime -= 1; // One second
        this.text.setText(this.formatTime(this.initialTime));
    }
    formatTime(seconds){
        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }

    tuch(){
        let me = this;

        if (this.player1.isDashing){
            me.player2.player.setMaxVelocity(1000);
            this.physics.world.removeCollider(this.playerCollider);
            window.KeyEnable2 = false;
            this.player2.isBouncing = true;
            this.initSpeedX = me.player1.player.body.velocity.x;
            this.initSpeedY = me.player1.player.body.velocity.y;
            this.Hitsound()
            this.bump.play()
            this.turn.play()
        }

        if (this.player2.isDashing){
            me.player1.player.setMaxVelocity(1000);
            this.physics.world.removeCollider(this.playerCollider);
            window.KeyEnable1 = false;
            this.player1.isBouncing = true;
            this.initSpeedX1 = me.player2.player.body.velocity.x;
            this.initSpeedY1 = me.player2.player.body.velocity.y;
            this.Hitsound()
            this.bump.play()
            this.turn.play()
        }
    }

    tuchVendeur(player, vendeur){
        let me = this;

            player.setMaxVelocity(1000);

            if (player === this.player1.player){
                this.Hitsound()
                window.KeyEnable1 = false;
                this.player1.isBouncing = true;
                this.vendeur.tuchTiming1 = false;
                setTimeout(function(){
                    if (me.vendeur.tuchTiming1===false) {
                        me.vendeur.tuchTiming1 = true;
                    }
                },10000);
            } else {
                this.Hitsound()
                window.KeyEnable2 = false;
                this.player2.isBouncing = true;
                this.vendeur.tuchTiming2=false;
                setTimeout(function(){
                    if (me.vendeur.tuchTiming2===false){
                        me.vendeur.tuchTiming2=true;
                    }
                },10000);
            }
            this.initSpeedX = me.vendeur.vendeur.body.velocity.x;
            this.initSpeedY = me.vendeur.vendeur.body.velocity.y;
        this.bump.play()
        this.turn.play()

    }
    FunctionTime(){
        this.temp -- ;
        if(this.initialTime<90){

            this.ZoneAmis.FunctionUpdate()
        }

        if (this.initialTime===90){
            if (this.vendeurFLag){

            } else {
                this.ZoneAmis = new ZoneAmis(this, this.player1, this.player2)
                this.vendeur.vendeur.setVisible(true);
                this.vendeur.vendeur.body.setEnable(true);
                this.vendeurFLag=true;
                this.vendeur.vendeur.body.x = 600
                this.vendeur.vendeur.body.y = 550
                this.tweens.add({
                    targets: this.vendeur.vendeur,
                    y: 300,
                    duration: 1000,
                    ease: 'Linear',
                });
            }
        }
    }
    update() {
        if (this.player1.Pdown){

            if (this.Pauseflag){

            }else {
                this.scene.pause();
                this.scene.launch('pause');
                this.Pauseflag = true;
            }
        }
        if (window.change) {
            this.player1.initKeyboard();
            window.change=false;
        }

        this.text1.setText(this.player1.player.nbLivre);
        this.text2.setText(this.player2.player.nbLivre);
        this.text3.setText(this.vendeur.nbLivree);

        if (this.vendeurFLag){
            this.vendeur.IaGesttion()
        }
        this.FunctionTime()

        if (!this.isBouncing) {
            this.player1.move();
            this.player2.move();
        }

        if (this.initialTime===90){
            if (this.vendeurFLag){

            } else {
                this.vendeurFLag=true;
                this.vendeur.vendeur.body.x = 640
                this.vendeur.vendeur.body.y = 800
            }
        }

        if(this.initialTime===0){
            if(this.vendeur.nbLivree > this.player1.player.nbLivre && this.vendeur.nbLivree > this.player2.player.nbLivre){
                this.scene.start('end');
                window.vendeurWin=true;
            }
            else if(this.player1.player.nbLivre > this.player2.player.nbLivre){
                window.P1Win=true;
                this.scene.start('end');
            }
            else{
                window.P2Win=true;
                this.scene.start('end');
            }

        }

        this.pnj.UpdateIa1();

        //game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);

    }
}