import CartResponse from '../types/CartResponse';
import updateCart from './updateCartItem';

/**
 * removeCartItem handler
 */
export default function removeCartItem(item, req, res): Promise<CartResponse> {
  return updateCart(item, 0, req, res);
}
