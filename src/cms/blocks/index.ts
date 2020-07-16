import cmsBlocksQuery from './query';
import fetchCmsBlocks from './fetcher';
import normalizeCmsBlocks from './normalizer';

/**
 * Usage example (in handler):
 *
 * import { fetchCmsBlocks, normalizeCmsBlocks } from 'api/magento/cms/blocks';
 * ...
 * ...
 * const rawData = await fetchCmsBlocks({ identifiers });
 * const data = normalizeCmsBlocks(rawData);
 * ...
 * ...
 */
export {
  cmsBlocksQuery,
  fetchCmsBlocks,
  normalizeCmsBlocks,
};
