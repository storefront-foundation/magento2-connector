import generateTokenQuery from './query';
import fetchGenerateToken from './fetcher';
import normalizeGenerateToken from './normalizer';

/**
 * Usage example (in handler):
 *
 * import {
 *   fetchGenerateToken, normalizeGenerateToken,
 * } from 'api/magento/cart/customer/generateToken';
 * ...
 * ...
 * const rawData = await fetchGenerateToken(email, password);
 * const data = normalizeGenerateToken(rawData);
 * ...
 * ...
 */
export {
  generateTokenQuery,
  fetchGenerateToken,
  normalizeGenerateToken,
};
