class Vendeur{

    constructor(scene, player1, player2) {
        let me = this;

        this.scene = scene;
        this.player1 = player1;
        this.player2 = player2;

        this.vendeur = this.scene.physics.add.sprite(400, 200, 'chef');
        this.vendeur.setDisplaySize(32, 64);
        this.vendeur.setBounce(0);
        this.vendeur.setCollideWorldBounds(true);
        this.vendeur.setImmovable(true)
        this.vendeur.setDepth(2);

        this.tuchTiming1 = true;
        this.tuchTiming2 = true;

        this.nbLivree = 0;

        this.flip = false;

        this.Bouge();
    }

    IaGesttion(){
        let me = this;

            this.dist = Phaser.Math.Distance.BetweenPoints(this.player1.player, this.vendeur);

            if (this.dist <= 200 && this.tuchTiming1) {
                this.scene.physics.moveTo(
                    me.vendeur,
                    me.player1.player.body.x,
                    me.player1.player.body.y,
                    160);
            }

        this.dist2 = Phaser.Math.Distance.BetweenPoints(this.player2.player, this.vendeur);
        if (this.dist2 <= 200 && this.tuchTiming2) {
            this.scene.physics.moveTo(
                me.vendeur,
                me.player2.player.body.x,
                me.player2.player.body.y,
                160);
        }
}

    Bouge(){
        let me = this;

        if (this.flip) {
            this.vendeur.setVelocityX(0);
            this.vendeur.setVelocityY(0);
            this.flip = false;

        } else {
            this.flip = true;
            setTimeout(function(){

                this.hasard = Phaser.Math.Between(0, 7)
                switch (this.hasard) {
                    case 0:
                        me.vendeur.setVelocityX(100);
                        me.vendeur.setVelocityY(0);
                        me.vendeur.setAngle(90);
                        break;
                    case 1:
                        me.vendeur.setVelocityX(-100);
                        me.vendeur.setVelocityY(0);
                        me.vendeur.setAngle(270);
                        break;
                    case 2:
                        me.vendeur.setVelocityX(0);
                        me.vendeur.setVelocityY(100);
                        me.vendeur.setAngle(180);
                        break;
                    case 3:
                        me.vendeur.setVelocityX(0);
                        me.vendeur.setVelocityY(-100);
                        me.vendeur.setAngle(0);
                        break;
                    case 4:
                        me.vendeur.setVelocityX(100);
                        me.vendeur.setVelocityY(100);
                        me.vendeur.setAngle(90+45);
                        break;
                    case 5:
                        me.vendeur.setVelocityX(-100);
                        me.vendeur.setVelocityY(-100);
                        me.vendeur.setAngle(270+45);
                        break;
                    case 6:
                        me.vendeur.setVelocityX(-100);
                        me.vendeur.setVelocityY(100);
                        me.vendeur.setAngle(270-45);
                        break;
                    case 7:
                        me.vendeur.setVelocityX(100);
                        me.vendeur.setVelocityY(-100);
                        me.vendeur.setAngle(45);
                        break;
                }
            },Phaser.Math.Between(0, 3000))
        }
        setTimeout(function(){
            me.Bouge();
        },500);
    }
}