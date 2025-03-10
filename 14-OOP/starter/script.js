'use strict';

//Constructor function and new operator : its a pattern develop by other developers work like OOP

// regular function and Constructor function almost similiar only difference is using new keyword

//convension of camel case for constructor function and and cannot use arrow function becuase it does not have own this keyword
const Person = function (firstName, birthYear) {
  //instance properties
  console.log(this);
  this.firstName = firstName;
  this.lastName = 'Sultan';
  this.birthYear = birthYear;
  //never create method inside constructor function instead we are going to use prototype inheritence
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const person = new Person('Tipu', 1996);
//1. New {} (object) is created
//2. function is called, this={}
//all is happening as we are calling the function using new keyword
//3. {} is linked to prototype
//4. function automatically return {}
console.log(person);

const jack = new Person('jack', 1885);

console.log(jack instanceof Person);

/***********************
 * Prototype : each and every function automatically have a property called prototype
 ************************/

// console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
console.log(Person.prototype);

person.calcAge(); // not find calcAge function directly to person object instead its availale in Prototype
jack.calcAge();

console.log(jack.__proto__);
console.log(jack.__proto_ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jack));
console.log(Person.prototype.isPrototypeOf(person));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';

console.log(jack.species, person.species);

console.log(jack.hasOwnProperty('firstName'));
console.log(jack.hasOwnProperty('species')); //return false becuase its not directly created those property

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at speed ${this.speed} k/m`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at speed ${this.speed} k/m`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();

mercedes.accelerate();
mercedes.accelerate();
mercedes.brake();
mercedes.accelerate();

console.log('----------------------END of Protype-----------------');

//ES 6 : Classes
// allowing same thing using mordern syntax
//class expression
const PersonClEx = class {};
//class declaration:we will use this declaration most of the time
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //all method written outside the constructor will be on the prototype of objects not on the object themselves same as previous prototypal inheritence
  //method will be added to protype property
  //or we can manually add method to protype
  calcAge() {
    console.log(`Age is : ${2025 - this.birthYear}`);
  }

  get age() {
    return 2036 - this.birthYear;
  }

  //both the setter method and constructor method trying to set exact same property name
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert('Thisi is not full name');
  }

  //Static method are not available in the instance like tipu instead its on base Person
  static hey() {
    console.log(this);
    return this._fullName;
  }
}

PersonCl.prototype.printName = function () {
  console.log(`My name is: ${this._fullName}`);
};

const tipu = new PersonCl('Tipu Sultan', 1995);
const sabina = new PersonCl('sabina ', 2003);

console.log(tipu);
console.log(tipu.age);

tipu.calcAge();
tipu.printName();
sabina.printName();
sabina.calcAge();

console.log(PersonCl.hey());
//1. Classes are not Hoisted
//2. Class are first-class citizens (meaning we can pass them into function and return them from the function.. classes are special function behind the scene)
//3. Classses are executed in strict mode
// Class are exact similiar to prototypal inheritence which actually hide that details and give new syntax

//Getter and Setter

const account = {
  owner: 'Tipu',
  movements: [200, 25, 10, 880],
  //we can transform the method using get keyword to a getter
  get latest() {
    return this.movements.slice('-1').pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 50;

console.log(account.movements);

//classes all have settter and getter which works exact same way

//Object.create similiar to prototype inherietence

const PersonProto = {
  calcAge() {
    console.log(`Age is : ${2025 - this.birthYear}`);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const staven = Object.create(PersonProto);
console.log(staven);
staven.name = 'Tipu';
staven.birthYear = 2002;

const sarah = Object.create(PersonProto);
sarah.init('Kalam', 1997);
sarah.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
console.log('--------------// Coding Challenge------------------');

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at speed ${this.speed} k/m`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at speed ${this.speed} k/m`);
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('FORD', 120);

ford.accelerate();
ford.accelerate();
ford.brake();
console.log(ford.speedUS);
ford.speedUS = 50;
ford.accelerate();

/***********************
 *
 * Real inheritence in classes
 *
 ************************/
const PersonInh = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonInh.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
const personInh = new PersonInh('Tipu', 1996);

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  // Person(firstName, birthYear); //this is regular function call where this is undefined
  //inheritence example
  PersonInh.call(this, firstName, birthYear); //call function with context this
  //////////////////////////this above part of the code here is simply copy of the person function code //duplicate code
  this.course = course;
};

//linking prototypes
Student.prototype = Object.create(PersonInh.prototype);

Student.prototype.introduce = function () {
  console.log(
    `I am ${this.firstName} and age: ${2025 - this.birthYear}, Course: ${
      this.course
    }`
  );
};

const mike = new Student('Mike', 1992, 'Computer Science');

console.log(Student.prototype);

mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof PersonInh);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// ES 6 Class synctax inheritence

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //super is constructor function of parent class (PersonCl)
    //(super) needs to happen first -> its creating the sub class this keyword
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(
      `I am ${this._fullName} and age: ${2025 - this.birthYear}, Course: ${
        this.course
      }`
    );
  }
}

const std = new StudentCl('Tipuuu Sultaannm', 1998, 'Math');

std.introduce();

const PersonProtoAnother = {
  calcAge() {
    console.log(`Age is : ${2025 - this.birthYear}`);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const staveen = Object.create(PersonProtoAnother);
console.log(staveen);

const studentProto = Object.create(PersonProtoAnother);

// studentProto.init('Smith', 1895, 'English');

studentProto.init = function (firstName, birthYear, course) {
  PersonProtoAnother.init.call(this, firstName, birthYear);
  this.course = course;
};

const smith = Object.create(studentProto);
smith.init('Smith ', 1895, 'English');

console.log(smith);

/////////////////////////////////

class Account1 {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.lagnguage;
    console.log(`Thank for opening an account , ${owner}`);
  }

  //these are the public interface of our object depoisit and withdraw
  //public interface to communicate (API)
  deposit(val) {
    this.movements.push(val);
    return this; //is for chaning movement
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }
  //not chainable
  approveLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log('Loan Appproved');
    }
    return this;
  }
}

const acc1 = new Account1('Tipu', 'USD', 1111);

console.log(acc1);
acc1.deposit(250);
acc1.withdraw(10);
acc1.requestLoan(150);

//channing method
acc1.deposit(250).withdraw(10).requestLoan(50);
console.log(acc1);

//Encapsulation make private method and property for data privacy prevental

//Private class  Fields and Method
//JS is prototype based language not class type language

//private field using # hash symbol
// before property and method use # thats it
