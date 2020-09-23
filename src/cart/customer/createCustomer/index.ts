import createCustomerQuery from './query';
import fetchCreateCustomer from './fetcher';
import normalizeCreateCustomer from './normalizer';

/**
 * Usage example (in handler):
 *
 * import {
 *   fetchCreateCustomer, normalizeCreateCustomer,
 * } from 'api/magento/cart/customer/createCustomer';
 * ...
 * ...
 * const rawData = await fetchCreateCustomer(queryData);
 * const data = normalizeCreateCustomer(rawData);
 * ...
 * ...
 */
export {
  createCustomerQuery,
  fetchCreateCustomer,
  normalizeCreateCustomer,
};
