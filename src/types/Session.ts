import Cart from './Cart';

export default interface Session {
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
