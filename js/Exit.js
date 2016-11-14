
function exitInit(x, y, w, h) {
    // Init
    exit = background.create(x, y, 'exit');
    exit.height = h;
    exit.width = w;

    world.putTile(0, layer.getTileX(x), layer.getTileY(y), layer);
    return exit;
}

function exitUpdate() {
    // Update
    if (checkColliding(player, exit)) {
        nextLevel();
    }
}
