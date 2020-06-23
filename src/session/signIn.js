import get from 'lodash/get'
import fetchGenerateToken from './customer/generateToken'
import fetchCustomerCart from './customer/cart'
import fetchMergeCarts from './common/mergeCarts'
import { getCookieValue, prepareKillCookie, prepareSetCookie, setCookies } from '../helpers/nodeCookieHelpers'
import { COOKIES } from '../constants'

export default async function signIn(req, res) {
  try {
    const body = JSON.parse(get(req, 'body', '{}'))
    const email = get(body, 'email')
    const password = get(body, 'password')

    const { token } = await fetchGenerateToken({ email, password })
    if (!token) {
      // unsuccessful login
      return res.status(401).json({
        error:
          'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.',
        signedIn: false,
      })
    }

    // fetch customer cart data
    const customerCartData = await fetchCustomerCart(token)
    let { cart, customerCartId } = customerCartData

    // if guest has cart items -> merge it with logged in customer cart
    const guestCartIdCookieValue = getCookieValue(req, COOKIES.M2_GUEST_CART_ID)
    if (guestCartIdCookieValue) {
      const sourceCartId = guestCartIdCookieValue
      const destinationCartId = customerCartId
      const mergeCartsData = await fetchMergeCarts({ token, sourceCartId, destinationCartId })
      cart = get(mergeCartsData, 'cart', cart)
      customerCartId = get(mergeCartsData, 'customerCartId', customerCartId)
    }

    // @TODO: also customer account data like firstName, lastName can be fetched here
    // Docs: https://devdocs.magento.com/guides/v2.3/graphql/queries/customer.html
    // ...

    const cookiesToSet = []
    cookiesToSet.push(prepareSetCookie(COOKIES.M2_CUSTOMER_TOKEN, token, { maxAge: 3600 * 24 * 30 })) // set customer token cookie for 30 days
    cookiesToSet.push(prepareSetCookie(COOKIES.M2_CUSTOMER_CART_ID, customerCartId, { maxAge: 3600 * 24 * 30 })) // set customer cart ID cookie for 30 days
    cookiesToSet.push(prepareKillCookie(COOKIES.M2_GUEST_CART_ID)) // kill guest cart ID cookie just in case (prevents possible cart merges issues)
    setCookies(res, cookiesToSet)

    return res.status(200).send({
      cart,
      signedIn: true,
    })
  } catch (error) {
    return res.status(400).send({
      error: get(error, 'message', 'An error occurred during sign in'),
    })
  }
}
