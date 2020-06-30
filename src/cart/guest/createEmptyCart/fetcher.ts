import fetchWithGraphQl from '../../../fetchWithGraphQl';
import createEmptyCartQuery from './query';

/**
 * Magento 2: guest createEmptyCart fetcher
 */
async function fetcher(): Promise<any> {
  const rawData = await fetchWithGraphQl(createEmptyCartQuery());
  return rawData;
}

export default fetcher;
