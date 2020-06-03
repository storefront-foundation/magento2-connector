import { fetchMenu, normalizeMenu } from 'react-storefront-magento2-connector/menu';

/**
 * To be used as global data RSF handler (also known as `globalState` in RSF v6)
 */
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';

function normalizeMenuItems(items) {
  if (isEmpty(items)) {
    return null;
  }
  return items.map(item => ({
    text: get(item, 'name'),
    as: `/s${get(item, 'url')}`,
    href: '/s/[subcategoryId]',
    items: normalizeMenuItems(get(item, 'items', [])),
  }));
}

function getTabs(menu) {
  const items = get(menu, 'items', []);
  return items.map((item) => ({
    ...pick(item, ['text', 'href', 'as']),
    subcategories: (get(item, 'items') || []).map(subcategoryItem => ({
      ...pick(subcategoryItem, ['text', 'href', 'as']),
    })),
  }));
}

export default async function getGlobalData() {
  const rawData = await fetchMenu({ numberOfLevels: 3 });
  const menuItems = normalizeMenu(rawData);
  const menu = {
    header: 'header',
    footer: 'footer',
    items: normalizeMenuItems(menuItems),
  };
  const tabs = getTabs(menu);
  return Promise.resolve({ menu, tabs });
}
