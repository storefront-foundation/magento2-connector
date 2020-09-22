import GraphQlQuery from '../types/GraphQlQuery';

const productItemSchema = `
  name
  sku
  url_key
  thumbnail { url }
  price_range {
    minimum_price {
      regular_price { value currency }
      final_price { value currency }
      discount { amount_off percent_off }
    }
  }

  ... on ConfigurableProduct {
    configurable_options {
      attribute_code
      values {
        label
        swatch_data { value }
      }
    }
    variants {
      attributes { code label }
      product {
        media_gallery { url disabled }
      }
    }
  }
`;

const filtersSchema = `
  aggregations {
    attribute_code
    count
    label
    options {
      count
      label
      value
    }
  }
`;

const sortSchema = `
  sort_fields {
    default
    options {
      label
      value
    }
  }
`;

const pageInfoSchema = `
  total_count
  page_info {
    page_size
    current_page
    total_pages
  }
`;

/**
 * Magento 2: subcategory Graph QL query
 */
const query = ({
  categoryId = null,
  pageSize = 16,
  currentPage = 1,
  filter = '',
  sort = '',
  search = '',
}): GraphQlQuery => {
  const searchQuery = search ? `search: "${search}"` : '';
  const sortQuery = sort ? `sort: { ${sort} }` : '';
  const categoryIdQuery = categoryId ? `category_id: { eq: "${categoryId}" }` : '';
  const filterQuery = categoryIdQuery || filter ? `
    filter: {
      ${categoryIdQuery}
      ${filter}
    }` : '';
  return {
    query: `
      {
        products(
          pageSize: ${pageSize}
          currentPage: ${currentPage}
          ${sortQuery}
          ${filterQuery}
          ${searchQuery}
        ) {
          ${filtersSchema}
          ${sortSchema}
          ${pageInfoSchema}
          items {
            ${productItemSchema}
          }
        }
      }
    `,
  };
};

export default query;
