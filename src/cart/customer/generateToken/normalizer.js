import get from 'lodash/get';

/**
 * Magento 2: customer generateToken normalizer
 */
function normalizer(rawData) {
  const token = get(rawData, 'data.generateCustomerToken.token', null);
  return {
    token,
  };
}

export default normalizer;
