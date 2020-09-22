import GraphQlQuery from '../../types/GraphQlQuery';

/**
 * Magento 2: subcategory sub-categories Graph QL query
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
        children {
          level
          name
          url_path
          url_suffix
          position
        }
      }
    }
  `,
});

export default query;
