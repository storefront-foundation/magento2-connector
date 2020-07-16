import get from 'lodash/get';

/**
 * Magento 2: customer revokeToken normalizer
 */
function normalizer(rawData): any {
  const result = get(rawData, 'data.revokeCustomerToken.result', false);
  return {
    result,
  };
}

export default normalizer;
