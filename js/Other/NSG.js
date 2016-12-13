// Designed and Created by: Joshua Petherick
// Project started on: 24/10/2016
// Last Updated: 05/12/2016

// Core-game variables
var GAMEHEIGHT = 300;
var GAMEWIDTH = 450;
var backgroundMusic;
var level = 1;
var timer;

// Phaser draw groups
var background;
var wallLayer;
var lightLayer;
var stairLayer;
var foreground;
var exitLayer;
var TILEBACKGROUND;

// Tile Info
var TileSizeX;
var TileSizeY;

// Sprite Variables
var player;
var enemies = []; // Array of Enemies
var buttons = []; // Array of Menu buttons
var intel;
var exit;

// State variables
var gameState;
var gameStates = {
    MENU: 0,
    PLAY: 1,
    SCORE: 2
};

// Signals
var playerDied; // https://phaser.io/docs/2.6.2/Phaser.Signal.html
var newLevel;
var getIntel;

var game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'Ninja Stealth Game', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    if (window.screen.availHeight > (GAMEHEIGHT*2) && window.screen.availWidth > (GAMEWIDTH*2)) {
        // Adjust for bigger screens
        GAMEHEIGHT = GAMEHEIGHT*2;
        GAMEWIDTH = GAMEWIDTH*2;
        game.scale.setGameSize(GAMEWIDTH, GAMEHEIGHT)
    }
    console.log('Phaser Version: ' + Phaser.VERSION);
    console.log('B3 Version: ' + b3.VERSION);
    // Start state
    gameState = gameStates.MENU;
    var ASSETPATH = 'assets/images/';
    var SOUNDPATH = 'assets/sounds/';
    var TREEPATH = 'assets/behaviourTrees/';
    // XML Files
    game.load.atlasXML('player', ASSETPATH + 'Player/playerSpriteSheet.png', ASSETPATH + 'Player/playerSpriteSheet.xml');
    game.load.atlasXML('enemy', ASSETPATH + 'Enemy/enemySpriteSheet.png', ASSETPATH + 'Enemy/enemySpriteSheet.xml');
    // Images
    game.load.image('background', ASSETPATH + 'Background/BGTile.png');
    game.load.image('floor', ASSETPATH + 'Background/Floor.png');
    game.load.image('wall', ASSETPATH + 'Background/Wall.png');
    game.load.image('light', ASSETPATH + 'TestImages/light.png');
    game.load.image('stairs', ASSETPATH + 'Background/Ladder.png');
    game.load.image('exit', ASSETPATH + 'Background/Door.png');
    game.load.image('intel', ASSETPATH + 'Background/Intel.png');
    // Buttons
    game.load.image('leftArrow', ASSETPATH + 'Buttons/ArrowLeft.png');
    game.load.image('rightArrow', ASSETPATH + 'Buttons/ArrowRight.png');
    game.load.image('downArrow', ASSETPATH + 'Buttons/ArrowDown.png');
    game.load.image('upArrow', ASSETPATH + 'Buttons/ArrowUp.png');
    // Spritesheets
    game.load.spritesheet('buttonPlay', ASSETPATH + 'Buttons/buttonPlay.png', 194, 66);
    game.load.spritesheet('buttonHighscore', ASSETPATH + 'Buttons/buttonHighscore.png', 194, 66);
    game.load.spritesheet('buttonBack', ASSETPATH + 'Buttons/buttonBack.png', 194, 66);
    // Audio
    game.load.audio('background1', SOUNDPATH + 'background_eerie.mp3');
    game.load.audio('background2', SOUNDPATH + 'background_epic.wav');
    game.load.audio('steps', SOUNDPATH + 'steps.wav');
    game.load.audio('alert', SOUNDPATH + 'robot_intruder.wav');
    // Text
    var maxLvls = 15;
    for (var i = 1; i <= maxLvls; i++) {
        // Load all level text files!
        game.load.text('level' + i, 'assets/levels/lvl' + i + '.txt')
    }
    game.load.text('AITree', TREEPATH + 'aiTree.json');
    // Init Groups
    TILEBACKGROUND = game.add.group();
    background = game.add.group();
    wallLayer = game.add.group();
    lightLayer = game.add.group();
    stairLayer = game.add.group();
    exitLayer = game.add.group();
    foreground = game.add.group();
    // Used for FPS counter
    game.time.advancedTiming = true;
} //preload();

function create() {
    //  Will create objects for the game
    switch(gameState)
    {
        case gameStates.MENU:
            // Load game background!
            var text = prepLevel();

            TileSizeY = Math.round(GAMEHEIGHT/text.length);
            TileSizeX = Math.round(GAMEWIDTH/(text[0].length));
            loadLevel(text); // Will only load the background!

            buttons.push(new button("PLAY"));
            buttons.push(new button("HIGHSCORE"));
            break;

        case gameStates.SCORE:
            buttons.push(new button("BACK"));
            break;

        case gameStates.PLAY:
            game.physics.startSystem(Phaser.Physics.ARCADE); // ARCADE physics as fits game best
            game.physics.arcade.gravity.y = 350;
            timer = game.time.create(false);

            playerDied = new Signal();
            newLevel = new Signal();
            getIntel = new Signal();

            newLevel.addSignal(nextLevel);
            getIntel.addSignal (function() {
                exit = new Exit(player.origX, player.origY);
                backgroundMusic.queueSong('background2');
            });

            level = 1; // Reset level for every create!
            var text = prepLevel();
            loadLevel(text);

            backgroundMusic = new sound('background1'); // Background music, open to update
            backgroundMusic.musicVol(0.75);
            backgroundMusic.musicLoop();

            timer.start(); // Timer to begin starts last!
            break;
    }
} // create()

function update() {
    //  Change game states and call update for all objects
    switch(gameState) {
        case gameStates.PLAY:
            player.playerInput(); // Check input
            player.playerUpdate(); // Update Player
            handleCollision(); // Handle all collisions
            for(e in enemies) {
                enemies[e].enemyUpdate(); // Update enemy AI, collision, etc
            }
            backgroundMusic.musicUpdate();
            break;
    }
} // update()

function render() {
    //game.debug.text.clean;
    switch(gameState) {
        case gameStates.SCORE:
            var score = localStorage.getItem('timerScore');
            if (!score) { score = '0:00'; } // If null then add value!
            game.debug.text('Your highest score is: ' + score, (GAMEWIDTH/2)-200, (GAMEHEIGHT/2)-20); // Prints Timer
            break;

        case gameStates.PLAY:
            game.debug.text(game.time.fps || '--', 2, 14, '#00ff00'); // Prints FPS
            game.debug.text(sortTimer(timer.seconds), GAMEWIDTH / 2, 25); // Prints Timer
            break;
    }
} // render()

function loadLevel(text) {
    // For each Line in Text  -  Determines Y
    for (i = 0; i < text.length; i++) {
        // For each Character in Line  -  Determines X
        for (j = 0; j < text[i].length; j++) {
            // Initialise based on character in txt file
            var x = (j*TileSizeX); // X based on position in txt file
            var y = (i*TileSizeY); // Y based on position in txt file
            // Designed so will only load background when in MENU state
            if (gameState === gameStates.MENU) {
                new BGTile(x, y);
            }
            else {
                addObject(text[i].charAt(j), x, y);
            }
        }
    }
}

function addObject (char, x, y) {
    switch (char) {
        case "P":
            player = new Player(x, y);
            break;

        case "G":
            enemies.push(new Enemy(x, y)); // Add new to Array
            break;

        case "F":
            new Floor(x, y); // Add new to Array
            break;

        case "W":
            new Wall(x, y); // Add new to Array
            break;

        case "S":
            new Stair(x, y); // Add new to Array
            break;

        case "L":
            new Light(x, y); // Add new to Array
            break;

        case "X":
            enemies.push(new Enemy(x, y)); // Add new to Array
            new Light(x, y); // Add new to Array
            break;

        case "Y":
            player = new Player(x, y);
            new Stair(x, y); // Add new to Array
            break;

        case "Z":
            player = new Player(x, y);
            new Light(x, y); // Add new to Array
            break;

        case "I":
            intel = new Intel(x, y);
            new Light(x, y); // Add new to Array
            break;

        case "E":
            exit = new Exit(x, y);
            break;
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

function handleCollision () {
    game.physics.arcade.collide(player.playerSprite, wallLayer); // Checks if player is colliding with Walls
    for (e in enemies) {
        if (game.physics.arcade.overlap(player.playerSprite, enemies[e].enemySprite)) {
            // For each enemy, check if overlapping, if so then reset level
            playerDied.call();
        }
    }
    if (game.physics.arcade.overlap(player.playerSprite, lightLayer)) {
        // If overlapping with LIGHT then change state
        player.updateState(player.playerStates.LIGHT);
    }
    else {
        player.updateState(player.playerStates.DARK);
    }
    if (game.physics.arcade.overlap(player.playerSprite, stairLayer)) {
        // If overlapping with STAIR then no gravity, so can climb up/down
        player.setGravity(false);
    }
    else {
        player.setGravity(true);
    }
    if (intel) {
        if (game.physics.arcade.overlap(player.playerSprite, intel.intelSprite)) {
            getIntel.call();
        }
    }
    if (game.physics.arcade.overlap(player.playerSprite, exitLayer)) {
        // Check if player has collidied with exit, if so progress to next level
        newLevel.call();
    }
}

function nextLevel() {
    // Empty arrays
    player = null;
    enemies = [];
    exit = null;
    // Empty phaser group
    background.removeAll();
    wallLayer.removeAll();
    lightLayer.removeAll();
    stairLayer.removeAll();
    foreground.removeAll();
    exitLayer.removeAll();
    // Load next level
    level++;
    if (level < 16 ) {
        var text = prepLevel();
        loadLevel(text);
    }
    else {
        level = 1;
        gameComplete();
    }
}

function gameComplete() {
    timer.pause(); // Pause
    localStorage.setItem('timerScore', sortTimer(timer.seconds)); // Store local time score for player
    timer.stop(); // Kill timer off
    console.log('End...?');
    gameState = gameStates.SCORE;
    create();
}

function prepLevel() {
    var txt = game.cache.getText('level' + level).split('\n'); // Stores it as an array
    for(i = 0; i < txt.length; i++) {
        txt[i] = txt[i].replace(/\n|\r/g, ""); // Cleans up Line breaks
    }
    return txt;
}