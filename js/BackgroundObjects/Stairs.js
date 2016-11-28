
function Stair(x, y) {
    this.stairSprite = game.add.sprite(x, (y-5), 'stairs');
    this.stairSprite.width = TileSizeX;
    this.stairSprite.height = (TileSizeY+5);

    game.physics.enable(this.stairSprite, Phaser.Physics.ARCADE);
    this.stairSprite.body.allowGravity = false;
    this.stairSprite.body.gravity.y = 0;
    this.stairSprite.body.immovable = true;
    stairLayer.add(this.stairSprite);

    this.stairCollision = function () {
        // Turn player gravity off!
        player.setGravity(false);
    }
}
