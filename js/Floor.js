
function floorInit(x, y, w, h) {
    // Init
    var floor = background.create(x, y, 'floor');
    floor.height = h;
    floor.width = w;

    world.putTile(0, layer.getTileX(x), layer.getTileY(y), layer);
    return floor;
}

function floorUpdate() {
    // Update
}
