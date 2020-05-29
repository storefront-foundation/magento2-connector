import get from 'lodash/get';
import { fetchRevokeToken, normalizeRevokeToken } from '../../../../cart/customer/revokeToken';

/**
 * Magento 2: customer revokeToken handler
 */
export default async function revokeToken(req, res) {
  const token = get(req, 'query.token');
  const rawData = await fetchRevokeToken(token);
  const data = normalizeRevokeToken(rawData);
  return res.json({
    ...data,
  });
}
