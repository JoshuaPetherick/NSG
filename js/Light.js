
function lightInit(x, y) {
    // Init
    var light = background.create(x, y, 'light');
    //light.x = light.x + (light.width/2);

    world.putTile(0, layer.getTileX(x), layer.getTileY(y), layer);
    return light;
}

function lightUpdate() {
    // Update
}
