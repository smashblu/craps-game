function diceRoll() {
    let dieOne = getRandomInt(1,7); 
    let dieTwo = getRandomInt(1,7); 
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
const rollDiceButton = document.getElementById('rollbutton')
const maxBetInput = document.querySelector('.betamount');
rollDiceButton.addEventListener('click', diceRoll);
maxBetInput.setAttribute('max', playerMoney);
