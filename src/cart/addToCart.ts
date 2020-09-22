import get from 'lodash/get';
import { getCookieValue } from '../helpers/nodeCookieHelpers';
import {
  fetchAddSimpleProductsToCart,
  normalizeAddSimpleProductsToCart,
} from './common/addSimpleProductsToCart';
import { COOKIES } from '../constants';
import getError from '../helpers/getError';
import CartResponse from '../types/CartResponse';
import obtainSession from '../session/guest/obtainSession';

/**
 * Magento 2: common -> addToCart
 */
async function fetchAddToCart({
  token, cartId, sku, quantity,
}): Promise<CartResponse> {
  const rawData = await fetchAddSimpleProductsToCart({
    token,
    cartId,
    sku,
    quantity,
  });

  const error = getError(rawData);
  if (error) {
    return {
      error,
    };
  }

  const data = normalizeAddSimpleProductsToCart(rawData);
  return {
    ...data,
  };
}

/**
 * add to cart handler
 */
export default async function addToCart(product, quantity, req/* , res */): Promise<CartResponse> {
  const cartId = getCookieValue(req, COOKIES.M2_GUEST_CART_ID)
    || getCookieValue(req, COOKIES.M2_CUSTOMER_CART_ID)
    || (await obtainSession()); // will get here in AMP

  const token = getCookieValue(req, COOKIES.M2_CUSTOMER_TOKEN);
  const body = get(req, 'body', {});
  const size = get(body, 'size');
  const color = get(body, 'color');
  let sku = get(product, 'sku');

  if (get(product, 'isConfigurableProduct') && size && color) {
    sku += `-${size}-${color}`;
  }

  const responseData = await fetchAddToCart({
    token, cartId, sku, quantity,
  });

  if (responseData.error) {
    throw new Error(responseData.error);
  } else {
    return responseData;
  }
}
