class Collide {

    constructor(scene, player, player2, pnj, vendeur) {
        this.scene = scene
        this.player = player
        this.player2 = player2
        this.pnj = pnj
        this.vendeur = vendeur

        const map = this.scene.make.tilemap({key: 'map'});

        this.collide = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Collide').objects.forEach((collide) => {
            this.collideSprite = this.scene.physics.add.sprite(collide.x + (collide.width * 0.5), collide.y + (collide.height * 0.5)).setSize(collide.width, collide.height);
            this.collide.add(this.collideSprite)
        });
        this.scene.physics.add.collider(this.player.player, this.collide,this.tuch);
        this.scene.physics.add.collider(this.player2.player, this.collide,this.tuch);
        this.scene.physics.add.collider(this.pnj.Pnj, this.collide,this.tuch);
        this.scene.physics.add.collider(this.vendeur.vendeur, this.collide,this.tuch);


    }

    tuch(pnj, mur){
        pnj.setVelocityX(pnj.body.velocity.x * -1);
        pnj.setVelocityY(pnj.body.velocity.y * -1);

    }
}