// Based off code at: https://github.com/efbenson/behavior3Test
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
        action('ChasePlayer', {
            tick: function(tick) {
                var enemy = tick.blackboard.get('pointer');
                enemy.enemySprite.body.velocity.x = 0;

                // Handles moving Left & Right
                if (player.playerSprite.x < enemy.enemySprite.x ) {
                    enemy.enemySprite.body.velocity.x = -enemy.speed;
                    if (enemy.enemySprite.width > 0) { // Flip image vertically (Face Left)
                        enemy.enemySprite.scale.x *= -1;
                        enemy.enemySprite.x -= enemy.enemySprite.width; // Prevents position from changing after flip
                    }
                }
                else if (player.playerSprite.x > enemy.enemySprite.x) {
                    enemy.enemySprite.body.velocity.x = enemy.speed;
                    if (enemy.enemySprite.width < 0) { // Flip image vertically (Face Right)
                        enemy.enemySprite.scale.x *= -1;
                        enemy.enemySprite.x -= enemy.enemySprite.width; // Prevents position from changing after flip
                    }
                }
                if (!enemy.walkAnimation.isPlaying && !enemy.climbAnimation.isPlaying) {
                    enemy.stopAnimations();
                    enemy.walkAnimation.play();
                }
                // Handles moving Up or Down
                if (player.playerSprite.y != enemy.enemySprite.y) {
                    // Check if player above or below AI
                    if (game.physics.arcade.overlap(enemy.enemySprite, stairLayer)) {
                        if (player.playerSprite.y < enemy.enemySprite.y) {
                            enemy.enemySprite.body.velocity.y = -enemy.speed/2; // Move at half speed
                        }
                        else {
                            enemy.enemySprite.body.velocity.y = enemy.speed/2; // Move at half speed
                        }
                        if (!enemy.climbAnimation.isPlaying) {
                            enemy.stopAnimations();
                            enemy.climbAnimation.play();
                        }
                    }
                    if (!enemy.walkAnimation.isPlaying && !enemy.climbAnimation.isPlaying) {
                        enemy.stopAnimations();
                        enemy.walkAnimation.play();
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
                    if (enemy.enemySprite.width > 0) { // Flip image vertically (Face Left)
                        enemy.enemySprite.scale.x *= -1;
                        enemy.enemySprite.x -= enemy.enemySprite.width; // Prevents position from changing after flip
                    }
                    if (enemy.enemySprite.x <= (0 - enemy.enemySprite.width) ) {
                        // Needs to be minus as width becomes negative when flipped
                        enemy.state = enemy.enemyStates.RIGHT;
                    }
                }
                else {
                    enemy.enemySprite.body.velocity.x = enemy.speed;
                    if (enemy.enemySprite.width < 0) { // Flip image vertically (Face Right)
                        enemy.enemySprite.scale.x *= -1;
                        enemy.enemySprite.x -= enemy.enemySprite.width; // Prevents position from changing after flip
                    }
                    if (enemy.enemySprite.x >= (GAMEWIDTH - enemy.enemySprite.width)) {
                        enemy.state = enemy.enemyStates.LEFT;
                    }
                }
                if (!enemy.walkAnimation.isPlaying) {
                    enemy.stopAnimations();
                    enemy.walkAnimation.play();
                }
                return b3.SUCCESS;
            }
        });
    }

    this.conditions = function(condition) {
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
                        enemy.speed = enemy.baseSpeed+50;
                        enemy.yell.musicPlay();
                        return b3.SUCCESS;
                    }
                }
                else {
                    if(player.state === player.playerStates.LIGHT
                        && player.playerSprite.x >= enemy.enemySprite.x
                        && player.playerSprite.y === enemy.enemySprite.y) {
                        enemy.state = enemy.enemyStates.CHASING;
                        enemy.speed = enemy.baseSpeed+50;
                        enemy.yell.musicPlay();
                        return b3.SUCCESS;
                    }
                }
                return b3.FAILURE;
            }
        });
    }

    this.treeInit = function(action, condition) {
        // Initalise custom actions & conditions
        this.actions(action);
        this.conditions(condition);
    }
    // Constructor:
    this.treeInit(this.loadAction, this.loadCondition);

    this.ai = {'guy': new b3.BehaviorTree()};
    this.ai.guy.load(JSON.parse(game.cache.getText('AITree')), tree);

    this.character = {
        memory:  new b3.Blackboard()
    };
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
