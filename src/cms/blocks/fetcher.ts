import fetchWithGraphQl from '../../fetchWithGraphQl';
import cmsBlocksQuery from './query';

/**
 * Magento 2: cms blocks fetcher
 */
async function fetcher({ identifiers }): Promise<any> {
  const query = cmsBlocksQuery({ identifiers });
  const rawData = await fetchWithGraphQl(query);
  return rawData;
}

export default fetcher;
