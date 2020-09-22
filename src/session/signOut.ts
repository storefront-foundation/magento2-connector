import Session from 'react-storefront-connector/Session';
import revokeToken from './customer/revokeToken';
import obtainSession from './guest/obtainSession';
import { COOKIES } from '../constants';
import {
  getCookieValue,
  prepareKillCookie,
  prepareSetCookie,
  setCookies,
} from '../helpers/nodeCookieHelpers';

export default async function signOut(req, res): Promise<Session> {
  const token = getCookieValue(req, COOKIES.M2_CUSTOMER_TOKEN);

  if (!token) {
    throw new Error(`${COOKIES.M2_CUSTOMER_TOKEN} cookie doesn't exist`);
  }

  const { result } = await revokeToken(token);

  if (!result) {
    throw new Error('An error occured during customer token revoke');
  }

  // obtain new session after successful sign out
  const { guestCartId } = await obtainSession();
  const cookiesToSet = [];
  cookiesToSet.push(
    prepareSetCookie(COOKIES.M2_GUEST_CART_ID, guestCartId, { maxAge: 3600 * 24 * 7 }),
  ); // set guest cart id cookie for 7 days
  cookiesToSet.push(prepareKillCookie(COOKIES.M2_CUSTOMER_TOKEN)); // kill customer token cookie
  cookiesToSet.push(prepareKillCookie(COOKIES.M2_CUSTOMER_CART_ID)); // kill customer cart id cookie
  setCookies(res, cookiesToSet);

  return {
    signedIn: false,
    cart: { items: [] },
  };
}
