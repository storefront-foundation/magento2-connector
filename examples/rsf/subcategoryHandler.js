/**
 * To be used as `/api/s/[...slug].js` RSF subcategory handler
 */
import { fetchCmsBlocks, normalizeCmsBlocks } from 'react-storefront-magento2-connector/cms/blocks';
import { fetchSubcategory, normalizeSubcategory } from 'react-storefront-magento2-connector/subcategory';
import { fetchSubcategoryId, normalizeSubcategoryId } from 'react-storefront-magento2-connector/subcategory/id';
import {
  fetchSubcategorySubCategories,
  normalizeSubcategorySubCategories,
} from 'react-storefront-magento2-connector/subcategory/sub-categories';

import first from 'lodash/first';
import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest';
import get from 'lodash/get';
import getGlobalData from './getGlobalData';
import groupBy from 'lodash/groupBy';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import withCaching from 'react-storefront/utils/withCaching';

function filtersToQuery(filters) {
  const filtersGrouped = groupBy(filters, (x) => x.split(':')[0]);
  const keys = Object.keys(filtersGrouped);
  return keys.map((key) => {
    const values = filtersGrouped[key].map((f) => f.replace(`${key}:`, ''));
    if (key !== 'price') {
      return `${key}: { in: ${JSON.stringify(values)} }`;
    }

    const prices = values.map((x) => x.split('_').map(Number)).flat().sort();
    const from = first(prices);
    const to = last(prices);
    if (!from && !to) {
      return null;
    }
    const fromQuery = from ? `from: "${from}"` : '';
    const toQuery = to ? `to: "${to}"` : '';
    return `
      ${key}: { 
        ${fromQuery}
        ${toQuery}
      }
    `;
  }).filter(Boolean).join('\n');
}

function resolveCmsBlocksIdentifiers(urlKey) {
  if (urlKey === 'what-is-new') {
    urlKey = 'new'; // eslint-disable-line no-param-reassign
  }
  return `${urlKey}-block`;
}

async function subcategoryHandler(req, res) {
  const defaultSort = 'position: DESC'; // default sort value on demo
  const { query } = req;
  const { q = '', page = 1 } = query;
  let { slug, filters, sort = defaultSort } = query;
  if (!isArray(slug)) {
    slug = slug.split('/');
  }

  const isLanding = get(slug, 'length', 0) === 1; // 1st level pages (/women, /men, etc.) are landings
  const isSearch = !isEmpty(q);
  const urlKey = (last(slug) || '').replace('.html', '');

  if (sort === 'rating') {
    sort = defaultSort; // remove default RSF filter
  }

  if (filters) {
    filters = JSON.parse(filters);
  } else {
    filters = [];
  }

  // 1) get `id` and `name` & `navMenu` data
  let id;
  let name;
  let navMenu = null;
  if (isSearch) {
    id = `Search: ${q}`;
    name = `Results for "${q}"`;
  } else {
    const rawIdData = await fetchSubcategoryId({ urlKey });
    const idData = normalizeSubcategoryId(rawIdData);
    id = idData.id;
    name = idData.name;
    const rawSubCategoriesData = await fetchSubcategorySubCategories({ urlKey });
    navMenu = normalizeSubcategorySubCategories(rawSubCategoriesData);
  }

  // 2) get all subcategory page data
  const rawData = await fetchSubcategory({
    categoryId: isSearch ? null : id,
    sort,
    currentPage: page,
    filter: filtersToQuery(filters),
    search: q,
  });
  const data = normalizeSubcategory(rawData);

  // 3) get CMS slots data
  let cmsBlocks = [];
  if (isLanding) {
    const identifiers = resolveCmsBlocksIdentifiers(urlKey);
    const rawCmsBlocks = await fetchCmsBlocks({ identifiers });
    cmsBlocks = normalizeCmsBlocks(rawCmsBlocks).items;
  }

  // collect all page data
  const pageData = {
    id,
    name,
    title: name,
    total: get(data, 'total', 0),
    page: get(data, 'currentPage', 1),
    totalPages: get(data, 'totalPages', 0),
    isLanding,
    cmsBlocks,
    products: get(data, 'items').map((item) => ({
      ...item,
      id: item.sku,
      thumbnail: {
        src: get(item, 'thumbnail', ''),
      },
      price: get(item, 'basePrice'),
    })),
    sort,
    sortOptions: get(data, 'sortOptions', [])
      .map((option) => ([{ // split up for ASC/DESC sort for demo
        name: `${get(option, 'name')} ⬇️`,
        code: `${get(option, 'code')}: DESC`,
      }, {
        name: `${get(option, 'name')} ⬆️`,
        code: `${get(option, 'code')}: ASC`,
      }])).flat(),
    filters,
    facets: get(data, 'facets', []),
    navMenu,
    breadcrumbs: [
      {
        text: 'Home',
        href: '/',
      },
    ],
  };

  res.json(
    await fulfillAPIRequest(req, {
      appData: getGlobalData,
      pageData: () => Promise.resolve(pageData),
    }),
  );
}

export default withCaching(subcategoryHandler, 60 * 60 * 24); // cache with the service worker for 24 hours
