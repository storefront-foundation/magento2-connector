import ProductSummary from './ProductSummary'
import ProductMedia from './ProductMedia'
import Color from './Color'
import Size from './Size'
import CmsSlots from './CmsSlots'
import Link from './Link'

/**
 * Data for the PDP
 */
export default interface ProductPageData {
  breadcrumbs: Link[]
  product: Product
}

/**
 * Information about a product
 */
export interface Product extends ProductSummary {
  /**
   * Product SKU
   */
  sku?: string
  /**
   * The id used for looking up reviews for the product
   */
  reviewsKey?: string
  /**
   * The product description
   */
  description?: string
  /**
   * The product specs
   */
  specs?: string
  /**
   * HTML snippets from the CMS. Keys are slot names, values are HTML strings
   */
  slots?: CmsSlots
  /**
   * Product images and videos
   */
  media: ProductMedia
  /**
   * Available sizes
   */
  sizes?: Size[]
  /**
   * Available colors
   */
  colors?: Color[]
  // ----------------------------------------------
  /**
   * Defines if the type is configurable product
   */
  isConfigurableProduct?: boolean
  /**
   * Defines if the product has size options
   */
  hasSizes?: boolean
  /**
   * Defines if the product has color options
   */
  hasColors?: boolean
}