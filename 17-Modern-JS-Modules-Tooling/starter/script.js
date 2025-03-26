//back in the days we used to write script in single js file or multiple js files
//but we use modules of separater our features and code
//these modules share data between them and make our code more organized and maintainable
//in module we can include 3rd party module in our code: thousands of packages are there in the npm repositories we can use them in our projects
//npm packages

// Build multiple files and make one js bundle for productions
//older browser does not support module so code thats in a module clould not be executed another reason for better perfomace to send less files in browser
//And bundling process compress our codes

//Transpilling//Polyfilling -> convert all modern JS syntax to old ES5 syntax so that even older browser can understand without breaking.
// this is done by a tool called Babel

//most common build tools available
//these are call js bundlers
//webpack or parcel take out raw js code and transform it in JS bundle
//Babel us transpilling our codes to support older browser

//modules is reusable code in a file
// it has import and export we can export value for other files to use

// in ES 6 js introduces its own module system but previously it was managed by the developer or using some external libraries
//in ES 6 exactly one file for one module

//All top level variable are scropped in module by default and only way of accessing module variable from outside by exporting value from that particular module

//But in script all top level variables are Global thats the difference
//all ES 6 modules executed in scrict mode while script on the other hand executed on slopy mode by default.  Top level 'this' keyword is undefined in ES6 and Scipt window object

//ES 6 import and exampt syntax
//All import are hoisted so no matter where your declare the import it will got at the top during execution of javascript
// to link html page use script type='module'
//

// import { addToCart, shippingCost as sCost } from './shoppingCart.js';
// console.log(shippingCost);
// addToCart('oil', 5);

//These are named export
// import * as ShoppingCart from './shoppingCart.js';
//so this code of imported code will executed first then it will go to its own code
// console.log('importing module');

// console.log(ShoppingCart.shippingCost);
// console.log(ShoppingCart.addToCart('Bread', 50));

//now lets try default export value to import
//default export value can be set as any name during importing
import addShoppingCartValueFromDefaultExport from './shoppingCart.js';

addShoppingCartValueFromDefaultExport('Pizza', 55);

//import has live connection to export if its changes on export file then it will effect on import file as well

//Top level await only works on ES module .mjs, or with type : module during script tag or in package.json

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

console.log('startttttt...');

//async function alwasy return promise it will not return data
const getPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  //   console.log(data);
  return { title: data.at(-1).title };
};

//if we call async fucntion by this time data is not arrived here its a pending promise
// getPost();
//we can use then or top level await in module
getPost().then(x => console.log(x));
// console.log(await getPost());
console.log('Enddd...');

//module patter is achieved by using IFFE function which is ahieved by clousure functions

//COMMON JS module
// NPM repo: All these module that we can use our own code still use the commonJS module system

/* CommonJS (CJS) in JavaScript
CommonJS (CJS) is a module system used in Node.js that allows you to organize and reuse code across files using require and module.exports. */

/* Key Features of CommonJS
✅ Synchronous loading (Modules are loaded at runtime, blocking execution)
✅ Uses require() for importing modules
✅ Uses module.exports or exports for exporting
✅ Works in Node.js but not natively in browsers */

//NPM - Node package manager
// initialize npm: command; npm init
//npm install leaflet
//create a node module folder and download the package their

//its not a good practice so we can use parcel or other package for it
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [{ product: 'pizza' }, { product: 'bread' }],
  user: { loggedIn: true },
};

//if we copy it with Javascript
const stateClone = Object.assign({}, state);
//then its loking same but if we change anything on the main object it will change the copy version of the that object
console.log(stateClone);
const cloneDeepState = cloneDeep(state);
console.log(cloneDeepState);

stateClone.user.loggedIn = false;
console.log(state);

//never share node module folder
// package.json file will install all dependence
// npm install : will download all dependences

// Building with Parcel and npm script
// Parcel is basically a build tool
//Parcel like build tool
/* 1. Webpack
✅ Most popular module bundler
✅ Supports tree shaking, code splitting, and asset optimization
✅ Requires configuration (webpack.config.js)

2. Vite 🔥 (Best for Modern Frontend) 
✅ Super-fast bundling using esbuild
✅ Optimized for modern frontend frameworks (React, Vue, Svelte)
✅ Built-in dev server and HMR (Hot Module Replacement) 

2. Parcel 📦 (Zero-Config Alternative)
✅ Zero configuration (no webpack.config.js)
✅ Fast build times (multi-core processing)
✅ Automatic code splitting & tree shaking
*/

//npm install parcel --save-dev
//dev dependency is basically like a tool that we need to build our application but its not a dependency that we include in our code

//in here we have added parcel locally not globally

/* What is npx?
npx (Node Package eXecute) is a command-line tool that runs Node.js packages without globally installing them. It comes bundled with npm (since npm v5.2.0).

Why use npx?
✅ Run packages without installing them globally
✅ Execute the latest version of a package directly from npm
✅ Useful for one-time commands like scaffolding projects */

//Configuring Babel and polyfyling
//parcel automatically use Babel(Transpiling)
//Babel can only convert ES-6 syntax(like arrow function) not keyword or method like Promise or find() method
//cannnot convert real new syntax that added to ES-6
//For new ES6 freatures and array methods etc. we can Polyfill them
//Babel not polyfilling recently they recommend other library
//They suggest corejs/stable package
//import 'core-js/stable/promise
//import 'core-js/stable/array/find
//for Polyfilling async functions
//import regenrator-runtime/runtime
//Polyfilling: recreate find function and make available to the bundle for replace the actualy find method

/***********************
 *
 * Writting clean and modern Javascript Technique
 *
 ************************/

// -write clean code so that other understand
//functional declarative(using shortest method like built in method to get done ) and imparative(descriptive code)
//Pure function which take parameter and return value which is not depends on other external variables and not mutated external variable
//using map, filter, reduce create brand new array not mutate the existing state of the application
