
function enemyInit(x, y) {
    var enemy = game.add.sprite(x, y, 'player');
    enemy.anchor.setTo(0.5, 0,5);
    enemy.state = enemyStates.PATROL;

    enemy.origX = x;
    enemy.origY = y;
    return enemy;
}

function enemyUpdate(enemy) {
    var speed = 2;
    // Do stuff (Re-act?)
    enemy.x = enemy.x + speed;
    if (enemy.x >= GAMEWIDTH)
    {
        enemy.x = enemy.x - speed;
    }
}
