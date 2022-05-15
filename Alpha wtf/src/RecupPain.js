class RecupPain {

    constructor(scene, player1, player2) {
        this.scene = scene
        this.player1 = player1
        this.player2 = player2

        this.maxStockJ1 = 5;
        this.maxStockJ2 = 5;

        const map = this.scene.make.tilemap({key: 'map'});

        this.BoxJ1 = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('RecupPain1').objects.forEach((Box) => {
            this.collideSprite = this.scene.physics.add.sprite(Box.x + (Box.width * 0.5), Box.y + (Box.height * 0.5)).setSize(Box.width, Box.height);
            this.BoxJ1.add(this.collideSprite)
        });

        this.BoxJ2 = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('RecupPain2').objects.forEach((Box) => {
            this.collideSprite = this.scene.physics.add.sprite(Box.x + (Box.width * 0.5), Box.y + (Box.height * 0.5)).setSize(Box.width, Box.height);
            this.BoxJ2.add(this.collideSprite)
        });
        this.scene.physics.add.overlap(this.player1.player, this.BoxJ1, this.collectCollectible1.bind(this));
        this.scene.physics.add.overlap(this.player2.player, this.BoxJ2, this.collectCollectible2.bind(this));


    }

    collectCollectible1(player, bonus){
        this.player1.player.nbPain = this.maxStockJ1;
        console.log(this.player1.player.nbPain)

    }

    collectCollectible2(player, bonus){
        this.player2.player.nbPain = this.maxStockJ2;
        console.log(this.player2.player.nbPain)

    }

}