import { normalizeSubcategory } from '../subcategory';

/**
 * Magento 2: search normalizer
 * > uses subcategory normalizer underneath
 */
function searchNormalizer(rawData) {
  return normalizeSubcategory(rawData);
}

export default searchNormalizer;
