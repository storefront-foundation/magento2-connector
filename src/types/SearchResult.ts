import _SearchResult from 'react-storefront-connector/SearchResult'

export default interface SearchResult extends _SearchResult {
  /**
   * Page id
   */
  id: string,
  /**
   * Page name
   */
  name: string,
  /**
   * Page title
   */
  title: string,
  /**
   * Defines if the page is landing
   */
  isLanding?: boolean
}
