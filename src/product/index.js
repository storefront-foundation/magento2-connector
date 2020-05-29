import productQuery from './query';
import fetchProduct from './fetcher';
import normalizeProduct from './normalizer';

/**
 * Usage example (in handler):
 *
 * import { fetchProduct, normalizeProduct } from 'api/magento/product';
 * ...
 * ...
 * const rawData = await fetchProduct(productId);
 * const data = normalizeProduct(rawData);
 * ...
 * ...
 */
export {
  productQuery,
  fetchProduct,
  normalizeProduct,
};
