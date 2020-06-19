import get from 'lodash/get';
import cartItemsNormalizer from '../../../helpers/cartItemsNormalizer';
import Cart from '../../../types/Cart';
import CartItem from '../../../types/CartItem'

interface AddToCartResult {
  cart: Cart
}

/**
 * Magento 2: common addSimpleProductsToCart normalizer
 */
function normalizer(rawData: any): AddToCartResult {
  const rawCartData = get(rawData, 'data.addSimpleProductsToCart.cart', null);
  const items: CartItem[] = cartItemsNormalizer(get(rawCartData, 'items', []));
  return {
    cart: {
      items,
    },
  };
}

export default normalizer;
