
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

function playerInput(player) {
    var speed = 2;

    //Handle Left
    if (leftKey.isDown) {
        //console.log("Pressed Left: " + player.x);
        player.x = player.x - speed;
        if (player.x <= 0) { // Check not going off the screen!
            player.x = player.x + speed;
        }
        else if (player.state != playerStates.FALLING) { // Make sure still on a platform
            if( playerCheckCollision(floors) == false && playerCheckCollision(stairs) == false) {
                player.state = playerStates.FALLING;
            }
        }
    }
    // Handle Right
    if (rightKey.isDown) {
        //console.log("Pressed Right: " + player.x);
        player.x = player.x + speed;
        if (player.x >= GAMEWIDTH) { // Check not going off the screen!
            player.x = player.x - speed;
        }
        else if (player.state != playerStates.FALLING) { // Make sure still on a platform
            if (playerCheckCollision(floors) == false && playerCheckCollision(stairs) == false) {
                player.state = playerStates.FALLING;
            }
        }
    }
    // Handle Up
    if (upKey.isDown) {
        if (playerCheckCollision(stairs)) {
            player.y = player.y - speed;
        }
    }
    // Handle Down
    if (downKey.isDown) {
        if (playerCheckCollision(stairs) && playerCheckCollision(floors) == false) {
            player.y = player.y + speed;
        }
    }
    // Handling jumping
    if (spaceBar.isDown && player.state != playerStates.FALLING) {
        yell.play();
    }
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