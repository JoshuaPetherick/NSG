
function Stair(x, y) {
    this.stair = game.add.sprite(x, y, 'stairs');
    this.stair.width = TileSizeX;
    this.stair.height = TileSizeY;

    game.physics.enable(this.stair, Phaser.Physics.ARCADE);
    this.stair.body.allowGravity = false;
    this.stair.body.gravity.y = 0;
    this.stair.body.immovable = true;
    stairLayer.add(this.stair);

    // Add functions below
    this.stairUpdate = function () {
        // Update
    }

    this.stairCollision = function () {
        // Turn player gravity off!
        player.setGravity(0);
    }
}
