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
  const b2b = input.cart.buyerIdentity.customer.b2b;

  if (b2b) {
      const hidePaymentMethod = input.paymentMethods
      .find(method => method.name.includes("Klarna - Flexible payments"));
  
    if (!hidePaymentMethod) {
      return NO_CHANGES;
    }
    if (hidePaymentMethod) {
      const operations = /** @type {Operation} */ ({
        hide: {
        paymentMethodId: hidePaymentMethod.id
      }
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
