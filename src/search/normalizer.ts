import { normalizeSubcategory } from '../subcategory';

/**
 * Magento 2: search normalizer
 * > uses subcategory normalizer underneath
 */
function normalizer(rawData) {
  return normalizeSubcategory(rawData);
}

export default normalizer;
