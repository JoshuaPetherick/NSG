
function Player(x, y) {
    this.playerSprite = game.add.sprite(x, y, 'player');
    this.playerSprite.width = (TileSizeX/2);
    this.playerSprite.height = TileSizeY;
    this.origX = x;
    this.origY = y;

    game.physics.enable(this.playerSprite, Phaser.Physics.ARCADE);
    this.playerSprite.body.collideWorldBounds = true;
    this.playerSprite.body.mass = 0; // Remove mass so doesn't push other objects down...
    this.speed = 120;

    // Handle button input
    this.leftKey = false;
    this.rightKey = false;
    this.upKey = false;
    this.downKey = false;
    this.spaceBar = false;

    this.leftButton = game.add.button(10, GAMEHEIGHT-40,'leftArrow', null, this, 0, 1, 0, 1);
    this.leftButton.events.onInputOut.add(function(){player.leftKey = false;});
    this.leftButton.events.onInputDown.add(function(){player.leftKey = true;});
    this.leftButton.events.onInputUp.add(function(){player.leftKey = false;});

    this.rightButton = game.add.button(GAMEWIDTH-60, GAMEHEIGHT-40, 'rightArrow', null, this, 0, 1, 0, 1);;
    this.rightButton.events.onInputOut.add(function(){player.rightKey = false;});
    this.rightButton.events.onInputDown.add(function(){player.rightKey = true;});
    this.rightButton.events.onInputUp.add(function(){player.rightKey = false;});

    this.upButton = game.add.button(GAMEWIDTH-110, GAMEHEIGHT-50, 'upArrow', null, this, 0, 1, 0, 1);
    this.upButton.events.onInputOut.add(function(){player.upKey = false;});
    this.upButton.events.onInputDown.add(function(){player.upKey = true;});
    this.upButton.events.onInputUp.add(function(){player.upKey = false;});

    this.downButton = game.add.button(70, GAMEHEIGHT-50, 'downArrow', null, this, 0, 1, 0, 1);
    this.downButton.events.onInputOut.add(function(){player.downKey = false;});
    this.downButton.events.onInputDown.add(function(){player.downKey = true;});
    this.downButton.events.onInputUp.add(function(){player.downKey = false;});

    this.spaceButton = game.add.button((GAMEWIDTH/2)-50, GAMEHEIGHT-40, 'spaceBar', null, this, 0, 1, 0, 1);
    this.spaceButton.events.onInputOut.add(function(){player.spaceBar = false;});
    this.spaceButton.events.onInputDown.add(function(){player.spaceBar = true;});
    this.spaceButton.events.onInputUp.add(function(){player.spaceBar = false;});

    this.playerStates = {
        DARK: 0,
        LIGHT: 1
    };
    this.state = this.playerStates.DARK;
    enemyLayer.add(this.playerSprite);

    // Add functions below
    this.playerInput = function() {
        game.physics.arcade.collide(player.playerSprite, background); // Need to move this for to Update, Once jump is sorted! :S
        this.playerSprite.body.velocity.x = 0;
        //if jump timer stuff {this.playerSprite.body.velocity.x = 0; }

        if (this.leftKey) {
            this.playerSprite.body.velocity.x = -this.speed; // This doesn't do exactly what I want it to do...
        }
        if (this.rightKey) {
            this.playerSprite.body.velocity.x = this.speed;
        }
        if (this.downKey) {
            if (this.playerSprite.body.allowGravity == false) {
                this.playerSprite.body.velocity.y = (this.speed/2);
            }
        }
        if (this.upKey) {
            if (this.playerSprite.body.allowGravity == false) {
                this.playerSprite.body.velocity.y = -(this.speed/2);
            }
        }
        if (this.spaceBar) {
            this.playerSprite.body.velocity.y = -150;
        }
    }

    this.playerUpdate = function () {
        // Update
        if (game.physics.arcade.overlap(this.playerSprite, exitLayer)) {
            exit.exitCollision();
        }
        for (i in enemies) {
            if (game.physics.arcade.overlap(this.playerSprite, enemyLayer)) {
                resetLevel();
            }
        }
        for (i in lights) {
            if (game.physics.arcade.overlap(this.playerSprite, lightLayer)) {
                this.state = this.playerStates.LIGHT;
            }
            else {
                this.state = this.playerStates.DARK;
            }
        }
        for ( i in stairs ) {
            if (game.physics.arcade.overlap(this.playerSprite, stairLayer)) {
                this.setGravity(false);
            }
            else {
                this.setGravity(true);
            }
        }
    }

    this.setGravity = function(gravity) {
        this.playerSprite.body.allowGravity = gravity;
    }
}