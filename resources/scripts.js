function newGame() {
    playerMoney = 100;
    betAmount = null;
    playGame = true;
    document.getElementById('bet-amount').disabled = false;
    document.getElementById('bet-button').disabled = false;
    document.querySelector('#bet-button').addEventListener('click', placeBet);
}

function saveGame() {
    console.log('Not yet implemented') // Pop up: "Not yet implemented"
}

function loadGame() {
    console.log('Not yet implemented') // Pop up: "Not yet implemented"
}

function firstRoll() {
    diceRoll();
    console.log(`You rolled ${playerRoll}`); // Make pop up
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
    console.log(`Your point is ${playerPoint}`); // Make pop up
}

function gameRoll() {
    diceRoll();
    console.log(`You rolled ${playerRoll}`); // Make pop up
    if (playerRoll === playerPoint) {
        playerWin();
        return;
    }
    if (playerRoll === 7) {
        playerLose();
        return;
    }
    console.log("No action, roll again"); // Make pop up
}

function checkGameState() {
    if (pointOpen === false) {
       firstRoll(); 
       return;
    }
    gameRoll();
}

function playerWin() {
    console.log("You win!"); // Make pop up
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
    console.log("You lose") // Make pop up
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
    // validateBet()
    if (isNaN(betAmount) || betAmount > playerMoney || betAmount < 1) {
        console.log('Please insert valid bet'); // Pop-up rather than console.log
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
    console.log(`You are bankrupt! Please choose "New Game" from the menu to play again`)
    maxBetInput.setAttribute('max', playerMoney);
    document.getElementById('player-money').innerHTML = playerMoney;
    document.getElementById('roll-button').disabled = true;
    document.getElementById('bet-amount').disabled = true;
    document.getElementById('bet-button').disabled = true;
}

function boardClick(e) {
    document.getElementById('clickNum').innerHTML = e.target.alt;
    let i = parseInt(e.target.alt);
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