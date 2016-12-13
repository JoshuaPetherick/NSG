
function BGTile(x, y) {
    this.tileSprite = game.add.sprite(x, y, 'background');
    this.tileSprite.width = TileSizeX;
    this.tileSprite.height = TileSizeY;
    TILEBACKGROUND.add(this.tileSprite);
}