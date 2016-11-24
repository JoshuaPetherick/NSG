
function Enemy(x, y) {
    this.enemySprite = game.add.sprite(x, y, 'enemy');
    this.enemySprite.width = (TileSizeX/2);
    this.enemySprite.height = TileSizeY;
    this.origX = x;
    this.origY = y;

    game.physics.enable(this.enemySprite, Phaser.Physics.ARCADE);
    this.enemySprite.body.allowGravity = true;
    this.enemySprite.body.mass = 0;
    this.speed = 75;

    foreground.add(this.enemySprite);

    this.yell = new sound('yell');

    this.enemyStates = {
        LEFT: 0,
        RIGHT: 1,
        CHASING: 2
    };
    this.state = this.enemyStates.LEFT;

    this.ai = new AITree(this);

    // Add functions below
    this.enemyUpdate = function () {
        // Update
        this.enemySprite.body.velocity.x = 0;
        this.ai.treeUpdate();

        game.physics.arcade.collide(this.enemySprite, background);
        if (game.physics.arcade.collide(this.enemySprite, wallLayer)) {
            if (this.state == this.enemyStates.LEFT) {
                this.state = this.enemyStates.RIGHT;
            }
            else if (this.state == this.enemyStates.RIGHT) {
                this.state = this.enemyStates.LEFT;
            }
            else {
                // No idea....
            }
        }
        if (game.physics.arcade.overlap(this.enemySprite, stairLayer)) {
            this.setGravity(false);
        }
        else {
            this.setGravity(true);
        }
    }

    this.setGravity = function(gravity) {
        this.enemySprite.body.allowGravity = gravity;
    }
}
