import get from 'lodash/get';
import fetchProductReviews from 'magento2-connector/product/reviews/fetchProductReviews';

export default async function reviews(req, res) {
  const productId = get(req, 'query.productId', '');
  const data = await fetchProductReviews(productId);
  return res.send(data);
}
