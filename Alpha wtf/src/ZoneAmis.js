class ZoneAmis {

    constructor(scene, player1, player2) {
        this.scene = scene
        this.player1 = player1
        this.player2 = player2

        this.friend = false;
        this.compteur = 0;

        const map = this.scene.make.tilemap({key: 'map'});

        this.zoneAmis = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('ZoneAmis').objects.forEach((Box) => {
            this.collideSprite = this.scene.physics.add.sprite(Box.x + (Box.width * 0.5), Box.y + (Box.height * 0.5)).setSize(Box.width, Box.height);
            this.zoneAmis.add(this.collideSprite)
        });
        this.scene.physics.add.overlap(this.player1.player, this.zoneAmis);
        this.scene.physics.add.overlap(this.player2.player, this.zoneAmis);


    }

    FunctionUpdate(){
        if(this.scene.physics.overlap(this.player1.player, this.zoneAmis)===true && this.scene.physics.overlap(this.player2.player, this.zoneAmis)===true ){

            this.friend = true;
        }
        if(this.friend === true){
            this.compteur += 1;
            if(this.compteur === 500){

            }
        }else{
            this.compteur = 0;
        }

    }

}