import Media from './Media';
import Color from './Color';

/**
 * Data for displaying a product link in a product list.
 */
export default interface ProductSummary {
  /**
   * The ID of the product
   */
  id: string
  /**
   * The name of the product
   */
  name?: string
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
  colors?: Color[]
}