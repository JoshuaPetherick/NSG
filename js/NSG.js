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
var level = 3;

// Phaser draw groups
var layer;
var background;
var midground;
var foreground;

// Tile Info
var TileSizeX = 50;
var TileSizeY = 50;

// Input variables
var leftKey;
var rightKey;
var upKey;
var downKey;
var spaceBar;

// Sprite Variables
var world;
var player;
var enemies = []; // Array of Enemies
var floors = []; // Array of Floors
var stairs = []; // Array of Ladders
var lights = []; // Array of Bulbs
var exit;

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

    game.load.image('leftArrow', 'assets/images/ArrowLeft.png');
    game.load.image('rightArrow', 'assets/images/ArrowRight.png');
    game.load.image('downArrow', 'assets/images/ArrowDown.png');
    game.load.image('upArrow', 'assets/images/ArrowUp.png');
    game.load.image('spaceBar', 'assets/images/SpaceBar.png');
    // Audio
    game.load.audio('yell', 'assets/sounds/yell_hey.wav');
    game.load.audio('background1', 'assets/sounds/background_eerie.mp3');
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
            var text = game.cache.getText('level' + level).split('\n'); // Stores it as an array
            for(i = 0; i < text.length; i++) {
                text[i] = text[i].replace(/\n|\r/g, ""); // Cleans up Line breaks
            }
            TileSizeY = Math.round(GAMEHEIGHT/text.length);
            TileSizeX = Math.round(GAMEWIDTH/(text[0].length)); // Minus 1 during debug

            world = game.add.tilemap();
            layer = world.createBlankLayer('level', (GAMEWIDTH/TileSizeY), (GAMEHEIGHT/TileSizeX), TileSizeX, TileSizeY); // Create Blank
            layer.resizeWorld();

            world.addTilesetImage('floor');
            world.addTilesetImage('stairs');
            
            background = game.add.group();
            //midground = game.add.group();
            //foreground = game.add.group();

            loadLevel(text);
            //inputInit();

            //yell = game.add.audio('yell');
            //musicInit('background1');
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
                //playerInput(player);
                //playerUpdate();
                for(i = 0; i < enemies.length; i++) {
                    //enemyUpdate(enemies[i]);
                }
                //exitUpdate();
                game.debug.text(sortTimer(this.game.time.totalElapsedSeconds()), GAMEWIDTH/2, 25);
                if (game.input.currentPointers == 0 && !game.input.activePointer.isMouse) {
                    // On screen keys can sometime get stuck, this IF fixes that issue
                    leftKey = false;
                    rightKey = false;
                    upKey = false;
                    downKey = false;
                    spaceBar = false;
                }
                break;
        }
    }
} // update()

function loadLevel(text) {
    var tileSelectorBackground = game.make.graphics();
    tileSelectorBackground.beginFill(0x000000, 0.5);
    tileSelectorBackground.drawRect(0, 0, 800, 34);
    tileSelectorBackground.endFill();

    background.add(tileSelectorBackground);

    // For each Line in Text  -  Determines Y
    for (i = 0; i < text.length; i++) {
        // For each Character in Line  -  Determines X
        for (j = 0; j < text[i].length; j++) {
            // Initialise based on character in txt file
            switch (text[i].charAt(j)) {
                // Optimise the below: Maybe merge into a function (Reads file and returns x&y position)

                case "P":
                    playerInit((j*TileSizeX), (i*TileSizeY), (TileSizeX/2), TileSizeY);
                    break;

                case "G":
                    enemies.push(enemyInit((j*TileSizeX), (i*TileSizeY), (TileSizeX/2), TileSizeY)); // Add new to Array
                    break;

                case "F":
                    floors.push(floorInit((j*TileSizeX), (i*TileSizeY), TileSizeX, TileSizeY)); // Add new to Array
                    break;

                case "S":
                    stairs.push(stairInit((j*TileSizeX), (i*TileSizeY), TileSizeX, TileSizeY)); // Add new to Array
                    break;

                case "L":
                    lights.push(lightInit((j*TileSizeX), (i*TileSizeY))); // Add new to Array
                    break;

                case "X":
                    enemies.push(enemyInit((j*TileSizeX), (i*TileSizeY), (TileSizeX/2), TileSizeY)); // Add new to Array
                    lights.push(lightInit((j*TileSizeX), (i*TileSizeY))); // Add new to Array
                    break;

                case "Y":
                    playerInit((j*TileSizeX), (i*TileSizeY), (TileSizeX/2), TileSizeY);
                    stairs.push(stairInit((j*TileSizeX), (i*TileSizeY), TileSizeX, TileSizeY)); // Add new to Array
                    break;

                case "Z":
                    playerInit((j*TileSizeX), (i*TileSizeY), (TileSizeX/2), TileSizeY);
                    lights.push(lightInit((j*TileSizeX), (i*TileSizeY))); // Add new to Array
                    break;

                case "E":
                    exitInit((j*TileSizeX), (i*TileSizeY), (TileSizeX/2), TileSizeY);
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
    //var boundsA = obj1.getBounds();
    //var boundsB = obj2.getBounds();
    //return Phaser.Rectangle.intersects(boundsA, boundsB);
    return false;
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
    var text = game.cache.getText('level' + level).split('\n'); // Stores it as an array
    for(i = 0; i < text.length; i++) {
        text[i] = text[i].replace(/\n|\r/g, ""); // Cleans up Line breaks
    }
    loadLevel(text);
}