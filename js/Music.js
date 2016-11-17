// --
// Please note all sounds obtained through Freesound.org.
//  Sounds are all licensed under the Creative Commons License
// --

function sound(song) {
    // Init
    this.music = game.add.audio(song);

    this.musicUpdate = function(song) {
        // Update song(?)
        this.music.stop();
        this.music = game.add.audio(song);
    }

    this.musicPlay = function() {
        this.music.play();
    }

    this.musicLoop = function() {
        this.music.play();
        this.music.loopFull();
    }

    this.musicStop = function() {
        this.music.stop();
    }

    this.musicVol = function(vol) {
        this.music.volume = vol;
    }
}