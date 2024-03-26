function newGame() {
    playerMoney = 100;
    betAmount = null;
    playGame = true;
    displayMessage('New game started');
    document.getElementById('bet-amount').disabled = false;
    document.getElementById('bet-button').disabled = false;
    document.querySelector('#bet-button').addEventListener('click', placeBet);
}

function saveGame() {
    displayMessage('Saving not yet implemented');
}

function loadGame() {
    displayMessage('Loading not yet implemented');
}

function firstRoll() {
    diceRoll();
    displayMessage(`You rolled ${playerRoll}`);
    // Better way to check numbers, maybe 'switch'?
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

function playerWin() {
    displayMessage("You win!");
    playerMoney += (betAmount * 2);
    pointOpen = false;
    betAmount = null;
    maxBetInput.setAttribute('max', playerMoney);
    document.getElementById('player-money').innerHTML = playerMoney;
    document.getElementById('roll-button').disabled = true;
    document.getElementById('bet-amount').disabled = false;
    document.getElementById('bet-button').disabled = false;
}

function playerLose() {
    displayMessage("You lose")
    if (playerMoney === 0) {
        gameOver();
        return;
    }
    pointOpen = false;
    betAmount = null;
    maxBetInput.setAttribute('max', playerMoney);
    document.getElementById('player-money').innerHTML = playerMoney;
    document.getElementById('roll-button').disabled = true;
    document.getElementById('bet-amount').disabled = false;
    document.getElementById('bet-button').disabled = false;
}

function placeBet() {
    betAmount = document.getElementById('bet-amount').value;
    // Make into function
    // validateBet(b)
    if (isNaN(betAmount) || betAmount > playerMoney || betAmount < 1) {
        displayMessage('Please insert valid bet');
        betAmount = null;
        return;
    }
    playerMoney -= betAmount;
    maxBetInput.setAttribute('max', playerMoney);
    document.getElementById('player-money').innerHTML = playerMoney;
    document.getElementById('bet-amount').disabled = true;
    document.getElementById('bet-button').disabled = true;
    document.getElementById('roll-button').disabled = false;
    return;
}

function gameOver() {
    displayMessage(`You are bankrupt! Please choose "New Game" from the menu to play again`);
    maxBetInput.setAttribute('max', playerMoney);
    document.getElementById('player-money').innerHTML = playerMoney;
    document.getElementById('roll-button').disabled = true;
    document.getElementById('bet-amount').disabled = true;
    document.getElementById('bet-button').disabled = true;
}

function displayMessage(str) {
    document.getElementById('current-message').innerHTML = str;
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(messageTrigger);
    toastBootstrap.show();
}

function boardClick(e) { // To implement: advanced betting during game
    document.getElementById('clickNum').innerHTML = e.target.alt;
    let i = parseInt(e.target.alt);
    console.log(i);
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
let betAmount = null;
let playGame = false;

const rollDiceButton = document.querySelector('#roll-button');
const maxBetInput = document.querySelector('#bet-amount');
const clickBoardNumber = document.querySelector('.boardmap');
const messageTrigger = document.getElementById('game-message');

rollDiceButton.addEventListener('click', diceRoll);
clickBoardNumber.addEventListener('click', boardClick);
maxBetInput.setAttribute('max', playerMoney);
document.getElementById('player-money').innerHTML = playerMoney;
document.getElementById('roll-button').disabled = true;
document.getElementById('bet-amount').disabled = true;
document.getElementById('bet-button').disabled = true;
document.querySelector('#new-game').addEventListener('click', newGame);
document.querySelector('#load-game').addEventListener('click', loadGame);
document.querySelector('#save-game').addEventListener('click', saveGame);
document.getElementById('roll-button').addEventListener('click', checkGameState);
