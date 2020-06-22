import get from 'lodash/get'
import revokeToken from './customer/revokeToken'
import obtainSession from './guest/obtainSession'
import { COOKIES } from '../constants'
import { getCookieValue, killCookie } from '../helpers/nodeCookieHelpers'

export default async function signOut(req, res) {
  try {
    const token = getCookieValue(req, COOKIES.M2_CUSTOMER_TOKEN)
    if (!token) {
      throw new Error(`${COOKIES.M2_CUSTOMER_TOKEN} cookie doesn\'t exist`)
    }

    const { result } = await revokeToken(token)
    if (!result) {
      throw new Error('An error occured during customer token revoke')
    }

    // obtain new session after successful sign out
    const { guestCartId } = await obtainSession()
    setCookie(res, COOKIES.M2_GUEST_CART_ID, guestCartId, { maxAge: 1000 * 3600 * 24 * 7 }) // set guest cart id cookie for 7 days
    killCookie(res, COOKIES.M2_CUSTOMER_TOKEN) // kill customer token cookie
    killCookie(res, COOKIES.M2_CUSTOMER_CART_ID) // kill customer cart id cookie

    return res.status(200).send({
      signedIn: false,
      cart: {
        items: [],
      },
    })
  } catch (error) {
    return res.status(400).send({
      error: get(error, 'message', 'An error occurred during sign out'),
    })
  }
}
