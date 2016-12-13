
function Wall(x, y) {
    this.wallSprite = game.add.sprite(x, y, 'wall');
    this.wallSprite.width = TileSizeX;
    this.wallSprite.height = TileSizeY;

    game.physics.enable(this.wallSprite, Phaser.Physics.ARCADE);
    this.wallSprite.body.allowGravity = false;
    this.wallSprite.body.immovable = true;
    wallLayer.add(this.wallSprite);
}