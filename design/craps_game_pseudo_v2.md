## Preface

- Version 1:
    - First version of [pseudo code](craps_game_pseudo_v1.md) incorporated logic for a simple craps game
    - The logic assumed a user was in the terminal and used little feedback
    - v1 was to be ported to HTML/JS code in web but ran into issues related to loop checks and user feedback
- Version 2:
    - Will break large functions into several smaller functions

## Function List

### Version 1

1. askToPlay()
    - 
1. startGame()
1. placeBet()
1. boardClick()
1. diceRoll()
1. getRandomInt()

### Version 2

1. newGame()
1. loadGame()
1. gameOver()
1. placeBet()
1. firstRoll()
1. gameRoll()
1. playerWin()
1. playerLose()

## Pseudo Code

```
start
  set variables for
    playerMoney
    playerRoll
    pointOpen?
    playerPoint
    betAmount
    playGame?
  set constants for
    rollButton
    betButton
    clickBoard
  set roll and bet buttons as disabled
  user select "new game" or "load game"
  when clicked "load game"
    loadGame()
  when clicked "new game"
    newGame()
  if playerMoney is 0
    gameOver()
  when clicked betButton
    placeBet()
  when clicked rollButton
    if pointOpen is false
      firstRoll()
    if pointOpen is true
      gameRoll()
stop

loadGame()
  pop up "not enabled yet"
return

newGame()
  set playerMoney to 100
  set pointOpen to false
  set betAmount to 'nan'
  enable betButton
return

placeBet()
  accept input from number box 
  validate input, no non-numbers, can't be more than playerMoney
  set betAmount as number input
  disable bet button
  enable rollButton
return

firstRoll()
  diceRoll()
  output "You rolled $playerRoll"
  if playerRoll is 7 or 11
    playerWin()
  if playerRoll is 2, 3, 12
    playerLose()
  if playerRoll is 4, 5, 6, 8, 9, 10
    set playerPoint (AKA playerNum) to playerRoll
    set pointOpen to true
    output "Your point is $playerPoint"
return

gameRoll()
  diceRoll()
  output "You rolled $playerRoll"
  if playerRoll is playerPoint (AKA playerNum)
    playerWin()
  if playerRoll is 7
    playerLose()
  else
    output "Please roll again"
return

playerWin()
  output "You win"
  set playerMoney += betAmount
  set pointOpen to false
  set betAmount to 'nan'
  disable rollButton
  enable betButton
return

playerLose()
  output "You lose"
  set playerMoney -= betAmount
  set pointOpen to false
  set betAmount to 'nan'
  disable rollButton
  enable betButton
return
```