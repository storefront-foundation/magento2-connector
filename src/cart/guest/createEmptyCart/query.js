/**
 * Magento 2: guest createEmptyCart Graph QL query
 */
const query = () => ({
  query: `
    mutation {
      createEmptyCart
    }
  `,
});

export default query;
