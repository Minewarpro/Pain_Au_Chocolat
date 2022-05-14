class Pnjia {

    constructor(scene, player1, player2) {
        let me = this;
        this.scene = scene
        this.player1 = player1
        this.player2 = player2

        this.nbPnjWant =0;

        this.flag=false;
        this.flip = true;

        const map = this.scene.make.tilemap({key: 'map'});

        this.Pnj = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Pnj').objects.forEach((Pnj) => {
            const FlameSprite = this.Pnj.create(Pnj.x, Pnj.y, 'pnj');

        });
        this.scene.physics.add.overlap(this.player1.player, this.Pnj, this.collectCollectible1,null,this);
        this.scene.physics.add.overlap(this.player2.player, this.Pnj, this.collectCollectible1,null,this);


        for(var i = 0; i < this.Pnj.getChildren().length; i++) {
            this.Pnj.getChildren()[i].op = false;
        }

        while(this.nbPnjWant !== 3){
            this.alea = Phaser.Math.Between(0, this.Pnj.getChildren().length-1)
            if (this.Pnj.getChildren()[this.alea].op === false){
                this.Pnj.getChildren()[this.alea].setTintFill(0xff0000);
                this.nbPnjWant ++;
                this.Pnj.getChildren()[this.alea].op = true;
            }
        }

        this.newPnjToSell = 0;

        this.Bouge();

    }

    collectCollectible1(player, pnj){

        if(player.nbPain>0){
            if (pnj.op){
                pnj.setTintFill(0xffffff);
                this.newPnjToSell = Phaser.Math.Between(0, this.Pnj.getChildren().length-1)

                if(this.flag){

                } else {
                    player.nbPain --;
                    player.nbLivre ++;
                    this.flag = true;
                }

                if (this.Pnj.getChildren()[this.newPnjToSell] !== pnj && this.Pnj.getChildren()[this.newPnjToSell].op){
                    console.log('op')
                    this.Pnj.getChildren()[this.newPnjToSell].setTintFill(0xff0000);
                    this.Pnj.getChildren()[this.newPnjToSell].op = true;
                    this.Pnj.getChildren()[this.newPnjToSell].positionPnjx = this.Pnj.getChildren()[this.newPnjToSell].x;
                    this.Pnj.getChildren()[this.newPnjToSell].positionPnjy = this.Pnj.getChildren()[this.newPnjToSell].y;
                    this.Pnj.getChildren()[this.newPnjToSell].collidePnj = false;
                    console.log(player.nbPain)
                }

                while(!this.Pnj.getChildren()[this.newPnjToSell].op){
                    console.log('boucle')
                    if (this.Pnj.getChildren()[this.newPnjToSell] !== pnj){
                        console.log('op')
                        pnj.op = false;
                        this.Pnj.getChildren()[this.newPnjToSell].setTintFill(0xff0000);
                        this.Pnj.getChildren()[this.newPnjToSell].op = true;
                        console.log(player.nbPain)
                        this.flag = false;
                        break;
                    }

                    this.newPnjToSell = Phaser.Math.Between(0, this.Pnj.getChildren().length-1)
                }
            }
        }

    }

    Bouge(){
        let me = this;
        if (this.flip) {
            this.Pnj.setVelocityX(0);
            this.Pnj.setVelocityY(0);
            this.flip = false;
        } else {
            this.flip = true;
            for (let zeub = 0; zeub < this.Pnj.getChildren().length; zeub++) {
                setTimeout(function(){
                    console.log(me.Pnj.getChildren()[zeub].collidePnj)
                    this.hasard = Phaser.Math.Between(0, 7)
                    switch (this.hasard) {
                        case 0:
                            console.log('0')
                            me.Pnj.getChildren()[zeub].setVelocityX(100);
                            me.Pnj.getChildren()[zeub].setVelocityY(0);
                            break;
                        case 1:
                            me.Pnj.getChildren()[zeub].setVelocityX(-100);
                            me.Pnj.getChildren()[zeub].setVelocityY(0);
                            break;
                        case 2:
                            me.Pnj.getChildren()[zeub].setVelocityX(0);
                            me.Pnj.getChildren()[zeub].setVelocityY(100);
                            break;
                        case 3:
                            me.Pnj.getChildren()[zeub].setVelocityX(0);
                            me.Pnj.getChildren()[zeub].setVelocityY(-100);
                            break;
                        case 4:
                            me.Pnj.getChildren()[zeub].setVelocityX(100);
                            me.Pnj.getChildren()[zeub].setVelocityY(100);
                            break;
                        case 5:
                            me.Pnj.getChildren()[zeub].setVelocityX(-100);
                            me.Pnj.getChildren()[zeub].setVelocityY(-100);
                            break;
                        case 6:
                            me.Pnj.getChildren()[zeub].setVelocityX(-100);
                            me.Pnj.getChildren()[zeub].setVelocityY(100);
                            break;
                        case 7:
                            me.Pnj.getChildren()[zeub].setVelocityX(100);
                            me.Pnj.getChildren()[zeub].setVelocityY(-100);
                            break;
                    }
                },Phaser.Math.Between(0, 3000))
                }
            }
            setTimeout(function(){
                me.Bouge();
            },500);
        }

}