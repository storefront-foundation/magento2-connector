import cartItemProductDefaultSchema from '../../schemas/cartItemProductDefaultSchema';
import GraphQlQuery from '../../../types/GraphQlQuery';

/**
 * Magento 2: customer cart Graph QL query
 */
const query = ({
  cartItemProductSchema = cartItemProductDefaultSchema,
}): GraphQlQuery => ({
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
