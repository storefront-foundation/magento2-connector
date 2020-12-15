import GraphQlQuery from '../types/GraphQlQuery';

const specsAttributes = [
  // 'style_general',
  // 'material',
  // 'pattern',
  // 'climate',
  // 'category_gear',
  // 'gender',
  // 'activity',
];

const customAttributeMetadata = `
  customAttributeMetadata(
    attributes: [
      ${specsAttributes.reduce((str, spec) => `${str}{
          attribute_code: "${spec}",
          entity_type: "4"
        }\n`, '')}
    ]
  ) {
    items {
      attribute_code
      attribute_type
      attribute_options {
      value
      label
    }
    }
  }
`;

/**
 * Magento 2: product query
 */
const query = (urlKey): GraphQlQuery => ({
  query: `
    {
      ${customAttributeMetadata}
      products(filter: {
        url_key: {
          eq: "${urlKey}"
        }
      }) {
        items {
          id,
          image {
            label
            url
          },
          name,
          description {
            html
          },

          # specs
          ${specsAttributes.reduce((str, val) => `${str}${val}\n`, '')}

          sku,
          media_gallery {
            label
            url
          },
          only_x_left_in_stock,
          stock_status,
          price_range {
            maximum_price {
              final_price {
                currency,
                value
              },
              discount{
                amount_off
              },
              fixed_product_taxes{
                amount {
                  currency,
                  value
                }, 
                label
              }
              regular_price{
                currency,
                value
              }
            }
          }
          ... on ConfigurableProduct {
            configurable_options {
              attribute_code,
              label,
              id,
              values {
                label
                swatch_data{
                  value,
                  ...on ImageSwatchData {
                    thumbnail
                  }
                },
              }
            },
            variants {
              attributes {
                code,
                label
              },
              product {
                name,
                url_key,
                url_suffix,
                sku,
                swatch_image,
                media_gallery {
                  url
                },
              }
            }
          }
        }
      }
    }
  `,
});

export default query;
