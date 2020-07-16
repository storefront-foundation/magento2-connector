import fetchWithGraphQl from '../../../fetchWithGraphQl';
import addSimpleProductsToCartQuery from './query';

/**
 * Magento 2: common addSimpleProductsToCart fetcher
 */
async function fetcher({
  cartId,
  token = null,
  sku,
  quantity = 1,
}): Promise<any> {
  const query = addSimpleProductsToCartQuery({
    cartId,
    sku,
    quantity,
  });
  const rawData = await fetchWithGraphQl(query, token);
  return rawData;
}

export default fetcher;
