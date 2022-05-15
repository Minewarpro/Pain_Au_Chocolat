class Voitures{

    constructor(scene, player1, player2, pnj) {
        let me = this;

        this.scene = scene;
        this.player1 = player1;
        this.player2 = player2;
        this.pnj = pnj;
        this.voiture1 = this.scene.physics.add.sprite(320, 0, 'voitureTurbo');
        this.voiture1.body.setSize(250,460)
        this.voiture1.body.setOffset(30,150)
        me.voiture1.setAngle(180);
        this.voiture1.setScale(0.2)
        this.voiture1.setImmovable(true);
        this.scene.physics.add.collider(this.player2.player, this.voiture1, this.tuch2, null, this);
        this.scene.physics.add.collider(this.player1.player, this.voiture1, this.tuch1, null, this);

        this.voiture2 = this.scene.physics.add.sprite(1380, 380, 'voiture');
        me.voiture2.body.setSize(460,250)
        me.voiture2.body.setOffset(-60,110)
        me.voiture2.setAngle(-90);
        this.voiture2.setScale(0.2)
        this.voiture2.setImmovable(true);
        this.scene.physics.add.collider(this.player2.player, this.voiture2, this.tuch2, null, this);
        this.scene.physics.add.collider(this.player1.player, this.voiture2, this.tuch1, null, this);




        this.tween1 = this.scene.tweens.add({
            targets: this.voiture1,
            y: 580,
            duration: 1000,
            ease: 'Linear',
            onComplete: function () {
                me.voiture1.setAngle(90);
                me.voiture1.body.setSize(460,250)
                me.voiture1.body.setOffset(0,190)
                me.tween2.play()
            }
        });

        this.tween2 = me.scene.tweens.add({
            targets: me.voiture1,
            x: 680,
            duration: 1000,
            ease: 'Linear',
            onComplete: function () {
                me.voiture1.setAngle(180);
                me.voiture1.body.setSize(250,460)
                me.voiture1.body.setOffset(30,150)
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

                setTimeout(function(){
                    me.voiture1.x = 320;
                    me.voiture1.y = 0;
                    me.tween1.play()
                },9000)

            }
        });
        this.tween3.pause()


        this.tween4 = this.scene.tweens.add({
            targets: this.voiture2,
            x: 1030,
            duration: 2000,
            ease: 'Linear',
            onComplete: function () {
                me.voiture2.setAngle(0);
                me.voiture2.body.setSize(250,460)
                me.voiture2.body.setOffset(30,20)
                me.tween5.play()
            }
        });

        this.tween5 = me.scene.tweens.add({
            targets: me.voiture2,
            y: -200,
            duration: 3000,
            ease: 'Linear',
            onComplete: function () {
                me.voiture2.setAngle(-90);
                me.voiture2.body.setSize(460, 250)
                me.voiture2.body.setOffset(-60, 110)
                setTimeout(function () {
                    me.voiture2.x = 1380;
                    me.voiture2.y = 380;
                    me.tween4.play()
                }, 3000)
            }
        });
        this.tween5.pause()

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
                    me.player1.player.setAngle(me.angle.angleTurn)
            },
            onComplete: function(){
                    me.player1.player.setMaxVelocity(300);
                    me.player1.player.setAngle(0)
                    window.KeyEnable1 = true;
                    me.player1.isBouncing = false;
            }
        });
        this.turn.pause()

        this.angle2={
            angleTurn:0,
        }


        this.turn2 = this.scene.tweens.add({
            targets: this.angle2,
            angleTurn: 1200,
            duration:1000,
            onUpdate: function (){
                    me.player2.player.setAngle(me.angle2.angleTurn)
            },
            onComplete: function(){
                    me.player2.player.setMaxVelocity(300);
                    me.player2.player.setAngle(0)
                    window.KeyEnable2 = true;
                    me.player2.isBouncing = false;
            }
        });
        this.turn2.pause()

    }

    tuch2(player, voiture){
        this.scene.Hitsound()
            player.setMaxVelocity(1000);
            window.KeyEnable2 = false;
            this.player2.isBouncing = true;
            this.turn2.play()

    }

    tuch1(player, voiture){
        this.scene.Hitsound()
        player.setMaxVelocity(1000);
        this.player1.isBouncing = true;
        this.turn.play()
        window.KeyEnable1 = false;

    }

}
