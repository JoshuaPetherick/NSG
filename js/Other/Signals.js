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