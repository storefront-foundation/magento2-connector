import get from 'lodash/get';
import cartItemsNormalizer from '../../../helpers/cartItemsNormalizer';
import CartItem from 'react-storefront-connector/CartItem';
import CartResponse from '../../../types/CartResponse';

/**
 * Magento 2: common mergeCarts normalizer
 */
function normalizer(rawData: any): CartResponse {
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
