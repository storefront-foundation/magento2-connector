import first from 'lodash/first';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';

import SubcategoryPageData from 'react-storefront-connector/SubcategoryPageData';
import Result from 'react-storefront-connector/Result';
import withAppData from '../app/withAppData';
import { fetchSubcategorySubCategories, normalizeSubcategorySubCategories } from './sub-categories';
import { fetchSubcategoryId, normalizeSubcategoryId } from './id';
import fetchSubcategory from './fetcher';
import normalizeSubcategory from './normalizer';
import { fetchCmsBlocks, normalizeCmsBlocks } from '../cms/blocks';

function filtersToQuery(filters): string {
  const filtersGrouped = groupBy(filters, (x) => x.split(':')[0]);
  const keys = Object.keys(filtersGrouped);
  return keys
    .map((key) => {
      const values: Array<string> = filtersGrouped[key].map((f) => f.replace(`${key}:`, ''));
      if (key !== 'price') {
        return `${key}: { in: ${JSON.stringify(values)} }`;
      }

      const prices = values
        .map((x: string) => x.split('_').map(Number))
        .flat()
        .sort();
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
    })
    .filter(Boolean)
    .join('\n');
}

function resolveCmsBlocksIdentifiers(urlKey) {
  if (urlKey === 'what-is-new') {
    urlKey = 'new'; // eslint-disable-line no-param-reassign
  }
  return `${urlKey}-block`;
}

export default async function subcategory(
  params,
  req,
  _res,
): Promise<Result<SubcategoryPageData>> {
  return withAppData(req, async () => {
    const { q = '', page = 1 } = params;
    let { slug, filters, sort = 'position: DESC' } = params;

    if (!isArray(slug)) {
      slug = (slug || '').split('/');
    }

    const defaultSort = 'position: DESC';
    const isSearch = !isEmpty(q);

    // TODO: This is not correct in all cases
    const isLanding = get(slug, 'length', 0) === 1 && !isSearch; // 1st level pages (/women, /men, etc.) are landings
    const lastSlug: string = last(slug) || '';
    const urlKey = lastSlug.replace('.html', '');

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
    return {
      id,
      name,
      title: name,
      total: get(data, 'total', 0),
      page: get(data, 'currentPage', 1),
      totalPages: get(data, 'totalPages', 0),
      isLanding,
      cmsBlocks,
      products: get(data, 'products', []),
      sort,
      sortOptions: get(data, 'sortOptions', [])
        .map((option) => [
          {
            // split up for ASC/DESC sort for demo
            name: `${get(option, 'name')} ⬇️`,
            code: `${get(option, 'code')}: DESC`,
          },
          {
            name: `${get(option, 'name')} ⬆️`,
            code: `${get(option, 'code')}: ASC`,
          },
        ])
        .flat(),
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
  });
}
