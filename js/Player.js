
function Player(x, y) {
    // Init
    this.playerSprite = game.add.sprite(x, y, 'player');
    this.playerSprite.width = (TileSizeX/2);
    this.playerSprite.height = TileSizeY;
    this.gotIntel = false;
    this.origX = x; // Set origin so can restart level!
    this.origY = y;

    // Physics
    game.physics.enable(this.playerSprite, Phaser.Physics.ARCADE);
    this.playerSprite.body.collideWorldBounds = true; // Thou shall never leave this world!
    this.playerSprite.body.mass = 0; // Remove mass so doesn't push other objects down...
    this.speed = 100; // Set base speed here!

    // Animations
    this.idleAnimation = this.playerSprite.animations.add('Idle', Phaser.Animation.generateFrameNames('Idle_', 0, 9, '', 3));
    this.idleAnimation.speed = 20

    this.walkAnimation = this.playerSprite.animations.add('Walk', Phaser.Animation.generateFrameNames('Run_', 0, 9, '', 3));
    this.walkAnimation.speed = 10;

    this.jumpAnimation = this.playerSprite.animations.add('Jump', Phaser.Animation.generateFrameNames('Jump_', 0, 9, '', 3));
    this.jumpAnimation.speed = 10;

    this.climbAnimation = this.playerSprite.animations.add('Climb', Phaser.Animation.generateFrameNames('Climb_', 0, 9, '', 3));
    this.climbAnimation.speed = 10;

    this.deathAnimation = this.playerSprite.animations.add('Death', Phaser.Animation.generateFrameNames('Dead_', 0, 9, '', 3));

    // Handle button input
    this.leftKey = false;
    this.rightKey = false;
    this.upKey = false;
    this.downKey = false;

    this.leftButton = game.add.button(10, GAMEHEIGHT-40,'leftArrow', null, this, 0, 1, 0, 1);
    this.leftButton.events.onInputOut.add(function(){player.leftKey = false;});
    this.leftButton.events.onInputDown.add(function(){player.leftKey = true;});
    this.leftButton.events.onInputUp.add(function(){player.leftKey = false;});
    foreground.add(this.leftButton); // Add to foreground layer so it's drawn last!

    this.rightButton = game.add.button(GAMEWIDTH-60, GAMEHEIGHT-40, 'rightArrow', null, this, 0, 1, 0, 1);;
    this.rightButton.events.onInputOut.add(function(){player.rightKey = false;});
    this.rightButton.events.onInputDown.add(function(){player.rightKey = true;});
    this.rightButton.events.onInputUp.add(function(){player.rightKey = false;});
    foreground.add(this.rightButton); // Add to foreground layer so it's drawn last!

    this.upButton = game.add.button(GAMEWIDTH-120, GAMEHEIGHT-50, 'upArrow', null, this, 0, 1, 0, 1);
    this.upButton.events.onInputOut.add(function(){player.upKey = false;});
    this.upButton.events.onInputDown.add(function(){player.upKey = true;});
    this.upButton.events.onInputUp.add(function(){player.upKey = false;});
    foreground.add(this.upButton); // Add to foreground layer so it's drawn last!

    this.downButton = game.add.button(80, GAMEHEIGHT-50, 'downArrow', null, this, 0, 1, 0, 1);
    this.downButton.events.onInputOut.add(function(){player.downKey = false;});
    this.downButton.events.onInputDown.add(function(){player.downKey = true;});
    this.downButton.events.onInputUp.add(function(){player.downKey = false;});
    foreground.add(this.downButton); // Add to foreground layer so it's drawn last!

    this.playerStates = {
        DARK: 0,
        LIGHT: 1
    };
    this.state = this.playerStates.DARK;
    foreground.add(this.playerSprite);

    playerDied.addSignal(function () {
        player.playerSprite.x = player.origX;
        player.playerSprite.y = player.origY;
    });

    getIntel.addSignal(function () {
        player.gotIntel = true;
    });

    // Add functions below
    this.playerInput = function() {
        this.playerSprite.body.velocity.x = 0; // Empty velocity so not sliding left/right
        //this.playerSprite.scale.x *= -1;
        if (!this.playerSprite.body.allowGravity) {
            this.playerSprite.body.velocity.y = 0; // Empty velocity so not sliding up/down
        }

        if (game.physics.arcade.collide(player.playerSprite, background)) {
            if (this.upKey) {
                this.playerSprite.body.velocity.y = -this.speed; // Jump up
                this.stopAnimations();
                this.jumpAnimation.play();
            }
        }
        if (this.leftKey) {
            this.playerSprite.body.velocity.x = -this.speed; // Move left
            if (!this.walkAnimation.isPlaying && !this.jumpAnimation.isPlaying) {
                if (this.playerSprite.width > 0) { // Flip image vertically (Face Left)
                    this.playerSprite.scale.x *= -1;
                }
                this.stopAnimations();
                this.walkAnimation.play();
            }
        }
        if (this.rightKey) {
            this.playerSprite.body.velocity.x = this.speed; // Move right
            if (!this.walkAnimation.isPlaying && !this.jumpAnimation.isPlaying) {
                if (this.playerSprite.width < 0) { // Flip image vertically (Face Right)
                    this.playerSprite.scale.x *= -1;
                }
                this.stopAnimations();
                this.walkAnimation.play();
            }
        }
        if (this.upKey) {
            if (!this.playerSprite.body.allowGravity) {
                this.playerSprite.body.velocity.y = -this.speed; // Move up
                if (!this.climbAnimation.isPlaying) {
                    this.stopAnimations();
                    this.climbAnimation.play();
                }
            }
        }
        if (this.downKey) {
            if (!this.playerSprite.body.allowGravity) {
                this.playerSprite.body.velocity.y = this.speed; // Move down
                if (!this.climbAnimation.isPlaying) {
                    this.stopAnimations();
                    this.climbAnimation.play();
                }
            }
        }
    }

    this.playerUpdate = function () {
        // Update
        if (this.leftKey === false && this.rightKey === false) {
            this.walkAnimation.stop();
        }
        if (!this.walkAnimation.isPlaying && !this.jumpAnimation.isPlaying &&
            !this.idleAnimation.isPlaying && !this.climbAnimation.isPlaying) {
            this.stopAnimations();
            this.idleAnimation.play();
        }
    }

    this.setGravity = function(gravity) {
        // Gravity set-er
        this.playerSprite.body.allowGravity = gravity;
    }

    this.stopAnimations = function() {
        this.idleAnimation.stop();
        this.walkAnimation.stop();
        this.jumpAnimation.stop();
        this.climbAnimation.stop();
    }

    this.updateState = function(state) {
        // http://www.html5gamedevs.com/topic/3003-sprite-transparency/
        if (state === this.playerStates.LIGHT) {
            this.state = this.playerStates.LIGHT;
            this.playerSprite.alpha = 1;
        }
        else if (state === this.playerStates.DARK) {
            this.state = this.playerStates.DARK;
            this.playerSprite.alpha = 0.5;
        }
    }
}