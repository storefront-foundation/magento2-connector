import { getCookieValue } from '../helpers/nodeCookieHelpers'
import {
  fetchAddSimpleProductsToCart,
  normalizeAddSimpleProductsToCart,
} from './common/addSimpleProductsToCart'
import { COOKIES } from '../constants'
import getError from '../helpers/getError'
import get from 'lodash/get'
import CartResponse from '../types/CartResponse';

/**
 * Magento 2: common -> addToCart
 */
async function fetchAddToCart({
  token,
  cartId,
  sku,
  quantity
}): Promise<CartResponse> {
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
 * add to cart handler
 */
export default async function addToCart(req, res): Promise<CartResponse> {
  const cartId = getCookieValue(req, COOKIES.M2_GUEST_CART_ID) || getCookieValue(req, COOKIES.M2_CUSTOMER_CART_ID)
  const token = getCookieValue(req, COOKIES.M2_CUSTOMER_TOKEN)

  const body = JSON.parse(get(req, 'body', '{}'));
  const product = get(body, 'product')
  const quantity = get(body, 'quantity')
  const size = get(body, 'size')
  const color = get(body, 'color')

  let sku = get(product, 'sku')
  if (get(product, 'isConfigurableProduct') && size && color) {
    sku += `-${size}-${color}`
  }

  const responseData = await fetchAddToCart({ token, cartId, sku, quantity })
  if (responseData.error) {
    return res.status(400).json({
      error: responseData.error,
    })
  }
  return res.status(200).json({
    ...responseData,
  })
}