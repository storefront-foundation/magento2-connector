export default interface MenuItem {
  /**
   * Text for the menu item
   */
  text?: string

  /**
   * The URL of an image to display to the left of the text
   */
  image?: string

  /**
   * HTML or data to display in the header of the menu card for this item
   */
  header?: any

  /**
   * HTML or data to display in the footer of the menu card for this item
   */
  footer?: any

  /**
   * When `true` or `false`, the item will be rendered as an, expandable section.
   * When `undefined` the menu will slide to the next level of the menu when the item is clicked.
   */
  expanded?: boolean

  /**
   * the Next.js route pattern
   */
  href?: string

  /**
   * the URL for the link
   */
  as?: string

  /**
   * Child items
   */
  items: Array<MenuItem>
}
