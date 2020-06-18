import { fetchRevokeToken, normalizeRevokeToken } from '../../cart/customer/revokeToken';

/**
 * Magento 2: customer -> revokeToken
 */
export default async function revokeToken(token) {
  const rawData = await fetchRevokeToken(token);
  const data = normalizeRevokeToken(rawData);
  return {
    ...data,
  };
}
