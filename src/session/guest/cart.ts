import { fetchCart, normalizeCart } from '../../cart/guest/cart';
import getError from '../../helpers/getError';
import CartResponse from '../../types/CartResponse';

/**
 * Magento 2: guest -> cart
 */
export default async function cart(cartId): Promise<CartResponse> {
  const rawData = await fetchCart(cartId);

  const error = getError(rawData);
  if (error) {
    return {
      error,
    };
  }

  const data = normalizeCart(rawData);
  return {
    ...data,
  };
}
