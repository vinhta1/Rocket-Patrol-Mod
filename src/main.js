// your first/last name
// mod title (e.g. Rocket Patrol Reloaded IV: The Rocketing)
// the approximate time it took to complete the project (in hours)
// the mods you chose from the list above, their point values, and, if necessary, an explanation of their implementation
// citations for any sources you used (you do not need to cite Nathan or Phaser documentation)
//  How to add physics to a constructor: https://stackoverflow.com/questions/55302007/how-add-physics-to-phaser-3-sprite

// 1)    Add your own (copyright-free) looping background music to the Play scene
//      (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
// 2)   Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (5)
// 3)   Implement the speed increase that happens after 30 seconds in the original game (1)
// 4)   Implement mouse control for player movement and mouse click to fire (5)
// 5)   Create a new title screen (e.g., new artwork, typography, layout) (3)
// 6)   Create 4 new explosion sound effects and randomize which one plays on impact (3)
// 7)   Display the time remaining (in seconds) on the screen (3)

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    render: {
      pixelArt: true  
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false //true
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
let mouse =  false;
