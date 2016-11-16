
function Player(x, y) {
    this.playerSprite = game.add.sprite(x, y, 'player');
    this.playerSprite.width = (TileSizeX/2);
    this.playerSprite.height = TileSizeY;
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
    this.spaceBar = false;

    this.leftButton = game.add.button(10, GAMEHEIGHT-40,'leftArrow', null, this, 0, 1, 0, 1);
    this.leftButton.events.onInputDown.add(function(){player.leftKey = true;});
    this.leftButton.events.onInputUp.add(function(){player.leftKey = false;});

    this.rightButton = game.add.button(GAMEWIDTH-60, GAMEHEIGHT-40, 'rightArrow', null, this, 0, 1, 0, 1);;
    this.rightButton.events.onInputDown.add(function(){player.rightKey = true});
    this.rightButton.events.onInputUp.add(function(){player.rightKey = false});

    this.upButton = game.add.button(GAMEWIDTH-110, GAMEHEIGHT-50, 'upArrow', null, this, 0, 1, 0, 1);
    this.upButton.events.onInputDown.add(function(){player.upKey = true});
    this.upButton.events.onInputUp.add(function(){player.upKey = false});

    this.downButton = game.add.button(70, GAMEHEIGHT-50, 'downArrow', null, this, 0, 1, 0, 1);
    this.downButton.events.onInputDown.add(function(){player.downKey = true});
    this.downButton.events.onInputUp.add(function(){player.downKey = false});

    this.spaceButton = game.add.button((GAMEWIDTH/2)-50, GAMEHEIGHT-40, 'spaceBar', null, this, 0, 1, 0, 1);
    this.spaceButton.events.onInputDown.add(function(){player.spaceBar = true});
    this.spaceButton.events.onInputUp.add(function(){player.spaceBar = false});

    this.playerStates = {
        DARK: 0,
        LIGHT: 1
    };
    this.state = this.playerStates.DARK;

    // Add functions below
    this.playerUpdate = function () {
        // Update
        if (game.input.currentPointers == 0 && !game.input.activePointer.isMouse) {
            //On screen keys can sometime get stuck, this IF fixes that issue
            this.leftKey = false;
            this.rightKey = false;
            this.upKey = false;
            this.downKey = false;
            this.spaceBar = false;
        }
    }

    this.playerInput = function() {
        if (this.leftKey == true) {
            this.playerSprite.body.velocity.x = -this.speed;
        }
        if (this.rightKey == true) {
            this.playerSprite.body.velocity.x = this.speed;
        }
        if (this.downKey == true) {
            if (this.playerSprite.body.gravity.y == 0) {
                this.playerSprite.body.velocity.y = (this.speed/2);
            }
        }
        if (this.upKey == true) {
            if (this.playerSprite.body.gravity.y == 0) {
                this.playerSprite.body.velocity.y = -(this.speed/2);
            }
        }
        if (this.spaceBar == true) {
            this.playerSprite.body.velocity.y = -150;
        }
    }

    this.setGravity = function(gravity) {
        this.playerSprite.body.allowGravity = gravity;
    }
}