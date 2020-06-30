import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';

function normalizeItems(children): any[] {
  const childrenSorted = orderBy(children, ['position']);
  return childrenSorted.map((item) => ({
    name: get(item, 'name', ''),
    url: `/${get(item, 'url_path', '')}${get(item, 'url_suffix', '')}`,
    items: !isEmpty(item.children) ? normalizeItems(item.children) : [],
  }));
}

/**
 * Magento 2: menu normalizer
 */
function normalizer(rawData): any[] {
  const rawMenu = get(rawData, 'data.categoryList', [])
    .filter((menu) => get(menu, 'level') === 1)[0];
  const children = get(rawMenu, 'children', []);
  const menu = normalizeItems(children);
  return menu;
}

export default normalizer;
