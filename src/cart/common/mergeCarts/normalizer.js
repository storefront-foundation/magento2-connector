import get from 'lodash/get';

/**
 * Magento 2: common mergeCarts normalizer
 */
function normalizer(rawData) {
  const rawCartData = get(rawData, 'data.mergeCarts', null);
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
