
function Enemy(x, y) {
    this.enemySprite = game.add.sprite(x, y, 'enemy');
    this.enemySprite.width = (TileSizeX/2);
    this.enemySprite.height = TileSizeY;
    this.origX = x;
    this.origY = y;

    game.physics.enable(this.enemySprite, Phaser.Physics.ARCADE);
    this.enemySprite.body.allowGravity = false;
    this.enemySprite.body.immovable = true;

    enemyLayer.add(this.enemySprite);

    this.yell = new sound('yell');

    this.enemyStates = {
        PATROL: 0,
        CHASE: 1,
        ALERT: 2
    };
    this.state = this.enemyStates.PATROL;

    this.tree = b3.BehaviourTree; // Create new Behavior Tree
    // Import behaviour tree from .JSON file!
    // Allows me to update AI without going into Code...?

    // Add functions below
    this.enemyUpdate = function () {
        // Update
    }
}