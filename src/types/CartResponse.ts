import _CartResponse from 'react-storefront-connector/CartResponse';
import Error from './Error';

export default interface CartResponse extends _CartResponse, Error {
  /**
   * The ID of guest cart
   */
  guestCartId?: string

  /**
   * The ID of customer cart
   */
  customerCartId?: string
}
