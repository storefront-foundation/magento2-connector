import get from 'lodash/get';
import cartItemsNormalizer from '../../../helpers/cartItemsNormalizer';
import Cart from '../../../types/Cart';
import CartItem from '../../../types/CartItem';

interface CustomerCartResult {
  customerCartId: string
  cart: Cart
}

/**
 * Magento 2: customer cart normalizer
 */
function normalizer(rawData: any): CustomerCartResult {
  const rawCartData = get(rawData, 'data.customerCart', null);
  const customerCartId = get(rawCartData, 'id', null);
  const items: CartItem[] = cartItemsNormalizer(get(rawCartData, 'items', []));
  return {
    customerCartId,
    cart: {
      items,
    },
  };
}

export default normalizer;
