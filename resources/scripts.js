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
    playerPoint = 0;
    buttonPosition();
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
        rollButton.disabled = true;
        betDialog.disabled = false;
        betButton.disabled = false;
        comeButton.disabled = true;
        return;
    }
    betDialog.setAttribute('max', playerMoney);
    lastPlayerMoney = playerMoney;
    moneyChange(0);
    rollButton.disabled = false;
    betDialog.disabled = true;
    betButton.disabled = true;
    comeButton.disabled = true;
    multiBetsActive.innerHTML = '';
    if (playerPoint > 1) {
        comeButton.disabled = false;
        betDialog.disabled = false;
        multiBetsActive.innerHTML = 'You may now click a number on the board to make a Place bet';
    }
    return;
}

async function preLineRoll() {
    diceRoll();
    await new Promise(resolve => setTimeout(resolve, 1000));
    buildSummary(DICEROLLED, null);
    if (playerRoll === 7 || playerRoll === 11) {
        payOut(true, true, betAmount);
        return;
    }
    if (playerRoll === 2 || playerRoll === 3 || playerRoll === 12) {
        payOut(true, false, 0);
        return;
    }
    playerPoint = playerRoll;
    buttonPosition();
    buildSummary(SHOWPOINT, null);
    displayMessage(rollSummary);
    rollSummary = null;
    buttonStates();
    return;
}

async function gameRoll() {
    diceRoll();
    await new Promise(resolve => setTimeout(resolve, 1000));
    buildSummary(DICEROLLED, null);
    if (testObjPop(multiBetObj) === false) {
        multiRoll(playerRoll);
    }
    if (playerRoll === playerPoint) {
        payOut(true, true, betAmount);
        return;
    }
    if (playerRoll === 7) {
        payOut(true, false, 0);
        return;
    }
    buildSummary(NOACTION, null);
    displayMessage(rollSummary);
    rollSummary = null;
    buttonStates();
    return;
}
function checkGameState() {
    if (playerPoint < 1) {
        preLineRoll();
        return;
    }
    gameRoll();
    return;
}

function multiRoll(roll) {
    if (roll === 7) {
        for (let i = 4; i < 11; i++) {
            if (multiBetObj[i] > 0) {
                buildSummary(ALLBETS, i);
                multiBetDelete(i);
            }
        }
        buildSummary(MULTILOSE, null);
        payOut(false, false, 0);
    } else {
        if (multiBetObj[roll] > 0 && (roll === 4 || roll === 5 || roll === 6 || roll === 8 || roll === 9 || roll === 10)) {
            buildSummary(PLACEWIN, null); // This is not being added to summary
            payOut(false, true, multiBetObj[roll]);
            multiBetDelete(roll);
        }
    }
    if (multiBetObj[1] > 0) {
        if (roll === 7 || roll === 11) {
            buildSummary(COMEWIN, null);
            payOut(false, true, (multiBetObj[1]));
            multiBetDelete(1);
        } else if (roll === 2 || roll === 3 || roll === 12) {
            buildSummary(COMELOSE, null);
            payOut(false, false, 0);
            multiBetDelete(1);
        } else {
            buildSummary(COMESET, null);
            multiBetAdd(roll, multiBetObj[1]);
            multiBetDelete(1);
        }
    }
}

function buttonPosition() {
    switch (playerRoll) {
        case 1:
            offButton.style.visibility = 'visible';
            onButton.style.visibility = 'hidden';
            onButton.style.left = `${SIDESPOT}px`;
            multiBetsActive.innerHTML = '';
            break;
        case 4:
            offButton.style.visibility = 'hidden';
            onButton.style.visibility = 'visible';
            onButton.style.left = `${FOURSPOT}px`;
            break;
        case 5:
            offButton.style.visibility = 'hidden';
            onButton.style.visibility = 'visible';
            onButton.style.left = `${FIVESPOT}px`;
            break;
        case 6:
            offButton.style.visibility = 'hidden';
            onButton.style.visibility = 'visible';
            onButton.style.left = `${SIXSPOT}px`;
            break;
        case 8:
            offButton.style.visibility = 'hidden';
            onButton.style.visibility = 'visible';
            onButton.style.left = `${EIGHTSPOT}px`;
            break;
        case 9:
            offButton.style.visibility = 'hidden';
            onButton.style.visibility = 'visible';
            onButton.style.left = `${NINESPOT}px`;
            break;
        case 10:
            offButton.style.visibility = 'hidden';
            onButton.style.visibility = 'visible';
            onButton.style.left = `${TENSPOT}px`;
            break;
    }
    return;
}

function payOut(isline, win, amount) {
    if (isline === false) {
        if (win === true) {
            playerMoney += (amount * 2);
            totalBets -= amount;
            return;
        }
        totalBets -= amount;
        return;
    }
    if (win === true) {
        if (playerPoint > 1) {
            buildSummary(LINEWIN, null);
        } else {
            buildSummary(PRELINEWIN, null);
        }
        lastPlayerMoney = playerMoney;
        playerMoney += (amount * 2);
        pushmultiBets();
        displayMessage(rollSummary);
        rollSummary = null;
        resetGame();
        moneyChange(0);
        return;
    }
    if (playerPoint > 1) {
        buildSummary(LINELOSE, null);
    } else {
        buildSummary(PRELINELOSE, null);
    }
    if (playerMoney === 0) {
        gameOver();
        return;
    }
    displayMessage(rollSummary);
    rollSummary = null;
    buttonPosition();
    resetGame();
    moneyChange(0);
    return;
}

function makeBet() {
    betAmount = betDialog.value;
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
    const comeAmount = parseInt(betDialog.value);
    if (validateBet(comeAmount) === false) {
        return;
    }
    lastPlayerMoney = playerMoney;
    playerMoney -= comeAmount;
    multiBetAdd(1, comeAmount);
    moneyChange(comeAmount);
    betDialog.disabled = true;
    comeButton.disabled = true;
    return;
}

function makePlace(num) {
    placeDialogAmount.setAttribute('max', playerMoney);
    makePlaceNumClicked = num;
    placeDialog.showModal();
    return;
}

function pushmultiBets() {
    if (testObjPop(multiBetObj) === false) {
        for (let i = 1; i < 11; i++) {
            if (multiBetObj[i] > 0) {
                playerMoney += multiBetObj[i];
                totalBets -= multiBetObj[i];
                multiBetDelete(i);
                buildSummary(ALLBETS, i);
            }
        }
        buildSummary(MULTIPUSH, null);
    }
    return;
}

function multiBetAdd(point, amount) {
    multiBetObj[point] = amount;
    const divChip = document.createElement('div');
    const txtChip = document.createElement('div');
    const imgChip = document.createElement('img');
    insideBoard.appendChild(divChip);
    divChip.appendChild(txtChip);
    divChip.appendChild(imgChip);
    divChip.setAttribute('id', `chip-${point}`);
    divChip.setAttribute('class', 'chip-container');
    txtChip.innerHTML = `$${amount}`;
    txtChip.setAttribute('class', 'chip-text');
    switch (point) {
        case 1:
            divChip.style.left = `${SIDESPOT}px`;
            break;
        case 4:
            divChip.style.left = `${FOURSPOT}px`;
            break;
        case 5:
            divChip.style.left = `${FIVESPOT}px`;
            break;
        case 6:
            divChip.style.left = `${SIXSPOT}px`;
            break;
        case 8:
            divChip.style.left = `${EIGHTSPOT}px`;
            break;
        case 9:
            divChip.style.left = `${NINESPOT}px`;
            break;
        case 10:
            divChip.style.left = `${TENSPOT}px`;
            break;
    }
    switch (true) {
        case (amount >= 500):
            imgChip.setAttribute('src', `images/chip_orange.svg`);
            break;
        case (amount >= 100):
            imgChip.setAttribute('src', `images/chip_black.svg`);
            break;
        case (amount >= 25):
            imgChip.setAttribute('src', `images/chip_green.svg`);
            break;
        case (amount >= 5):
            imgChip.setAttribute('src', `images/chip_red.svg`);
            break;
        case (amount > 0):
            imgChip.setAttribute('src', `images/chip_white.svg`);
            break;
    }
    return;
}

function multiBetDelete(point) {
    delete multiBetObj[point];
    document.getElementById(`chip-${point}`).remove();
}

function gameOver() {
    displayMessage(BANKRUPT);
    playerRoll = 1;
    buttonPosition();
    buttonStates();
    return;
}

async function moneyChange(newBet) {
    totalBets += newBet;
    showMoney.innerHTML = playerMoney;
    showBet.innerHTML = totalBets;
    if (playerMoney < lastPlayerMoney) {
        showMoney.style.transition = 'all 0.5s';
        showMoney.style.fontSize = '75%';
        showMoney.style.color = '#ff0000';
        await new Promise(resolve => setTimeout(resolve, 500));
        showMoney.style.transition = 'all 0.5s';
        showMoney.style.fontSize = '120%';
        showMoney.style.color = '#00ff00';
        return;
    }
    if (playerMoney > lastPlayerMoney) {
        showMoney.style.transition = 'all 0.5s';
        showMoney.style.fontSize = '175%';
        showMoney.style.color = '#0000ff';
        await new Promise(resolve => setTimeout(resolve, 500));
        showMoney.style.transition = 'all 0.5s';
        showMoney.style.fontSize = '120%';
        showMoney.style.color = '#00ff00';
        return;
    }
    return;
}

function buildSummary(msg, rolled) {
    switch (msg) {
        case SHOWPOINT:
            msg += ` ${playerPoint}`;
            break;
        case DICEROLLED:
            msg += ` ${playerRoll}`;
            break;
        case NOPOINTWIN:
            msg += ` ${playerRoll}`;
            break;
        case NOPOINTLOSE:
            msg += ` ${playerRoll}`;
            break;
        case PLACEWIN:
            msg += ` ${playerRoll}`;
            break;
        case COMESET:
            msg += ` ${playerRoll}`;
            break;
        default:
            break;
    }
    if (rollSummary === null) {
        rollSummary = msg;
    } else if (msg === ALLBETS) {
        rollSummary += `, ${rolled}`;
    } else {
        rollSummary += `, ${msg}`;
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
    const PLACENOPOINT = `You cannot place on ${numClicked} because no point is open`;
    const PLACEAGAIN = `You have already made a bet on ${numClicked}`;
    if (multiBetObj[numClicked] > 0) {
        displayMessage(PLACEAGAIN);
        return;
    }
    if (playerPoint < 1) {
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
    showRoll.innerHTML = `${dieOne} + ${dieTwo} = ${playerRoll}`;
    rollDisplay.innerHTML = `${playerRoll}`;
    return;
}

function testObjPop(obj) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }
    return true;
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

let playerMoney = 100;
let lastPlayerMoney = 0;
let playerRoll = 1;
let playerPoint = 0;
let betAmount = 0;
let totalBets = 0;
let firstViewed = true;
let makePlaceNumClicked = 0;
let rollSummary = null;
let multiBetObj = {};

const NEWGAME = 'New game started';
const SAVEGAME = 'Saving not yet implemented';
const LOADGAME = 'Loading not yet implemented';
const NOACTION = 'No action, roll again';
const LINEWIN = 'The point was rolled, you win!';
const LINELOSE = 'point and place bets lose';
const PRELINEWIN = 'Initial bet wins!';
const PRELINELOSE = 'Initial bet loses';
const INVALIDBET = 'Please make a valid place bet';
const BANKRUPT = `You are bankrupt! Please choose 'New Game' from the menu to play again`;
const PLACEONPOINT = 'You cannot place on the current point';
const COMEWIN = 'The last come bet has won!';
const COMELOSE = 'The last come bet has lost';
const MULTILOSE = 'have all lost';
const MULTIPUSH = 'have all pushed';
const ALLBETS = 'Placeholder message for all multi bets';
// playerRoll should trail following constants
const SHOWPOINT = 'Your point is'; // playerPoint for this one only
const DICEROLLED = 'You rolled';
const NOPOINTWIN = 'Win on pass line with';
const NOPOINTLOSE = 'Craps, you lose with';
const PLACEWIN = 'Place bet wins on';
const COMESET = 'The last come bet is placed on';

const SIDESPOT = 1475;
const FOURSPOT = 85;
const FIVESPOT = 315;
const SIXSPOT = 545;
const EIGHTSPOT = 775;
const NINESPOT = 1005;
const TENSPOT = 1235;

const insideBoard = document.getElementById('gameboard');
const showMoney = document.getElementById('player-money');
const showBet = document.getElementById('player-bet');
const betButton = document.getElementById('bet-button');
const comeButton = document.getElementById('come-button');
const rollButton = document.getElementById('roll-button');
const betDialog = document.getElementById('bet-amount');
const messageTrigger = document.getElementById('game-message');
const showRoll = document.getElementById('show-roll')
const rollDisplay = document.getElementById('roll-display')
const multiBetsActive = document.getElementById('multi-active');
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

buttonPosition();
rollButton.disabled = true;
betButton.disabled = true;
comeButton.disabled = true;

document.querySelector('#load-game').addEventListener('click', loadGame);
document.querySelector('#save-game').addEventListener('click', saveGame);
rollButton.addEventListener('click', checkGameState);
betButton.addEventListener('click', makeBet);
clickBoardNumber.addEventListener('click', boardClick);
comeButton.addEventListener('click', makeCome);
placeDialogCancel.addEventListener('click', () => {
    placeDialog.close()
});
placeDialogAccept.addEventListener('click', () => {
    let placeAmount = placeDialogAmount.value;
    placeAmount = parseInt(placeAmount);
    if (validateBet(placeAmount) === false) {
        placeDialog.close();
        displayMessage(INVALIDBET);
    } else {
        lastPlayerMoney = playerMoney;
        playerMoney -= placeAmount;
        multiBetAdd(makePlaceNumClicked, placeAmount);
        moneyChange(placeAmount);
        placeDialog.close();
    }
});

for (let i = 0; i < newGameButtons.length; i++) {
    newGameButtons[i].addEventListener('click', newGame);
}

firstGame();
