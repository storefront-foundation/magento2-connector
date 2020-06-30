import fetchWithGraphQl from '../../fetchWithGraphQl';
import subcategorySubCategoriesQuery from './query';

/**
 * Magento 2: subcategory sub-categories fetcher
 */
async function fetcher({ urlKey }): Promise<any> {
  const query = subcategorySubCategoriesQuery({ urlKey });
  const rawData = await fetchWithGraphQl(query);
  return rawData;
}

export default fetcher;
