class Item {

    constructor(scene, player, player2) {
        this.scene = scene;
        this.player = player;
        this.player2 = player2;
        this.itemCoorX = 0;


        const map = this.scene.make.tilemap({key: 'map'});

        this.item = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Item').objects.forEach((Pnj) => {
            const collideSprite = this.item.create(Pnj.x, Pnj.y, 'pnj').setOrigin(0);
        });
        this.scene.physics.add.overlap(this.player.player, this.item, this.TakeItemP1, null, this)
        this.scene.physics.add.overlap(this.player2.player, this.item, this.TakeItemP2, null, this)
    }

    TakeItemP1(player, item) {
        let powerup = 0;

        //powerup = Phaser.Math.Between(1,4);

        console.log(powerup)

        switch (powerup) {
            case 0:
                // this.player.Functionboost();
                break;
            case 2:
                console.log("powerup 2")
                break;
            case 3:
                console.log("powerup 3")
                break;
            case 4:
                console.log("powerup 4")
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

    TakeItemP2(player, item) {
        let powerup = 0;

        //powerup = Phaser.Math.Between(1,4);

        console.log(powerup)

        switch (powerup) {
            case 0:
                // this.player2.Functionboost();
                break;
            case 2:
                console.log("powerup 2")
                break;
            case 3:
                console.log("powerup 3")
                break;
            case 4:
                console.log("powerup 4")
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
}