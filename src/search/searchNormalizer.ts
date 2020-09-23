import subcategoryNormalizer from '../subcategory/subcategoryNormalizer';

/**
 * Magento 2: search normalizer
 * > uses subcategory normalizer underneath
 */
function searchNormalizer(rawData) {
  return subcategoryNormalizer(rawData);
}

export default searchNormalizer;
