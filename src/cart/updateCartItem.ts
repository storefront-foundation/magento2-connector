import get from 'lodash/get';
import { getCookieValue } from '../helpers/nodeCookieHelpers';
import { fetchUpdateCart, normalizeUpdateCart } from './common/updateCart';
import { COOKIES } from '../constants';
import getError from '../helpers/getError';
import CartResponse from '../types/CartResponse';

/**
 * Magento 2: common -> addToCart
 */
async function fetchUC({
  cartId, token = null, cartItemId, quantity = 0,
}): Promise<CartResponse> {
  const rawData = await fetchUpdateCart({
    cartId,
    cartItemId,
    token,
    quantity,
  });

  const error = getError(rawData);
  if (error) {
    return {
      error,
    };
  }

  const data = normalizeUpdateCart(rawData);
  return {
    ...data,
  };
}

/**
 * updateCart handler
 */
export default async function updateCartItem(item, quantity, req, _res): Promise<CartResponse> {
  const cartId = getCookieValue(req, COOKIES.M2_GUEST_CART_ID)
    || getCookieValue(req, COOKIES.M2_CUSTOMER_CART_ID);
  const token = getCookieValue(req, COOKIES.M2_CUSTOMER_TOKEN);
  const cartItemId = Number(get(item, 'id'));

  const responseData = await fetchUC({
    token, cartId, cartItemId, quantity,
  });

  if (responseData.error) {
    throw new Error(responseData.error);
  } else {
    return responseData;
  }
}
