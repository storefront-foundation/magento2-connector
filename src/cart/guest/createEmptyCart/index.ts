import createEmptyCartQuery from './query';
import fetchCreateEmptyCart from './fetcher';
import normalizeCreateEmptyCart from './normalizer';

/**
 * Usage example (in handler):
 *
 * import {
 *   fetchCreateEmptyCart, normalizeCreateEmptyCart
 * } from 'api/magento/cart/guest/createEmptyCart';
 * ...
 * ...
 * const rawData = await fetchCreateEmptyCart();
 * const cartId = normalizeCreateEmptyCart(rawData);
 * ...
 * ...
 */
export {
  createEmptyCartQuery,
  fetchCreateEmptyCart,
  normalizeCreateEmptyCart,
};
