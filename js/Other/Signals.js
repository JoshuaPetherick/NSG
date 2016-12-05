// Methods to handle signal events

function Signal() {
    this.signal = new Phaser.Signal();

    this.addSignal = function (func) {
        this.signal.add(func);
    }
    this.call = function () {
        this.signal.dispatch();
    }
}

function gotTheIntel() {
    // Update when intel has been taken
    exit = new Exit(this.origX, this.origY); //Add escape route!
    // Update Enemy Speed
}