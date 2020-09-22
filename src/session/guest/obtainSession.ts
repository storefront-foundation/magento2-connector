import {
  fetchCreateEmptyCart,
  normalizeCreateEmptyCart,
} from '../../cart/guest/createEmptyCart';
import getError from '../../helpers/getError';
import CartResponse from '../../types/CartResponse';

/**
 * Magento 2: guest -> obtainSession
 */
export default async function obtainSession(): Promise<CartResponse> {
  const rawData = await fetchCreateEmptyCart();

  const error = getError(rawData);
  if (error) {
    return {
      error,
    };
  }

  const guestCartId = normalizeCreateEmptyCart(rawData);
  return {
    guestCartId,
  };
}
