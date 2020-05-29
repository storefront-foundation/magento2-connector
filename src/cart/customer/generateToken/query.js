/**
 * Magento 2: customer generateToken Graph QL query
 */
const query = (email, password) => ({
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
