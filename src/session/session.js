import { getCookieValue, killCookie } from '../helpers/nodeCookieHelpers';
import obtainSession from './guest/obtainSession';
import guestCart from './guest/cart';
import customerCart from './customer/cart';

const COOKIES = {
  M2_GUEST_CART_ID: 'M2_guestCartId',
  M2_CUSTOMER_CART_ID: 'M2_customerCartId',
  M2_CUSTOMER_TOKEN: 'M2_token',
};

export default async function session(req, res) {
  // ### 1 - LOGGED IN SESSION
  const tokenCookieValue = getCookieValue(req, COOKIES.M2_CUSTOMER_TOKEN);
  if (tokenCookieValue) {
    const customerCartData = await customerCart(tokenCookieValue);
    if (customerCartData.error) {
      return res.status(400).json({
        error: customerCartData.error,
      });
    }
    const { cart, customerCartId } = customerCartData;
    res.cookie(COOKIES.M2_CUSTOMER_TOKEN, tokenCookieValue, { maxAge: 1000 * 3600 * 24 * 30 }); // renew customer token cookie for 30 more days
    res.cookie(COOKIES.M2_CUSTOMER_CART_ID, customerCartId, { maxAge: 1000 * 3600 * 24 * 30 }); // set/renew customer cart ID cookie for 30 days
    killCookie(res, COOKIES.M2_GUEST_CART_ID); // kill guest cart ID cookie just in case (prevents possible cart merges issues)
    return res.status(200).json({
      signedIn: true,
      cart,
    });
  }

  // ### 2 - GUEST SESSION
  // # 2.1 - Obtain returning guest session
  killCookie(res, COOKIES.M2_CUSTOMER_CART_ID); // kill customer cart ID cookie just in case (prevents possible cart merges issues)
  const guestCartIdCookieValue = getCookieValue(req, COOKIES.M2_GUEST_CART_ID);
  if (guestCartIdCookieValue) {
    const guestCartData = await guestCart(guestCartIdCookieValue);
    if (guestCartData.error) {
      return res.status(400).json({
        error: guestCartData.error,
      });
    }
    const { cart } = guestCartData;
    res.cookie(COOKIES.M2_GUEST_CART_ID, guestCartIdCookieValue, { maxAge: 1000 * 3600 * 24 * 7 }); // renew cookie for 7 more days
    return res.status(200).json({
      signedIn: false,
      cart,
    });
  }

  // # 2.2 - Obtain new guest session
  const obtainSessionData = await obtainSession();
  if (obtainSessionData.error) {
    return res.status(400).json({
      error: obtainSessionData.error,
    });
  }
  const { guestCartId } = obtainSessionData;
  res.cookie(COOKIES.M2_GUEST_CART_ID, guestCartId, { maxAge: 1000 * 3600 * 24 * 7 }); // set guest cart id cookie for 7 days
  return res.status(200).json({
    signedIn: false,
    cart: {
      items: [],
    },
  });
}
