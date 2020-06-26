import {
  fetchAddSimpleProductsToCart,
  normalizeAddSimpleProductsToCart,
} from './common/addSimpleProductsToCart'
import { setCookies, prepareSetCookie } from '../helpers/nodeCookieHelpers'
import { COOKIES } from '../constants'
import getError from '../helpers/getError'
import get from 'lodash/get'
import obtainSession from '../session/guest/obtainSession'

/**
 * Magento 2: common -> addToCart
 */
async function fetchAddToCart({
  token,
  cartId,
  sku,
  quantity
}) {
  const rawData = await fetchAddSimpleProductsToCart({
    token,
    cartId,
    sku,
    quantity,
  })

  const error = getError(rawData)
  if (error) {
    return {
      error,
    }
  }

  const data = normalizeAddSimpleProductsToCart(rawData)
  return {
    ...data,
  }
}

/**
 * POST: add to cart from AMP handler
 * Payload data format expected: application/x-www-form-urlencoded
 */
export default async function addToCartFromAmp(req, res) {
  const source = get(req, 'query.__amp_source_origin', '')
  const redirectLocation = `${source}/cart`

  const body = get(req, 'body', '{}')
  const quantity = Number(get(body, 'quantity', 1))
  const size = get(body, 'size')
  const color = get(body, 'color')

  let sku = get(body, 'sku')
  if (get(body, 'isConfigurableProduct') === 'true' && size && color) {
    sku += `-${size}-${color}`
  }

  const { guestCartId } = await obtainSession()
  const responseData = await fetchAddToCart({ cartId: guestCartId, sku, quantity })
  if (responseData.error) {
    return res.status(400).json({
      error: responseData.error,
    })
  }

  setCookies(res, [prepareSetCookie(COOKIES.M2_GUEST_CART_ID, guestCartId, { maxAge: 3600 * 24 * 7 })]) // set guest cart id cookie for 7 days
  res.writeHead(301, {
    'AMP-Redirect-To': redirectLocation,
    'Access-Control-Expose-Headers': 'AMP-Redirect-To',
  })
  return res.end()
}
