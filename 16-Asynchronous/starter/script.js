'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

console.log('writting....');
//Asynchronous function setTimeout()
setTimeout(function () {
  console.log('writting for 5 second....');
}, 5000);

//alert is a synchronous function which block other code to execute
//Asyn is a non-blocking code

console.log('writting finished');

/* const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://restcountries.com/v3.1/name/' + country);
  request.send();
  // console.log(request.responseText);
  request.addEventListener('load', function () {
    console.log(JSON.parse(this.responseText));

    const [data] = JSON.parse(this.responseText);

    const html = `<article class="country">
              <img class="country__img" src="${data.flags.png}" />
              <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  data.population / 1000000
                ).toFixed(1)} Milion</p>
                <p class="country__row"><span>🗣️</span>${data.languages.ben}</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies.BDT?.name
                }</p>
              </div>
            </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
}; */

// getCountryData('bangladesh');
// getCountryData('india');

/* const getCountryAndNeighbourData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://restcountries.com/v3.1/name/' + country);
  request.send();
  // console.log(request.responseText);
  request.addEventListener('load', function () {
    console.log(JSON.parse(this.responseText));

    const [data] = JSON.parse(this.responseText);

    const html = `<article class="country">
              <img class="country__img" src="${data.flags.png}" />
              <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  data.population / 1000000
                ).toFixed(1)} Milion</p>
                <p class="country__row"><span>🗣️</span>${data.languages.ben}</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies.BDT?.name
                }</p>
              </div>
            </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;

    const neighbourData = data.borders;

    //Callback Hell:: when lots of nested callbacks in order to execute asynchronous task in sequence
    const requestNeighbour = new XMLHttpRequest();
    requestNeighbour.open(
      'GET',
      `https://restcountries.com/v3.1/alpha/${neighbourData[0]}`
    );
    requestNeighbour.send();
    requestNeighbour.addEventListener('load', function () {
      console.log('neighboaur', JSON.parse(this.responseText));
      const [data] = JSON.parse(this.responseText);

      const html = `<article class="country neighbour">
                <img class="country__img" src="${data.flags.png}" />
                <div class="country__data">
                  <h3 class="country__name">${data.name.common}</h3>
                  <h4 class="country__region">${data.region}</h4>
                  <p class="country__row"><span>👫</span>${(
                    data.population / 1000000
                  ).toFixed(1)} Milion</p>
                  <p class="country__row"><span>🗣️</span>${
                    data.languages.ben
                  }</p>
                  <p class="country__row"><span>💰</span>${
                    data.currencies.BDT?.name
                  }</p>
                </div>
              </article>`;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
    });
  });
};

getCountryAndNeighbourData('bangladesh');

setTimeout(function () {
  console.log('1 second passed');
  setTimeout(function () {
    console.log('1 second passed');
    setTimeout(function () {
      console.log('1 second passed');
      setTimeout(function () {
        console.log('1 second passed');
        setTimeout(function () {
          console.log('1 second passed');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000); */

//callback hell makes triangle shape
//difficult to understand this type of code
//SO ES 6 Promise introduced to escaping callback hell

/***********************
 *
 * Promise: An object that is used as a placeholder for the future reult of an asynchronous operation
 *
 ************************/

//ES6 fetch, promise

// const requests = fetch('https://restcountries.com/v3.1/name/portugal');
//fetch function immediately return a promise
// console.log(requests);

//Promises is time sensitive: works with asynchoronous operation: so they change overtime: they can on different state

//pending -> doing background task ->  settled(has finished) (fullfilled, rejected promise)

// fullfilled = success
// Rejected = an error occured

//Build promise ->  Consume a promise when we already have promise

// const requests = fetch('https://restcountries.com/v3.1/name/portugal');

const renderCountry = function (data, neighboaur = '') {
  const html = `<article class="country ${neighboaur}">
                <img class="country__img" src="${data.flags.png}" />
                <div class="country__data">
                  <h3 class="country__name">${data.name.common}</h3>
                  <h4 class="country__region">${data.region}</h4>
                  <p class="country__row"><span>👫</span>${(
                    data.population / 1000000
                  ).toFixed(1)} Milion</p>
                  <p class="country__row"><span>🗣️</span>${
                    data.languages.ben
                  }</p>
                  <p class="country__row"><span>💰</span>${
                    data.currencies.BDT?.name
                  }</p>
                </div>
              </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};
const getCountryFetch = function (country) {
  //handle fullfilled promise with then
  fetch('https://restcountries.com/v3.1/name/' + country)
    /* .then(function (response) { 
      //this will return another promise
      //json also a asyn function which return promise
      return response.json();
    }) */
    //first callback method in then method for fullfilled promose and second call back method will be rejected promise which is during internet off
    .then(
      response => {
        if (!response.ok) throw new Error('Country not found'); //will immediately terminate the promise and goto catch block with error
        return response.json();
      }
      //error => console.log(error) //handling rejected error
    )
    .then(data => {
      renderCountry(data[0]);
      console.log('data', data);
      const neighboaur = data[0].borders[0];
      console.log(neighboaur);
      if (!neighboaur) return;
      return fetch('https://restcountries.com/v3.1/alpha/' + neighboaur);
    })
    .then(
      response => response.json()
      //error => console.log(error)
    )
    .then(data => renderCountry(data[0], 'neighbour'))
    //any error in anywhere will be cought
    //handle error is a important in promises
    .catch(error => console.log(error)) //catch also return a promise
    //finally method will be alwasys called whether the promise success or rejected
    .finally(() => {
      //not always usefull... will be called always no matter the result of the promise
      //one good example is to stop the spinner in loading
      countriesContainer.style.opacity = 1;
    });

  /* .then(function (data) {
      console.log('data', data);
      renderCountry(data[0]);
    }); */
};

btn.addEventListener('click', function () {
  getCountryFetch('bangladesh');
});

//this will not reject so we need to manually handle this error message under fullfilled promise
// getCountryFetch('sdfsdf');

//////////////Event loop in practice
console.log('Test start'); //sync process

//task in callback queue
setTimeout(() => console.log('0 second timer'), 0); // 0 second
//both the timer and promise will be finised exact same time

//task in microtask queue
Promise.resolve('Resolved promise 1').then(res => console.log(res)); //immediately resolved
//call back from promise will be in micro task queue thats why it will take into callstak a high priority basis and print log

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 100; i++) {}
  console.log(res);
});

console.log('Test end'); ////sync process first will print

//we know consuming promize

//now will work about bulding promise

//CREATE Promise
//its contains executor function which has two parameter resolve, reject
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      //will be found in then method
      resolve('You Win $$$'); //this function will mark this function a resolved
    } else {
      //will be found in catch method
      reject(new Error('You lost your money'));
    }
  }, 2000);
});

//Consume promise
lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

//promisifying  setTimeout
const wait = function (second) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, second * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 second');
    return wait(1);
  })
  .then(() => console.log('waited for 1 second'));

//async function keep running in the background and perform code inside it and it return a promise
//inside async function we can have one or more await statement
//async function not blocking the call stack or main thread

//we will learn how to handle error with ASYNC and AWAIT
// becuase in promise we can use catch but in here we cannot do that so we need to use try and catch , finally block of js which in introduced in js
//Try catch in JavaScript since ECMAScript 3 (ES3), which was standardized in 1999
const whereAmI = async function (country) {
  //await keyword will stop the code execution until the promise is fullfilled , untill the data fetched

  //async await simply syntactic sugar over the then method and promises behind the sche we are using promises
  //similiar to then method
  try {
    const countryData = await fetch(
      'https://restcountries.com/v3.1/name/' + country
    );
    if (!countryData.ok)
      throw new Error('Trying to get data but failed try again');
    // console.log(countryData.json());
    // json() return a new promise so thats why we need to use another await
    const data = await countryData.json();
    console.log(data);
    return ['nnn', ...data];
  } catch (error) {
    console.log(error);
    //Reject promise returned from async function
    //its someting returning the error to async function using throwing the error again
    throw error;
  }
};

// whereAmI('bangladesh');
//return data from async function
// const datas = whereAmI('bangladesh'); // it will return promise
// console.log('Promise');
// console.log(datas); //async function return promise
// //mixing asyn await and 'then' promise ..we can get rid it from it
// datas.then(a => console.log(a)).catch(err => console.log('BAN: ' + err));
// console.log('Kalam');

//we cannot use await outside of async function so we can use IIF (Immediately invoked function to get that done)
(async function () {
  try {
    //return data from async function and how handle that data
    const returnedData = await whereAmI('bangladesh');
    console.log(returnedData);
  } catch (err) {
    console.log('BAN: ' + err);
  }
})();

/***********************
 *
 * Running promise in parallel
 *
 ************************/

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

const getJSON = function (c) {
  return fetch(c).then(data => data.json());
};
const get3countries = async function (c1, c2, c3) {
  try {
    //all ajax call one after another even though results of these three are not depends on each other so we need to run a paralle promise here
    // const c1data = await getJSON('https://restcountries.com/v3.1/name/' + c1);
    // const c2data = await getJSON('https://restcountries.com/v3.1/name/' + c2);
    // const c3data = await getJSON('https://restcountries.com/v3.1/name/' + c3);
    // console.log(c1data);
    // console.log(c2data);
    // console.log(c3data);
    //we can use promise.all() to get rid of this problem
    console.log('allData');
    //it will run all ajax call at the same time which will help to make the code faster a they all endpoints are not depends on each other
    const allData = await Promise.all([
      getJSON('https://restcountries.com/v3.1/name/' + c1),
      getJSON('https://restcountries.com/v3.1/name/' + c2),
      getJSON('https://restcountries.com/v3.1/name/' + c3),
    ]);
    //one things need to mention here if one of the promise rejects then whole promise will be rejected so this a one kind of problem
    console.log('allData');
    console.log(allData);
  } catch (e) {
    console.log(e);
  }
};

get3countries('bangladesh', 'india', 'pakistan');

//Pomise.race() receive array of promise and return one result
(async function () {
  //it will return and fullfilled the promise which will be exected and return value first
  //only get one result not an array
  const res = await Promise.race([
    getJSON('https://restcountries.com/v3.1/name/iran'),
    getJSON('https://restcountries.com/v3.1/name/fiji'),
    getJSON('https://restcountries.com/v3.1/name/portugal'),
  ]);
  console.log('res');
  console.log(res);
})();

const timeout = function (e) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Rejected promise'));
    }, 1000);
  });
};

Promise.race([
  timeout(),
  getJSON('https://restcountries.com/v3.1/name/iran'),
]).then(data => console.log(data));

// ES 2020
// Promise.allSettled(); //array of promise and return all promise either sattles or rejected

//ES 2021
Promise.any(); //takes array of promise and return  only resolved promise

//All Promise combinators ends here
