/**
 * Magento 2: subcategory id Graph QL query
 */
const query = ({ urlKey }) => ({
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
