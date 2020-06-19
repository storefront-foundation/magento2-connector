import CartItem from './CartItem'

export default interface Cart {
  /**
   * Cart items
   */
  items: CartItem[],
}
