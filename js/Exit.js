
function Exit(x, y) {
    this.exit = game.add.sprite(x, y, 'exit');
    this.exit.width = (TileSizeX/2);
    this.exit.height = TileSizeY;

    game.physics.enable(this.exit, Phaser.Physics.ARCADE);
    this.exit.body.allowGravity = false;
    this.exit.body.immovable = true;
    exitLayer.add(this.exit);

    // Add functions below
    this.exitUpdate = function () {
        // Update
    }

    this.exitCollision = function () {
        // Load new level!
        nextLevel();
    }
}
