import cartItemProductDefaultSchema from '../../schemas/cartItemProductDefaultSchema';
import GraphQlQuery from '../../../types/GraphQlQuery';

/**
 * Magento 2: common updateCart Graph QL query
 */
const query = ({
  cartId,
  cartItemId,
  quantity = 0,
  cartItemProductSchema = cartItemProductDefaultSchema,
}): GraphQlQuery => ({
  query: `
    mutation {
      updateCartItems(
        input: {
          cart_id: "${cartId}"
          cart_items: [
            {
              cart_item_id: ${cartItemId}
              quantity: ${quantity}
            }
          ]
        }
      ) {
        cart {
          items {
            id
            quantity
            product {
              ${cartItemProductSchema}
            }
          }
        }
      }
    }
  `,
});

export default query;
