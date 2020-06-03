import { fetchRevokeToken, normalizeRevokeToken } from 'react-storefront-magento2-connector/cart/customer/revokeToken';

import get from 'lodash/get';

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
