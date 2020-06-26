import cartItemProductDefaultSchema from '../../schemas/cartItemProductDefaultSchema';
import GraphQlQuery from '../../../types/GraphQlQuery';

/**
 * Magento 2: common mergeCarts Graph QL query
 */
const query = ({
  sourceCartId,
  destinationCartId,
  cartItemProductSchema = cartItemProductDefaultSchema,
}): GraphQlQuery => ({
  query: `
    mutation {
      mergeCarts(source_cart_id: "${sourceCartId}", destination_cart_id: "${destinationCartId}") {
        id,
        items {
          id
          quantity
          product {
            ${cartItemProductSchema}
          }
        }
      }
    }
  `,
});

export default query;
