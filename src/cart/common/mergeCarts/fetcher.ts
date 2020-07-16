import fetchWithGraphQl from '../../../fetchWithGraphQl';
import mergeCartsQuery from './query';

/**
 * Magento 2: common mergeCarts fetcher
 */
async function fetcher(token, sourceCartId, destinationCartId): Promise<any> {
  const rawData = await fetchWithGraphQl(mergeCartsQuery({ sourceCartId, destinationCartId }), token);
  return rawData;
}

export default fetcher;
