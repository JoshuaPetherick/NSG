//--- Still to investigate --- \\
// - Scaling images down/up to window size
// - Menu buttons (Similar code to making an on-screen movement arrow)
// --------------------------- \\

// Core-game variables
var GAMEHEIGHT = 600;
var GAMEWIDTH = 800;
var playing_bool = true;
var level = 1;

// Input variables
var leftKey;
var rightKey;
var spaceBar;

// Sprite Variables
var player;
var enemies = []; // Array of Enemies
var floor = []; // Array of Floors
var ladder = []; // Array of Ladders
var bulb = []; // Array of Bulbs

// Audio Variables
var yell;

// State variables
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

var game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'Ninja Stealth Game', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    // Start state
    gameState = gameStates.PLAY;
    // Load in images/xml
    game.load.image('player', 'assets/images/phaser.png');
    // Audio
    game.load.audio('yell', 'assets/sounds/yell_hey.wav');
    // Text
    game.load.text('level1', 'assets/levels/lvl1.txt');
} //preload();

function create() {
    //  Will create objects for the game
    switch(gameState)
    {
        case gameStates.MENU:

            break;

        case gameStates.LOAD:

            break;

        case gameStates.PLAY:
            var text = game.cache.getText('level' + level).split('\n'); // Stores it as an array

            // For each Line in Text  -  Determines X
            for(i = 0; i < text.length; i++) {
                //      For each Character in Line  -  Determines Y
                for(j = 0; j < text[i].length; j++) {
                    // Initialise based on character in txt file
                    switch(text[i].charAt(j))
                    {
                        case "P":
                            playerInit(GAMEHEIGHT/2, GAMEWIDTH/2);
                            break;

                        case "G":
                            enemies.push(enemyInit(10, 10)); // Add new to Array
                            break;
                    }
                }
            }
                leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

                yell = game.add.audio('yell');

                break;
            }
} // create()

function update() {
    //  Change game states and call update for all objects
    if (playing_bool)
    {
        switch(gameState)
        {
            case gameStates.MENU:
                // Check and update based on Menu choices!
                break;

            case gameStates.LOAD:
                gameState = gameStates.PLAY;
                create();
                break;

            case gameStates.PLAY:
                playerInput(player);
                playerUpdate();
                for(i = 0; i < enemies.length; i++) {
                    enemyUpdate(enemies[i]);
                }
                game.debug.text(sortTimer(this.game.time.totalElapsedSeconds()), GAMEWIDTH/2, GAMEHEIGHT-20);
                break;
        }
    }
} // update()

function sortTimer(time) {
    var mins = 0;
    var secs;
    if (Math.round(time) >= 60) {
        mins = Math.floor(time/60);
    }
    secs = Math.floor(time) - (mins*60);
    if (secs < 10) {
        secs = "0" + secs;
    }
    return mins + ":" + secs;
}
