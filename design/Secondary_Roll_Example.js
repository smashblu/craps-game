function secRoll(roll) {
  for (let i = 0; i < betList.length; i++) {
    if (betList[i] === 1) {
      if (roll === 7 || roll === 11) {
        console.log(`win because 7/11 on 1st roll on ${i + 1} bet`);
      } else if (roll === 2 || roll === 3 || roll === 12) {
        console.log(`lose because crap on 1st roll on ${i + 1} bet}`);
      } else {
        betList[i] = roll;
      }
    } else {
      if (roll === 7) {
        console.log(`lose because 7 out on ${i + 1} bet`);
      } else if (betList[i] === roll) {
        console.log(`win because matched point on ${i + 1} bet`);
      } else {
        console.log(`no action on ${i + 1} bet`);
        return;
      }
    }
  }
  return;
}

let betList = [6, 8];
let dice = 7;
secRoll(dice);
