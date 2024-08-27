function firstGame() {
    if (firstViewed === true) {
        firstScreenFade.show();
    }
}

function newGame() {
    firstViewed = false;
    lastPlayerMoney = playerMoney;
    playerMoney = 100;
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
    playerMoneyChange();
    if (enabled === true) {
        betDialogElement.disabled = false;
        betButtonElement.disabled = false;
        return;
    }
    betDialogElement.disabled = true;
    betButtonElement.disabled = true;
}

async function firstRoll() {
    diceRoll();
    await new Promise(resolve => setTimeout(resolve, 1000));
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

async function gameRoll() {
    diceRoll();
    await new Promise(resolve => setTimeout(resolve, 1000));
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
    lastPlayerMoney = playerMoney;
    playerMoney += (betAmount * 2);
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
    lastPlayerMoney = playerMoney;
    playerMoney -= betAmount;
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

async function playerMoneyChange() {
    playerMoneyElement.innerHTML = playerMoney;
    if (playerMoney < lastPlayerMoney) {
        playerMoneyElement.style.transition = 'all 0.5s';
        playerMoneyElement.style.fontSize = '75%';
        playerMoneyElement.style.color = '#ff0000';
        await new Promise(resolve => setTimeout(resolve, 500));
        playerMoneyElement.style.transition = 'all 0.5s';
        playerMoneyElement.style.fontSize = '120%';
        playerMoneyElement.style.color = '#00ff00';
        return;
    }
    if (playerMoney > lastPlayerMoney) {
        playerMoneyElement.style.transition = 'all 0.5s';
        playerMoneyElement.style.fontSize = '175%';
        playerMoneyElement.style.color = '#0000ff';
        await new Promise(resolve => setTimeout(resolve, 500));
        playerMoneyElement.style.transition = 'all 0.5s';
        playerMoneyElement.style.fontSize = '120%';
        playerMoneyElement.style.color = '#00ff00';
        return;
    }
    return;
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

async function diceRoll() {
    const dieOne = getRandomInt(1, 7);
    const dieTwo = getRandomInt(1, 7);
    playerRoll = dieOne + dieTwo;
    firstDieElement.setAttribute('src', `images/dice_animated.gif`);
    secondDieElement.setAttribute('src', `images/dice_animated.gif`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    firstDieElement.setAttribute('src', `images/dice_${dieOne}.png`);
    secondDieElement.setAttribute('src', `images/dice_${dieTwo}.png`);
    showRollElement.innerHTML = `${dieOne} + ${dieTwo} = ${playerRoll}`;
    rollDisplayElement.innerHTML = `${playerRoll}`;
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

let playerMoney = 100;
let lastPlayerMoney = 0;
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
const showRollElement = document.getElementById('show-roll')
const rollDisplayElement = document.getElementById('roll-display')
const onButton = document.getElementById('on-button');
const offButton = document.getElementById('off-button');
const firstScreenFade = new bootstrap.Modal(document.getElementById('gamearea-popup'));
const clickBoardNumber = document.querySelector('.boardmap');
const newGameButtons = document.querySelectorAll('.new-game');
const firstDieElement = document.getElementById('first-die');
const secondDieElement = document.getElementById('second-die');

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

rollButtonElement.addEventListener('click', diceRoll);
clickBoardNumber.addEventListener('click', boardClick);
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
