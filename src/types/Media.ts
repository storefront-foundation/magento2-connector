export default interface Media {
  /**
   * Source URL
   */
  src: string
  
  /**
   * Type of media source (image or video)
   */
  type: 'image' | 'video'

  /**
   * Alt param of image
   */
  alt?: string
}
