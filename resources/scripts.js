function firstGame() {
    if (firstViewed === true) {
        firstScreenFade.show();
    }
}

function newGame() {
    firstViewed = false;
    playerMoney = 100;
    displayMoney.innerHTML = playerMoney;
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
        rollElement.disabled = false;
        return;
    }
    rollElement.disabled = true;
}

function betButtonState(enabled) {
    maxBetInput.setAttribute('max', playerMoney);
    displayMoney.innerHTML = playerMoney;
    if (enabled === true) {
        betDialog.disabled = false;
        displayBetButton.disabled = false;
        return;
    }
    betDialog.disabled = true;
    displayBetButton.disabled = true;
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
    displayMoney.innerHTML = playerMoney;
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
    betAmount = betDialog.value;
    betAmount = parseInt(betAmount);
    if (validateBet() === false) {
        return;
    }
    playerMoney -= betAmount;
    displayMoney.innerHTML = playerMoney;
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

function displayToolTip(e, str) {
    console.log('Moused over', e, str);
    // document.getElementById(item).setAttribute('data-bs-title', str);
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

const displayBetButton = document.getElementById('bet-button');
const displayMoney = document.getElementById('player-money');
const rollDiceButton = document.querySelector('#roll-button');
const rollElement = document.getElementById('roll-button');
const maxBetInput = document.querySelector('#bet-amount');
const betDialog = document.getElementById('bet-amount');
const clickBoardNumber = document.querySelector('.boardmap');
const messageTrigger = document.getElementById('game-message');
const onButton = document.getElementById('on-button');
const offButton = document.getElementById('off-button');
const firstScreenFade = new bootstrap.Modal(document.getElementById('gamearea-popup'));
const newGameButtons = document.querySelectorAll('.new-game');
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
console.log(tooltipList);

rollDiceButton.addEventListener('click', diceRoll);
clickBoardNumber.addEventListener('click', boardClick);
document.querySelector('.gameboard').addEventListener('mouseover', (e) => displayToolTip(e, 'TestStr', 'TestItem'));
buttonPosition(1);
rollButtonState(false);
betButtonState(false);
document.querySelector('#load-game').addEventListener('click', loadGame);
document.querySelector('#save-game').addEventListener('click', saveGame);
rollElement.addEventListener('click', checkGameState);
document.querySelector('#bet-button').addEventListener('click', placeBet);

for (let i = 0; i < newGameButtons.length; i++) {
    newGameButtons[i].addEventListener('click', newGame);
}

firstGame();
