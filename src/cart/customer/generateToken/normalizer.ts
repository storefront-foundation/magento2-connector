import get from 'lodash/get';

interface TokenData {
  token: string,
}

/**
 * Magento 2: customer generateToken normalizer
 */
function normalizer(rawData: any): TokenData {
  const token = get(rawData, 'data.generateCustomerToken.token', null);
  return {
    token,
  };
}

export default normalizer;
