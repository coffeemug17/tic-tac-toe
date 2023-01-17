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
document.getElementById("board").addEventListener('click',playTurn);
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

function playTurn(evt) {
    const cellIdx = evt.target.id;

    //Guard for already inputted values
    if (board[cellIdx] !== 0) return;

    board[cellIdx] = turn;
    turn *= -1;
    winner = getWinner(cellIdx);
    render();
}

function getWinner(cellIdx) {
    return checkVerticalWin(cellIdx) ||
    checkHorizontalWin(cellIdx) ||
    checkdiagonalWin(cellIdx) ||
    checkForTie();
}

function checkVerticalWin(cellIdx) {
    for( let i = 0; i < board.length; i++) {
        if (board[i] + board[i + 3] + board[i + 6] === 3) {
            return 1;
        } else if (board[i] + board[i + 3] + board[i + 6] === -3) {
            return -1;
        }
    }
}

function checkHorizontalWin(cellIdx) {
    for( let i = 0; i <= 6; i += 3) {
        if (board[i] + board[i + 1] + board[i + 2] === 3) {
            return 1;
        } else if (board[i] + board[i + 1] + board[i + 2] === -3) {
            return -1;
        }
    }
}

function checkdiagonalWin(cellIdx) {
    if (board[0] + board[4] + board[8] === 3) {
        return 1;
    } else if (board[0] + board[4] + board[8] === -3) {
        return -1;
    } else if (board[2] + board[4] + board[6] === 3) {
        return 1;
    } else if (board[2] + board[4] + board[6] === -3) {
        return -1;
    }
}

function checkForTie() {
    if (board.includes(0)) {
        return;
    } else {
        return "T";
    }
}

//render() helps in visualizing elements of the DOM
function render() {
    renderBoard();
    renderMessage();
    renderControls();//Hides or shows the UI elements which in our case is the reset  game button
}

function renderBoard() {
    board.forEach(function(cellVal, Idx) {
        const cellId = `${Idx}`;
        const cellEl = document.getElementById(cellId);
        // cellEl.style.backgroundColor = COLORS[cellVal];
        cellEl.innerHTML = PLAYERS[cellVal];
        cellEl.style.textAlign= "center";
        cellEl.style.fontSize = "60px";
        cellEl.style.color = `${COLORS[cellVal]}`;
        cellEl.style.fontWeight = "bold";
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