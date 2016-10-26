var GAMEHEIGHT = 600;
var GAMEWIDTH = 800;
var background_spr;

var game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'NSG', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    // Load in images/audio
    game.load.image('background_img', 'assets/phaser.png');
} //preload();

function create() {
    //  Will create objects for the game
    var p = player;
    p.posX = GAMEWIDTH/2;
    p.posY = GAMEHEIGHT/2;

    background_spr = game.add.sprite(p.posX, p.posY, 'background_img');
    background_spr.anchor.setTo(0.5, 0.5);
} // create()

function update() {
    //  Change game states and call update for all objects
    
} // update()
