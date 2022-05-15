class Pnjia {

    constructor(scene, player1, player2, zoneAmis) {
        let me = this;
        this.scene = scene
        this.player1 = player1
        this.player2 = player2
        this.zoneAmis = zoneAmis

        this.nbPnjWant =0;
        this.scene.anims.create({
            key: 'PNJ1',
            frames: [
                {key: 'PNJ11'},
                {key: 'PNJ12'},
                {key: 'PNJ13'},
                {key: 'PNJ14'},
            ],
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'PNJ2',
            frames: [
                {key: 'PNJ21'},
                {key: 'PNJ22'},
                {key: 'PNJ23'},
                {key: 'PNJ24'},
            ],
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'PNJ3',
            frames: [
                {key: 'PNJ31'},
                {key: 'PNJ32'},
                {key: 'PNJ33'},
                {key: 'PNJ34'},
            ],
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'PNJ4',
            frames: [
                {key: 'PNJ41'},
                {key: 'PNJ42'},
                {key: 'PNJ43'},
                {key: 'PNJ44'},
            ],
            frameRate: 5,
            repeat: -1
        });

        this.flag=false;
        this.flip = true;

        const map = this.scene.make.tilemap({key: 'map'});

        this.animation = ['PNJ1','PNJ2','PNJ3','PNJ4'];

        this.cercle1 = this.scene.physics.add.sprite(500, 300, 'cercle');
        this.cercle2 = this.scene.physics.add.sprite(500, 300, 'cercle');
        this.cercle3 = this.scene.physics.add.sprite(500, 300, 'cercle');

        this.Pnj = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Pnj').objects.forEach((Pnj) => {
            const FlameSprite = this.Pnj.create(Pnj.x, Pnj.y, 'pnj').setDisplaySize(32,32);

        });
        this.scene.physics.add.overlap(this.player1.player, this.Pnj, this.collectCollectible1,null,this);
        this.scene.physics.add.overlap(this.player2.player, this.Pnj, this.collectCollectible1,null,this);
        this.Pnj.setDepth(2);

        for(var i = 0; i < this.Pnj.getChildren().length; i++) {
            this.Pnj.getChildren()[i].op = false;
            this.Pnj.getChildren()[i].play(this.animation[Phaser.Math.Between(0,3)]);

        }

        while(this.nbPnjWant !== 3){
            this.alea = Phaser.Math.Between(0, this.Pnj.getChildren().length-1)
            if (this.Pnj.getChildren()[this.alea].op === false){

                this.nbPnjWant ++;
                this.Pnj.getChildren()[this.alea].op = true;
            }
        }

        this.newPnjToSell = 0;

        this.Bouge();

    }

    UpdateIa1(){
        var test =1;
        for(var i = 0; i < this.Pnj.getChildren().length; i++) {
            if(this.Pnj.getChildren()[i].op === true){

                this.Pnj.getChildren()[i].name = test
                if(this.Pnj.getChildren()[i].name===1){
                    this.cercle1.x = this.Pnj.getChildren()[i].x
                    this.cercle1.y = this.Pnj.getChildren()[i].y
                }if(this.Pnj.getChildren()[i].name===2){
                    this.cercle2.x = this.Pnj.getChildren()[i].x
                    this.cercle2.y = this.Pnj.getChildren()[i].y
                }if(this.Pnj.getChildren()[i].name===3){
                    this.cercle3.x = this.Pnj.getChildren()[i].x
                    this.cercle3.y = this.Pnj.getChildren()[i].y
                }
                test++;
            }
        }

    }

    collectCollectible1(player, pnj){

        if(player.nbPain>0){
            if (pnj.op){

                this.newPnjToSell = Phaser.Math.Between(0, this.Pnj.getChildren().length-1)

                if(this.flag){

                } else {
                    if (this.scene.initialTime===90){
                        if (this.scene.ZoneAmis.Amis){
                            this.player1.player.nbLivre ++;
                            this.player2.player.nbLivre ++;
                        } else {
                            player.nbLivre ++;
                        }
                    }else {
                        player.nbLivre ++;
                    }
                    this.scene.SoundClient();
                    player.nbPain --;
                    this.flag = true;
                }

                if (this.Pnj.getChildren()[this.newPnjToSell] !== pnj && this.Pnj.getChildren()[this.newPnjToSell].op){

                    this.Pnj.getChildren()[this.newPnjToSell].op = true;

                    this.Pnj.getChildren()[this.newPnjToSell].collidePnj = false;
                    console.log(player.nbPain)
                }

                while(!this.Pnj.getChildren()[this.newPnjToSell].op){

                    if (this.Pnj.getChildren()[this.newPnjToSell] !== pnj){

                        pnj.op = false;

                        this.Pnj.getChildren()[this.newPnjToSell].op = true;

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
                    this.hasard = Phaser.Math.Between(0, 7)
                    switch (this.hasard) {
                        case 0:
                            me.Pnj.getChildren()[zeub].setVelocityX(100);
                            me.Pnj.getChildren()[zeub].setVelocityY(0);
                            me.Pnj.getChildren()[zeub].setAngle(90);
                            break;
                        case 1:
                            me.Pnj.getChildren()[zeub].setVelocityX(-100);
                            me.Pnj.getChildren()[zeub].setVelocityY(0);
                            me.Pnj.getChildren()[zeub].setAngle(-90);
                            break;
                        case 2:
                            me.Pnj.getChildren()[zeub].setVelocityX(0);
                            me.Pnj.getChildren()[zeub].setVelocityY(100);
                            me.Pnj.getChildren()[zeub].setAngle(180);
                            break;
                        case 3:
                            me.Pnj.getChildren()[zeub].setVelocityX(0);
                            me.Pnj.getChildren()[zeub].setVelocityY(-100);
                            me.Pnj.getChildren()[zeub].setAngle(0);
                            break;
                        case 4:
                            me.Pnj.getChildren()[zeub].setVelocityX(100);
                            me.Pnj.getChildren()[zeub].setVelocityY(100);
                            me.Pnj.getChildren()[zeub].setAngle(135);
                            break;
                        case 5:
                            me.Pnj.getChildren()[zeub].setVelocityX(-100);
                            me.Pnj.getChildren()[zeub].setVelocityY(-100);
                            me.Pnj.getChildren()[zeub].setAngle(-45);
                            break;
                        case 6:
                            me.Pnj.getChildren()[zeub].setVelocityX(-100);
                            me.Pnj.getChildren()[zeub].setVelocityY(100);
                            me.Pnj.getChildren()[zeub].setAngle(-135);
                            break;
                        case 7:
                            me.Pnj.getChildren()[zeub].setVelocityX(100);
                            me.Pnj.getChildren()[zeub].setVelocityY(-100);
                            me.Pnj.getChildren()[zeub].setAngle(135);
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