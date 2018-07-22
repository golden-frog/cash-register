/*jshint esversion: 6 */

function checkCashRegister(price, cash, cid) {

  // Declare necessary bindings
  const CURRENCIES = [["ONE HUNDRED", 100], ["TWENTY", 20], ["TEN", 10], ["FIVE", 5], ["ONE", 1], ["QUARTER", 0.25], ["DIME", 0.1], ["NICKEL", 0.05], ["PENNY", 0.01]];

  const CHANGE = {
    status: "INSUFFICIENT_FUNDS",
    change: []
  };

  let changeDue = cash - price;

  let amountCID = calculateAmount(cid);
  function calculateAmount(cid) {
    let total = 0;
    for (let i = 0; i < cid.length; i++) {
      total += cid[i][1];
    }
    return total;
  }

  // amountCID < changeDue

  if (amountCID < changeDue) {
    return CHANGE;
  }

  // amountCID == changeDue

  if (amountCID == changeDue) {
    CHANGE.status = "CLOSED";
    CHANGE.change = cid;
    return CHANGE;
  }

  // amountCID > changeDue
  cid = cid.reverse();
  let changeArray = [];

  for (let i = 0; i < CURRENCIES.length; i++) {
    let amount = 0;
    while (cid[i][1] > 0 && changeDue >= CURRENCIES[i][1]) {
      changeDue -= CURRENCIES[i][1];
      cid[i][1] = cid[i][1] - CURRENCIES[i][1];
      amount += CURRENCIES[i][1];
      changeDue = Math.round(changeDue * 100) / 100;
    }
    if (amount > 0) {
      changeArray.push([CURRENCIES[i][0], amount]);
    }
  }

  if (changeDue > 0) {
    return CHANGE;
  } else {
    CHANGE.status = "OPEN";
    CHANGE.change = changeArray;
    return CHANGE;
  }

}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
