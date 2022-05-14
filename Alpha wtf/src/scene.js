class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/Base.jpg');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('pnj', 'assets/images/pnj.png');
        this.load.image('tiles', 'assets/tilesets/TileSet_V2.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Level1.json');

        this.load.image('background', 'assets/images/Base.jpg');
    }


    create() {
        let me = this;

        this.flag=false;
        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('TileSet_V2', 'tiles');
        this.platforms = map.createStaticLayer('Sol', tileset);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player1 = new Player(this)

        this.player2 = new Player2(this)

        this.collide = new Collide(this, this.player1, this.player2)

        this.recupPain = new RecupPain(this, this.player1, this.player2)

        this.pnj = new Pnj(this, this.player1, this.player2)

        this.item = new Item(this, this.player1, this.player2)

        this.playerCollider = this.physics.add.collider(this.player1.player, this.player2.player, this.tuch,null,this)

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
                if(me.player1.isDashing){
                    me.player2.player.setVelocityX(me.initSpeedX * me.speed.speedDash)
                    me.player2.player.setVelocityY(me.initSpeedY * me.speed.speedDash)
                } else if (me.player2.isDashing) {
                    me.player1.player.setVelocityX(me.initSpeedX1 * me.speed.speedDash)
                    me.player1.player.setVelocityY(me.initSpeedY1 * me.speed.speedDash)
                }
            },
            onComplete: function(){
                me.player2.isBouncing = false;
                me.player2.player.setMaxVelocity(300);
                me.playerCollider = me.physics.add.collider(me.player1.player, me.player2.player, me.tuch,null,me)
            }
        });
        this.turn = this.tweens.add({
            targets: this.angle,
            angleTurn: 1200,
            duration:300,
            onUpdate: function (){
                if(me.player1.isDashing) {
                    me.player2.player.setAngle(me.angle.angleTurn)
                }
                else if (me.player2.isDashing) {
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

    }

    tuch(){
        let me = this;

        if (this.player1.isDashing){
            me.player2.player.setMaxVelocity(1000);
            this.physics.world.removeCollider(this.playerCollider);
            this.player2.KeyEnable = false;
            this.player2.isBouncing = true;
            this.initSpeedX = me.player1.player.body.velocity.x;
            this.initSpeedY = me.player1.player.body.velocity.y;
            this.bump.play()
            this.turn.play()
        }

        if (this.player2.isDashing){
            me.player1.player.setMaxVelocity(1000);
            this.physics.world.removeCollider(this.playerCollider);
            this.player1.KeyEnable = false;
            this.player1.isBouncing = true;
            this.initSpeedX1 = me.player2.player.body.velocity.x;
            this.initSpeedY1 = me.player2.player.body.velocity.y;
            this.bump.play()
            this.turn.play()
        }
    }

    update() {

        if (!this.isBouncing) {
            this.player1.move();
            this.player2.move();
        }


    }
}