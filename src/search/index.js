import fetchSearch from './fetcher';
import normalizeSearch from './normalizer';

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
export {
  fetchSearch,
  normalizeSearch,
};
