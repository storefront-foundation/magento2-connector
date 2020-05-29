import { normalizeSubcategory } from '../subcategory';

/**
 * Magento 2: search normalizer
 * > uses subcategory normalizer underneath
 */
function normalizer(...args) {
  return normalizeSubcategory(...args);
}

export default normalizer;
