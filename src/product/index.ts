import productQuery from './query';
import fetchProduct from './fetcher';
import normalizeProduct from './normalizer';
import product from './product';

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
export default product;
export {
  productQuery,
  fetchProduct,
  normalizeProduct,
};
