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
    buildSummary(DICEROLLED);
    if (playerRoll === 7 || playerRoll === 11) {
        payOut(true, true, betAmount);
        return;
    }
    if (playerRoll === 2 || playerRoll === 3 || playerRoll === 12) {
        payOut(true, false);
        return;
    }
    playerPoint = playerRoll;
    pointOpen = true;
    buttonPosition(playerRoll);
    buildSummary(SHOWPOINT);
    displayMessage(rollSummary);
    rollSummary = null;
    buttonStates();
    return;
}

async function gameRoll() {
    diceRoll();
    await new Promise(resolve => setTimeout(resolve, 1000));
    buildSummary(DICEROLLED);
    if (testObjPop(secondaryBetObj) === false) {
        secondaryRoll(playerRoll);
    }
    if (playerRoll === playerPoint) {
        payOut(true, true, betAmount);
        return;
    }
    if (playerRoll === 7) {
        payOut(true, false);
        return;
    }
    buildSummary(NOACTION);
    displayMessage(rollSummary);
    rollSummary = null;
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
    if (roll === 7) {
        for (let i = 4; i < 11; i++) {
            if (secondaryBetObj[i] > 0) {
                buildSummary(SECONDARYLOSE, i);
                payOut(false, false);
                delete secondaryBetObj[i];
            }
        }
    } else {
        if (roll === 4 || roll === 5 || roll === 6 || roll === 8 || roll === 9 || roll === 10) {
            buildSummary(PLACEWIN, roll);
            payOut(false, true, secondaryBetObj[roll]);
            delete secondaryBetObj[roll];
        }
    }
    if (secondaryBetObj[1] > 0) {
        if (roll === 7 || roll === 11) {
            buildSummary(COMEWIN);
            payOut(false, true, secondaryBetObj[1]);
            delete secondaryBetObj[1];
        } else if (roll === 2 || roll === 3 || roll === 12) {
            buildSummary(COMELOSE);
            payOut(false, false);
            delete secondaryBetObj[1];
        } else {
            buildSummary(COMESET, roll);
            secondaryBetObj[roll] = secondaryBetObj[1];
            delete secondaryBetObj[1];
        }
    }
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
    // To implement in next PR
    switch (loc) {
        case 1:
            chipContainerElement.style.visibility = 'hidden';
            break;
        case 4:
            chipContainerElement.style.visibility = 'visible';
            chipContainerElement.style.left = '85px';
            break;
        case 5:
            chipContainerElement.style.visibility = 'visible';
            chipContainerElement.style.left = '315px';
            break;
        case 6:
            chipContainerElement.style.visibility = 'visible';
            chipContainerElement.style.left = '545px';
            break;
        case 8:
            chipContainerElement.style.visibility = 'visible';
            chipContainerElement.style.left = '775px';
            break;
        case 9:
            chipContainerElement.style.visibility = 'visible';
            chipContainerElement.style.left = '1005px';
            break;
        case 10:
            chipContainerElement.style.visibility = 'visible';
            chipContainerElement.style.left = '1235px';
            break;
    }
    switch (true) {
        case (color > 0):
            // White
            break;
        case (color >= 5):
            // Red
            break;
        case (color >= 25):
            // Green
            break;
        case (color >= 100):
            // Black
            break;
        case (color >= 500):
            // Orange
            break;
    }
    return;
}

function payOut(isprimary, win, amount) {
    if (isprimary === false) {
        if (win === true) {
            playerMoney += (amount * 2);
            totalBets -= amount;
            return;
        }
        totalBets -= amount;
        return;
    }
    if (win === true) {
        buildSummary(PRIMARYWIN);
        lastPlayerMoney = playerMoney;
        playerMoney += (amount * 2);
        pushSecondaryBets();
        resetGame();
        moneyChange(0);
        return;
    }
    buildSummary(PRIMARYLOSE);
    if (playerMoney === 0) {
        gameOver();
        return;
    }
    displayMessage(rollSummary);
    rollSummary = null;
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
    let comeAmount = betDialogElement.value;
    comeAmount = parseInt(comeAmount);
    if (validateBet(comeAmount) === false) {
        return;
    }
    lastPlayerMoney = playerMoney;
    playerMoney -= comeAmount;
    secondaryBetObj[1] = comeAmount;
    moneyChange(comeAmount);
    betDialogElement.disabled = true;
    comeButtonElement.disabled = true;
    return;
}

function makePlace(num) {
    placeDialogAmount.setAttribute('max', playerMoney);
    makePlaceNumClicked = num;
    placeDialog.showModal();
    return;
}

class SecondaryBet {
    constructor(point, amount) {
        this.point = point;
        this.amount = amount;
    }
}

function pushSecondaryBets() {
    if (testObjPop(secondaryBetObj) === false) {
        for (let i = 1; i < 11; i++) {
            if (secondaryBetObj[i] > 0) {
                playerMoney += secondaryBetObj[i];
                totalBets -= secondaryBetObj[i];
                delete secondaryBetObj[i];
            }
        }
    }
    return;
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

function buildSummary(msg, rolled) {
    if (msg === SECONDARYLOSE) {
        // catalog all lost bets
        rollSummary += rolled;
    }
    rollSummary = `${rollSummary} and ${msg} ${rolled}`;
}
const SECONDARYLOSE = 'you lost your bet on';
const PLACEWIN = 'placeholder';
const COMEWIN = 'placeholder';
const COMELOSE = 'placeholder';
const COMESET = 'place set on';

function displayMessage(str) {
    if (rollSummary === null) {
        //document.getElementById('current-message').innerHTML = str;
        'test: null';
    } else if (str === NOACTION) {
        //document.getElementById('current-message').innerHTML = `${SECONDARYNOACTION} ${rollSummary}`;
        'test: no action';
    } else {
        //document.getElementById('current-message').innerHTML = `${str} ${rollSummary}`;
        'test: summary';
    }
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(messageTrigger);
    toastBootstrap.show();
    rollSummary = null;
    return;
}

function boardClick(e) {
    let numClicked = parseInt(e.target.alt);
    const PLACENOPOINT = `You cannot place on ${numClicked} because no point is open`;
    const PLACEAGAIN = `You have already made a bet on ${numClicked}`;
    if (secondaryBetObj[numClicked] > 0) {
        displayMessage(PLACEAGAIN);
        return;
    }
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
let pointOpen = false;
let playerPoint = 0;
let betAmount = 0;
let totalBets = 0;
let firstViewed = true;
let makePlaceNumClicked = 0;
let rollSummary = null;
let secondaryBetObj = {};

const NEWGAME = 'New game started';
const SAVEGAME = 'Saving not yet implemented';
const LOADGAME = 'Loading not yet implemented';
const DICEROLLED = `You rolled ${playerRoll}`;
const SHOWPOINT = `Your point is ${playerPoint}`;
const NOACTION = 'No action, roll again';
const SECONDARYNOACTION = 'No action on point';
const NOPOINTWIN = `${playerRoll}, win on pass line!`;
const NOPOINTLOSE = `${playerRoll}, craps, you lose`;
const PRIMARYWIN = `The point of ${playerPoint} was rolled, you win!`;
const PRIMARYLOSE = `7 was rolled, ${playerPoint} missed and you lose`;
const INVALIDBET = 'Please make a valid place bet';
const BANKRUPT = `You are bankrupt! Please choose 'New Game' from the menu to play again`;
const PLACEONPOINT = 'You cannot place on the current point';

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
        secondaryBetObj[makePlaceNumClicked] = placeAmount;
        moneyChange(placeAmount);
        placeDialog.close();
    }
});

for (let i = 0; i < newGameButtons.length; i++) {
    newGameButtons[i].addEventListener('click', newGame);
}

firstGame();
