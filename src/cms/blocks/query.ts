import GraphQlQuery from '../../types/GraphQlQuery';

/**
 * Magento 2: cmsBlocks Graph QL query
 */
const query = ({ identifiers }): GraphQlQuery => ({
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
