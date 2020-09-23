import fetchWithGraphQl from '../../fetchWithGraphQl';
import subcategorySubCategoriesQuery from './subcategorySubCategoriesQuery';

/**
 * Magento 2: subcategory sub-categories fetcher
 */
async function fetchSubcategorySubCategories({ urlKey }): Promise<any> {
  const query = subcategorySubCategoriesQuery({ urlKey });
  const rawData = await fetchWithGraphQl(query);
  return rawData;
}

export default fetchSubcategorySubCategories;
