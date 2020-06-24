import fetchSearch from './fetcher';
import normalizeSearch from './normalizer';
import search from './search';

/**
 * Usage example (in handler):
 *
 * import { fetchSearch, normalizeSearch } from 'api/magento/search';
 * ...
 * ...
 * const rawData = await fetchSearch({ search });
 * const data = normalizeSearch(rawData);
 * ...
 * ...
 */
export default search;
export {
  fetchSearch,
  normalizeSearch,
};
