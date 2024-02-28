// @ts-check

// Use JSDoc annotations for type safety
/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").Operation} Operation
 */

/**
 * @type {FunctionRunResult}
 */

const NO_CHANGES = {
  operations: [],
};

/**
 * The configured entrypoint for the 'purchase.delivery-customization.run' extension target
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  //const cust = input.cart.buyerIdentity.customer; 
  //
  var hide = false; 
  const buyeridentity = input.cart.buyerIdentity;
  if(!buyeridentity){
    var hide = true;
  }else{
    const customer = input.cart.buyerIdentity.customer;
  if (!customer) {
    var hide = true;
  }
  else{
    const b2b = input.cart.buyerIdentity.customer.b2b;
    if (!b2b) {
      var hide = true;
    }
  }
}
  console.error(hide);
  if(hide == true){
    const expressDeliveryOption = input.cart.deliveryGroups
      .flatMap((group) => group.deliveryOptions)
      .find((option) => option.title === 'Standard');

    if (expressDeliveryOption) {
      const operations = /** @type {Operation} */ ({
        hide: {
          deliveryOptionHandle: expressDeliveryOption.handle,
        },
      });
      return {
        operations: [operations], // Operations should be an array
      };
    } else {
      // Handle the case when "Express" delivery option is not found
      // For example:
      return NO_CHANGES; // Return a default value indicating no changes
    }
  } else {
    // Handle the case when no oversized product is found
    // For example:
    return NO_CHANGES; // Return a default value indicating no changes
  }
  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
}
