
function musicInit(song) {
    // Init
    backgroundMusic = game.add.audio(song);
    musicVol(0.2); // To make music more eerie, reduce volume by 80%
    musicPlay();
}

function musicUpdate() {
    // Update song(?)
}

function musicPlay() {
    backgroundMusic.loopFull();
}

function musicStop() {
    backgroundMusic.stop();
}

function musicVol(vol) {
    backgroundMusic.volume = vol;
}
