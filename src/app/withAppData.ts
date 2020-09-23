import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest';
import getAppData from './getAppData';

export default function withAppData(req, getPageData) {
  return fulfillAPIRequest(req, {
    appData: getAppData,
    pageData: getPageData,
  });
}
