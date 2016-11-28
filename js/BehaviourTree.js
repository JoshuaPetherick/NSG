// Inspired by and based off code at: https://github.com/efbenson/behavior3Test
// Using library behavior3js from: http://behavior3js.guineashots.com/
var tree = {};

function AITree(enemy) {

    this.treeUpdate = function() {
        this.ai.guy.tick(this.character, this.character.memory);
    }

    this.loadAction = function(name, properties) {
        return loadTreeNode(name, properties, b3.Action);
    }

    this.loadCondition = function(name, properties) {
        return loadTreeNode(name, properties, b3.Condition);
    }

    this.actions = function(action) {
        action('EnemyAlert', {
            tick: function(tick) {
                var enemy = tick.blackboard.get('pointer');
                enemy.speed = 125;
                return b3.SUCCESS;
            }
        });
        action('ChasePlayer', {
            tick: function(tick) {
                var enemy = tick.blackboard.get('pointer');
                enemy.enemySprite.body.velocity.x = 0;

                if (player.playerSprite.x <= enemy.enemySprite.x ) {
                    enemy.enemySprite.body.velocity.x = -enemy.speed;
                }
                else {
                    enemy.enemySprite.body.velocity.x = enemy.speed;
                }
                if (player.playerSprite.y < enemy.enemySprite.y
                    || player.playerSprite.y > enemy.enemySprite.y) {
                    if (game.physics.arcade.overlap(enemy.enemySprite, stairLayer)) {
                        if (player.playerSprite.y < enemy.enemySprite.y) {
                            enemy.enemySprite.body.velocity.y = -enemy.speed;
                        }
                        else {
                            enemy.enemySprite.body.velocity.y = enemy.speed;
                        }
                    }
                }
                return b3.SUCCESS;
            }
        });
        action('Patrol', {
            tick: function(tick) {
                var enemy = tick.blackboard.get('pointer');
                if(enemy.state === enemy.enemyStates.LEFT) {
                    enemy.enemySprite.body.velocity.x = -enemy.speed;
                    if (enemy.enemySprite.x < 0 ) {
                        enemy.state = enemy.enemyStates.RIGHT;
                    }
                }
                else {
                    enemy.enemySprite.body.velocity.x = enemy.speed;
                    if (enemy.enemySprite.x > (GAMEWIDTH - enemy.enemySprite.width)) {
                        enemy.state = enemy.enemyStates.LEFT;
                    }
                }
                return b3.SUCCESS;
            }
        });
    }

    this.conditions = function(condition) {
        condition('AlarmTriggered', {
            tick: function(tick) {
                var enemy = tick.blackboard.get('pointer');
                if (player.gotIntel === true) {
                    return b3.SUCCESS;
                }
                return b3.FAILURE;
            }
        });
        condition('ChasingPlayer', {
            tick: function(tick) {
                var enemy = tick.blackboard.get('pointer');
                if (enemy.state === enemy.enemyStates.CHASING) {
                    return b3.SUCCESS;
                }
                return b3.FAILURE;
            }
        });
        condition('SeePlayer', {
            tick: function(tick) {
                var enemy = tick.blackboard.get('pointer');
                if(enemy.state === enemy.enemyStates.LEFT) {
                    if(player.state === player.playerStates.LIGHT
                        && player.playerSprite.x <= enemy.enemySprite.x
                        && player.playerSprite.y === enemy.enemySprite.y) {
                        enemy.state = enemy.enemyStates.CHASING;
                        enemy.speed = 150;
                        enemy.yell.musicPlay();
                        return b3.SUCCESS;
                    }
                }
                else {
                    if(player.state === player.playerStates.LIGHT
                        && player.playerSprite.x >= enemy.enemySprite.x
                        && player.playerSprite.y === enemy.enemySprite.y) {
                        enemy.state = enemy.enemyStates.CHASING;
                        enemy.speed = 150;
                        enemy.yell.musicPlay();
                        return b3.SUCCESS;
                    }
                }
                return b3.FAILURE;
            }
        });
    }

    this.treeInit = function(action, condition) {
        this.actions(action);
        this.conditions(condition);
    }

    this.treeInit(this.loadAction, this.loadCondition);

    this.ai = {'guy': new b3.BehaviorTree()};
    this.ai.guy.load(JSON.parse(game.cache.getText('AITree')), tree);

    this.character = {
        memory:  new b3.Blackboard()
    };
    this.character.memory.set('name', 'Enemy');
    this.character.memory.set('pointer', enemy);
}

function loadTreeNode(name, properties, type) {
    var node = b3.Class(type);
    var nodeProto = node.prototype;
    nodeProto.name = name;
    for (var prop in properties) {
        nodeProto[prop] = properties[prop];
    }
    tree[name] = node;
    return node;
}
