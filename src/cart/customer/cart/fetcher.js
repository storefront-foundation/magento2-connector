import fetchWithGraphQl from '../../../fetchWithGraphQl';
import customerCartQuery from './query';

/**
 * Magento 2: customer cart fetcher
 */
async function fetcher(token) {
  const rawData = await fetchWithGraphQl(customerCartQuery({}), token);
  return rawData;
}

export default fetcher;
