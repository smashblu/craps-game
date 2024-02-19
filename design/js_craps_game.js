function startGame() {
    let playerNum = 0;
    betAmount = prompt(`How much to bet? ${playerMoney} available: `);
    if (betAmount > playerMoney) {
        console.log('Not enough available');
        play = prompt('Start game? [y/n]: ');
        return;
    }
    else {
        playerMoney = playerMoney - betAmount;
        rollDice();
        // playerNum = 6;
        if (playerNum === 7 || playerNum === 11) {
            console.log('You win');
            playerMoney = playerMoney + (betAmount * 2);
            play = prompt('Start game? [y/n]: ');
            return;
        }
        else if (playerNum === 2 || playerNum === 3 || playerNum === 12) {
            console.log('You lose');
            play = prompt('Start game? [y/n]: ');
            return;
        }
        else {
            pointNum = playerNum;
            pointOpen = true;
            while (pointOpen = true) {
                console.log(`Your point is ${pointNum}`);
                rollDice();
                // playerNum = 6
                if (playerNum === 7) {
                    console.log('You lose');
                    pointOpen = false
                    play = prompt('Start game? [y/n]: ');
                    return;
                }
                else if (playerNum === pointNum) {
                    console.log('You win');
                    playerMoney = playerMoney + (betAmount * 2);
                    pointOpen = false
                    play = prompt('Start game? [y/n]: ');
                    return;
                }
            }
            return;
        }
    }
    play = prompt('Start game? [y/n]: ');
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
let betAmount = 0
let play = 'n';
play = prompt('Start game? [y/n]: ');
while (play === 'y' || play === 'Y') {
    startGame();
}
console.log('Goodbye');
