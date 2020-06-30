export default interface Size {
  /**
   * The size code
   */
  id: string
  /**
   * The text to display
   */
  text: string
  /**
   * Set to `true` if the size is not available
   */
  disabled?: boolean
}