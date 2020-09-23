import fetchWithGraphQl from '../../fetchWithGraphQl';
import subcategoryIdQuery from './subcategoryIdQuery';

/**
 * Magento 2: subcategory id fetcher
 */
async function fetchSubcategoryId({ urlKey }): Promise<any> {
  const query = subcategoryIdQuery({ urlKey });
  const rawData = await fetchWithGraphQl(query);
  return rawData;
}

export default fetchSubcategoryId;
