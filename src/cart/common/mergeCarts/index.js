import mergeCartsQuery from './query';
import fetchMergeCarts from './fetcher';
import normalizeMergeCarts from './normalizer';

/**
 * Usage example (in handler):
 *
 * import { fetchMergeCarts, normalizeMergeCarts } from 'api/magento/cart/common/mergeCarts';
 * ...
 * ...
 * const rawData = await fetchMergeCarts(token, sourceCartId, destinationCartId);
 * const data = normalizeMergeCarts(rawData);
 * ...
 * ...
 */
export {
  mergeCartsQuery,
  fetchMergeCarts,
  normalizeMergeCarts,
};
