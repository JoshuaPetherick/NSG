
function Floor(x, y) {
    this.floorSprite = game.add.sprite(x, y, 'floor');
    this.floorSprite.width = TileSizeX;
    this.floorSprite.height = TileSizeY;

    game.physics.enable(this.floorSprite, Phaser.Physics.ARCADE);
    this.floorSprite.body.allowGravity = false;
    this.floorSprite.body.immovable = true;
    background.add(this.floorSprite);

    // Add functions below
    this.floorUpdate = function () {
        // Update
    }
}