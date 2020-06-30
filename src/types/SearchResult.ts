import Media from './Media'
import ProductSummary from './ProductSummary'
import CmsSlot from './CmsSlots'

export default interface SearchResult {
  /**
   * the total number of matching items
   */
  total: number
  /**
   * the current page being returned
   */
  page: number
  /**
   * the total number of pages
   */
  totalPages: number
  /**
   * the filters that were applied
   */
  filters?: string[]
  /**
   * groups of filters to display
   */
  facets?: Facet[]
  /**
   * the sort that was applied
   */
  sort: string
  /**
   * available sort options to display
   */
  sortOptions: SortOption[]
  /**
   * Matching products
   */
  products: ProductSummary[]
  /**
   * HTML snippets from the CMS to display
   */
  cmsSlots: { [id: string]: CmsSlot }
  /**
   * Defines if the page is landing
   */
  isLanding?: boolean
}

export interface Facet {
  /**
   * the name of the facet
   */
  name: string
  /**
   * determines the type of UI element displayed
   */
  ui: 'buttons' | 'checkboxes'
  /**
   * the filters in the group
   */
  options: Filter[]
}

export interface Filter {
  /**
   * the name of the filter
   */
  name: string
  /**
   * the code to include in the fetch call when selected
   */
  code: string
  /**
   * the swatch image to display
   */
  image?: Media
  /**
   * A css color code to display in a swatch
   */
  css?: string
  /**
   * The number of products that match this facet
   */
  matches?: number
}

export interface SortOption {
  /**
   * the option text to display
   */
  name: string
  /**
   * the code to include in the fetch call when selected
   */
  code: string
}