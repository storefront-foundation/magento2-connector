import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';

function getSizes(rawProduct) {
  const rawConfigurableOptions = get(rawProduct, 'configurable_options', []);
  const sizes = get(keyBy(rawConfigurableOptions, 'attribute_code'), 'size.values', []);
  return sizes.map((size) => {
    const text = get(size, 'label', '');
    const id = get(size, 'swatch_data.value', '');
    return {
      text,
      id,
    };
  });
}

function getSwatches(rawProduct) {
  const rawConfigurableOptions = get(rawProduct, 'configurable_options', []);
  const colors = get(keyBy(rawConfigurableOptions, 'attribute_code'), 'color.values', []);
  const rawVariants = get(rawProduct, 'variants', []);
  const variantsGrouped = groupBy(rawVariants, (item) => {
    const attrs = get(item, 'attributes');
    const attrsKeyed = keyBy(attrs, 'code');
    return get(attrsKeyed, 'color.label');
  });
  return colors.map((color) => {
    const text = get(color, 'label', '');
    const css = get(color, 'swatch_data.value', '');
    const image = get(variantsGrouped, `${label}[0].product.media_gallery[0]url`, '');
    return {
      id: text,
      text,
      css,
      image,
    };
  });
}

function normalizeProductItem(rawItem) {
  return {
    id: get(rawItem, 'sku', ''),
    url: `/${get(rawItem, 'url_key', '')}${get(rawItem, 'url_suffix', '')}`,
    name: get(rawItem, 'name', ''),
    basePriceText: get(rawItem, 'price_range.minimum_price.final_price.value', 0),
    thumbnail: get(rawItem, 'thumbnail.url', ''),
    colors: getSwatches(rawItem),
    sizes: getSizes(rawItem),
    // @TODO: can we get this data? if no, just drop it
    reviewCount: 0,
  };
}

function getSortData(rawSubcategoryData) {
  const rawSortFields = get(rawSubcategoryData, 'sort_fields');
  return {
    sortDefault: get(rawSortFields, 'default', 'position'),
    sortOptions: get(rawSortFields, 'options', [])
      .map((option) => ({
        name: get(option, 'label'),
        code: get(option, 'value'),
      })),
  };
}

function getFacetsData(rawSubcategoryData) {
  const rawFacets = get(rawSubcategoryData, 'aggregations', [])
    .filter((facet) => get(facet, 'attribute_code') !== 'category_id'); // skip categories
  return {
    facets: rawFacets.map((rawFilter) => {
      const attr = get(rawFilter, 'attribute_code');
      const rawOptions = get(rawFilter, 'options', []);
      return {
        name: get(rawFilter, 'label'),
        ui: 'buttons',
        options: rawOptions
          .map((option) => ({
            name: get(option, 'label'),
            code: `${attr}:${get(option, 'value')}`,
            matches: get(option, 'count', 0),
            // @TODO: add a color code
            css: '',
          })),
      };
    }),
  };
}

/**
 * Magento 2: subcategory normalizer
 */
function normalizer(rawData) {
  const rawSubcategoryData = get(rawData, 'data.products', {});
  return {
    total: get(rawSubcategoryData, 'total_count', 0),
    totalPages: get(rawSubcategoryData, 'page_info.total_pages', 1),
    currentPage: get(rawSubcategoryData, 'page_info.current_page', 1),
    products: get(rawSubcategoryData, 'items', []).map(normalizeProductItem),
    ...getSortData(rawSubcategoryData),
    ...getFacetsData(rawSubcategoryData),
  };
}

export default normalizer;
