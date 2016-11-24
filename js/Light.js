
function Light(x, y) {
    this.lightSprite = game.add.sprite(x, y, 'light');
    this.lightSprite.width = TileSizeX;
    this.lightSprite.height = TileSizeY;

    game.physics.enable(this.lightSprite, Phaser.Physics.ARCADE);
    this.lightSprite.body.allowGravity = false;
    this.lightSprite.body.immovable = true;
    lightLayer.add(this.lightSprite);
}
