// --
// Please note all sounds obtained through Freesound.org.
//  Sounds are all licensed under the Creative Commons License
// --

function sound(song) {
    // Init
    this.music = game.add.audio(song);

    this.musicUpdate = function() {
        if(!this.music.loop && !this.music.isPlaying) {
            this.music = game.add.audio(this.nextSong);
            this.musicLoop();
        }
    }

    this.queueSong = function(song) {
        this.nextSong = song;
        this.music.loop = false;
        this.music.fadeOut(5000);
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