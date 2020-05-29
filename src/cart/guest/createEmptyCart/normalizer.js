import get from 'lodash/get';

/**
 * Magento 2: guest createEmptyCart normalizer
 */
function normalizer(rawData) {
  const guestCartId = get(rawData, 'data.createEmptyCart', null);
  return guestCartId;
}

export default normalizer;
