import fetchWithGraphQl from '../../../fetchWithGraphQl';
import createCustomerQuery from './query';

/**
 * Magento 2: createCustomer fetcher
 */
async function fetcher(queryData): Promise<any> {
  const rawData = await fetchWithGraphQl(createCustomerQuery(queryData));
  return rawData;
}

export default fetcher;
