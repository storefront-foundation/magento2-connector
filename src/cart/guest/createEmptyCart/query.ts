import GraphQlQuery from '../../../types/GraphQlQuery';

/**
 * Magento 2: guest createEmptyCart Graph QL query
 */
const query = (): GraphQlQuery => ({
  query: `
    mutation {
      createEmptyCart
    }
  `,
});

export default query;
