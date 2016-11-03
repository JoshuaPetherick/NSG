
function lightInit(x, y) {
    // Init
    var light = game.add.sprite(x, y, 'light');
    light.anchor.setTo(0.5, 0);

    background.add(light);
    return light;
}

function lightUpdate() {
    // Update
}
