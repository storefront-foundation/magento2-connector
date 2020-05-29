import get from 'lodash/get';

/**
 * Magento 2: customer cart normalizer
 */
function normalizer(rawData) {
  const rawCartData = get(rawData, 'data.customerCart', null);
  const customerCartId = get(rawCartData, 'id', null);
  const items = get(rawCartData, 'items', []); // @TODO: normalize cart items
  return {
    customerCartId,
    cart: {
      items,
    },
  };
}

export default normalizer;
