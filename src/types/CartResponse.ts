import Cart from 'react-storefront-connector/Cart'
import Error from './Error'

export default interface CartResponse extends Error {
  /**
   * The ID of guest cart
   */
  guestCartId?: string

  /**
   * The ID of customer cart
   */
  customerCartId?: string

  /**
   * Cart data
   */
  cart?: Cart
}