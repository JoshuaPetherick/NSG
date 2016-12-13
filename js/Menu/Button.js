
function button(type) {
    this.height = GAMEHEIGHT/10;
    this.width = GAMEWIDTH/5;
    switch(type) {
        case "PLAY":
            this.button = game.add.button(0 + this.width*2, 0+this.height, 'buttonPlay', playClick, this, 1, 0, 1);
            break;

        case "HIGHSCORE":
            this.button = game.add.button(0 + this.width*2, (GAMEHEIGHT/2)-this.height, 'buttonHighscore', highscoreClick, this, 1, 0, 1);
            break;

        case "BACK":
            this.button = game.add.button(0 + this.width*2, (GAMEHEIGHT/2)+this.height, 'buttonBack', backClick, this, 1, 0, 1);
            break;
    }
    this.button.width = this.width;
    this.button.height = this.height;
    background.add(this.button);

    this.destroyButton = function() {
       this.button.destroy();
    }
}

function playClick() {
    clear();
    gameState = gameStates.PLAY;
    create();
}

function highscoreClick() {
    clear();
    gameState = gameStates.SCORE;
    create();
}

function backClick() {
    clear();
    gameState = gameStates.MENU;
    create();
}

function clear() {
    for (i in buttons) {
        buttons[i].destroyButton();
    }
    background.removeAll();
    buttons = [];
}