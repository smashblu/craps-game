function firstGame() {
    if (firstViewed === true) {
        firstScreenFade.show();
    }
}

function newGame() {
    firstViewed = false;
    playerMoney = 100;
    playerMoneyElement.innerHTML = playerMoney;
    playerMoneyChange();
    betAmount = 0;
    buttonPosition(1);
    displayMessage('New game started');
    rollButtonState(false);
    betButtonState(true);
}

function saveGame() {
    displayMessage('Saving not yet implemented');
    offButton.style.visibility = 'hidden';
    onButton.style.left = '315px'; // Table border: 15px, square: 230px, mid: 85px
}

function loadGame() {
    displayMessage('Loading not yet implemented');
    offButton.style.visibility = 'visible';
    onButton.style.left = '85px';
}

function rollButtonState(enabled) {
    if (enabled === true) {
        rollButtonElement.disabled = false;
        return;
    }
    rollButtonElement.disabled = true;
}

function betButtonState(enabled) {
    betDialogElement.setAttribute('max', playerMoney);
    playerMoneyElement.innerHTML = playerMoney;
    playerMoneyChange();
    if (enabled === true) {
        betDialogElement.disabled = false;
        betButtonElement.disabled = false;
        betButtonElement.setAttribute('data-bs-toggle', 'tooltip');
        betButtonElement.setAttribute('data-bs-title', 'Bet Button Enabled');
        return;
    }
    betDialogElement.disabled = true;
    betButtonElement.disabled = true;
    betButtonElement.setAttribute('data-bs-toggle', 'tooltip');
    betButtonElement.setAttribute('data-bs-title', 'Bet Button Disabled');
}

function firstRoll() {
    diceRoll();
    displayMessage(`You rolled ${playerRoll}`);
    if (playerRoll === 7 || playerRoll === 11) {
        playerWin();
        return;
    }
    if (playerRoll === 2 || playerRoll === 3 || playerRoll === 12) {
        playerLose();
        return;
    }
    playerPoint = playerRoll;
    pointOpen = true;
    buttonPosition(playerRoll);
    displayMessage(`Your point is ${playerPoint}`);
}

function gameRoll() {
    diceRoll();
    displayMessage(`You rolled ${playerRoll}`);
    if (playerRoll === playerPoint) {
        playerWin();
        return;
    }
    if (playerRoll === 7) {
        playerLose();
        return;
    }
    displayMessage('No action, roll again');
}

function checkGameState() {
    if (pointOpen === false) {
        firstRoll();
        return;
    }
    gameRoll();
}

function buttonPosition(loc) {
    switch (loc) {
        case 1:
            offButton.style.visibility = 'visible';
            onButton.style.visibility = 'hidden';
            onButton.style.left = '1475px';
            pointOpen = false;
            break;
        case 4:
            offButton.style.visibility = 'hidden';
            onButton.style.visibility = 'visible';
            onButton.style.left = '85px';
            break;
        case 5:
            offButton.style.visibility = 'hidden';
            onButton.style.visibility = 'visible';
            onButton.style.left = '315px';
            break;
        case 6:
            offButton.style.visibility = 'hidden';
            onButton.style.visibility = 'visible';
            onButton.style.left = '545px';
            break;
        case 8:
            offButton.style.visibility = 'hidden';
            onButton.style.visibility = 'visible';
            onButton.style.left = '775px';
            break;
        case 9:
            offButton.style.visibility = 'hidden';
            onButton.style.visibility = 'visible';
            onButton.style.left = '1005px';
            break;
        case 10:
            offButton.style.visibility = 'hidden';
            onButton.style.visibility = 'visible';
            onButton.style.left = '1235px';
            break;
    }
}

function playerWin() {
    displayMessage('You win!');
    playerMoney += (betAmount * 2);
    playerMoneyElement.innerHTML = playerMoney;
    playerMoneyChange();
    buttonPosition(1);
    betAmount = 0;
    rollButtonState(false);
    betButtonState(true);
}

function playerLose() {
    displayMessage('You lose')
    if (playerMoney === 0) {
        gameOver();
        return;
    }
    buttonPosition(1);
    betAmount = 0;
    rollButtonState(false);
    betButtonState(true);
}

function placeBet() {
    betAmount = betDialogElement.value;
    betAmount = parseInt(betAmount);
    if (validateBet() === false) {
        return;
    }
    playerMoney -= betAmount;
    playerMoneyElement.innerHTML = playerMoney;
    playerMoneyChange();
    rollButtonState(true);
    betButtonState(false);
    return;
}

function gameOver() {
    displayMessage(`You are bankrupt! Please choose 'New Game' from the menu to play again`);
    buttonPosition(1);
    rollButtonState(false);
    betButtonState(false);
}

// function displayToolTip(e, str) {
// console.log('Moused over', e, str);
// document.getElementById(item).setAttribute('data-bs-title', str);
// }
function playerMoneyChange() {
    playerMoneyElement.style.transition = 'all 0.5s';
    playerMoneyElement.style.fontSize = '300%';
    playerMoneyElement.style.color = 'blue';
    playerMoneyElement.style.transition = 'all 0.5s';
    playerMoneyElement.style.fontSize = '120%';
    playerMoneyElement.style.color = '#00ff00';
}

function displayMessage(str) {
    document.getElementById('current-message').innerHTML = str;
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(messageTrigger);
    toastBootstrap.show();
}

function boardClick(e) { // To implement: advanced betting during game
    document.getElementById('clickNum').innerHTML = e.target.alt;
    let i = parseInt(e.target.alt);
}

function validateBet() {
    if (isNaN(betAmount) || betAmount > playerMoney || betAmount < 1) {
        displayMessage('Please insert valid bet');
        betAmount = 0;
        return false;
    }
    return true;
}

function diceRoll() {
    const dieOne = getRandomInt(1, 7);
    const dieTwo = getRandomInt(1, 7);
    playerRoll = dieOne + dieTwo;
    document.getElementById('show-roll').innerHTML = `${dieOne} + ${dieTwo} = ${playerRoll}`;
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

let playerMoney = 100;
let playerRoll = 0;
let pointOpen = false;
let playerPoint = 0;
let betAmount = 0;
let firstViewed = true;

const playerMoneyElement = document.getElementById('player-money');
const betButtonElement = document.getElementById('bet-button');
const rollButtonElement = document.getElementById('roll-button');
const betDialogElement = document.getElementById('bet-amount');
const messageTrigger = document.getElementById('game-message');
const onButton = document.getElementById('on-button');
const offButton = document.getElementById('off-button');
const firstScreenFade = new bootstrap.Modal(document.getElementById('gamearea-popup'));
const clickBoardNumber = document.querySelector('.boardmap');
const newGameButtons = document.querySelectorAll('.new-game');
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

rollButtonElement.addEventListener('click', diceRoll);
clickBoardNumber.addEventListener('click', boardClick);
// document.querySelector('.gameboard').addEventListener('mouseover', (e) => displayToolTip(e, 'TestStr', 'TestItem'));
buttonPosition(1);
rollButtonState(false);
betButtonState(false);
document.querySelector('#load-game').addEventListener('click', loadGame);
document.querySelector('#save-game').addEventListener('click', saveGame);
rollButtonElement.addEventListener('click', checkGameState);
document.querySelector('#bet-button').addEventListener('click', placeBet);

for (let i = 0; i < newGameButtons.length; i++) {
    newGameButtons[i].addEventListener('click', newGame);
}

firstGame();
