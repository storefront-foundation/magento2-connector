import Media from './Media'

/**
 * Represents a link to another page.
 */
export default interface Link {
  /**
   * Text to display
   */
  text: string
  /**
   * The URL
   */
  as: string
  /**
   * The Next.js route pattern
   */
  href: string
  /**
   * A thumbnail image to display
   */
  thumbnail?: Media
}