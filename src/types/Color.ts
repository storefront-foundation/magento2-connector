import Media from './Media'
import ProductMedia from './ProductMedia'

/**
 * Represents a product color option.
 */
export default interface Color {
  /**
   * The color code
   */
  id: string
  /**
   * The text to display
   */
  text: string
  /**
   * A CSS color value for the swatch. Use either `color` or `image`.
   */
  color?: string
  /**
   * An image for the watch. Use either `color` or `image`.
   */
  image?: Media
  /**
   * Product images to display in the carousel when the color is selected.
   */
  media?: ProductMedia
}