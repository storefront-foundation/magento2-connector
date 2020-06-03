import fetchProductReviews from 'react-storefront-magento2-connector/product/reviews/fetchProductReviews';
import get from 'lodash/get';

export default async function reviews(req, res) {
  const productId = get(req, 'query.productId', '');
  const data = await fetchProductReviews(productId);
  return res.send(data);
}
