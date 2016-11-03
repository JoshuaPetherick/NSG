
function floorInit(x, y, h, w) {
    // Init
    var floor = game.add.sprite(x, y, 'floor');
    floor.anchor.setTo(0, 0);

    floor.height = h;
    floor.width = w;

    background.add(floor);
    return floor;
}

function floorUpdate() {
    // Update
}
