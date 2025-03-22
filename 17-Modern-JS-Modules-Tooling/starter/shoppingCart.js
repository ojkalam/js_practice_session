console.log('exporting module');

const shippingCost = 10;
const cart = [];
//named export and default exports
//named inports is actually the simplest way of exporting something from a module
//becuase all we have to do is to put export in front of anything that we might want to export

// const addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// };
// //
// export { addToCart, shippingCost };

//export default is only one to export one thing per module
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
