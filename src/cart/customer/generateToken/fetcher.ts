import fetchWithGraphQl from '../../../fetchWithGraphQl';
import generateCustomerTokenQuery from './query';

/**
 * Magento 2: customer generateToken fetcher
 */
async function fetcher(email, password): Promise<any> {
  const rawData = await fetchWithGraphQl(generateCustomerTokenQuery(email, password));
  return rawData;
}

export default fetcher;
