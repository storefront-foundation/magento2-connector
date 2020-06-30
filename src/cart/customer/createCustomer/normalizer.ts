import get from 'lodash/get';

/**
 * Magento 2: createCustomer normalizer
 */
function normalizer(rawData): any {
  const rawCustomerData = get(rawData, 'data.createCustomer.customer', null);
  const firstName = get(rawCustomerData, 'firstname', null);
  const lastName = get(rawCustomerData, 'lastname', null);
  const isSubscribed = get(rawCustomerData, 'is_subscribed', null);
  return {
    account: {
      firstName,
      lastName,
      isSubscribed,
    },
  };
}

export default normalizer;
