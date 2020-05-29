import fetchWithGraphQl from '../../fetchWithGraphQl';
import subcategoryIdQuery from './query';

/**
 * Magento 2: subcategory id fetcher
 */
async function fetcher({ urlKey }) {
  const query = subcategoryIdQuery({ urlKey });
  const rawData = await fetchWithGraphQl(query);
  return rawData;
}

export default fetcher;
