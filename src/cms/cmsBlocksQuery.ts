import GraphQlQuery from '../types/GraphQlQuery';

/**
 * Magento 2: cmsBlocks Graph QL query
 */
const cmsBlocksQuery = ({ identifiers }): GraphQlQuery => ({
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

export default cmsBlocksQuery;
