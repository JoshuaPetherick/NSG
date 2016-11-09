
function enemyInit(x, y, h, w) {
    var enemy = game.add.sprite(x, y, 'enemy');
    enemy.anchor.setTo(0, 0);
    enemy.state = enemyStates.PATROL;

    enemy.origX = x;
    enemy.origY = y;
    enemy.height = h;
    enemy.width = w;

    foreground.add(enemy);
    return enemy;
}

function enemyUpdate(enemy) {
    var speed = 2;

    // Check if colliding with player!
    if (checkColliding(player, enemy)) {
        resetLevel();
    }

    //enemy.x = enemy.x - speed;
    //if (enemy.x <= 0) {
    //    enemy.x = enemy.x + speed;
    //}
}
