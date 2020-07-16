import fetchWithGraphQl from '../../../fetchWithGraphQl';
import updateCartQuery from './query';

/**
 * Magento 2: common updateCart fetcher
 */
async function fetcher({
  cartId,
  token = null,
  cartItemId,
  quantity = 0,
}): Promise<any> {
  const query = updateCartQuery({
    cartId,
    cartItemId,
    quantity,
  });
  const rawData = await fetchWithGraphQl(query, token);
  return rawData;
}

export default fetcher;
