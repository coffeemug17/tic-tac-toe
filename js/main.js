/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'green',//this is for X
    '-1': 'blue'//this is for O
};
const PLAYERS = {
    '0': '',
    '1': 'X',
    '-1':'O'
};

/*----- state variables -----*/
let turn;//1/-1 to signify player
let board;//Array of 9 elements
let winner;// 1/-1 for player win, null if no winner and "T" if tie

/*----- cached elements  -----*/
const messageEl = document.querySelector("h1");
const resetButton = document.querySelector("button");


/*----- event listeners -----*/
resetButton.addEventListener('click',init);

/*----- functions -----*/
init();

//In this function, we initialize all the state variables
function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    winner = null;
    turn = 1;
    render();
}

//render() helps in visualizing elements of the DOM
function render() {
    renderBoard();
    renderMessage();
    renderControls();//Hides or shows the UI elements 
}

function renderBoard() {
    board.forEach(function(cellVal, Idx) {
        const cellId = `${Idx}`;
        const cellEl = document.getElementById(cellId);
        // cellEl.style.backgroundColor = COLORS[cellVal];
        cellEl.innerHTML = PLAYERS[cellVal];
    });

}

function renderMessage() {
    if (winner === 'T') {
        messageEl.innerText = "It's a tie";
    } else if (winner) {
        messageEl.innerHTML = `<span style = "color: ${COLORS[winner]}">${PLAYERS[winner].toUpperCase()}</span> Wins!`
    } else {
        messageEl.innerHTML = `<span style = "color: ${COLORS[turn]}">${PLAYERS[turn].toUpperCase()}</span>'s Turn!`
    }

}

function renderControls() {
    resetButton.style.visibility = winner ? 'visible' : 'hidden';
}