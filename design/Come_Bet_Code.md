# Come Bets

**Come** and **Place** bets are to be implemented during active points. **Come** bets function similar to starting a new point in the middle of the current point. **Place** bets allow the player to bet on a specific number while the point is open. This document will include pseudocode for these features.

## Pseudocode

- Variables

let chipStack = {};

- Come Function

```
makeCome()
    get betAmount.value
    store chipStack "no point" set
return
```

- New Roll Function

```
for Come:
if diceRoll = 7 || 11, pay come bet and alert
if diceRoll = 2,3,12, delete bet and alert
if diceRoll = 4,5,6,8,9,10, set come as such and alert, place chip on number
```
