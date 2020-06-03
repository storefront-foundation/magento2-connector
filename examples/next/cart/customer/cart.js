import { fetchCart, normalizeCart } from 'react-storefront-magento2-connector/cart/customer/cart';

import get from 'lodash/get';

/**
 * Magento 2: customer cart handler
 */
export default async function cart(req, res) {
  const token = get(req, 'query.token');
  const rawData = await fetchCart(token);
  const data = normalizeCart(rawData);
  return res.json({
    ...data,
  });
}
