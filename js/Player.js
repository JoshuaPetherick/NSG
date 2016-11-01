
function playerInit() {
    player = game.add.sprite(GAMEHEIGHT/2, GAMEWIDTH/2, 'player');
    player.anchor.setTo(0.5, 0.5);
    player.state = playerStates.DARK;
}

function playerInput(player) {
    var speed = 1;

    //Pass across key pressed
    if (leftKey.isDown)
    {
        console.log("Pressed Left");
        player.x = player.x - speed;
    }
    if (rightKey.isDown)
    {
        console.log("Pressed Right");
        player.x = player.x + speed;
    }
    if (spaceBar.isDown)
    {
        yell.play();
    }
}

function playerUpdate() {
    //Do something;
}
