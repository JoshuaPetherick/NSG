
// Core-game variables
var GAMEHEIGHT = 600;
var GAMEWIDTH = 900;
var playing_bool = true;
var level = 1;
var backgroundMusic;

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
var buttons = [];
var exit;

// State variables
var gameState;
var gameStates = {
    MENU: 0,
    PLAY: 1,
    SCORE: 2,
    OPTIONS: 3
};

var game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'Ninja Stealth Game', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    console.log('Phaser Version: ' + Phaser.VERSION);
    console.log('B3 Version: ' + b3.VERSION);
    // Start state
    gameState = gameStates.MENU;
    // Images
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
    // Spritesheets
    game.load.spritesheet('buttonPlay', 'assets/images/buttonPlay.png', 194, 66);
    game.load.spritesheet('buttonHighscore', 'assets/images/buttonHighscore.png', 194, 66);
    game.load.spritesheet('buttonOption', 'assets/images/buttonOption.png', 194, 66);
    // Audio
    game.load.audio('background1', 'assets/sounds/background_eerie.mp3');
    game.load.audio('yell', 'assets/sounds/yell_hey.wav');
    // Text
    var maxLvls = 10;
    for (var i = 1; i <= maxLvls; i++) {
        // Load all level text files!
        game.load.text('level' + i, 'assets/levels/lvl' + i + '.txt')
    }
    game.load.text('AITree', 'assets/behaviourTrees/aiTree.json');
} //preload();

function create() {
    //  Will create objects for the game
    switch(gameState)
    {
        case gameStates.MENU:
            game.time.advancedTiming = true; // Used for FPS counter
            background = game.add.group();

            buttons.push(new button("PLAY"));
            buttons.push(new button("HIGHSCORE"));
            buttons.push(new button("OPTIONS"));
            break;

        case gameStates.SCORE:
            buttons.push(new button("PLAY"));
            //buttons.push(new button("HIGHSCORE"));
            buttons.push(new button("OPTIONS"));
            break;

        case gameStates.OPTIONS:
            buttons.push(new button("PLAY"));
            buttons.push(new button("HIGHSCORE"));
            //buttons.push(new button("OPTIONS"));
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

            lightLayer = game.add.group();
            stairLayer = game.add.group();
            exitLayer = game.add.group();
            enemyLayer = game.add.group();

            loadLevel(text);

            backgroundMusic = new sound('background1');
            backgroundMusic.musicVol(0.75);
            backgroundMusic.musicLoop();
            break;
    }
} // create()

function update() {
    //  Change game states and call update for all objects
    if (playing_bool)
    {
        switch(gameState)
        {
            case gameStates.PLAY:
                player.playerInput();
                player.playerUpdate();
                for(e in enemies) {
                    enemies[e].enemyUpdate();
                }
                break;
        }
    }
} // update()

function render() {
    game.debug.text(game.time.fps || '--', 2, 14, '#00ff00'); // Shows FPS
    game.debug.text(sortTimer(this.game.time.totalElapsedSeconds()), GAMEWIDTH/2, 25);
} // render()

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
    for (e in enemies) {
        enemies[e].enemySprite.x = enemies[e].origX;
        enemies[e].enemySprite.y = enemies[e].origY;
        enemies[e].state = enemies[e].enemyStates.LEFT;
    }
}
