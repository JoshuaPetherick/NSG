
function button(type) {
    switch(type) {
        case "PLAY":
            this.button = game.add.button((GAMEWIDTH/2)-150, (GAMEHEIGHT/2)-200, 'buttonPlay', playClick, this, 1, 0, 1);
            break;

        case "HIGHSCORE":
            this.button = game.add.button((GAMEWIDTH/2)-150, (GAMEHEIGHT/2)-75, 'buttonHighscore', highscoreClick, this, 1, 0, 1);
            break;

        case "OPTIONS":
            this.button = game.add.button((GAMEWIDTH/2)-150, (GAMEHEIGHT/2)+50, 'buttonOption', optionsClick, this, 1, 0, 1);
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
    console.log("PLAY!");
    create();
}

function highscoreClick() {
    clear();
    gameState = gameStates.SCORE;
    console.log("SCORE!");
    create();
}

function optionsClick() {
    clear();
    gameState = gameStates.OPTIONS;
    console.log("OPTIONS!");
    create();
}

function clear() {
    for (i in buttons) {
        buttons[i].destroyButton();
    }
    background.removeAll();
}