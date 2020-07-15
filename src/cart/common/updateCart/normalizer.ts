import get from 'lodash/get';
import cartItemsNormalizer from '../../../helpers/cartItemsNormalizer';
import CartItem from 'react-storefront-connector/CartItem';
import CartResponse from '../../../types/CartResponse'

/**
 * Magento 2: common updateCart normalizer
 */
function normalizer(rawData: any): CartResponse {
  const rawCartData = get(rawData, 'data.updateCartItems.cart', null);
  const items: CartItem[] = cartItemsNormalizer(get(rawCartData, 'items', []));
  return {
    cart: {
      items,
    },
  };
}

export default normalizer;
