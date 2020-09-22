import SignUpData from 'react-storefront-connector/SignUpData';
import { fetchCreateCustomer, normalizeCreateCustomer } from '../../cart/customer/createCustomer';
import getError from '../../helpers/getError';

/**
 * Magento 2: customer -> createCustomer
 */
export default async function createCustomer({
  firstName,
  lastName,
  email,
  password,
}: SignUpData): Promise<any> {
  const rawData = await fetchCreateCustomer({
    firstName,
    lastName,
    email,
    password,
  });

  const error = getError(rawData);
  if (error) {
    return {
      error,
    };
  }

  const data = normalizeCreateCustomer(rawData);
  return {
    ...data,
  };
}
