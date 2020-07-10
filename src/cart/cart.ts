import withAppData from '../app/withAppData'
import Result from 'react-storefront-connector/Result'
import CartResponse from '../types/CartResponse';
import addToCart from './addToCart'

/**
 * GET: default cart handler
 */
async function cartHandler(req, res): Promise<Result<CartResponse>> {
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

export default function cart(req, res): Promise<any> {
  if (req.method === 'POST') {
    return addToCart(req, res)
  } else {
    return cartHandler(req, res)
  }
}