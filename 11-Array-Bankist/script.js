/***********************
 * Author: Md Abul Kalam
 * Topic: Bankist App | Use cases of Arrays
 ************************/
'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Try to use every operation using methods so that all logic wrapped up its keep code clean
const displayMovements = function (movements, sort = false) {
  //we cannot change the original array so we should create/copy array to a new array using slice() method
  console.log('movs', movements.slice());

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  containerMovements.innerHTML = '';
  movs.forEach(function (value, index) {
    const type = value > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${value}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html); //use afterbegin instead of beforeend then the order will be changed
  });
};

const calcPrintBalance = function (account) {
  const balance = account.movements.reduce(function (acc, value) {
    return acc + value;
  }, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance} EUR`;
};

const calcDisplaySummery = function (account) {
  const movements = account.movements;
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;
  const outgoings = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => mov + acc, 0);
  labelSumOut.textContent = `${Math.abs(outgoings)} €`;
  // 1.2 percent rate on all deposits
  const interest = movements
    .filter(mov => mov > 0)
    //calculating interest rate on all deposited value
    .map(mov => (mov * account.interestRate) / 100)
    //if any interest value goes below 1 then we will not add that to the calculation
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = interest;
  //chaniing slow the performace and make so we should not perform chaning on large array always we should optimize it
};

//create username and added to all the account object;
const createUsername = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(function (value) {
        return value[0];
      })
      .join('');
  });
};
createUsername(accounts);

const updateUI = function (account) {
  displayMovements(account.movements);
  calcPrintBalance(account);
  calcDisplaySummery(account);
};

//create login to the account
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputLoginUsername.value;
  const userpin = Number(inputLoginPin.value);
  currentAccount = accounts.find(account => {
    return account.username == username;
  });
  if (currentAccount?.pin === userpin) {
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner}`;
    containerApp.style.opacity = 100;
    updateUI(currentAccount);
  }
});

//Transfer balance to ther account
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferToAcc = inputTransferTo.value;
  const transferAmount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === transferToAcc);

  if (
    transferAmount > 0 &&
    receiverAcc &&
    currentAccount.balance >= transferAmount &&
    //same user cannot give acount to themself
    receiverAcc?.username !== currentAccount.username
  ) {
    //doing transfer
    currentAccount.movements.push(-transferAmount);
    receiverAcc.movements.push(transferAmount);
    // update ui
    updateUI(currentAccount);
  }
});

//loan request feature
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    //any movement is greater than 10% of loan amount then granted
    currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    console.log('granted');
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});
//account close feature
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const closeUser = inputCloseUsername.value;
  const closePin = Number(inputClosePin.value);

  if (currentAccount.username == closeUser && currentAccount.pin == closePin) {
    const accountIndex = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.usernamen;
    });
    accounts.splice(accountIndex, 1);
    containerApp.style.opacity = 0;
    inputCloseUsername.value = '';
    inputClosePin.value = '';
  }
  // console.log('acc', accounts);
  //now logout window
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//maximum value
const movementsNew = [200, 450, -400, 3000, -650, -130, 70, 1300];
//Find index Findlastindex and finclast method
console.log(movementsNew.findLast(mov => true)); //last element based on coditions
console.log(movementsNew.findLastIndex(mov => true));
/***********************
 * Some(ES3 1999) and Every (ES5 2009) method
 ************************/
//here only check for Equality
console.log(movementsNew.includes(-130));
//but here checks for any conditons and return boolean true or false
const anyDepposit = movementsNew.some(mov => mov > 0);
console.log(anyDepposit); //return true , false boolean value to like includes method
//Every method is close cousine to some method which check for every element has to be matche with the condition then it will return true other wise false
console.log(
  movementsNew.every(function (mov) {
    return mov < 1000;
  })
);

//end some

/***********************
 * Flat and flatMap method ES2019 introduced
 ************************/
const farr = [
  [1, 2, 3, 4],
  [5, 6, 9, 8],
  [3, 5, 7, 8],
];
//make nested array to a flat array
console.log(farr.flat()); //no callback function
//flat method only flatted array one level deep
const arrDeep = [[[8, 95], 9], 3, 8, farr];
//we can pass parameter to tell how much level(dimension) should broken the array
console.log(arrDeep.flat(2));
//Lets now wants to calculate overall balance from all the account
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
// console.log(accountMovements.reduce((acc, mov) => acc + mov, 0));
console.log(overallBalance);

const overallBalanceFlatMap = accounts
  //flatMap can only go 1 level of array so if we need multi level then should use just flat using method chaning
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceFlatMap);

//end flat
// const max = movementsNew.reduce(function (acc, mov) {
//   if (acc > mov) return acc;
//   else return mov;
// }, movementsNew[0]);
// console.log(max);
//PIPELINE
// const totalDepositsEurToUsd = movementsNew
//   .filter(mov => mov > 0)
//   .map(mov => mov * 1.02)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log('totalDepositsEurToUsd', totalDepositsEurToUsd);
//FIND method :  retrieve element based on conditions
// const firstWithdrawal = movementsNew.find(function (mov) {
//   //will return only the first matched element from the array its will not return array like map, filter, and reduce method
//   return mov < 0;
// });
//Filter return all element that matched the condition as array and FIND only return first matched element from the array
//Filter method return new array but Find method only return element not array

// const findInd = movementsNew.findIndex()
// console.log(firstWithdrawal);
// console.log(accounts);

// const specificAccount = accounts.find(function (acc) {
//   return acc.owner == 'Sarah Smith';
// });
// let specificAccount = [];

// for (const item of accounts) {
//   if (item.owner == 'Sarah Smith') {
//     specificAccount = item;
//     break;
//   }
// }

// console.log(specificAccount);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// currencies.forEach(function (value, key, map) {
//   console.log(value);
//   console.log(key);
//   console.log(map);
// });
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const mov = new Set(movements);
//the foreach method designed so that set does not have key so its just assigning the value parameter to the key parameter
mov.forEach(function (value, undefined, set) {
  //set does not have any key
  console.log(value);
  // console.log(key);
  console.log(set);
});
//////////////////////
//Simple array methods
//////////////////////
let arr = ['a', 'b', 'c', 'd'];
// console.log(arr.slice(2)); //return new array with extracted part of the array
// console.log(arr.slice(2, 3)); //return new array with extracted part of the array
console.log(arr.slice(-1)); //return new array with last element

let newArray = arr; //if crate copy array like this then its not creating a new array instead its just copy the reference to other variable if one variable changes then other will be changed
newArray[0] = 'AA';
console.log(newArray);
console.log(arr);
//we can copy array to other variable using spread operator or slice method without parameter inside slice array
newArray = [...arr];
newArray = arr.slice();
newArray[0] = 'BB';
console.log(newArray);
console.log(arr);
//SPLICE method almost same slice but its change the original array
// console.log(arr.slice(1));
//Splice method change the original array
// console.log(arr.splice(1)); //showing extracted elements
// console.log(arr); //extracted elements are gone from original array
// arr.splice(-1); //remove last element from array then original array will be remain without the last element
// console.log(arr);
//array.splice(index, count, item1, ....., itemX)
// console.log(arr.splice(1, 2));
let randonArr = ['b', 'd', 'c', 'a'];
console.log(randonArr.reverse()); //reverse method change the original array
console.log(randonArr);
//CONCAT
let arr2 = ['t', 'y'];
const letters = randonArr.concat(arr2);
console.log(letters);
console.log(randonArr); //concat method does not mutated

arr.at(-1); //get the last element of an array //ES 2022 //also works on strings
arr.slice(-1)[0];
arr[arr.length - 1];
//JOIN method
console.log(randonArr.join(',')); //return strings

//Looping array
console.log(randonArr);
//break and continue do not work in forEach Loop so use for of loop if you need those features on your applications
randonArr.forEach(function (value, index, originalArray) {
  console.log(value);
  console.log(index);
  console.log(originalArray);
});


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.02;

 ///////////////////////////
//Map , filter, reduce method
/////////////////////////////

//map method similiar to forEach method difference is map create brand new array based on original array
const movementUsd = movements.map(value => value * eurToUsd);
//we can achieve this using for of loop as well
const moveUSD = [];
for (const item of movements) moveUSD.push(item * eurToUsd);
console.log(movements);
console.log(movementUsd);
console.log(moveUSD);

//filter method filters on original array which satisfy a certain condition //make new filtered array
const deposit = movements.filter(function (value, index) {
  return value > 0;
  // console.log(value);
});
console.log(deposit);

//reduce method reduce boils all array elements down to one single value (eg. adding all elements together)
console.log(movements);
//accumulator -> SNOWBALL
const balance = movements.reduce(function (accumulator, curValue) {
  // console.log(accumulator, curValue, i);
  // console.log(accumulator);
  return accumulator + curValue;
}, 0); //accumulator initial value assign
console.log(balance);
console.log(movements);
*/
/////////////////////////////////////////////////
///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 10,
    activities: ['agility', 'fetch'],
  },
];

// console.clear();

//task 1
const huskyWeight = breeds.find(bd => bd.breed == 'Husky').averageWeight;
console.log('task 1', huskyWeight);

//task 2
const dogBothActivities = breeds.find((bd, index, arr) => {
  return bd.activities?.includes('fetch') && bd.activities?.includes('running');
});
console.log(dogBothActivities.breed);

//this soluation is for many dog but in the task ask about only dog
// const dogBothActivities = breeds.filter((bd, index, arr) => {
//   return bd.activities?.includes('fetch') && bd.activities?.includes('running');
// });
// dogBothActivities.map(function (dogBothActivitieBreed) {
//   console.log('task 2', dogBothActivitieBreed.breed);
// });

//task 3
// console.log(breeds);
const allActivities = breeds.map(bd => bd.activities).flat();
console.log('task 3', allActivities);

//task 4
const uniqueActivities = [...new Set(allActivities)];
console.log('task 4', uniqueActivities);

//task 5

let swimmingAdjacent = breeds
  .filter(function (bd) {
    return bd.activities?.includes('swimming');
  })
  .flatMap(bd => bd.activities)
  .filter(activities => activities != 'swimming');

// let swimmingAdjacent2 = breeds
//   .filter(function (bd) {
//     return bd.activities?.includes('swimming');
//   })
//   .map(bd => bd.activities);
// console.log([...swimmingAdjacent2]); //instead of flat method we can use SPRED operator

swimmingAdjacent = [...new Set(swimmingAdjacent)];
console.log('task 5', swimmingAdjacent);

//task 6
console.log(breeds.every(bd => bd.averageWeight >= 10));

//task 7
console.log(breeds.some(bd => bd.activities?.length >= 3));

//Bonus
const heaviestBreads = breeds
  .filter(bd => bd.activities?.includes('fetch'))
  .map(bd => bd.averageWeight);
// console.log(...heaviestBreads);
console.log(Math.max(...heaviestBreads));

/***********************
 * Sorting Arrays
 ************************/
const owners = ['Tipu', 'Kalam', 'Sabina', 'Samdani'];
//sort method by default works with strings its not sorting number just alphabetically
console.log(owners.sort()); //mutated the original array
console.log(owners);

//return < 0, A, B
//return > 0, B, A
//a, b as parameter
console.log(movementsNew);
//Sorting number in assending order and dessending order
console.log(
  movementsNew.sort(function (nextValue, currentValue) {
    // console.log(currentValue);
    // console.log(nextValue);
    // console.log('');

    //this logic for assending order
    if (nextValue > currentValue) return 1; //switch order to return 1
    if (currentValue > nextValue) return -1; //keep order to return -1

    //this logic for dessending order
    // if (nextValue > currentValue) return -1; //keep order to return -1
    // if (currentValue > nextValue) return 1; //switch order to return 1
  })
);
console.log('shorcut sorting number');

console.log(
  movementsNew.sort((nextValaue, currentValue) => nextValaue - currentValue)
);

console.log(
  movementsNew.sort((nextValaue, currentValue) => currentValue - nextValaue)
);
//IF we have mixed array string and number togather then this sorting method will not work -> not use sort method
