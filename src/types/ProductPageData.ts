import ProductPageData, { Product as _Product } from 'react-storefront-connector/ProductPageData'

export default ProductPageData

/**
 * Information about a product
 */
export interface Product extends _Product {
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