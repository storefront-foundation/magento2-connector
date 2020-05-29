import fetchWithGraphQl from '../fetchWithGraphQl';
import subcategoryQuery from './query';

/**
 * Magento 2: subcategory fetcher
 */
async function fetcher({
  categoryId = null,
  pageSize = 16,
  currentPage = 1,
  filter = '',
  sort = '',
  search = '',
}) {
  const query = subcategoryQuery({
    categoryId,
    pageSize,
    currentPage,
    filter,
    sort,
    search,
  });
  const rawData = await fetchWithGraphQl(query);
  return rawData;
}

export default fetcher;
