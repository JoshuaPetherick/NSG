//--- Still to investigate --- \\
// - Scaling images down/up to window size
// - Menu buttons (Similar code to making an on-screen movement arrow)

// Behaviour Trees (AI) // http://behavior3js.guineashots.com/ https://github.com/AlmasB/FXGL/blob/master/samples/assets/ai/patrol.tree
// What file type scales best (Vector)? (SVG)
// Judged on original code or overall delivery? Code itself, can use phaser as it's the framework/library
// Lookup mobile input on Phaser Examples - make sure doesn't interfere with current structure
// --------------------------- \\

// Core-game variables
var GAMEHEIGHT = 600;
var GAMEWIDTH = 800;
var playing_bool = true;
var level = 1;

// Phaser draw groups
var background;
var midground;
var foreground;

// Input variables
var leftKey;
var rightKey;
var upKey;
var downKey;
var spaceBar;

// Sprite Variables
var player;
var enemies = []; // Array of Enemies
var floors = []; // Array of Floors
var stairs = []; // Array of Ladders
var lights = []; // Array of Bulbs
var exit;

// Audio Variables
var backgroundMusic;
var yell;

// State variables
var gameState;
var gameStates = {
    MENU: 0,
    PLAY: 1
};
var playerStates = {
    DARK: 0,
    LIGHT: 1,
    FALLING: 2
};
var enemyStates = {
    PATROL: 0,
    CHASE: 1,
    ALERT: 2
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
    game.load.image('player', 'assets/images/player.png');
    game.load.image('enemy', 'assets/images/enemy.png');
    game.load.image('floor', 'assets/images/floor.png');
    game.load.image('light', 'assets/images/light.png');
    game.load.image('stairs', 'assets/images/stairs.png');
    game.load.image('exit', 'assets/images/exit.png');
    // Audio
    game.load.audio('yell', 'assets/sounds/yell_hey.wav');
    game.load.audio('background1', 'assets/sounds/background_eerie.mp3');
    // Text
    game.load.text('level1', 'assets/levels/lvl1.txt');
    game.load.text('level2', 'assets/levels/lvl2.txt');
} //preload();

function create() {
    //  Will create objects for the game
    switch(gameState)
    {
        case gameStates.MENU:

            break;

        case gameStates.PLAY:
            background = game.add.group();
            midground = game.add.group();
            foreground = game.add.group();

            loadLevel();

            leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            yell = game.add.audio('yell');
            musicInit('background1');
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

            case gameStates.PLAY:
                playerInput(player);
                playerUpdate();
                for(i = 0; i < enemies.length; i++) {
                    enemyUpdate(enemies[i]);
                }
                exitUpdate();
                game.debug.text(sortTimer(this.game.time.totalElapsedSeconds()), GAMEWIDTH/2, GAMEHEIGHT-20);
                break;
        }
    }
} // update()

function loadLevel() {
    var text = game.cache.getText('level' + level).split('\n'); // Stores it as an array
    var distY = Math.round(GAMEHEIGHT/text.length);
    var distX = Math.round(GAMEWIDTH/(text[0].length-1)); // Minus 1 as it stores linebreaks as another character :S

    // For each Line in Text  -  Determines Y
    for(i = 0; i < text.length; i++) {
        // For each Character in Line  -  Determines X
        for(j = 0; j < text[i].length; j++) {
            // Initialise based on character in txt file
            switch(text[i].charAt(j))
            {
                case "P":
                    playerInit((distX*j), (distY*i), distY, (distX/2));
                    break;

                case "G":
                    enemies.push(enemyInit((distX*j), (distY*i), distY, (distX/2))); // Add new to Array
                    break;

                case "F":
                    floors.push(floorInit((distX*j), (distY*i), distY, distX)); // Add new to Array
                    break;

                case "S":
                    stairs.push(stairInit((distX*j), (distY*i), distY, distX)); // Add new to Array
                    break;

                case "L":
                    lights.push(lightInit((distX*j), (distY*i))); // Add new to Array
                    break;

                case "X":
                    enemies.push(enemyInit((distX*j), (distY*i), distY, (distX/2)));  // Add new to Array
                    lights.push(lightInit((distX*j), (distY*i)));  // Add new to Array
                    break;

                case "E":
                    exitInit((distX*j), (distY*i), distY, (distX/2));
                    break;
            }
        }
    }
}

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

function checkColliding(obj1, obj2) {
    var boundsA = obj1.getBounds();
    var boundsB = obj2.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function resetLevel() {
    player.x = player.origX;
    player.y = player.origY;
    for(i = 0; i < enemies.length; i++) {
        enemies[i].x = enemies[i].origX;
        enemies[i].y = enemies[i].origY;
    }
}

function nextLevel() {
    // Empty arrays
    enemies = [];
    floors = [];
    stairs = [];
    lights = [];
    // Empty phaser group
    background.removeAll();
    midground.removeAll();
    foreground.removeAll();
    // Load next level
    level++;
    loadLevel();
}