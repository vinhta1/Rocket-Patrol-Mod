class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio("sfx_select", "./assets/audio/blip_select12.wav");
        this.load.audio("sfx_rocket", "./assets/audio/rocket_shot.wav");
        this.load.audio("music_main01", "./assets/audio/RocketPatrol.wav");
        this.load.image("title", "./assets/images/title.png");

        //yoinked from CleanPop https://github.com/nathanaltice/CleanPop/blob/master/src/main.js
        this.load.path = "./assets/audio/";
        this.load.audio("sfx_explosion01","explosion01.wav");
        this.load.audio("sfx_explosion02","explosion02.wav");
        this.load.audio("sfx_explosion03","explosion03.wav");
        this.load.audio("sfx_explosion04","explosion04.wav");
        this.load.audio("sfx_explosion05","explosion38.wav");
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: "Consolas",
            fontSize: "56px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "center",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let controlConfig = {
            fontFamily: "Consolas",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "center",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: game.config.width/2 - borderUISize,
            wordWrap: {
                width: game.config.width/2 - borderUISize,
                useAdvancedWrap: true //https://www.html5gamedevs.com/topic/38250-word-wrap-in-phaser-3/
            }
        }

        // show menu text
        this.add.text(game.config.width/2, borderUISize + borderPadding, "ROCKET PATROL", menuConfig).setAlpha(.9).setOrigin(0.5);
        this.add.text(borderUISize - borderPadding, game.config.height/2 - borderUISize, "Keyboard Controls:\n\n← → to move\n(F) to fire", controlConfig).setAlpha(.9);
        this.add.text(game.config.width/2 + borderPadding, game.config.height/2 - borderUISize, "Mouse Controls:\n\nCursor to move\n(Left Click) to fire", controlConfig).setAlpha(.9);
        menuConfig.fontSize = "28px",
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";
        menuConfig.wordWrap = {
            width: game.config.width-borderUISize * 2,
            useAdvancedWrap: true
        };
        menuConfig.align = "center";
        this.add.text(game.config.width/2, game.config.height - borderUISize * 2 - borderPadding, "Press ← or left click for Novice\nPress → or right click for Expert", menuConfig).setAlpha(.9).setOrigin(0.5);
        
        this.title = this.add.sprite(0, 0, "title").setOrigin(0, 0).setDepth(-1);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.input.mouse.disableContextMenu(); //disable right click menu
        this.input.on('pointerdown', function (pointer) //checks for mouse click
            {
                if (pointer.leftButtonDown()) { //on left click
                    mouse = true;
                    this.easyMode();
                } else if (pointer.rightButtonDown()) { //on right click
                    mouse = true;
                    this.hardMode();
                }
            }, this);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            mouse = false;
            this.easyMode();
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            mouse = false;
            this.hardMode();
        }
    }

    easyMode(){
        game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000
        }
        this.sound.play("sfx_select");
        this.scene.start("playScene");
    }
    hardMode(){
        game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000
        }
        
        this.sound.play("sfx_select");
        this.scene.start("playScene");
    }
}