// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, mouse = false) {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this); // add to existing scene, displayList, updateList
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxRocket = scene.sound.add("sfx_rocket"); // add rocket sfx
        scene.physics.add.existing(this); //https://stackoverflow.com/questions/55302007/how-add-physics-to-phaser-3-sprite
        this.setInteractive();
        // https://labs.phaser.io/edit.html?src=src/input/mouse/mouse%20down.js&v=3.60.0
        if (mouse){
            scene.input.on('pointerdown', function (pointer)
            {
                if (!this.isFiring) {
                    this.fire();
                }
            }, this);
        }

    }
    
    update() {

        let playerVector = new Phaser.Math.Vector2(0, 0);

        // mouse controls
        if (mouse){
            if (game.input.mousePointer.x < this.x - this.width/2) {
                playerVector.x = -1;
            } else if (game.input.mousePointer.x > this.x + this.width/2) {
                playerVector.x = 1;
            }
        }

        const pointer = this.input.activePointer;

        // mouse fire button

        // keyboard controls
        if (!mouse){ //disable if mouse mode is on
            if(keyLEFT.isDown){
                //this.player.x -= this.PLAYER_VELOCITY;
                playerVector.x = -1
            } else if(keyRIGHT.isDown){
                //this.player.x += this.PLAYER_VELOCITY;
                playerVector.x = 1
            };

            // keyboard fire button
            if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
                this.fire();
            }
        }
        
        if (!this.isFiring){
        this.body.setVelocity(this.moveSpeed * 50 * playerVector.x, 0); //move but better
        }
        // // left/right movement
        // if (!this.isFiring){
        //     if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
        //         this.x -= this.moveSpeed;
        //     } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
        //         this.x += this.moveSpeed;
        //     }
        // }

        // if fired, move up
        if  (this.isFiring && this.y >= borderUISize * 3) {
            playerVector.x = 0
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding || this.x <= borderUISize) {
            this.reset();
        }
    }

    // reset rocket to ground
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

    fire() {
        this.isFiring = true;
        this.sfxRocket.play(); // sound in prefab, play once
    }
}