import subcategoryIdQuery from './query';
import fetchSubcategoryId from './fetcher';
import normalizeSubcategoryId from './normalizer';

/**
 * Usage example (in handler):
 *
 * import { fetchSubcategoryId, normalizeSubcategoryId } from 'api/magento/subcategory/id';
 * ...
 * ...
 * const rawData = await fetchSubcategoryId({ urlKey });
 * const id = normalizeSubcategoryId(rawData);
 * ...
 * ...
 */
export {
  subcategoryIdQuery,
  fetchSubcategoryId,
  normalizeSubcategoryId,
};
