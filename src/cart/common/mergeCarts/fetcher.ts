import fetchWithGraphQl from '../../../fetchWithGraphQl';
import mergeCartsQuery from './query';

/**
 * Magento 2: common mergeCarts fetcher
 */
async function fetcher(token, sourceCartId, destinationCartId): Promise<any> {
  const query = mergeCartsQuery({ sourceCartId, destinationCartId });
  const rawData = await fetchWithGraphQl(query, token);
  return rawData;
}

export default fetcher;
