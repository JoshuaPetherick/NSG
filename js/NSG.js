var GAMEHEIGHT = 600;
var GAMEWIDTH = 800;
var playing_bool = true;

var leftKey;
var rightKey;
var spaceBar;
var speed = 1;

var player;
var enemy = [];

var yell;

var gameState;
var gameStates = {
    MENU: 0,
    LOAD: 1,
    PLAY: 2
};

var playerStates = {
    DARK: 0,
    LIGHT: 1
};

var enemyStates = {
    PATROL: 0,
    CHASE: 1
};

var game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'NSG', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    // Load in images/xml/audio
    game.load.image('player', 'assets/images/phaser.png');
    // Audio
    game.load.audio('yell', 'assets/sounds/yell_hey.wav');
} //preload();

function create() {
    //  Will create objects for the game
    gameState = gameStates.MENU;

    player = game.add.sprite(GAMEHEIGHT/2, GAMEWIDTH/2, 'player');
    player.anchor.setTo(0.5, 0.5);
    player.state = playerStates.DARK;

    enemy[0] = game.add.sprite(0,0, 'player');
    enemy[0].anchor.setTo(0.5, 0,5);
    enemy[0].state = enemyStates.PATROL;

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    yell = game.add.audio('yell');
} // create()

function update() {
    //  Change game states and call update for all objects
    if (playing_bool)
    {
        playerInput(player);
        //playerUpdate();
        for(i = 0; i < enemy.length; i++) {
            enemyUpdate(enemy[i]);
        }
        game.debug.text(sortTimer(this.game.time.totalElapsedSeconds()), GAMEWIDTH/2, GAMEHEIGHT-20);
    }
} // update()

function sortTimer(time)
{
    var mins = 0;
    var secs;

    if (Math.round(time) >= 60) {
        mins = Math.round(time)/60;
    }
    secs = Math.round(time) - (mins*60);
    if (secs < 10) {
        secs = "0" + secs;
    }
    return mins + ":" + secs;
}
