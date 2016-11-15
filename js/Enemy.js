
function Enemy(x, y) {
    this.enemy = game.add.sprite(x, y, 'enemy');
    this.enemy.width = (TileSizeX/2);
    this.enemy.height = TileSizeY;
    this.origX = x;
    this.origY = y;

    game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    this.enemy.body.allowGravity = false;
    this.enemy.body.immovable = true;
    background.add(this.enemy);

    // Add functions below
    this.enemyUpdate = function () {
        // Update
    }

    this.enemyCollision = function () {
        // Load new level!
    }
}