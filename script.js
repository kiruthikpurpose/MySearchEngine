document.getElementById('search-button').addEventListener('click', function() {
    var query = document.getElementById('search-input').value;
    if (query) {
        alert('You searched for: ' + query);
    } else {
        alert('Please enter a search query.');
    }
});

document.getElementById('switch-mode-button').addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
});

document.getElementById('game-button').addEventListener('click', function() {
    document.querySelector('.tic-tac-toe').classList.toggle('hidden');
});

const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const restartButton = document.getElementById('restart-button');
const chooseXButton = document.getElementById('choose-x');
const chooseOButton = document.getElementById('choose-o');
const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn;
let playerClass;
let computerClass;

chooseXButton.addEventListener('click', () => {
    playerClass = X_CLASS;
    computerClass = O_CLASS;
    startGame();
});

chooseOButton.addEventListener('click', () => {
    playerClass = O_CLASS;
    computerClass = X_CLASS;
    startGame();
});

restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.innerHTML = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    if (computerClass === X_CLASS) {
        computerMove();
    }
}

function handleClick(e) {
    const cell = e.target;
    placeMark(cell, playerClass);
    if (checkWin(playerClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        computerMove();
    }
}

function computerMove() {
    const availableCells = [...cells].filter(cell => !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS));
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    placeMark(randomCell, computerClass);
    if (checkWin(computerClass)) {
        endGame(false);
    } else if (!isDraw()) {
        swapTurns();
    }
}

function endGame(draw) {
    if (draw) {
        alert('Draw!');
    } else {
        alert(`${oTurn ? "O's" : "X's"} Wins!`);
    }
    startGame();
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerHTML = currentClass.toUpperCase();
}

function swapTurns() {
    oTurn = !oTurn;
}

function checkWin(currentClass) {
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}
