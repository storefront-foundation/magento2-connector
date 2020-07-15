import fetchUpdateCart from './fetcher';
import updateCartQuery from './query';
import normalizeUpdateCart from './normalizer';

/**
 * Usage example (in handler):
 *
 * import {
 *  fetchUpdateCart,
 *  normalizeUpdateCart,
 * } from 'api/magento/cart/common/updateCart';
 * ...
 * ...
 * const rawData = await fetchAddSimpleProductsToCart({
 *   cartId,
 *   token,
 *   cartItemId,
 *   quantity
 * });
 * const data = normalizeUpdateCart(rawData);
 * ...
 * ...
 */
export {
  updateCartQuery,
  fetchUpdateCart,
  normalizeUpdateCart,
};
