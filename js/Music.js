// --
// Please note all sounds obtained through Freesound.org.
//  Sounds are all licensed under the Creative Commons License
// --

// Audio Variables
var backgroundMusic;
var yell;

function musicInit(song) {
    // Init
    backgroundMusic = game.add.audio(song);
    //musicVol(1); // No longer need to reduce volume
    musicPlay();
}

function musicUpdate() {
    // Update song(?)
}

function musicPlay() {
    backgroundMusic.play();
    backgroundMusic.loopFull();
}

function musicStop() {
    backgroundMusic.stop();
}

function musicVol(vol) {
    backgroundMusic.volume = vol;
}
