import { getCookieValue } from '../helpers/nodeCookieHelpers'
import {
  fetchAddSimpleProductsToCart,
  normalizeAddSimpleProductsToCart,
} from './common/addSimpleProductsToCart'
import { COOKIES } from '../constants'
import getError from '../helpers/getError'
import withAppData from '../app/withAppData'
import get from 'lodash/get'

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
 * POST: add to cart handler
 */
async function addToCartHandler(req, res) {
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
  console.log('__ : cart -> responseData', responseData)
  if (responseData.error) {
    return res.status(400).json({
      error: responseData.error,
    })
  }
  return res.status(200).json({
    ...responseData,
  })
}

/**
 * GET: default cart handler
 */
async function cartHandler(req, res) {
  const data = await withAppData(req, () => Promise.resolve({
    title: `Cart`,
    cart: {},
    breadcrumbs: [
      {
        text: 'Home',
        href: '/',
      },
    ],
  }))
  return res.status(200).send({ ...data })
}

export default function cart(req, res) {
  if (req.method === 'POST') {
    return addToCartHandler(req, res)
  } else {
    return cartHandler(req, res)
  }
}