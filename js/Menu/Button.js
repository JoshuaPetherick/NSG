
function button(type) {
    this.width = 150;
    switch(type) {
        case "PLAY":
            this.button = game.add.button((GAMEWIDTH/2)-this.width, (GAMEHEIGHT/2)-200, 'buttonPlay', playClick, this, 1, 0, 1);
            break;

        case "HIGHSCORE":
            this.button = game.add.button((GAMEWIDTH/2)-this.width, (GAMEHEIGHT/2)-75, 'buttonHighscore', highscoreClick, this, 1, 0, 1);
            break;

        case "BACK":
            this.button = game.add.button((GAMEWIDTH/2)-this.width, (GAMEHEIGHT/2)+50, 'buttonBack', backClick, this, 1, 0, 1);
            break;
    }
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