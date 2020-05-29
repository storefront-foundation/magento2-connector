import fetchWithGraphQl from '../../fetchWithGraphQl';
import cmsBlocksQuery from './query';

/**
 * Magento 2: menu fetcher
 */
async function fetcher({ identifiers }) {
  const query = cmsBlocksQuery({ identifiers });
  const rawData = await fetchWithGraphQl(query);
  return rawData;
}

export default fetcher;
