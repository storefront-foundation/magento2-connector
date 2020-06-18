import get from 'lodash/get';
import cartItemsNormalizer from '../../../helpers/cartItemsNormalizer';

/**
 * Magento 2: guest cart normalizer
 */
function normalizer(rawData) {
  const rawCartData = get(rawData, 'data.cart', null);
  const guestCartId = get(rawCartData, 'id', null);
  const items = cartItemsNormalizer(get(rawCartData, 'items', []));
  return {
    guestCartId,
    cart: {
      items,
    },
  };
}

export default normalizer;
