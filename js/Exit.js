
function exitInit(x, y, h, w) {
    // Init
    exit = game.add.sprite(x, y, 'exit');
    exit.anchor.setTo(-0.5, 0);

    exit.height = h;
    exit.width = w;
    background.add(exit);
    return exit;
}

function exitUpdate() {
    // Update
    if (checkColliding(player, exit)) {
        nextLevel();
    }
}
