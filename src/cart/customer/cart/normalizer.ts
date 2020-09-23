import get from 'lodash/get';
import CartItem from 'react-storefront-connector/CartItem';
import cartItemsNormalizer from '../../../helpers/cartItemsNormalizer';
import CartResponse from '../../../types/CartResponse';

/**
 * Magento 2: customer cart normalizer
 */
function normalizer(rawData: any): CartResponse {
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
