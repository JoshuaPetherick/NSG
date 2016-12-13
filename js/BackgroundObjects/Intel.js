
function Intel(x, y) {
    this.intelSprite = game.add.sprite(x, y, 'intel');
    this.intelSprite.width = TileSizeX;
    this.intelSprite.height = TileSizeY;

    game.physics.enable(this.intelSprite, Phaser.Physics.ARCADE);
    this.intelSprite.body.allowGravity = false;
    this.intelSprite.body.immovable = true;
    foreground.add(this.intelSprite);

    this.destroy = function() {
        this.intelSprite.destroy();
    }

    getIntel.addSignal (function() {
        intel.destroy();
    })
}