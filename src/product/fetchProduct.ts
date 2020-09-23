import fetchWithGraphQl from '../fetchWithGraphQl';
import productQuery from './productQuery';

/**
 * Magento 2: product fetcher
 */
async function fetchProduct(productId): Promise<any> {
  const pid = productId.replace('.html', '');
  const rawData = await fetchWithGraphQl(productQuery(pid));
  return rawData;
}

export default fetchProduct;
