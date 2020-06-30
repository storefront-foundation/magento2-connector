import menuQuery from './query';
import fetchMenu from './fetcher';
import normalizeMenu from './normalizer';

/**
 * Usage example (in handler):
 *
 * import { fetchMenu, normalizeMenu } from 'api/magento/menu';
 * ...
 * ...
 * const rawData = await fetchMenu({});
 * const data = normalizeMenu(rawData);
 * ...
 * ...
 */
export {
  menuQuery,
  fetchMenu,
  normalizeMenu,
};
