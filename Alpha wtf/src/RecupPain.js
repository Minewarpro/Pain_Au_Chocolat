class RecupPain {

    constructor(scene, player1, player2) {
        this.scene = scene
        this.player1 = player1
        this.player2 = player2

        const map = this.scene.make.tilemap({key: 'map'});

        this.Box = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('RecupPain').objects.forEach((Box) => {
            this.collideSprite = this.scene.physics.add.sprite(Box.x + (Box.width * 0.5), Box.y + (Box.height * 0.5)).setSize(Box.width, Box.height);
            this.Box.add(this.collideSprite)
        });
        this.scene.physics.add.overlap(this.player1.player, this.Box, this.collectCollectible1.bind(this));
        this.scene.physics.add.overlap(this.player2.player, this.Box, this.collectCollectible2.bind(this));


    }

    collectCollectible1(player, bonus){
        this.player1.player.nbPain = 5;
        console.log(this.player1.player.nbPain)

    }

    collectCollectible2(player, bonus){
        this.player2.player.nbPain = 5;
        console.log(this.player2.player.nbPain)

    }

}