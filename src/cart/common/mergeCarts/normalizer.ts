import get from 'lodash/get';
import cartItemsNormalizer from '../../../helpers/cartItemsNormalizer';
import Cart from '../../../types/Cart';
import CartItem from '../../../types/CartItem';

interface MergeCartsResult {
  customerCartId: string
  cart: Cart
}

/**
 * Magento 2: common mergeCarts normalizer
 */
function normalizer(rawData: any): MergeCartsResult {
  const rawCartData = get(rawData, 'data.mergeCarts', null);
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
