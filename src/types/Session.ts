import Cart from './Cart';
import Error from './Error';

export default interface Session extends Error {
  /**
   * The user's login status
   */
  signedIn: boolean
  /**
   * Cart data
   */
  cart: Cart,
  /**
   * The user's preferred currency
   */
  currency?: string
  /**
   * The user's email
   */
  email?: string
}
