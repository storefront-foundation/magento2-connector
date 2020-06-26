import Error from './Error'

export default interface SignUpResponse extends Error {
  /**
   * Defines if sign up process was successful
   */
  success: boolean
}