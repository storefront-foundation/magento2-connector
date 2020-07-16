import get from 'lodash/get';
import cartItemsNormalizer from '../../../helpers/cartItemsNormalizer';
import CartItem from 'react-storefront-connector/CartItem';
import CartResponse from '../../../types/CartResponse'

/**
 * Magento 2: common addSimpleProductsToCart normalizer
 */
function normalizer(rawData: any): CartResponse {
  const rawCartData = get(rawData, 'data.addSimpleProductsToCart.cart', null);
  const items: CartItem[] = cartItemsNormalizer(get(rawCartData, 'items', []));
  return {
    cart: {
      items,
    },
  };
}

export default normalizer;
