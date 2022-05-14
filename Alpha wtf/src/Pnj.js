class Pnj {

    constructor(scene, player1, player2) {
        var me = this;
        this.scene = scene
        this.player1 = player1
        this.player2 = player2

        this.nbPnjWant =0;

        this.flag=false;

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

}