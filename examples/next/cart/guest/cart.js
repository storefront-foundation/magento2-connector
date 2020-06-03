import { fetchCart, normalizeCart } from 'react-storefront-magento2-connector/cart/guest/cart';

import get from 'lodash/get';

/**
 * Magento 2: guest cart handler
 */
export default async function cart(req, res) {
  const cartId = get(req, 'query.cartId');
  const rawData = await fetchCart(cartId);
  const data = normalizeCart(rawData);
  return res.json({
    ...data,
  });
}
