```
start
  set playerMoney to 100
  start game y/n
    if y
      game()
    endif
stop

game()
  input bet amount
  if betAmount > playerMoney
    "not enough"
  else
  playerMoney = playerMoney - betAmount
  rollDice()
  if playerNum = 7
    output "win"
    playerMoney = playerMoney + (betAmount * 2)
    return
  elseif playerNum = 2, 3, 12
    output "lose"
    return
  else
    pointNum = playerNum 
    pointOpen = true
    while pointOpen = true
      rollDice()
      if playerNum = 7
        output "lose"
        pointOpen = false
        return
      elseif playerNum = pointNum
        output "win"
        pointOpen = false
        return
      else
        pointOpen = true
    endwhile
    start game y/n
return

rollDice()
  get two random numbers between 1 and 6
  add both numbers
  playerNum = sum of both numbers
return
```
