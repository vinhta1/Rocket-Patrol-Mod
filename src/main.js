// 1)    Add your own (copyright-free) looping background music to the Play scene
//      (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
// 2)   Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (5)

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
