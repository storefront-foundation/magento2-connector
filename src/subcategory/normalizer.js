import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import groupBy from 'lodash/groupBy';

function getSizes(rawProduct) {
  const rawConfigurableOptions = get(rawProduct, 'configurable_options', []);
  const sizes = get(keyBy(rawConfigurableOptions, 'attribute_code'), 'size.values', []);
  return sizes.map((size) => {
    const label = get(size, 'label', '');
    const value = get(size, 'swatch_data.value', '');
    return {
      label,
      value,
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
    const label = get(color, 'label', '');
    const rgb = get(color, 'swatch_data.value', '');
    const thumbnail = get(variantsGrouped, `${label}[0].product.media_gallery[0]url`, '');
    return {
      label,
      rgb,
      thumbnail,
    };
  });
}

function normalizeProductItem(rawItem) {
  return {
    name: get(rawItem, 'name', ''),
    url: `/${get(rawItem, 'url_key', '')}${get(rawItem, 'url_suffix', '')}`,
    thumbnail: get(rawItem, 'thumbnail.url', ''),
    sku: get(rawItem, 'sku', ''),
    basePrice: get(rawItem, 'price_range.minimum_price.final_price.value', 0),
    swatches: getSwatches(rawItem),
    sizes: getSizes(rawItem),
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

function getFiltersData(rawSubcategoryData) {
  const rawFilters = get(rawSubcategoryData, 'aggregations', [])
    .filter((filter) => get(filter, 'attribute_code') !== 'category_id'); // skip categories
  return {
    filters: rawFilters.map((rawFilter) => {
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
    items: get(rawSubcategoryData, 'items', []).map(normalizeProductItem),
    ...getSortData(rawSubcategoryData),
    ...getFiltersData(rawSubcategoryData),
  };
}

export default normalizer;
