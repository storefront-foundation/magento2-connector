import revokeTokenQuery from './query';
import fetchRevokeToken from './fetcher';
import normalizeRevokeToken from './normalizer';

/**
 * Usage example (in handler):
 *
 * import { fetchRevokeToken, normalizeRevokeToken } from 'api/magento/cart/customer/revokeToken';
 * ...
 * ...
 * const rawData = await fetchRevokeToken(token);
 * const data = normalizeRevokeToken(rawData);
 * ...
 * ...
 */
export {
  revokeTokenQuery,
  fetchRevokeToken,
  normalizeRevokeToken,
};
