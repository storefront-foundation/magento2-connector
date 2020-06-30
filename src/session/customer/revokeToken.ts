import { fetchRevokeToken, normalizeRevokeToken } from '../../cart/customer/revokeToken';

/**
 * Magento 2: customer -> revokeToken
 */
export default async function revokeToken(token): Promise<any> {
  const rawData = await fetchRevokeToken(token);
  const data = normalizeRevokeToken(rawData);
  return {
    ...data,
  };
}
