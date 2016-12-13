
function Intel(x, y) {
    this.intelSprite = game.add.sprite(x, (y+(TileSizeY/2)), 'intel');
    this.intelSprite.width = (TileSizeX/2);
    this.intelSprite.height = (TileSizeY/2);

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