class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio("sfx_select", "./assets/audio/blip_select12.wav");
        this.load.audio("sfx_explosion", "./assets/audio/explosion38.wav");
        this.load.audio("sfx_rocket", "./assets/audio/rocket_shot.wav");
        this.load.audio("music_main01", "./assets/audio/RocketPatrol.wav");
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "ROCKET PATROL", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, "Use ←→ arrows to move and (F) to fire", menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, "Press ← for Novice or → for Expert", menuConfig).setOrigin(0.5);
    
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