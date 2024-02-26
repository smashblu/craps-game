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
    while (isNaN(betAmount) || betAmount > playerMoney || betAmount < 1) {
        betAmount = prompt(`How much to bet? ${playerMoney} available: `); // Needs to not use "prompt" command, use "Bet" button
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
    return;
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

function boardClick(num) {
    document.getElementById('clickNum').innerHTML = num;
}

let playerMoney = 100;
let playerRoll = 0;
let pointOpen = false;
let playerNum = 0;
let betAmount = 'nan';
let playGame = false;
const rollDiceButton = document.getElementById('roll-button')
const maxBetInput = document.querySelector('.betamount');
rollDiceButton.addEventListener('click', diceRoll);
maxBetInput.setAttribute('max', playerMoney);
// Create line to invoke game, could be "New Game" button
// playGame = askToPlay();
while (playGame === true) {
    startGame();
}
