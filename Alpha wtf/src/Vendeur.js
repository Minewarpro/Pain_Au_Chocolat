class Vendeur{

    constructor(scene, player1, player2) {
        let me = this;

        this.scene = scene;
        this.player1 = player1;
        this.player2 = player2;

        this.vendeur = this.scene.physics.add.sprite(400, 200, 'player');
        this.vendeur.setDisplaySize(32, 32);
        this.vendeur.setBounce(0);
        this.vendeur.setCollideWorldBounds(true);
        this.vendeur.setImmovable(true)

        this.tuchTiming = true;

        this.flip = false;

        this.Bouge();
    }

    IaGesttion(){
        let me = this;

            this.dist = Phaser.Math.Distance.BetweenPoints(this.player1.player, this.vendeur);

            if (this.dist <= 200 && this.tuchTiming) {
                this.scene.physics.moveTo(
                    me.vendeur,
                    me.player1.player.body.x,
                    me.player1.player.body.y,
                    160);

    }
}

    Bouge(){
        let me = this;
        console.log('bouge');

        if (this.flip) {
            this.vendeur.setVelocityX(0);
            this.vendeur.setVelocityY(0);
            this.flip = false;
            console.log('oe')
        } else {
            this.flip = true;
            setTimeout(function(){
                console.log('oe2')
                this.hasard = Phaser.Math.Between(0, 7)
                switch (this.hasard) {
                    case 0:
                        me.vendeur.setVelocityX(100);
                        me.vendeur.setVelocityY(0);
                        break;
                    case 1:
                        me.vendeur.setVelocityX(-100);
                        me.vendeur.setVelocityY(0);
                        break;
                    case 2:
                        me.vendeur.setVelocityX(0);
                        me.vendeur.setVelocityY(100);
                        break;
                    case 3:
                        me.vendeur.setVelocityX(0);
                        me.vendeur.setVelocityY(-100);
                        break;
                    case 4:
                        me.vendeur.setVelocityX(100);
                        me.vendeur.setVelocityY(100);
                        break;
                    case 5:
                        me.vendeur.setVelocityX(-100);
                        me.vendeur.setVelocityY(-100);
                        break;
                    case 6:
                        me.vendeur.setVelocityX(-100);
                        me.vendeur.setVelocityY(100);
                        break;
                    case 7:
                        me.vendeur.setVelocityX(100);
                        me.vendeur.setVelocityY(-100);
                        break;
                }
            },Phaser.Math.Between(0, 3000))
        }
        setTimeout(function(){
            me.Bouge();
        },500);
    }
}