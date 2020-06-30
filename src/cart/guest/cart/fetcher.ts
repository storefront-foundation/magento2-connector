import fetchWithGraphQl from '../../../fetchWithGraphQl';
import cartQuery from './query';

/**
 * Magento 2: guest cart fetcher
 */
async function fetcher(cartId): Promise<any> {
  const rawData = await fetchWithGraphQl(cartQuery({ cartId }));
  return rawData;
}

export default fetcher;
