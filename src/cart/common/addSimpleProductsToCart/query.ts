import cartItemProductDefaultSchema from '../../schemas/cartItemProductDefaultSchema';
import GraphQlQuery from '../../../types/GraphQlQuery';

/**
 * Magento 2: common addSimpleProductsToCart Graph QL query
 */
const query = ({
  cartId,
  sku,
  quantity = 1,
  cartItemProductSchema = cartItemProductDefaultSchema,
}): GraphQlQuery => ({
  query: `
    mutation {
      addSimpleProductsToCart(
        input: {
          cart_id: "${cartId}"
          cart_items: [
            {
              data: {
                quantity: ${quantity}
                sku: "${sku}"
              }
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
