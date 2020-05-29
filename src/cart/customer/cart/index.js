import cartQuery from './query';
import fetchCart from './fetcher';
import normalizeCart from './normalizer';

/**
 * Usage example (in handler):
 *
 * import { fetchCart, normalizeCart } from 'api/magento/cart/customer/cart';
 * ...
 * ...
 * const rawData = await fetchCart(token);
 * const data = normalizeCart(rawData);
 * ...
 * ...
 */
export {
  cartQuery,
  fetchCart,
  normalizeCart,
};
