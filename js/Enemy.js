
function enemyInit() {
    var enemy = game.add.sprite(0,0, 'player');
    enemy.anchor.setTo(0.5, 0,5);
    enemy.state = enemyStates.PATROL;

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
