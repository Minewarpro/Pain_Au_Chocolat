class Item {

    constructor(scene, player, player2, recupPain) {
        this.scene = scene;
        this.player = player;
        this.player2 = player2;
        this.recupPain = recupPain;
        this.itemCoorX = 0;


        const map = this.scene.make.tilemap({key: 'map'});

        this.item = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Item').objects.forEach((Pnj) => {
            const collideSprite = this.item.create(Pnj.x, Pnj.y, 'spike').setOrigin(0);
        });

        this.scene.physics.add.overlap(this.player.player, this.item, this.TakeItem, null, this)
        this.scene.physics.add.overlap(this.player2.player, this.item, this.TakeItem, null, this)
    }

    TakeItem(player, item) {
        let powerup = 1;

        //powerup = Phaser.Math.Between(1,5);

        switch (powerup) {
            case 1:
                this.player2.Functionboost();
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
            case 5:
                player.action =3;
                break;
        }
        item.body.setEnable(false);
        item.setVisible(false);


        this.Reset = this.scene.time.addEvent({
            delay: 5000,
            callback: ()=>{
                item.body.setEnable(true);
                item.setVisible(true);
            },
            loop: false,
        })
    }
  // TakeItemP2(player, item) {
    //     let powerup = 3;
    //
    //     //powerup = Phaser.Math.Between(1,5);
    //
    //
    //     switch (powerup) {
    //         case 1:
    //             // this.player2.Functionboost();
    //             break;
    //         case 2:
    //             this.recupPain.maxStockJ2 += 1;
    //             this.player.FonctionAction()
    //             break;
    //         case 3:
    //             this.player2.action =1;
    //             break;
    //         case 4:
    //             console.log("oui")
    //             this.player2.action =2;
    //             break;
    //         case 5:
    //             this.player2.action =3;
    //             break;
    //     }
    //     item.body.setEnable(false);
    //     item.setVisible(false);
    //
    //
    //     this.Reset = this.scene.time.addEvent({
    //         delay: 5000,
    //         callback: ()=>{
    //             item.body.setEnable(true);
    //             item.setVisible(true);
    //         },
    //         loop: false,
    //     })
    // }




}