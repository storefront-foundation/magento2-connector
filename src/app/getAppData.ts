import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import MenuItem from 'react-storefront-connector/MenuItem';
import AppData from 'react-storefront-connector/AppData';
import { fetchMenu, normalizeMenu } from '../menu';

function normalizeMenuItems(items: any[]): MenuItem[] {
  if (isEmpty(items)) {
    return null;
  }
  return items.map((item) => ({
    text: get(item, 'name'),
    as: `/s${get(item, 'url')}`,
    href: '/s/[...categorySlug]',
    items: normalizeMenuItems(get(item, 'items', [])),
  }));
}

function getTabs(menu: MenuItem): MenuItem[] {
  const items: MenuItem[] = menu.items || [];
  return items.map((item: MenuItem): MenuItem => ({
    ...pick(item, ['text', 'href', 'as']),
    items: (get(item, 'items') || []).map((subcategoryItem: MenuItem): MenuItem => ({
      ...pick(subcategoryItem, ['text', 'href', 'as']),
      items: [],
    })),
  }));
}

export default async function getAppData(): Promise<AppData> {
  const rawData = await fetchMenu({ numberOfLevels: 3 });
  const menuItems = normalizeMenu(rawData);
  const menu: MenuItem = {
    header: 'header',
    footer: 'footer',
    items: normalizeMenuItems(menuItems),
  };
  const tabs = getTabs(menu);
  return { menu, tabs };
}
