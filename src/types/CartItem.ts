import Media from './Media';

export default interface CartItem {
  /**
   * The ID of the cart item product
   */
  id: string

  /**
   * The quantity
   */
  quantity: number,

  /**
   * The name of the cart item product
   */
  name: string

  /**
   * The PDP URL
   */
  url: string

  /**
   * The price as a number
   */
  price?: number

  /**
   * The text to display for the price
   */
  priceText?: string

  /**
   * The base price to display crossed out and replaced with priceText to indicate a sale.
   */
  basePriceText?: string

  /**
   * A numeric product rating from 0 to 5 in increments of 0.5
   */
  rating?: number

  /**
   * The number of reviews
   */
  reviewCount?: number

  /**
   * The product thumbnail
   */
  thumbnail: Media

  /**
   * Available color options
   */
  // colors?: Color[]
}
