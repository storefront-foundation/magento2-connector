import get from 'lodash/get';
import { fetchCart, normalizeCart } from '../../../../cart/customer/cart';

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
