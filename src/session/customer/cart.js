import { fetchCart, normalizeCart } from 'react-storefront-magento2-connector/cart/customer/cart';
import getError from '../../helpers/getError';

/**
 * Magento 2: customer -> cart
 */
export default async function cart(token) {
  const rawData = await fetchCart(token);

  const error = getError(rawData);
  if (error) {
    return {
      error,
    }
  }

  const data = normalizeCart(rawData);
  return {
    ...data,
  };
}
