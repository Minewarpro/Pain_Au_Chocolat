class Voitures{

    constructor(scene, player1, player2, pnj) {
        let me = this;

        this.scene = scene;
        this.player1 = player1;
        this.player2 = player2;
        this.pnj = pnj;
        this.voiture1 = this.scene.physics.add.sprite(290, 0, 'player');
        this.voiture1.body.setSize(80,100)
        this.voiture1.setDisplaySize(60,100);
        this.voiture1.setImmovable(true);
        this.scene.physics.add.collider(this.player2.player, this.voiture1, this.tuch2, null, this);
        this.scene.physics.add.collider(this.player1.player, this.voiture1, this.tuch1, null, this);
        this.scene.physics.add.collider(this.pnj, this.voiture1, this.tuch, null, this);


        this.isTweening1=true;
        this.isTweening2=false;
        this.isTweening3=false;

        this.tween1 = this.scene.tweens.add({
            targets: this.voiture1,
            y: 540,
            duration: 1000,
            ease: 'Linear',
            onComplete: function () {
                me.isTweening2=true;
                me.isTweening1=false;
                me.voiture1.setAngle(90);
                me.voiture1.body.setSize(150, 60)
                me.tween2.play()
            }
        });

        this.tween2 = me.scene.tweens.add({
            targets: me.voiture1,
            x: 640,
            duration: 1000,
            ease: 'Linear',
            onComplete: function () {
                me.isTweening3=true;
                me.isTweening2=false;
                me.voiture1.setAngle(0);
                me.voiture1.body.setSize(80, 100)
                me.tween3.play()
            }
        });
        this.tween2.pause()

        this.tween3 = me.scene.tweens.add({
            targets: me.voiture1,
            y: 800,
            duration: 1000,
            ease: 'Linear',
            onComplete: function () {
                me.isTweening1=true;
                me.isTweening3=false;
                me.voiture1.x = 290;
                me.voiture1.y = 0;
                me.tween1.play()
            }
        });
        this.tween3.pause()


        this.speed={
            speedDash:3,
        }

        this.angle={
            angleTurn:0,
        }


        this.turn = this.scene.tweens.add({
            targets: this.angle,
            angleTurn: 1200,
            duration:1000,
            onUpdate: function (){
                if(me.player1.isBouncing) {
                    me.player1.player.setAngle(me.angle.angleTurn)
                }
                else if (me.player2.isBouncing) {
                    me.player2.player.setAngle(me.angle.angleTurn)
                }
            },
            onComplete: function(){
                if(me.player2.isBouncing){
                    me.player2.isBouncing = false;
                    me.player2.player.setMaxVelocity(300);
                    me.player2.player.setAngle(0)
                    window.KeyEnable2 = true;
                } else if (me.player1.isBouncing) {
                    me.player1.isBouncing = false;
                    me.player1.player.setMaxVelocity(300);
                    me.player1.player.setAngle(0)
                    window.KeyEnable1 = true;

                }
            }
        });
        this.turn.pause()

    }

    tuch2(player, voiture){

            player.setMaxVelocity(1000);
            window.KeyEnable2 = false;
            this.player2.isBouncing = true;
            this.turn.play()

    }

    tuch1(player, voiture){

        player.setMaxVelocity(1000);
        this.player1.isBouncing = true;
        this.turn.play()
        window.KeyEnable1 = false;

    }

}
