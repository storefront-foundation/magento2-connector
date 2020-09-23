import get from 'lodash/get';
import CartItem from 'react-storefront-connector/CartItem';
import cartItemsNormalizer from '../../../helpers/cartItemsNormalizer';
import CartResponse from '../../../types/CartResponse';

/**
 * Magento 2: guest cart normalizer
 */
function normalizer(rawData: any): CartResponse {
  const rawCartData = get(rawData, 'data.cart', null);
  const guestCartId = get(rawCartData, 'id', null);
  const items: CartItem[] = cartItemsNormalizer(get(rawCartData, 'items', []));
  return {
    guestCartId,
    cart: {
      items,
    },
  };
}

export default normalizer;
