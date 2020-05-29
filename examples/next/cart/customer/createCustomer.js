import get from 'lodash/get';
import { fetchCreateCustomer, normalizeCreateCustomer } from 'magento2-connector/cart/customer/createCustomer';
import getError from 'magento2-connector/helpers/getError';

/**
 * Magento 2: createCustomer handler
 */
export default async function createCustomer(req, res) {
  const firstName = get(req, 'query.firstName');
  const lastName = get(req, 'query.lastName');
  const email = get(req, 'query.email');
  const password = get(req, 'query.password');

  const rawData = await fetchCreateCustomer({
    firstName,
    lastName,
    email,
    password,
  });
  const error = getError(rawData);
  if (error) {
    return res.json({
      error,
    });
  }
  const data = normalizeCreateCustomer(rawData);
  return res.json({
    ...data,
  });
}
