
function Floor(x, y) {
    this.floor = game.add.sprite(x, y, 'floor');
    this.floor.width = TileSizeX;
    this.floor.height = TileSizeY;

    game.physics.enable(this.floor, Phaser.Physics.ARCADE);
    this.floor.body.allowGravity = false;
    this.floor.body.immovable = true;
    background.add(this.floor);

    // Add functions below
    this.floorUpdate = function () {
        // Update
    }
}