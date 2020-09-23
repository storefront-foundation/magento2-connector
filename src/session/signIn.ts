/* eslint-disable max-len */
import get from 'lodash/get';
import Session from 'react-storefront-connector/Session';
import fetchGenerateToken from './customer/generateToken';
import fetchCustomerCart from './customer/cart';
import fetchMergeCarts from './common/mergeCarts';
import {
  getCookieValue,
  prepareKillCookie,
  prepareSetCookie,
  setCookies,
} from '../helpers/nodeCookieHelpers';
import { COOKIES } from '../constants';

export default async function signIn(
  email: string,
  password: string,
  req: Request,
  res: Response,
): Promise<Session> {
  const { token } = await fetchGenerateToken({ email, password });

  if (!token) {
    // unsuccessful login
    throw new Error(
      'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.',
    );
  }

  // fetch customer cart data
  const customerCartData = await fetchCustomerCart(token);
  let { cart, customerCartId } = customerCartData;

  // if guest has cart items -> merge it with logged in customer cart
  const guestCartIdCookieValue = getCookieValue(req, COOKIES.M2_GUEST_CART_ID);
  if (guestCartIdCookieValue) {
    const sourceCartId = guestCartIdCookieValue;
    const destinationCartId = customerCartId;
    const mergeCartsData = await fetchMergeCarts({ token, sourceCartId, destinationCartId });
    cart = get(mergeCartsData, 'cart', cart);
    customerCartId = get(mergeCartsData, 'customerCartId', customerCartId);
  }

  // @TODO: also customer account data like firstName, lastName can be fetched here
  // Docs: https://devdocs.magento.com/guides/v2.3/graphql/queries/customer.html
  // ...

  const cookiesToSet = [];
  cookiesToSet.push(prepareSetCookie(COOKIES.M2_CUSTOMER_TOKEN, token, { maxAge: 3600 * 24 * 30 })); // set customer token cookie for 30 days
  cookiesToSet.push(
    prepareSetCookie(COOKIES.M2_CUSTOMER_CART_ID, customerCartId, { maxAge: 3600 * 24 * 30 }),
  ); // set customer cart ID cookie for 30 days
  cookiesToSet.push(prepareKillCookie(COOKIES.M2_GUEST_CART_ID)); // kill guest cart ID cookie (prevents possible cart merges issues)
  setCookies(res, cookiesToSet);

  return {
    cart,
    signedIn: true,
  };
}
