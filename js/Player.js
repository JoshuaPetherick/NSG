
function playerInit(x, y, h, w) {
    player = game.add.sprite(x, y, 'player');
    player.anchor.setTo(0, 0);

    player.origX = x;
    player.origY = y;
    player.height = h;
    player.width = w;

    player.state = playerStates.DARK;
    foreground.add(player);
}

function inputInit() {
    var leftButton = game.add.button(10, GAMEHEIGHT-40,'leftArrow', null, this, 0, 1, 0, 1);
    leftButton.events.onInputOver.add(function(){leftKey = true;});
    leftButton.events.onInputOut.add(function(){leftKey = false;});
    leftButton.events.onInputDown.add(function(){leftKey = true;});
    leftButton.events.onInputUp.add(function(){leftKey = false;});

    var rightButton = game.add.button(GAMEWIDTH-60, GAMEHEIGHT-40, 'rightArrow', null, this, 0, 1, 0, 1);;
    rightButton.events.onInputOver.add(function(){rightKey = true;});
    rightButton.events.onInputOut.add(function(){rightKey = false});
    rightButton.events.onInputDown.add(function(){rightKey = true});
    rightButton.events.onInputUp.add(function(){rightKey = false});

    var upButton = game.add.button(GAMEWIDTH-110, GAMEHEIGHT-50, 'upArrow', null, this, 0, 1, 0, 1);
    //upButton.events.onInputOver.add();
    //upButton.events.onInputDown.add();

    var downButton = game.add.button(70, GAMEHEIGHT-50, 'downArrow', null, this, 0, 1, 0, 1);
    //downButton.events.onInputOver.add();
    //downButton.events.onInputDown.add();

    var spaceButton = game.add.button((GAMEWIDTH/2)-50, GAMEHEIGHT-40, 'spaceBar', null, this, 0, 1, 0, 1);
    //spaceButton.events.onInputOver.add();
    //spaceButton.events.onInputDown.add();
}

function moveLeft() {
    player.x = player.x - playerSpeed;
    if (player.x <= 0) { // Check not going off the screen!
        player.x = player.x + playerSpeed;
    }
    else if (player.state != playerStates.FALLING) { // Make sure still on a platform
        if( playerCheckCollision(floors) == false && playerCheckCollision(stairs) == false) {
            player.state = playerStates.FALLING;
        }
    }
}

function moveRight() {
    player.x = player.x + playerSpeed;
    if (player.x >= GAMEWIDTH) { // Check not going off the screen!
        player.x = player.x - playerSpeed;
    }
    else if (player.state != playerStates.FALLING) { // Make sure still on a platform
        if (playerCheckCollision(floors) == false && playerCheckCollision(stairs) == false) {
            player.state = playerStates.FALLING;
        }
    }
}

function playerInput(player) {

    if (leftKey == true) {
        moveLeft();
    }
    if (rightKey == true) {
        moveRight();
    }
    if (downKey == true) {

    }
    if (upKey == true) {

    }
    if (spaceBar == true) {

    }
    // Handle Up
    // if (upKey.isDown) {
    //     if (playerCheckCollision(stairs)) {
    //         player.y = player.y - speed;
    //     }
    // }
    // // Handle Down
    // if (downKey.isDown) {
    //     if (playerCheckCollision(stairs) && playerCheckCollision(floors) == false) {
    //         player.y = player.y + speed;
    //     }
    // }
    // // Handling jumping
    // if (spaceBar.isDown && player.state != playerStates.FALLING) {
    //     yell.play();
    // }
}

function playerUpdate() {
    if (player.state == playerStates.FALLING) {
        player.y = player.y + Math.floor(GAMEHEIGHT/200);
        if (playerCheckCollision(floors) || playerCheckCollision(stairs)) {
            player.state = playerStates.DARK;
        }
    }
}

function playerCheckCollision(array) {
    for(i = 0; i < array.length; i++) {
        if (checkColliding(player, array[i]) == true) {
            return true; // If colliding then no longer need to check!
        }
    }
    return false; // Not colliding...
}