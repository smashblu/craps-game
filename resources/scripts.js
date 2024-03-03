function askToPlay() {
    if (playerMoney === 0) {
     // Convert to "Game Over" type screen with option to start new game
     // console.log('You are out of money')
        return false;
    }
    let play = prompt('Start game? [y/n]: '); // Needs to not use "prompt" command, pop-up maybe?
    if (play === 'y' || play === 'Y') { // This will need to be revamped with new user input
        return true;
    }
    return false;
}

function startGame() {
    betAmount = 'nan';
    playGame = true;
    document.getElementById('bet-amount').disabled = false;
    document.getElementById('bet-button').disabled = false;
    document.querySelector('#bet-button').addEventListener('click', placeBet);
    console.log('Got through loop');
/*    while (isNaN(betAmount) || betAmount > playerMoney || betAmount < 1) {
        // betAmount = prompt(`How much to bet? ${playerMoney} available: `); // Needs to not use "prompt" command, use "Bet" button
        document.querySelector('#bet-button').addEventListener('click', placeBet);
        if (isNaN(betAmount) || betAmount > playerMoney || betAmount < 1) {
            console.log('Please insert valid bet'); // Pop-up rather than console.log
        }
    }
    playerMoney = playerMoney - betAmount;
    diceRoll();
    if (playerNum === 7 || playerNum === 11) {
        console.log('You win'); // Pop-up rather than console.log
        playerMoney = playerMoney + (betAmount * 2);
        playGame = askToPlay();
        return;
    }
    if (playerNum === 2 || playerNum === 3 || playerNum === 12) {
        console.log('You lose'); // Pop-up rather than console.log
        playGame = askToPlay();
        return;
    }
    pointNum = playerNum;
    pointOpen = true;
    while (pointOpen = true) {
        console.log(`Your point is ${pointNum}`);
        diceRoll();
        if (playerNum === 7) {
            console.log('You lose'); // Pop-up rather than console.log
            pointOpen = false
            playGame = askToPlay();
            return;
        }
        if (playerNum === pointNum) {
            console.log('You win'); // Pop-up rather than console.log
            playerMoney = playerMoney + (betAmount * 2);
            pointOpen = false
            playGame = askToPlay();
            return;
        }
    }
    return; */
}
function placeBet() {
    if (playGame === true) {
        betAmount = document.getElementById('bet-amount').value;
        if (isNaN(betAmount) || betAmount > playerMoney || betAmount < 1) {
            console.log('Please insert valid bet'); // Pop-up rather than console.log
            betAmount = 'nan';
            return;
        }
        playerMoney -= betAmount;
        document.getElementById('bet-amount').disabled = true;
        document.getElementById('bet-button').disabled = true;
        document.getElementById('player-money').innerHTML = playerMoney;
    }
    document.getElementById('roll-button').disabled = false;
    return;
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
let playerNum = 0;
let betAmount = 'nan';
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
document.querySelector('#new-game').addEventListener('click', startGame);