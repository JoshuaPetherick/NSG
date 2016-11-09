
function enemyInit(x, y, h, w) {
    var enemy = game.add.sprite(x, y, 'enemy');
    enemy.anchor.setTo(0, 0);
    enemy.state = enemyStates.PATROL;

    enemy.origX = x;
    enemy.origY = y;
    enemy.height = h;
    enemy.width = w;

    enemy.speed = 3;
    foreground.add(enemy);
    return enemy;
}

function enemyUpdate(enemy) {
    // Check if colliding with player!
    if (checkColliding(player, enemy)) {
        resetLevel();
    }

    // Code to patrol - methodise this
    //enemy.x = enemy.x - enemy.speed;
    //if (enemy.x <= 0) {
    //    enemy.x = enemy.x + enemy.speed;
    //}
}
