/**
 * Magento 2: cmsBlocks Graph QL query
 */
const query = ({ identifiers }) => ({
  query: `
    {
      cmsBlocks(identifiers: "${identifiers}") {
        items {
          identifier
          title
          content
        }
      }
    }
  `,
});

export default query;
