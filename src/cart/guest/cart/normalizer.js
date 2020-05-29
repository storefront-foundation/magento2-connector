import get from 'lodash/get';

/**
 * Magento 2: guest cart normalizer
 */
function normalizer(rawData) {
  const rawCartData = get(rawData, 'data.cart', null);
  const guestCartId = get(rawCartData, 'id', null);
  const items = get(rawCartData, 'items', []); // @TODO: normalize cart items
  return {
    guestCartId,
    cart: {
      items,
    },
  };
}

export default normalizer;
