import get from 'lodash/get';

/**
 * Magento 2: cmsBlocks normalizer
 */
function normalizer(rawData) {
  const items = get(rawData, 'data.cmsBlocks.items', []);
  return {
    items,
  };
}

export default normalizer;
