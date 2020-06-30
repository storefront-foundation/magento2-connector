import subcategoryQuery from './query';
import fetchSubcategory from './fetcher';
import normalizeSubcategory from './normalizer';
import subcategory from './subcategory';

/**
 * Usage example (in handler):
 *
 * import { fetchSubcategory, normalizeSubcategory } from 'api/magento/subcategory';
 * ...
 * ...
 * const rawData = await fetchSubcategory({ categoryId });
 * const { id, name } = normalizeSubcategory(rawData);
 * ...
 * ...
 */
export default subcategory;
export {
  subcategoryQuery,
  fetchSubcategory,
  normalizeSubcategory,
};
