const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1280,
    heigth: 720,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: [new Initialize(), new Start(),new scene(), new Pause(), new option(), new option1(), new End()]
};

const game = new Phaser.Game(config);