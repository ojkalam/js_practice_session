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
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (value, index) {
    const type = value > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">4 000€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html); //use afterbegin instead of beforeend then the order will be changed
  });
};
displayMovements(account1.movements);

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

const calcPrintBalance = function (accounts) {
  accounts.forEach(function (account) {
    account.balance = account.movements.reduce(function (acc, value) {
      return acc + value;
    }, 0);
  });
};
calcPrintBalance(accounts);

console.log('accounts', accounts);
//maximum value
const movementsNew = [200, 450, -400, 3000, -650, -130, 70, 1300];
const max = movementsNew.reduce(function (acc, mov) {
  if (acc > mov) return acc;
  else return mov;
}, movementsNew[0]);
console.log(max);

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
//Simple array methods
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

*/
// console.clear();
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.02;

//Map , filter, reduce method

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

/////////////////////////////////////////////////
