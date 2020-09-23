import fetchWithGraphQl from '../fetchWithGraphQl';
import menuQuery from './menuQuery';

/**
 * Magento 2: menu fetcher
 */
async function fetchMenu({
  numberOfLevels = 2,
  menuItemFields = [
    'name',
    'url_path',
    'url_suffix',
    'position',
  ],
}): Promise<any> {
  const query = menuQuery({ numberOfLevels, menuItemFields });
  const rawData = await fetchWithGraphQl(query);
  return rawData;
}

export default fetchMenu;
