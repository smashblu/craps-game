function askToPlay() {
    if (playerMoney === 0) {
        console.log('You are out of money')
        return false;
    }
    let play = prompt('Start game? [y/n]: ');
    if (play === 'y' || play === 'Y') {
        return true;
    }
    return false;
}
function startGame() {
    betAmount = 'nan';
    while (isNaN(betAmount) || betAmount > playerMoney || betAmount < 1) {
        betAmount = prompt(`How much to bet? ${playerMoney} available: `);
        if (isNaN(betAmount) || betAmount > playerMoney || betAmount < 1) {
            console.log('Please insert valid bet');
        }
    }
    playerMoney = playerMoney - betAmount;
    rollDice();
    if (playerNum === 7 || playerNum === 11) {
        console.log('You win');
        playerMoney = playerMoney + (betAmount * 2);
        playGame = askToPlay();
        return;
    }
    if (playerNum === 2 || playerNum === 3 || playerNum === 12) {
        console.log('You lose');
        playGame = askToPlay();
        return;
    }
    pointNum = playerNum;
    pointOpen = true;
    while (pointOpen = true) {
        console.log(`Your point is ${pointNum}`);
        rollDice();
        if (playerNum === 7) {
            console.log('You lose');
            pointOpen = false
            playGame = askToPlay();
            return;
        }
        if (playerNum === pointNum) {
            console.log('You win');
            playerMoney = playerMoney + (betAmount * 2);
            pointOpen = false
            playGame = askToPlay();
            return;
        }
    }
    return;
}
function rollDice() {
    let dieOne = getRandomInt(1,7);
    let dieTwo = getRandomInt(1,7);
    playerNum = dieOne + dieTwo;
    return;
}
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
let playerMoney = 100;
let pointOpen = false;
let playerNum = 0;
let betAmount = 'nan';
let playGame = false;
playGame = askToPlay();
while (playGame === true) {
    startGame();
}
console.log('Goodbye');