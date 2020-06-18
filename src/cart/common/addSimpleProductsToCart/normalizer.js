import get from 'lodash/get';
import cartItemsNormalizer from '../../../helpers/cartItemsNormalizer';

/**
 * Magento 2: common addSimpleProductsToCart normalizer
 */
function normalizer(rawData) {
  const rawCartData = get(rawData, 'data.addSimpleProductsToCart.cart', null);
  const items = cartItemsNormalizer(get(rawCartData, 'items', []));
  return {
    cart: {
      items,
    },
  };
}

export default normalizer;
