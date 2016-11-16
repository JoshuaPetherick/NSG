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
var GAMEWIDTH = 900;
var playing_bool = true;
var level = 1;

// Phaser draw groups
var background;
var lightLayer;
var stairLayer;
var exitLayer;
var enemyLayer;

// Tile Info
var TileSizeX;
var TileSizeY;

// Sprite Variables
var player;
var enemies = []; // Array of Enemies
var floors = []; // Array of Floors
var stairs = []; // Array of Ladders
var lights = []; // Array of Lights
var exit;

// State variables
var gameState;
var gameStates = {
    MENU: 0,
    PLAY: 1
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

    game.load.image('leftArrow', 'assets/images/ArrowLeft.png');
    game.load.image('rightArrow', 'assets/images/ArrowRight.png');
    game.load.image('downArrow', 'assets/images/ArrowDown.png');
    game.load.image('upArrow', 'assets/images/ArrowUp.png');
    game.load.image('spaceBar', 'assets/images/SpaceBar.png');
    // Audio
    game.load.audio('background1', 'assets/sounds/background_eerie.mp3');
    game.load.audio('yell', 'assets/sounds/yell_hey.wav');
    // Text
    game.load.text('level1', 'assets/levels/lvl1.txt');
    game.load.text('level2', 'assets/levels/lvl2.txt');
    game.load.text('level3', 'assets/levels/lvl3.txt');
    game.load.text('level4', 'assets/levels/lvl4.txt');
    game.load.text('level5', 'assets/levels/lvl5.txt');
    game.load.text('level6', 'assets/levels/lvl6.txt');
    game.load.text('level7', 'assets/levels/lvl7.txt');
    game.load.text('level8', 'assets/levels/lvl8.txt');
    game.load.text('level9', 'assets/levels/lvl9.txt');
    game.load.text('level10', 'assets/levels/lvl10.txt');
} //preload();

function create() {
    //  Will create objects for the game
    switch(gameState)
    {
        case gameStates.MENU:

            break;

        case gameStates.PLAY:
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.arcade.gravity.y = 250;

            var text = game.cache.getText('level' + level).split('\n'); // Stores it as an array
            for(i = 0; i < text.length; i++) {
                text[i] = text[i].replace(/\n|\r/g, ""); // Cleans up Line breaks
            }
            TileSizeY = Math.round(GAMEHEIGHT/text.length);
            TileSizeX = Math.round(GAMEWIDTH/(text[0].length));

            background = game.add.group();
            lightLayer = game.add.group();
            stairLayer = game.add.group();
            exitLayer = game.add.group();
            enemyLayer = game.add.group();

            loadLevel(text);

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
                game.physics.arcade.collide(player.playerSprite, background);
                if (game.physics.arcade.overlap(player.playerSprite, exitLayer)) {
                    exit.exitCollision();
                }
                for (i in enemies) {
                    if (game.physics.arcade.overlap(player.playerSprite, enemyLayer)) {
                        resetLevel();
                    }
                }
                for (i in lights) {
                    if (game.physics.arcade.overlap(player.playerSprite, lightLayer)) {
                        player.state = player.playerStates.LIGHT;
                    }
                    else {
                        player.state = player.playerStates.DARK;
                    }
                }
                for ( i in stairs ) {
                    if (game.physics.arcade.overlap(player.playerSprite, stairLayer)) {
                        player.setGravity(false);
                    }
                    else {
                        player.setGravity(true);
                    }
                }

                player.playerInput();
                player.playerUpdate();

                game.debug.text(sortTimer(this.game.time.totalElapsedSeconds()), GAMEWIDTH/2, 25);
                break;
        }
    }
} // update()

function loadLevel(text) {
    // For each Line in Text  -  Determines Y
    for (i = 0; i < text.length; i++) {
        // For each Character in Line  -  Determines X
        for (j = 0; j < text[i].length; j++) {
            // Initialise based on character in txt file
            switch (text[i].charAt(j)) {
                // Optimise the below: Maybe merge into a function (Reads file and returns x&y position)

                case "P":
                    player = new Player((j*TileSizeX), (i*TileSizeY));
                    break;

                case "G":
                    enemies.push(new Enemy((j*TileSizeX), (i*TileSizeY))); // Add new to Array
                    break;

                case "F":
                    floors.push(new Floor((j*TileSizeX), (i*TileSizeY))); // Add new to Array
                    break;

                case "S":
                    stairs.push(new Stair((j*TileSizeX), (i*TileSizeY))); // Add new to Array
                    break;

                case "L":
                    lights.push(new Light((j*TileSizeX), (i*TileSizeY))); // Add new to Array
                    break;

                case "X":
                    enemies.push(new Enemy((j*TileSizeX), (i*TileSizeY))); // Add new to Array
                    lights.push(new Light((j*TileSizeX), (i*TileSizeY))); // Add new to Array
                    break;

                case "Y":
                    player = new Player((j*TileSizeX), (i*TileSizeY));
                    stairs.push(new Stair((j*TileSizeX), (i*TileSizeY))); // Add new to Array
                    break;

                case "Z":
                    player = new Player((j*TileSizeX), (i*TileSizeY));
                    lights.push(new Light((j*TileSizeX), (i*TileSizeY))); // Add new to Array
                    break;

                case "E":
                    exit = new Exit((j*TileSizeX), (i*TileSizeY));
                    break;
            }
        }
    }
}

function sortTimer(time) {
    var mins = 0;
    if (Math.round(time) >= 60) {
        mins = Math.floor(time/60);
    }
    var secs = Math.floor(time) - (mins*60);
    if (secs < 10) {
        secs = "0" + secs;
    }
    return mins + ":" + secs;
}

function nextLevel() {
    // Empty arrays
    player = null;
    enemies = [];
    floors = [];
    stairs = [];
    lights = [];
    exit = null;
    // Empty phaser group
    background.removeAll();
    lightLayer.removeAll();
    stairLayer.removeAll();
    exitLayer.removeAll();
    enemyLayer.removeAll();
    // Load next level
    level++;
    var text = game.cache.getText('level' + level).split('\n'); // Stores it as an array
    for(i = 0; i < text.length; i++) {
        text[i] = text[i].replace(/\n|\r/g, ""); // Cleans up Line breaks
    }
    loadLevel(text);
}

function resetLevel() {
    player.playerSprite.x = player.origX;
    player.playerSprite.y = player.origY;
    for (i in enemies) {
        enemies[i].enemySprite.x = enemies[i].origX;
        enemies[i].enemySprite.y = enemies[i].origY;
    }
}