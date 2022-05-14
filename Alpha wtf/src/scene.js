class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/Base.jpg');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('pnj', 'assets/images/pnj.png');
        this.load.image('tiles', 'assets/tilesets/TileSet_V2.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Level1.json');

        this.load.image('background', 'assets/images/Base.jpg');
    }


    create() {

        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('TileSet_V2', 'tiles');
        this.platforms = map.createStaticLayer('Sol', tileset);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player1 = new Player(this)

        this.player2 = new Player2(this)

        this.collide = new Collide(this, this.player1, this.player2)

        this.recupPain = new RecupPain(this, this.player1, this.player2)

        this.pnj = new Pnj(this, this.player1, this.player2)

        this.physics.add.collider(this.player1.player, this.player2.player)


    }

    update() {

        this.player1.move();
        this.player2.move();


    }
}