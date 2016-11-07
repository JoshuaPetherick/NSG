
function stairInit(x, y, h, w) {
    // Init
    var stair = game.add.sprite(x, y, 'stairs');
    stair.anchor.setTo(0, 0);

    stair.height = h;
    stair.width = w;

    midground.add(stair);
    return stair;
}

function stairUpdate() {
    // Update
}
