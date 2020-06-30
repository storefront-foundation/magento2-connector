import Media from './Media'

export default interface ProductMedia {
  /**
   * Full size images to display in the main carousel
   */
  full: MagnifiableMedia[]
  /**
   * Thumbnails to display under the carousel
   */
  thumbnails?: Media[]
}

export interface MagnifiableMedia extends Media {
  /**
   * the high resolution image used for magnification
   */
  magnify?: MagnifyProps
}

export interface MagnifyProps {
  /**
   * The full height of the high resolution image used for magnification
   */
  height: number
  /**
   * The full width of the high resolution image used for magnification
   */
  width: number
  /**
   * The URL of the high resolution image used for magnification
   */
  src: string
}