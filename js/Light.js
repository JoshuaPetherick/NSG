
function Light(x, y) {
    this.light = game.add.sprite(x, y, 'light');
    this.light.width = TileSizeX;
    this.light.height = TileSizeY;

    game.physics.enable(this.light, Phaser.Physics.ARCADE);
    this.light.body.allowGravity = false;
    this.light.body.immovable = true;
    lightLayer.add(this.light);

    // Add functions below
    this.lightUpdate = function () {
        // Update
    }

    this.lightCollision = function () {
        // Change player state
    }
}
