import get from 'lodash/get';
import cartItemsNormalizer from '../../../helpers/cartItemsNormalizer';
import Cart from '../../../types/Cart';
import CartItem from '../../../types/CartItem';

interface GuestCartResult {
  guestCartId: string
  cart: Cart
}

/**
 * Magento 2: guest cart normalizer
 */
function normalizer(rawData: any): GuestCartResult {
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
