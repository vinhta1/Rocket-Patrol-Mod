// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to exisitng scene
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        scene.physics.add.existing(this); //https://stackoverflow.com/questions/55302007/how-add-physics-to-phaser-3-sprite
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;

        // wrap around from left edge to right edge
        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}