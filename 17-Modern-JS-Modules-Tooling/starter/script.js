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

addShoppingCartValueFromDefaultExport('kalam', 55);

//import has live connection to export if its changes on export file then it will effect on import file as well
