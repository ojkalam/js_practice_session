'use strict';
const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

// const spendingLimits = Object.freeze({
//   jonas: 1500,
//   matilda: 100,
// });
//freez only freez first level item of object not nested object
//freez make object immutable

// Pure function take parameter and it return new paramter value which is mutate the outside variable
const addExpence = function (value, description, user = 'jonas') {
  user = user.toLowerCase();
  // const limit = spendingLimits?.[user] ? spendingLimits[user] : 0;
  const limit = spendingLimits?.[user] ?? 0; //nulllis coalision
  if (value <= limit) {
    budget.push({ value: -value, description: description, user: user });
  }
};

addExpence(10, 'Pizza 🍕');
addExpence(100, 'Going to movies 🍿', 'Matilda');
addExpence(200, 'Stuff', 'Jay');
console.log(budget);

const checkExpence = function () {
  for (let el of budget) {
    let lim;
    if (spendingLimits[el.user]) {
      lim = spendingLimits[el.user];
    } else {
      lim = 0;
    }

    if (el.value < -lim) {
      el.flag = 'limit';
    }
  }
};
checkExpence();

console.log(budget);

const bigExpenses = function (limit) {
  let output = '';
  for (let el of budget) {
    if (el.value <= -limit) {
      output += el.description.slice(-2) + ' / '; // Emojis are 2 chars
    }
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

bigExpenses(1000);

//functional declarative
