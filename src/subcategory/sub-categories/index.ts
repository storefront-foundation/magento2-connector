import subcategorySubCategoriesQuery from './query';
import fetchSubcategorySubCategories from './fetcher';
import normalizeSubcategorySubCategories from './normalizer';

/**
 * Usage example (in handler):
 *
 * import {
 *   fetchSubcategorySubCategories,
 *   normalizeSubcategorySubCategories,
 * } from 'api/magento/subcategory/sub-categories';
 * ...
 * ...
 * const rawData = await fetchSubcategorySubCategories({ urlKey });
 * const data = normalizeSubcategorySubCategories(rawData);
 * ...
 * ...
 */
export {
  subcategorySubCategoriesQuery,
  fetchSubcategorySubCategories,
  normalizeSubcategorySubCategories,
};
