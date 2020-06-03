import { fetchCreateCustomer, normalizeCreateCustomer } from 'react-storefront-magento2-connector/cart/customer/createCustomer';

import get from 'lodash/get';
import getError from 'react-storefront-magento2-connectorr/helpers/getError';

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
