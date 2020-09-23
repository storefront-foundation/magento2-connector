import fetchWithGraphQl from '../fetchWithGraphQl';
import cmsBlocksQuery from './cmsBlocksQuery';

/**
 * Magento 2: cms blocks fetcher
 */
async function fetchCmsBlocks({ identifiers }): Promise<any> {
  const query = cmsBlocksQuery({ identifiers });
  const rawData = await fetchWithGraphQl(query);
  return rawData;
}

export default fetchCmsBlocks;
