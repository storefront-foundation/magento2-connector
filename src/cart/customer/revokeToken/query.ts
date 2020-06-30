import GraphQlQuery from '../../../types/GraphQlQuery';

/**
 * Magento 2: customer revokeToken Graph QL query
 */
const query = (): GraphQlQuery => ({
  query: `
    mutation {
      revokeCustomerToken {
        result
      }
    }
  `,
});

export default query;
