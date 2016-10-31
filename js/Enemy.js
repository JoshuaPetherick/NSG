
function enemyUpdate(enemy)
{
    // Do stuff (Re-act?)
    console.log("Dun dun dun");
    enemy.x = enemy.x + speed;
    if (enemy.x >= GAMEWIDTH)
    {
        enemy.x = enemy.x - speed;
    }
}
