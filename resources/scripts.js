function firstGame() {
    if (firstViewed === true) {
        firstScreenFade.show();
    }
    return;
}

function newGame() {
    firstViewed = false;
    lastPlayerMoney = playerMoney;
    playerMoney = 100;
    playerMoneyChange();
    resetGame();
    displayMessage('New game started');
    return;
}

function resetGame() {
    playerRoll = 1;
    pointOpen = false;
    buttonPosition(playerRoll);
    betAmount = 0;
    buttonStates();
    return;
}

function saveGame() {
    displayMessage('Saving not yet implemented');
    offButton.style.visibility = 'hidden';
    onButton.style.left = '315px'; // Table border: 15px, square: 230px, mid: 85px
    return;
}

function loadGame() {
    displayMessage('Loading not yet implemented');
    offButton.style.visibility = 'visible';
    onButton.style.left = '85px';
    return;
}

function buttonStates() {
    if (betAmount === 0) {
        rollButtonElement.disabled = true;
        betDialogElement.disabled = false;
        betButtonElement.disabled = false;
        comeButtonElement.disabled = true;
        return;
    }
    betDialogElement.setAttribute('max', playerMoney);
    playerMoneyChange();
    rollButtonElement.disabled = false;
    betDialogElement.disabled = true;
    betButtonElement.disabled = true;
    comeButtonElement.disabled = true;
    if (pointOpen === true) {
        comeButtonElement.disabled = false;
        betDialogElement.disabled = false;
    }
    return;
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
    buttonStates();
    return;
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
    return;
}

function checkGameState() {
    if (pointOpen === false) {
        firstRoll();
        return;
    }
    gameRoll();
    return;
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
    return;
}

function chipChange(loc, color) {
    switch (loc) {
        case 1:
            chipContainerElement.style.visibility = 'hidden';
            break;
        case 2:
            chipContainerElement.style.visibility = 'visible';
            break;
    }
    return;
}

function playerWin() {
    displayMessage('You win!');
    lastPlayerMoney = playerMoney;
    playerMoney += (betAmount * 2);
    playerMoneyChange();
    resetGame();
    return;
}

function playerLose() {
    displayMessage('You lose')
    if (playerMoney === 0) {
        gameOver();
        return;
    }
    buttonPosition(playerRoll);
    resetGame();
    return;
}

function makeBet() {
    betAmount = betDialogElement.value;
    betAmount = parseInt(betAmount);
    if (validateBet(betAmount) === false) {
        return;
    }
    lastPlayerMoney = playerMoney;
    playerMoney -= betAmount;
    playerMoneyChange();
    buttonStates();
    return;
}

function makeCome() {
    comeNum++;
    comeAmount = betDialogElement.value;
    comeAmount = parseInt(comeAmount);
    if (validateBet(comeAmount) === false) {
        return;
    }
    lastPlayerMoney = playerMoney;
    playerMoney -= comeAmount;
    playerMoneyChange();
    comeBetList.push(new come(comeNum, 1, comeAmount));
    console.log(comeBetList);
    return;
}

function come(betNum, point, amount) {
    this.betNum = betNum;
    this.point = point;
    this.amount = amount;
}

function gameOver() {
    displayMessage(`You are bankrupt! Please choose 'New Game' from the menu to play again`);
    playerRoll = 1;
    buttonPosition(playerRoll);
    buttonStates();
    return;
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
    return;
}

function boardClick(e) { // To implement: advanced betting during game
    document.getElementById('clickNum').innerHTML = e.target.alt;
    let i = parseInt(e.target.alt);
    return;
}

function validateBet(betAmount) {
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
    return;
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

let playerMoney = 100;
let lastPlayerMoney = 0;
let playerRoll = 1;
let pointOpen = false;
let playerPoint = 0;
let betAmount = 0;
let comeAmount = 0;
let placeAmount = 0;
let firstViewed = true;
let comeNum = 0;

const playerMoneyElement = document.getElementById('player-money');
const betButtonElement = document.getElementById('bet-button');
const comeButtonElement = document.getElementById('come-button');
const rollButtonElement = document.getElementById('roll-button');
const betDialogElement = document.getElementById('bet-amount');
const messageTrigger = document.getElementById('game-message');
const showRollElement = document.getElementById('show-roll')
const rollDisplayElement = document.getElementById('roll-display')
const onButton = document.getElementById('on-button');
const offButton = document.getElementById('off-button');
const chipContainerElement = document.querySelector('.chip-container');
const chipTextElement = document.getElementById('chip-text');
const chipImgElement = document.getElementById('chip-img');
const firstScreenFade = new bootstrap.Modal(document.getElementById('gamearea-popup'));
const clickBoardNumber = document.querySelector('.boardmap');
const newGameButtons = document.querySelectorAll('.new-game');
const firstDieElement = document.getElementById('first-die');
const secondDieElement = document.getElementById('second-die');
const comeBetList = [];

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

buttonPosition(playerRoll);
rollButtonElement.disabled = true;
betButtonElement.disabled = true;
comeButtonElement.disabled = true;

document.querySelector('#load-game').addEventListener('click', loadGame);
document.querySelector('#save-game').addEventListener('click', saveGame);
rollButtonElement.addEventListener('click', diceRoll);
rollButtonElement.addEventListener('click', checkGameState);
betButtonElement.addEventListener('click', makeBet);
clickBoardNumber.addEventListener('click', boardClick);
comeButtonElement.addEventListener('click', makeCome);

for (let i = 0; i < newGameButtons.length; i++) {
    newGameButtons[i].addEventListener('click', newGame);
}

firstGame();
