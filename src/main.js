// Vinh Ta
// Rocket Patrol V: Rocket Harder
// 12-18 hours? I spent six today, and worked on at least 3 seperate days.

// citations for any sources you used (you do not need to cite Nathan or Phaser documentation)
// How to add physics to a constructor: https://stackoverflow.com/questions/55302007/how-add-physics-to-phaser-3-sprite
// How to load paths: https://github.com/nathanaltice/CleanPop/blob/master/src/main.js
// How to wrap text: //https://www.html5gamedevs.com/topic/38250-word-wrap-in-phaser-3/
// Mouse down events: // https://labs.phaser.io/edit.html?src=src/input/mouse/mouse%20down.js&v=3.60.0
// How to use arrays to randomize sound and then play said sounds:
// https://gist.github.com/thosakwe/bade2c36c81f41b4a17e6482797dd598
// Working with delayedCall and time: https://labs.phaser.io/edit.html?src=src/time\timer%20event.js
// https://newdocs.phaser.io/docs/3.55.2/Phaser.Time.TimerEvent#elapsed


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
