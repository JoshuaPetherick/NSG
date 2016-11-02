
function playerInit(x, y, h, w) {
    player = game.add.sprite(x, y, 'player');
    player.anchor.setTo(0, 0);

    player.origX = x;
    player.origY = y;
    player.height = h;
    player.width = w;
    player.state = playerStates.DARK;
}

function playerInput(player) {
    var speed = 2;

    //Handle Left
    if (leftKey.isDown) {
        console.log("Pressed Left: " + player.x);
        player.x = player.x - speed;
        if (player.x <= 0) { // Check not going off the screen!
            player.x = player.x + speed;
        }
        else if (player.state != playerStates.FALLING) { // Make sure still on a platform
            if( playerCheckCollision()) {
                player.state = playerStates.FALLING;
            }
        }
    }
    // Handle Right
    if (rightKey.isDown) {
        console.log("Pressed Right: " + player.x);
        player.x = player.x + speed;
        if (player.x >= GAMEWIDTH) { // Check not going off the screen!
            player.x = player.x - speed;
        }
        else if (player.state != playerStates.FALLING) { // Make sure still on a platform
            if (playerCheckCollision()) {
                player.state = playerStates.FALLING;
            }
        }
    }
    // Handling jumping
    if (player.state == playerStates.FALLING) {
        player.y = player.y + (speed*2);
        if (playerCheckCollision() == false) {
            player.state = playerStates.DARK;
        }
    }
    else if (spaceBar.isDown) {
        console.log(player.getBounds());
        console.log(floors[0].getBounds());
        yell.play();
    }
}

function playerUpdate() {
    //Do something;
}

function playerCheckCollision() {
    for(i = 0; i < floors.length; i++) {
        if (checkColliding(player, floors[i]) == true) {
            return false; // If colliding then no longer need to check!
        }
    }
    for(i = 0; i < stairs.length; i++) {
        if (checkColliding(player, stairs[i]) == true) {
            return false; // If colliding then no longer need to check!
        }
    }
    return true; // Not colliding...
}