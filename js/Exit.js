
function Exit(x, y) {
    this.exitSprite = game.add.sprite(x, y, 'exit');
    this.exitSprite.width = (TileSizeX/2);
    this.exitSprite.height = TileSizeY;

    game.physics.enable(this.exitSprite, Phaser.Physics.ARCADE);
    this.exitSprite.body.allowGravity = false;
    this.exitSprite.body.immovable = true;
    exitLayer.add(this.exitSprite);

    // Add functions below
    this.exitUpdate = function () {
        // Update
    }

    this.exitCollision = function () {
        // Load new level!
        nextLevel();
    }
}
