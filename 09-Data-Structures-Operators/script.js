/***********************
 * Author: Md Abul Kalam
 * Topic: Destructuring Object, array, Spread operator (...), Rest pattern and Parameters, For .. of loop, Looping objects, Sets, Maps, String methods
 ************************/
'use strict';

//Destructuring array
const arr = [2, 3, 4];

const a = arr[0];
const b = arr[1];
const c = arr[2];

// console.log(a, b, c);

const [x, , z] = arr;

// console.log(x, z);

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
//we can use computed properties in object named index
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
  [`day-${2 + 2}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
console.log(openingHours);

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // openingHours: openingHours, //we can use only openingHours
  openingHours,
  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },
  //we can write function like below
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  //destructuing object in function arguments
  orderDelivery: function ({
    address = 'default address',
    time,
    mainIndex,
    starterIndex,
  }) {
    console.log(
      `Order receieved ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} to ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `You delicious pasta with ingredient : ${ing1}, ${ing2}, ${ing3}`
    );
  },
};

//send single parameter as object to that method
restaurant.orderDelivery({
  time: 20.22,
  address: 'comilla',
  mainIndex: 1,
  starterIndex: 2,
});
/***********************
 *
 * Destructuring array
 *
 ************************/
console.log('-----------Destructuring Array---------------');

let [main, , secondary] = restaurant.categories;

//typical swapping
// let temp = main;
// main = secondary;
// secondary = temp;

//swapping using destructuring
[main, secondary] = [secondary, main]; //we dont need another temporart variable

console.log(main, secondary);

const [starter, mainCourse] = restaurant.order(1, 2);
console.log(mainCourse, starter);

const nested = [2, 4, [5, 6]];

// const [i, , j] = nested;
const [i, , [j, k]] = nested; //nested destructuring value

console.log(i, j, k);

const another = { nameIndex: 1, nameIndex2: 2 };
console.log(nested);
console.log(another);

//default value in destructuring
const [p, q, r, s = 4] = [1, 2, 3];

/***********************
 *
 * Destructuring Objects
 *
 ************************/
console.log('-----------Destructuring Objects---------------');

//we need to use curly braces to destructuring object

//we need to give variable name exactly matched with property name of that object
//as order is not important in object so we dont need to manually skip element which we did in array
// const { name, openingHours, categories } = restaurant;

// console.log(name, openingHours, categories);

//default value and default name of the variable during destructuring object
const { menu = [], starterMenu: starters = [] } = restaurant;

console.log(menu, starters);

let e = 222;
let d = 666;
console.log(e, d);
const obj = { e: 23, d: 43, c: 45 };

// {e, d } = obj; //normally okay but when we start with curly braces then we need a code block to overcome this error;
({ e, d } = obj);

console.log(e, d);

//nested objects

// const {
//   fri: { open, close },
// } = openingHours;

// console.log(open);
//nested object accesing using destructuring
const {
  fri: { open: fo, close: fc },
  sat: { open: so, close: sc },
} = restaurant.openingHours;
console.log('naming');
console.log(fo, fc);
console.log(so, sc);

/***********************
 *
 * Spread operator (...)
 *
 ************************/
console.log('------------Spread operator--------------');

const arrs = [7, 8, 9];

const newExpandedArr = [1, 2, 3, arrs[0], arrs[1], arrs[2]];

console.log(newExpandedArr);

//now using spread operator
const newExpandedArrUsingSpreadOp = [1, 2, 3, ...arrs];
console.log(newExpandedArrUsingSpreadOp);
//spread operator works on below list
//Iterables : arrays, strings, maps, sets, but NOT Objects (obj is not iterables)

const firstName = 'Tipu Sultan';

const latters = [...firstName, 'k', 's'];
console.log(...firstName);
console.log(latters);

// const ingredients = [
//   prompt('Enter ingredient 1 ? '),
//   prompt('Enter ingredient 2 ? '),
//   prompt('Enter ingredient 3 ? '),
// ];
// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

//spread operator works on object event though objects are not iterables

const newResturant = { ...restaurant, newMenu: 'New menu' };

console.log(newResturant);

/***********************
 *
 * Rest pattern and Parameters
 *
 ************************/
console.log('------------ Rest pattern and Parameters--------------');

//SPREAD, becuase on RIGHT side of  =
const arre = [1, 2, 3, ...[3, 4]];
console.log(arre);

//REST , becuase on LEFT side of =
// destructuring array
//rest element must be the last element
const [n, m, ...others] = [1, 3, 4, 6, 7];
console.log(n, m, others);
//same for object // REST patter also works on object

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/
// console.clear();

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals: function (...players) {
    console.log(players);
    console.log(`${players.length} goals were scored`);
  },
};

//task 1
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

//task 2
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

//task 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//task 4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

//task 5
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

//task 6
game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
game.printGoals(...game.scored);

//task 7

//OR condition a akta false hole porertay jabe but jodi jekono akta true hoy tahole oi jaygay short circuit kore stop kore dibe next phase a jabe na
team1 > team2 || console.log('Team 1 is more likely to win');
team1 < team2 || console.log('Team 2 is more likely to win');

//AND condition a akta true hole porer ta check kore eibave last porjonto jabe jodi akta false hoy oi jaygay short circuit hobe and rest of the other will not check
team1 > team2 && console.log('Team 1 is more likely to win');
team1 < team2 && console.log('Team 2 is more likely to win');

/***********************
 * for .. of loop
 ************************/
//loop through our entire menu from the object

const allMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];

console.log(allMenu);

// for (let item of allMenu) {
//   console.log(item);
// }

//if we want index in for of loop its tricky to get that index
console.log(allMenu.entries());

for (let [index, item] of allMenu.entries()) {
  // console.log(`${item[0] + 1}: ${item[1]}`);
  console.log(`${index + 1}: ${item}`);
  // console.log(index, item);
}

//OPTIONAL CHAINNING ( ? ):

console.clear();

restaurant.openingHours.fri.open = 0;
// Nullish: null and undefined (NOT 0 or '')
console.log(restaurant.openingHours.fri?.open ?? 'Fri closed'); //if open variable value is zero(0) then its a problem in this context as 0 is a falsy value
//we can solve this problem by nullish operator which only check null and undefined value
// console.log(restaurant.openingHours.fri?.open || 'closed');

console.log(restaurant.openingHours?.mon?.open || 'closed'); //optional property will return undefined immediately

//optional chainning works on methods
console.log(restaurant.orders?.(1, 2) ?? 'Method does not exists');

//Optional chainning event works in Array
const users = [{ name: 'Tipu', email: 'tipu@gmail.com' }];

//we use the optinal chainning OP with nullish OP almost all the time so get used to it
console.log(users[0]?.name ?? 'User array empty');

// console.log(3 || 'Jonas');
// console.log('' || 'Jonas');
// console.log(undefined || 0 || '' || true || 23 || null);

/***********************
 *
 * Looping Objects
 *
 ************************/
console.clear();
//Object.keys(openingHours) //return array of keys

for (const day of Object.keys(openingHours)) {
  console.log(day);
}

console.log(Object.values(openingHours)); //values only
console.log(Object.entries(openingHours)); //name + values togather //return array

//let [key, { open, close }]  here destructuring array and object at the same time
for (let [key, { open, close }] of Object.entries(openingHours)) {
  console.log(key, open, close);
}

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

//Task 1
for (let [index, scored] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${scored}`);
}

//Task 2
let sum = 0;
// const odds = game.odds;
const oddsEntries = Object.entries(game.odds);
for (let [key, value] of oddsEntries) {
  sum += value;
}
let avg = sum / oddsEntries.length;
console.log(avg);

//Task 3
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
console.clear();
const oddsEntries3 = Object.entries(game.odds);

for (let [key, value] of oddsEntries3) {
  // console.log(key, value);
  let str3 = key === 'x' ? 'Odd of draw ' : `Odd of victory ${game[key]}`;
  console.log(` ${str3} : ${value}`);
}

/***********************
 *
 * SETs
 * also iterables so we can loop through
 ************************/
//sets can hold different data type without eny problems
//all unique value will ve there
const ordersSet = new Set(['Pasta', 'Pizza', 'Ressoto', 'Pizza', 'Pasta']);
console.log(ordersSet); //all duplicates gone with the set

console.log(new Set('Tipu')); //iterables

console.log(ordersSet.size); //order size
console.log(ordersSet.has('Pizza')); //order size //has method is include method like
ordersSet.add('Garlic Bread');
console.log(ordersSet);
ordersSet.delete('Pizza');
console.log(ordersSet);
//retrieve value from set
// ordersSet.clear();
console.log(ordersSet);
//looping is possible others iterables
for (const order of ordersSet) {
  console.log(order);
}

//Use case of sets
// Main use case of set in codebase is to remove duplicates value from the set
//Example
const staff = ['waiter', 'chef', 'waiter', 'manager', 'chef'];
const staffUnique = [...new Set(staff)];

console.log(staffUnique);

/***********************
 *
 * MAPs
 * also iterables so we can loop through
 * is more useful than sets
 *
 ************************/

//maps is a data structure like objects which has keys and values paid
//difference betweek object and map is key can be any type of data

const rest = new Map();
rest.set('name', 'My resturant');
rest.set('location', 'Comilla').set(1, ['Dhaka', 'Khulna']);
console.log(rest);

console.log(rest.get('name'));
console.log(rest.get(1));

const time = 21;

console.log(rest.has('location'));

rest.delete('name');
console.log(rest.size);
// rest.clear();
console.log(rest);

//map iteration

const question = new Map([
  ['question', 'What is the best programming in the world'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again!'],
]); // this kind of array structure is similiar to Object.entries()

console.log(question);

//convert object to MAP
// const hoursMap = new Map(Object.entries(openingHours));

// console.log(hoursMap);
console.log(question.get('question'));

for (const [key, values] of question) {
  // console.log(key, values);
  if (typeof key == 'number') console.log(`Answer ${key}: ${values}`);
}

const answer = 3;

console.log(question.get(question.get('correct') == answer));

console.log(question.entries());
console.log(question.keys());
console.log(question.values());

//convert map to array
console.log([...question]);

//what data structure to use
//Array, Object, Set, Map
//data comes from user interface, from source code, from external sources (APIs), database

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//Task 1
//nique values from game events
const events = [...new Set(gameEvents.values())];
console.log(events);
//Task 2
gameEvents.delete(64);
console.log(gameEvents);
//Task 3
const eventSize = gameEvents.size;
const times = [...gameEvents.keys()].pop();
console.log(times);
console.log(
  `An event happened, on average, every ${times / eventSize} minutes`
);
//Task 4
for (const [index, value] of gameEvents) {
  // console.log(index, value);
  let session = index > 45 ? 'SECOND HALF' : 'FIRST HALF';
  console.log(`[${session}] ${index}: ${value}`);
}

/***********************
 *
 * Working with Strings
 *
 ************************/
console.clear();

const arline = 'tAP air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);
console.log(arline.length);
console.log('B737'.length);

console.log(arline.indexOf('r'));
console.log(arline.lastIndexOf('r'));
console.log(arline.indexOf('Portugal')); //case sensitive if we try with lowwer case then return -1
console.log(arline.slice(4));
console.log(arline.slice(4, 7)); //start, end
console.log(arline.slice(0, arline.indexOf(' ')));
console.log(arline.slice(arline.lastIndexOf(' ') + 1));

console.log(arline.slice(-2));

const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  const s = seat.slice(-1);
  if (s == 'B' || s == 'E') {
    console.log('You got middle seat');
  } else {
    console.log('You got lucky');
  }
  // console.log(s);
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('Kalam'));
console.log(typeof new String('Kalam'));
console.log(typeof new String('Kalam').slice(1));

console.log(arline.toLowerCase());
console.log(arline.toUpperCase());
console.log(arline[0].toUpperCase() + arline.toLowerCase().slice(1));

//comparing emails
const email = 'hello@ojkalam.com';
const loginEmail = 'Hello@ojkalam.com';

const lowerEmail = loginEmail.toLowerCase();
const trimedEmail = loginEmail.trim();

const normalizeEmail = loginEmail.toLowerCase().trim();
console.log(normalizeEmail);
console.log(email == normalizeEmail);

//replcaing
const priceDolar = '288,95$';
const priceEUR = priceDolar.replace('$', 'E').replace(',', '.');
console.log(priceEUR);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

// console.log(announcement.replace('door', 'gate'));
// console.log(announcement.replaceAll('door', 'gate')); //replace method are case sensitive

//REGEX
console.log(announcement.replace(/door/g, 'gate')); //g stand for global

//Boolean
const newPlane = 'A320neo';

console.log(newPlane.includes('A320'));
console.log(newPlane.includes('Boeing'));
console.log(newPlane.startsWith('A3'));
console.log(newPlane.endsWith('neo'));

//practice exercise

const checkBaggege = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('Your are not allowed');
  } else {
    console.log('Your are wellcome');
  }
};
checkBaggege('I have a laptop, knife');
checkBaggege('I have a socks, camera');
checkBaggege('I have a snack, gun');

//split function

console.log('a+very+nice+string'.split('+'));
console.log('Tipu Sultan'.split(' '));
const [fName, lName] = 'Tipu Sultan'.split(' ');
console.log(fName, lName);

console.log(['Mr.', fName, lName.toUpperCase()].join(' '));

const capitalization = function (name) {
  const names = name.trim().split(' ');
  const namesUpper = [];
  console.log(names);

  for (const n of names) {
    namesUpper.push(n[0]?.toUpperCase() + n.slice(1));
  }
  return namesUpper.join(' ');
};
const passenger = 'tipu Sultan kalam';
console.log(capitalization(passenger));

//padding
const message = 'Go to gate 23!';
console.log(message.padStart(25));
console.log(message.padStart(25));
console.log(message.padEnd(25, '+'));

const maskCreditCard = function (number) {
  const srt = number + '';
  const last4 = srt.slice(-4);
  console.log(last4);
  return last4.padStart(25, '*');
};

console.log(maskCreditCard(558228555522285));
console.log(maskCreditCard('54457878787878'));

//repeat method
const message2 = 'Bad weather.. all departures delayed...';

console.log(message2.repeat(10));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'@'.repeat(n)}`);
};

planesInLine(5);
