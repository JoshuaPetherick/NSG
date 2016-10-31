
function playerInput(player) {
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
