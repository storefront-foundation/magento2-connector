import { fetchSubcategory } from '../subcategory';

/**
 * Magento 2: search fetcher
 * > uses subcategory fetcher underneath
 */
async function fetchSearch({
  pageSize = 16,
  currentPage = 1,
  filter = '',
  sort = '',
  search = '',
}): Promise<any> {
  const rawData = await fetchSubcategory({
    pageSize,
    currentPage,
    filter,
    sort,
    search,
  });
  return rawData;
}

export default fetchSearch;
