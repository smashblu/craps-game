function newGame() {
    playerMoney = 100;
    betAmount = 0;
    buttonPosition(1);
    displayMessage('New game started');
    resetGame(false, true);
}

function saveGame() {
    displayMessage('Saving not yet implemented');
    document.getElementById('off-button').style.visibility = 'hidden';
    document.getElementById('on-button').style.left = '315px'; // Table border: 15px, square: 230px, mid: 85px
}

function loadGame() {
    displayMessage('Loading not yet implemented');
    document.getElementById('off-button').style.visibility = 'visible';
    document.getElementById('on-button').style.left = '85px';
}

function resetGame(roll, bet) {
    maxBetInput.setAttribute('max', playerMoney);
    document.getElementById('player-money').innerHTML = playerMoney;
    if (roll === true) {
        document.getElementById('roll-button').disabled = false;
    }
    if (roll === false) {
        document.getElementById('roll-button').disabled = true;
    }
    if (bet === true) {
        document.getElementById('bet-amount').disabled = false;
        document.getElementById('bet-button').disabled = false;
    }
    if (bet === false) {
        document.getElementById('bet-amount').disabled = true;
        document.getElementById('bet-button').disabled = true;
    }
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
    displayMessage("No action, roll again");
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
            document.getElementById('off-button').style.visibility = 'visible';
            document.getElementById('on-button').style.left = '1475px';
            document.getElementById('on-button').style.visibility = 'hidden';
            pointOpen = false;
            break;
        case 4:
            document.getElementById('off-button').style.visibility = 'hidden';
            document.getElementById('on-button').style.visibility = 'visible';
            document.getElementById('on-button').style.left = '85px';
            break;
        case 5:
            document.getElementById('off-button').style.visibility = 'hidden';
            document.getElementById('on-button').style.visibility = 'visible';
            document.getElementById('on-button').style.left = '315px';
            break;
        case 6:
            document.getElementById('off-button').style.visibility = 'hidden';
            document.getElementById('on-button').style.visibility = 'visible';
            document.getElementById('on-button').style.left = '545px';
            break;
        case 8:
            document.getElementById('off-button').style.visibility = 'hidden';
            document.getElementById('on-button').style.visibility = 'visible';
            document.getElementById('on-button').style.left = '775px';
            break;
        case 9:
            document.getElementById('off-button').style.visibility = 'hidden';
            document.getElementById('on-button').style.visibility = 'visible';
            document.getElementById('on-button').style.left = '1005px';
            break;
        case 10:
            document.getElementById('off-button').style.visibility = 'hidden';
            document.getElementById('on-button').style.visibility = 'visible';
            document.getElementById('on-button').style.left = '1235px';
            break;
    }
}

function playerWin() {
    displayMessage("You win!");
    playerMoney += (betAmount * 2);
    buttonPosition(1);
    betAmount = 0;
    resetGame(false, true);
}

function playerLose() {
    displayMessage("You lose")
    if (playerMoney === 0) {
        gameOver();
        return;
    }
    buttonPosition(1);
    betAmount = 0;
    resetGame(false, true);
}

function placeBet() {
    betAmount = document.getElementById('bet-amount').value;
    if (validateBet() === false) {
        return;
    }
    playerMoney -= betAmount;
    resetGame(true, false);
    return;
}

function gameOver() {
    displayMessage(`You are bankrupt! Please choose "New Game" from the menu to play again`);
    buttonPosition(1);
    resetGame(false, false);
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
    const dieOne = getRandomInt(1,7); 
    const dieTwo = getRandomInt(1,7); 
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

const rollDiceButton = document.querySelector('#roll-button');
const maxBetInput = document.querySelector('#bet-amount');
const clickBoardNumber = document.querySelector('.boardmap');
const messageTrigger = document.getElementById('game-message');

rollDiceButton.addEventListener('click', diceRoll);
clickBoardNumber.addEventListener('click', boardClick);
buttonPosition(1);
resetGame(false, false);
document.querySelector('#new-game').addEventListener('click', newGame);
document.querySelector('#load-game').addEventListener('click', loadGame);
document.querySelector('#save-game').addEventListener('click', saveGame);
document.getElementById('roll-button').addEventListener('click', checkGameState);
document.querySelector('#bet-button').addEventListener('click', placeBet);