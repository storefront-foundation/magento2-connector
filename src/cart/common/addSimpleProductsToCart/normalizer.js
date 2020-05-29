import get from 'lodash/get';

/**
 * Magento 2: common addSimpleProductsToCart normalizer
 */
function normalizer(rawData) {
  const rawCartData = get(rawData, 'data.addSimpleProductsToCart.cart', null);
  const items = get(rawCartData, 'items', []); // @TODO: normalize cart items
  return {
    cart: {
      items,
    },
  };
}

export default normalizer;
