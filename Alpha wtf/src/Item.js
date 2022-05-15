class Item {

    constructor(scene, player, player2, recupPain) {
        this.scene = scene;
        this.player = player;
        this.player2 = player2;
        this.recupPain = recupPain;
        this.itemCoorX = 0;

        this.scene.anims.create({
            key: 'Box',
            frames: [
                {key: 'Box1'},
                {key: 'Box2'},
                {key: 'Box3'},
                {key: 'Box4'},
                {key: 'Box5'},
            ],
            frameRate: 5,
            repeat: -1
        });


        const map = this.scene.make.tilemap({key: 'map'});

        this.item = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Item').objects.forEach((Pnj) => {
            const collideSprite = this.item.create(Pnj.x, Pnj.y, 'Box2').setOrigin(0);
        });

        for(var i = 0; i < this.item.getChildren().length; i++) {
            this.item.getChildren()[i].play('Box')
        }

        this.scene.physics.add.overlap(this.player.player, this.item, this.TakeItem, null, this)
        this.scene.physics.add.overlap(this.player2.player, this.item, this.TakeItem, null, this)
    }

    TakeItem(player, item) {
        let powerup = 3;

        //powerup = Phaser.Math.Between(1,5);

        switch (powerup) {
            case 1:
                if (player === this.player.player){
                    this.player.Functionboost();
                } else {
                    this.player2.Functionboost();
                }
                break;
            case 2:
                player.maxStock += 1;
                break;
            case 3:
                player.action =1;
                break;
            case 4:
                player.action =2;
                break;
        }
        item.body.setEnable(false);
        item.setVisible(false);
        this.scene.BonusSound();

        this.Reset = this.scene.time.addEvent({
            delay: 5000,
            callback: ()=>{
                item.body.setEnable(true);
                item.setVisible(true);
            },
            loop: false,
        })
    }
 
}