
function Stair(x, y) {
    this.stairSprite = game.add.sprite(x, y, 'stairs');
    this.stairSprite.width = TileSizeX;
    this.stairSprite.height = TileSizeY;

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
