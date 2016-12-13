
function Enemy(x, y) {
    this.enemySprite = game.add.sprite(x, y, 'enemy');
    this.enemySprite.width = (TileSizeX/2);
    this.enemySprite.height = TileSizeY;
    this.origX = x;
    this.origY = y;

    game.physics.enable(this.enemySprite, Phaser.Physics.ARCADE);
    this.enemySprite.body.allowGravity = true;
    this.enemySprite.body.mass = 0;
    this.baseSpeed = 75; // Base speed required as it gets updated by Behaviour tree
    this.speed = this.baseSpeed;

    foreground.add(this.enemySprite);

    this.walkAnimation = this.enemySprite.animations.add('Walk', Phaser.Animation.generateFrameNames('Run_', 0, 7, '', 3));
    this.walkAnimation.speed = 10;

    this.climbAnimation = this.enemySprite.animations.add('Climb', Phaser.Animation.generateFrameNames('Climb_', 0, 4, '', 3));
    this.climbAnimation.speed = 10;

    this.yell = new sound('yell');

    this.enemyStates = {
        LEFT: 0,
        RIGHT: 1,
        CHASING: 2
    };
    this.state = this.enemyStates.RIGHT;
    this.ai = new AITree(this);

    // Add functions below
    this.enemyUpdate = function () {
        // Update
        this.enemySprite.body.velocity.x = 0;
        //this.enemySprite.body.velocity.y = 0;
        this.ai.treeUpdate();

        game.physics.arcade.collide(this.enemySprite, background);
        // Turn around if colliding with a wall!
        if (game.physics.arcade.collide(this.enemySprite, wallLayer)) {
            if (this.state === this.enemyStates.LEFT) {
                this.state = this.enemyStates.RIGHT;
            }
            else if (this.state === this.enemyStates.RIGHT) {
                this.state = this.enemyStates.LEFT;
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

    this.resetPos = function() {
        this.state = this.enemyStates.RIGHT;
        this.enemySprite.body.allowGravity = false;
        this.enemySprite.x = this.origX;
        this.enemySprite.y = this.origY;
        this.speed = this.baseSpeed;
    }

    this.stopAnimations = function() {
        this.walkAnimation.stop();
        this.climbAnimation.stop();
    }

    playerDied.addSignal(function() {
        for (e in enemies) {
            enemies[e].resetPos();
        }
    });
    getIntel.addSignal(function() {
        for (e in enemies) {
            enemies[e].speed = enemies[e].baseSpeed + Math.round(enemies[e].baseSpeed/4); // Increase speed by a quarter!
        }
    });
}
