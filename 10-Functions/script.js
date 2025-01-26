/***********************
 * Author: Md Abul Kalam
 * Topic: JavaScript Functions Advance Syntax and procedure
 ************************/
'use strict';
// How Passing Arguments Works: Values vs. Reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const jonasArray = ['Jonas Schmedtmann', 24739479284];

console.log(jonas);

const tipu = jonas;

tipu.name = 'Tipu Sultan';
console.log(tipu);
//it will print the updated object becuase when we copy objects its not creating new object its just reference the previous object
console.log(jonas);
//same for function when we pass the object as parameters then its just passiing the Reference
const newPassport = function (person) {
  person.passport = person.passport * 2;
};
newPassport(tipu);
console.log(tipu);
console.log(jonas);

//Reference(memory address) works for Array and Object both
console.log(jonasArray);

const tipuArray = jonasArray;
tipuArray[0] = 'Tipu';
console.log(tipuArray);
console.log(jonasArray);

let school = 'Comilla';
let newSchool = school;
newSchool = 'Dhaka';
console.log(school);

const transformerS = function (str) {
  console.log(str);
};
console.log(transformerS.name);

/***********************
 * Function returning functions
 ************************/

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

//shorter version of previous function given below
const greetA = greeting => name => console.log(`${greeting} ${name}`);

const greetHey = greet('Hey');
greetHey('Kalam');

greetHey('Tipu'); //its same as previous
greetA('Hello')('Tipu'); //its same as previous

/***********************
 * call and apply method
 ************************/

const lufthansa = {
  arline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked seat on ${this.arline} flight ${this.iataCode} ${flightNum} `
    );
    this.bookings.push({ flight: `${this.iataCode}-${flightNum}`, name });
  },
};

lufthansa.book('LH445', 'Tipu');

const erowings = {
  arline: 'Erowings',
  iataCode: 'EW',
  bookings: [],
};

//its no longer in the context of lufthansa object method its a copy of that function
const book = lufthansa.book;
//this is a regular function call thats why its not getting the object this context
// book('LH000', 'Kalam');//doest not work

//this keyword will be set to erowings | when we set the first argument to specific object
//call method allow use to manually or explicitly set the this keyword to a function
book.call(erowings, 23, 'Sabina'); //first arg: object and other will be original parameters
console.log(erowings);
// object will look like after calling using the context of erowings
// {
//     "arline": "Erowings",
//     "iataCode": "EW",
//     "bookings": [
//         {
//             "flight": "EW-23",
//             "name": "Sabina"
//         }
//     ]
// }

//Apply method
//exactly the same as call method but difference is it will take the object argument and instead of rest of the other parameters it will take an array
const info = [36, 'Samdani'];
book.apply(erowings, info); //this apply method is not more used in modern javascript instead we have better approach
//doing exact same thing using call
book.call(lufthansa, ...info);
//we have another thing doing same thing that bind method

//Bind Method
//just like call method bind also allow manualy set the this keyword but difference is bind does not call function immediately instead its return a new function where this keyword id bound
//its set whatever value we pass to bind
const bookEW = book.bind(erowings);
console.log(bookEW);
bookEW('5852', 'Abdur Rahim');
console.log(erowings);

//if we want to bind for specific fligh number then we can use BIND
const bookEW23 = book.bind(erowings, 23); //partial applications
bookEW23('Mansura');
bookEW23('Tasnim');
console.log(erowings);
const bookEW23Kalam = book.bind(erowings, 23, 'Abul Kalam');
bookEW23Kalam();

//With EventListener
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

//this keyword will behave on which context the function is calling here context is the document
//so here we need to pass the object which will work as this keyword so we cannot use call as its calling the function immediatly we will use bind which will return a fuctions
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); //if we not bind the lufthansa object then this keyword will be on document context

//Partial Application : means preset parameters
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(300));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.4);
console.log(addVAT2(100));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
console.clear();
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  // This generates [0, 0, 0, 0]. More in the next section 😃
  //task 1
  registerNewAnswer() {
    console.log(this.answers);
    let selected = prompt(`${this.question} \n ${this.options.join('\n')}`);
    selected = Number(selected);
    typeof selected == 'number' &&
      selected < this.options.length &&
      this.answers[selected]++;
    console.log(this.answers);
  },
};

// task 2
const answerPollBtn = document.querySelector('.poll');

answerPollBtn.addEventListener('click', poll.registerNewAnswer.bind(poll));
