
function Player(x, y) {
    this.playerSprite = game.add.sprite(x, y, 'player');
    this.playerSprite.width = (TileSizeX/2);
    this.playerSprite.height = TileSizeY;
    this.gotIntel = false;
    this.origX = x;
    this.origY = y;

    game.physics.enable(this.playerSprite, Phaser.Physics.ARCADE);
    this.playerSprite.body.collideWorldBounds = true;
    this.playerSprite.body.mass = 0; // Remove mass so doesn't push other objects down...
    this.speed = 100;

    // Handle button input
    this.leftKey = false;
    this.rightKey = false;
    this.upKey = false;
    this.downKey = false;

    this.leftButton = game.add.button(10, GAMEHEIGHT-40,'leftArrow', null, this, 0, 1, 0, 1);
    this.leftButton.events.onInputOut.add(function(){player.leftKey = false;});
    this.leftButton.events.onInputDown.add(function(){player.leftKey = true;});
    this.leftButton.events.onInputUp.add(function(){player.leftKey = false;});
    foreground.add(this.leftButton); // Add to enemy layer so it draws on top!

    this.rightButton = game.add.button(GAMEWIDTH-60, GAMEHEIGHT-40, 'rightArrow', null, this, 0, 1, 0, 1);;
    this.rightButton.events.onInputOut.add(function(){player.rightKey = false;});
    this.rightButton.events.onInputDown.add(function(){player.rightKey = true;});
    this.rightButton.events.onInputUp.add(function(){player.rightKey = false;});
    foreground.add(this.rightButton);

    this.upButton = game.add.button(GAMEWIDTH-120, GAMEHEIGHT-50, 'upArrow', null, this, 0, 1, 0, 1);
    this.upButton.events.onInputOut.add(function(){player.upKey = false;});
    this.upButton.events.onInputDown.add(function(){player.upKey = true;});
    this.upButton.events.onInputUp.add(function(){player.upKey = false;});
    foreground.add(this.upButton);

    this.downButton = game.add.button(80, GAMEHEIGHT-50, 'downArrow', null, this, 0, 1, 0, 1);
    this.downButton.events.onInputOut.add(function(){player.downKey = false;});
    this.downButton.events.onInputDown.add(function(){player.downKey = true;});
    this.downButton.events.onInputUp.add(function(){player.downKey = false;});
    foreground.add(this.downButton);

    this.playerStates = {
        DARK: 0,
        LIGHT: 1
    };
    this.state = this.playerStates.DARK;
    foreground.add(this.playerSprite);

    // Add functions below
    this.playerInput = function() {
        this.playerSprite.body.velocity.x = 0;
        if (!this.playerSprite.body.allowGravity) {
            this.playerSprite.body.velocity.y = 0;
        }

        if (game.physics.arcade.collide(player.playerSprite, background)) {
            if (this.upKey) {
                this.playerSprite.body.velocity.y = -150;
            }
        }
        if (this.leftKey) {
            this.playerSprite.body.velocity.x = -this.speed;
        }
        if (this.rightKey) {
            this.playerSprite.body.velocity.x = this.speed;
        }
        if (this.upKey) {
            if (!this.playerSprite.body.allowGravity) {
                this.playerSprite.body.velocity.y = -(this.speed-25);
            }
        }
        if (this.downKey) {
            if (!this.playerSprite.body.allowGravity) {
                this.playerSprite.body.velocity.y = (this.speed-25);
            }
        }
    }

    this.playerUpdate = function () {
        // Update
        game.physics.arcade.collide(player.playerSprite, wallLayer)
        if (game.physics.arcade.overlap(this.playerSprite, exitLayer)) {
            exit.exitCollision();
        }
        for (e in enemies) {
            if (game.physics.arcade.overlap(this.playerSprite, enemies[e].enemySprite)) {
                resetLevel();
            }
        }
        if (game.physics.arcade.overlap(this.playerSprite, lightLayer)) {
            this.state = this.playerStates.LIGHT;
        }
        else {
            this.state = this.playerStates.DARK;
        }
        if (game.physics.arcade.overlap(this.playerSprite, stairLayer)) {
            this.setGravity(false);
        }
        else {
            this.setGravity(true);
        }
    }

    this.setGravity = function(gravity) {
        this.playerSprite.body.allowGravity = gravity;
    }
}