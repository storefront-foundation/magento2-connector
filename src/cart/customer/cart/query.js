import cartItemProductDefaultSchema from '../../schemas/cartItemProductDefaultSchema';

/**
 * Magento 2: customer cart Graph QL query
 */
const query = ({
  cartItemProductSchema = cartItemProductDefaultSchema,
}) => ({
  query: `{
    customerCart {
      id
      items {
        id
        quantity
        product {
          ${cartItemProductSchema}
        }
      }
    }
  }`,
});

export default query;
