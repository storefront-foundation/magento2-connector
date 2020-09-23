import GraphQlQuery from '../../types/GraphQlQuery';

/**
 * Magento 2: subcategory id Graph QL query
 */
const query = ({ urlKey }): GraphQlQuery => ({
  query: `
    {
      categoryList(
        filters: {
          url_key: {
            eq: "${urlKey}"
          }
        }
      ) {
        id
        name
      }
    }
  `,
});

export default query;
