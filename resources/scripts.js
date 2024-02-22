function diceRoll(e) {
    console.log("rolled", e.target.textContent);
    let dieOne = getRandomInt(1,7); 
    let dieTwo = getRandomInt(1,7); 
    playerRoll = dieOne + dieTwo;
    document.getElementById("show-roll").innerHTML = `${dieOne} + ${dieTwo} = ${playerRoll}`;
}
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
function boardClick(num) {
    document.getElementById("clickNum").innerHTML = num;
}
let playerRoll = 0;
document.addEventListener("copy", diceRoll);
