import addSimpleProductsToCartQuery from './query';
import fetchAddSimpleProductsToCart from './fetcher';
import normalizeAddSimpleProductsToCart from './normalizer';

/**
 * Usage example (in handler):
 *
 * import {
 *  fetchAddSimpleProductsToCart,
 *  normalizeAddSimpleProductsToCart,
 * } from 'api/magento/cart/common/addSimpleProductsToCart';
 * ...
 * ...
 * const rawData = await fetchAddSimpleProductsToCart({
 *   cartId,
 *   token,
 *   sku,
 *   quantity
 * });
 * const data = normalizeAddSimpleProductsToCart(rawData);
 * ...
 * ...
 */
export {
  addSimpleProductsToCartQuery,
  fetchAddSimpleProductsToCart,
  normalizeAddSimpleProductsToCart,
};
