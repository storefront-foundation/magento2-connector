import get from 'lodash/get';
import cartItemsNormalizer from '../../../helpers/cartItemsNormalizer';

/**
 * Magento 2: customer cart normalizer
 */
function normalizer(rawData) {
  const rawCartData = get(rawData, 'data.customerCart', null);
  const customerCartId = get(rawCartData, 'id', null);
  const items = cartItemsNormalizer(get(rawCartData, 'items', []));
  return {
    customerCartId,
    cart: {
      items,
    },
  };
}

export default normalizer;
