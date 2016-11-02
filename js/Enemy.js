
function enemyInit(x, y, h, w) {
    var enemy = game.add.sprite(x, y, 'enemy');
    enemy.anchor.setTo(0, 0);
    enemy.state = enemyStates.PATROL;

    enemy.origX = x;
    enemy.origY = y;
    enemy.height = h;
    enemy.width = w;
    return enemy;
}

function enemyUpdate(enemy) {
    var speed = 3;
    // Do stuff (Re-act?)
    enemy.x = enemy.x + speed;
    if (enemy.x >= GAMEWIDTH) {
        enemy.x = enemy.x - speed;
    }
}
