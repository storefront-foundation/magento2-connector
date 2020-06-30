import GraphQlQuery from '../../../types/GraphQlQuery';

/**
 * Magento 2: customer generateToken Graph QL query
 */
const query = (email, password): GraphQlQuery => ({
  query: `
  mutation {
    generateCustomerToken(
      email: "${email}",
      password: "${password}"
    ) {
      token
    }
  }`,
});

export default query;
