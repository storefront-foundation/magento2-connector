import cartQuery from './query';
import fetchCart from './fetcher';
import normalizeCart from './normalizer';

/**
 * Usage example (in handler):
 *
 * import { fetchCart, normalizeCart } from 'api/magento/cart/guest/cart';
 * ...
 * ...
 * const rawData = await fetchCart(cartId);
 * const data = normalizeCart(rawData);
 * ...
 * ...
 */
export {
  cartQuery,
  fetchCart,
  normalizeCart,
};
