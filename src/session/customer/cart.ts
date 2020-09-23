import { fetchCart, normalizeCart } from '../../cart/customer/cart';
import getError from '../../helpers/getError';
import CartResponse from '../../types/CartResponse';

/**
 * Magento 2: customer -> cart
 */
export default async function cart(token): Promise<CartResponse> {
  const rawData = await fetchCart(token);

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
