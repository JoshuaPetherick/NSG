
function Enemy(x, y) {
    this.enemySprite = game.add.sprite(x, y, 'enemy');
    this.enemySprite.width = (TileSizeX/2);
    this.enemySprite.height = TileSizeY;
    this.origX = x;
    this.origY = y;

    game.physics.enable(this.enemySprite, Phaser.Physics.ARCADE);
    this.enemySprite.body.allowGravity = false;
    this.enemySprite.body.immovable = true;
    background.add(this.enemySprite);

    this.enemyStates = {
        PATROL: 0,
        CHASE: 1,
        ALERT: 2
    };
    this.state = this.enemyStates.PATROL;

    // Add functions below
    this.enemyUpdate = function () {
        // Update
    }

    this.enemyCollision = function () {
        // Load new level!
    }
}