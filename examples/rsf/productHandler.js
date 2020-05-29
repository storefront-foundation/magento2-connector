/**
 * To be used as `/api/p/[productId].js` RSF product handler
 */
import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest';
import withCaching from 'react-storefront/utils/withCaching';
import get from 'lodash/get';
import { fetchProduct, normalizeProduct } from 'magento2-connector/product';
import getGlobalData from './getGlobalData';

async function getPageData(productId) {
  const pid = productId.replace('.html', '');
  const rawProduct = await fetchProduct(pid);
  const product = normalizeProduct(rawProduct, pid);

  return {
    title: `Product ${pid}`,
    product,
    breadcrumbs: [
      {
        text: 'Home',
        href: '/',
      },
    ],
  };
}

async function productHandler(req, res) {
  const productId = get(req, 'query.productId');

  const result = await fulfillAPIRequest(req, {
    appData: getGlobalData,
    pageData: () => getPageData(productId),
  });

  res.json(result);
}

export default withCaching(productHandler, 60 * 60 * 24); // cache with the service worker for 24 hours
