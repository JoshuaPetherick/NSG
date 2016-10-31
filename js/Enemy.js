
function enemyUpdate(enemy)
{
    // Do stuff (Re-act?)
    enemy.x = enemy.x + speed;
    if (enemy.x >= GAMEWIDTH)
    {
        enemy.x = enemy.x - speed;
    }
}
