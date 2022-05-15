class RecupPain {

    constructor(scene, player1, player2) {
        this.scene = scene
        this.player1 = player1
        this.player2 = player2

        this.pain = this.scene.sound.add('pain',{ loop: false });

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
        this.scene.physics.add.overlap(this.player1.player, this.BoxJ1, this.collectCollectible.bind(this));
        this.scene.physics.add.overlap(this.player2.player, this.BoxJ2, this.collectCollectible.bind(this));


    }

    collectCollectible(player, bonus){
        player.nbPain = player.maxStock;

        this.pain.play()
        bonus.body.setEnable(false)
        this.Reset = this.scene.time.addEvent({
            delay: 1000,
            callback: ()=>{
                bonus.body.setEnable(true);
            },
            loop: false,
        })
    }

}