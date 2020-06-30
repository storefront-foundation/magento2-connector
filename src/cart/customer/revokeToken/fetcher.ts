import fetchWithGraphQl from '../../../fetchWithGraphQl';
import revokeCustomerTokenQuery from './query';

/**
 * Magento 2: customer revokeToken fetcher
 */
async function fetcher(token): Promise<any> {
  const rawData = await fetchWithGraphQl(revokeCustomerTokenQuery(), token);
  return rawData;
}

export default fetcher;
