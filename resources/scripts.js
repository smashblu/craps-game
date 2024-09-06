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
    moneyChange(0);
    resetGame();
    displayMessage(NEWGAME);
    return;
}

function resetGame() {
    playerRoll = 1;
    pointOpen = false;
    buttonPosition(playerRoll);
    betAmount = 0;
    totalBets = 0;
    buttonStates();
    return;
}

function saveGame() {
    displayMessage(SAVEGAME);
    offButton.style.visibility = 'hidden';
    onButton.style.left = '315px'; // Table border: 15px, square: 230px, mid: 85px
    return;
}

function loadGame() {
    displayMessage(LOADGAME);
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
    lastPlayerMoney = playerMoney;
    moneyChange(0);
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
    displayMessage(DICEROLLED);
    if (playerRoll === 7 || playerRoll === 11) {
        playerWin(PRIMARY, betAmount);
        return;
    }
    if (playerRoll === 2 || playerRoll === 3 || playerRoll === 12) {
        playerLose(PRIMARY, betAmount);
        return;
    }
    playerPoint = playerRoll;
    pointOpen = true;
    buttonPosition(playerRoll);
    displayMessage(SHOWPOINT);
    buttonStates();
    return;
}

async function gameRoll() {
    diceRoll();
    await new Promise(resolve => setTimeout(resolve, 1000));
    displayMessage(DICEROLLED);
    if (secondaryBetList.length !== 0) {
        secondaryRoll(playerRoll);
    }
    if (playerRoll === playerPoint) {
        playerWin(PRIMARY, betAmount);
        return;
    }
    if (playerRoll === 7) {
        playerLose(PRIMARY, betAmount);
        return;
    }
    displayMessage(NOACTION);
    buttonStates();
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

function secondaryRoll(roll) {
    const betsToDelete = [];
    for (let i = 0; i < secondaryBetList.length; i++) {
        const currentPoint = secondaryBetList[i].point;
        const currentBet = secondaryBetList[i];
        if (currentPoint === 1) {
            if (roll === 7 || roll === 11) {
                betsToDelete.push(currentBet);
                playerWin(SECONDARY);
            } else if (roll === 2 || roll === 3 || roll === 12) {
                betsToDelete.push(currentBet);
                playerLose(SECONDARY);
            } else {
                currentPoint = roll;
            }
        } else {
            if (roll === 7) {
                betsToDelete.push(currentBet);
                playerLose(SECONDARY);
            } else if (currentPoint === roll) {
                betsToDelete.push(currentBet);
                playerWin(SECONDARY);
            } else {
                // Placeholder, prefer different notification method
                displayMessage(NOACTION);
            }
        }
    }
    removeBets(betsToDelete);
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

function playerWin(type, amount) {
    if (type === SECONDARY) {
        lastPlayerMoney = playerMoney;
        playerMoney += (amount * 2);
        displayMessage(SECONDARYWIN);
        moneyChange(0);
        return;
    }
    displayMessage(PRIMARYWIN);
    lastPlayerMoney = playerMoney;
    playerMoney += (amount * 2);
    resetGame();
    moneyChange(0);
    return;
}

function playerLose(type, amount) {
    if (type === SECONDARY) {
        lastPlayerMoney = playerMoney;
        displayMessage(SECONDARYLOSE);
        moneyChange(0);
        return;
    }
    displayMessage(PRIMARYLOSE)
    if (playerMoney === 0) {
        gameOver();
        return;
    }
    buttonPosition(playerRoll);
    resetGame();
    moneyChange(0);
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
    moneyChange(betAmount);
    buttonStates();
    return;
}

function makeCome() {
    comeAmount = betDialogElement.value;
    comeAmount = parseInt(comeAmount);
    if (validateBet(comeAmount) === false) {
        return;
    }
    lastPlayerMoney = playerMoney;
    playerMoney -= comeAmount;
    secondaryBetList.push(new SecondaryBet(1, comeAmount));
    moneyChange(comeAmount);
    betDialogElement.disabled = true;
    comeButtonElement.disabled = true;
    return;
}

function makePlace(num) {
    placeDialogAmount.setAttribute('max', playerMoney);
    placeDialog.showModal();
    placeDialogCancel.addEventListener('click', () => {
        placeDialog.close()
    });
    placeDialogAccept.addEventListener('click', () => {
        placeAmount = placeDialogAmount.value;
        placeAmount = parseInt(placeAmount);
        if (validateBet(placeAmount) === false) {
            placeDialog.close();
            displayMessage(INVALIDBET);
        } else {
            lastPlayerMoney = playerMoney;
            playerMoney -= placeAmount;
            secondaryBetList.push(new SecondaryBet(num, placeAmount));
            moneyChange(placeAmount);
            placeDialog.close();
        }
    });
    return;
}

class SecondaryBet {
    constructor(point, amount) {
        this.point = point;
        this.amount = amount;
    }
}

function removeBets(array) {
    // Find way to remove correct bets in loop
}

function gameOver() {
    displayMessage(BANKRUPT);
    playerRoll = 1;
    buttonPosition(playerRoll);
    buttonStates();
    return;
}

async function moneyChange(newBet) {
    totalBets += newBet;
    playerMoneyElement.innerHTML = playerMoney;
    playerBetElement.innerHTML = totalBets;
    if (playerMoney === lastPlayerMoney) {
        return;
    }
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

function boardClick(e) {
    let numClicked = parseInt(e.target.alt);
    const PLACENOPOINT = `You cannot place on ${numClicked} because no point is open`
    if (pointOpen === false) {
        displayMessage(PLACENOPOINT);
        return;
    }
    if (numClicked === playerPoint) {
        displayMessage(PLACEONPOINT);
        return;
    }
    makePlace(numClicked);
    return;
}

function validateBet(betAmount) {
    if (isNaN(betAmount) || betAmount > playerMoney || betAmount < 1) {
        displayMessage(INVALIDBET);
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
let totalBets = 0;
let firstViewed = true;
let secondaryBetList = [];

const NEWGAME = 'New game started';
const SAVEGAME = 'Saving not yet implemented';
const LOADGAME = 'Loading not yet implemented';
const DICEROLLED = `You rolled ${playerRoll}`;
const SHOWPOINT = `Your point is ${playerPoint}`;
const NOACTION = 'No action, roll again';
const NOPOINTWIN = `${playerRoll}, win on pass line!`;
const NOPOINTLOSE = `${playerRoll}, craps, you lose`;
const PRIMARYWIN = `The point of ${playerPoint} was rolled, you win!`;
const PRIMARYLOSE = `7 was rolled, ${playerPoint} missed and you lose`;
const SECONDARYWIN = `win placeholder`;
const SECONDARYLOSE = `lose placeholder`;
const INVALIDBET = 'Please make a valid place bet';
const BANKRUPT = `You are bankrupt! Please choose 'New Game' from the menu to play again`;
const PLACEONPOINT = 'You cannot place on the current point';
const PRIMARY = 'primary';
const SECONDARY = 'secondary';

const playerMoneyElement = document.getElementById('player-money');
const playerBetElement = document.getElementById('player-bet');
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
const placeDialog = document.querySelector('dialog');
const placeDialogAmount = document.getElementById('place-amount');
const placeDialogCancel = document.getElementById('place-cancel');
const placeDialogAccept = document.getElementById('place-accept');

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

buttonPosition(playerRoll);
rollButtonElement.disabled = true;
betButtonElement.disabled = true;
comeButtonElement.disabled = true;

document.querySelector('#load-game').addEventListener('click', loadGame);
document.querySelector('#save-game').addEventListener('click', saveGame);
rollButtonElement.addEventListener('click', checkGameState);
betButtonElement.addEventListener('click', makeBet);
clickBoardNumber.addEventListener('click', boardClick);
comeButtonElement.addEventListener('click', makeCome);

for (let i = 0; i < newGameButtons.length; i++) {
    newGameButtons[i].addEventListener('click', newGame);
}

firstGame();
