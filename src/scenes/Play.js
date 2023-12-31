class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image("rocket", "./assets/images/rocket.png");
        this.load.image("spaceship", "./assets/images/spaceship.png");
        this.load.image("starfield", "./assets/images/starfield.png");
        this.load.image("explodeParticle","assets/images/explodeParticle.png");
        this.particleConfig = {
            speed: 400,
            lifespan: 1000,
            gravityY: 200,
            duration: 100,
            quantity: 2,
            rotate: Phaser.Math.Between(0,359)
        }
        this.load.spritesheet("explosion", "./assets/images/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, "starfield").setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);
        // white borders
        this.add.rectangle(0, 0, game.config.width,borderUISize, 0xFFFFFF).setOrigin(0, 0);                                     // top
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);    // bottom
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);                                    // left
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);    // right

        // set world boundaries
        this.physics.world.setBounds(borderUISize, 0, game.config.width - 2 * (borderUISize), game.config.height, true, true, false, false);

        // add rocket(p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, "rocket").setOrigin(0.5,0);
        this.p1Rocket.body.setCollideWorldBounds(true); //adding walls + (removed) bounce


        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // add spaceships(x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, "spaceship", 0, 30).setOrigin(0, 0); //top ship
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, "spaceship", 0, 20).setOrigin(0,0); //middle ship
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, "spaceship", 0, 10).setOrigin(0, 0); //bottom ship

        // halftime speed up
        this.clockHalf = this.time.delayedCall(game.settings.gameTimer/2, () => {
            this.ship01.moveSpeed += 2;
            this.ship02.moveSpeed += 2;
            this.ship03.moveSpeed += 2;
        }, null, this);


        // animation config
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100,
            zeroPad: 0
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
        
        // 60 or 45-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, "Press (R) to Restart or ← for Menu", scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            this.p1Rocket.body.setVelocity(0,0);
        }, null, this);

        // adding timer
        this.timeRight = this.add.text(game.config.width - borderUISize - borderPadding, borderUISize + borderPadding * 2, 0, scoreConfig).setOrigin(1,0);
        

        // GAME OVER flag
        this.gameOver = false;

        // adding music
        this.music01 = this.sound.add("music_main01",{volume:0.4}); //add. note: let didn't work, because the scope didn't reach update()
        this.music01.setLoop(true); //loop
        this.music01.play(); //play

        this.input.on("pointerdown", pointer => //all input.ons MUST BE IN CREATE FOR THE LOVE OF GOD
                {
                    mouse = true;
                    // if (mouse) {
                    if(this.gameOver) {
                        if (pointer.leftButtonDown()){
                            this.music01.stop();
                            this.scene.start("menuScene");
                        }
                        else if (pointer.rightButtonDown()){
                            this.music01.stop();
                            this.scene.restart();
                        }
                    }

                    if (!this.p1Rocket.isFiring) {
                        this.p1Rocket.fire();
                    }
                    // }
                }, this);

                this.input.on("pointermove", () =>
                {
                    mouse = true;
                }, this);

        // yoinked from CleanPop https://github.com/nathanaltice/CleanPop/blob/master/src/main.js
        // yoinked from https://gist.github.com/thosakwe/bade2c36c81f41b4a17e6482797dd598, adding sounds into a group

        this.explodeGroup = [];

        this.explodeGroup.push(this.sound.add("sfx_explosion01"));
        this.explodeGroup.push(this.sound.add("sfx_explosion02"));
        this.explodeGroup.push(this.sound.add("sfx_explosion03"));
        this.explodeGroup.push(this.sound.add("sfx_explosion04"));
        this.explodeGroup.push(this.sound.add("sfx_explosion05"));
    }

    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            mouse = false;
            this.music01.stop();
            this.scene.restart();
        }

        // check key input for menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            mouse = false;
            this.music01.stop();
            this.scene.start("menuScene");
        }

        // fires like 36 times
        // if(this.gameOver) {
        //     this.input.once('pointerdown', pointer => 
        //         {
        //             if (pointer.leftButtonDown()){
        //                 this.music01.stop();
        //                 this.scene.start("menuScene");
        //             }
        //             else if (pointer.rightButtonDown()){
        //                 this.music01.stop();
        //                 this.scene.restart();
        //             }
        //         }, this);
        // }

        this.starfield.tilePositionX -= 4;
        if(!this.gameOver){
            this.p1Rocket.update();     // update rocket
            this.ship01.update();       // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.add.particles(this.ship03.x,this.ship03.y,"explodeParticle",this.particleConfig);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.add.particles(this.ship02.x,this.ship02.y,"explodeParticle",this.particleConfig);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.add.particles(this.ship01.x,this.ship01.y,"explodeParticle",this.particleConfig);
        }

        // updating timer, yoinked from https://labs.phaser.io/edit.html?src=src/time\timer%20event.js
        // https://newdocs.phaser.io/docs/3.55.2/Phaser.Time.TimerEvent#elapsed
        this.timeRight.setText(`${Math.round(((game.settings.gameTimer - this.clock.elapsed) / 1000)).toString()}`); 
    }



    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&       // leftmost rocket is touching left of rightmost ship
            rocket.x + rocket.width > ship.x &&     // rightmost rocket is touching right of leftmost ship
            rocket.y < ship.y + ship.height &&      // topmost rocket is touching bottom ship
            rocket.height + rocket.y > ship.y) {    // bottom rocket is under top ship
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play("explode");             // play explode animation
        boom.on("animationcomplete", () => {    // callback after anim completes, () => makes temp function
        ship.reset();                           // reset ship position
        ship.alpha = 1;                         // make ship visible again
        boom.destroy();                         // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        // yoinked from https://gist.github.com/thosakwe/bade2c36c81f41b4a17e6482797dd598
        // randomize sound in scene, play once
        this.index = Math.floor(Math.random() * this.explodeGroup.length);
        this.explodeSound = this.explodeGroup[this.index];
        // console.log(this.index); //for debugging
        this.explodeSound.play();

    }
}