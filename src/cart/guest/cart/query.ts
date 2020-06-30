import cartItemProductDefaultSchema from '../../schemas/cartItemProductDefaultSchema';
import GraphQlQuery from '../../../types/GraphQlQuery';

/**
 * Magento 2: guest cart Graph QL query
 */
const query = ({
  cartId,
  cartItemProductSchema = cartItemProductDefaultSchema,
}): GraphQlQuery => ({
  query: `
    {
      cart (
        cart_id: "${cartId}"
      ) {
        id
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
