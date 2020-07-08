import get from 'lodash/get'
import createCustomer from './customer/createCustomer'
import signIn from './signIn'
import Session from '../types/Session'

export default async function signUp(req, res): Promise<Session> {
  try {
    const body = JSON.parse(get(req, 'body', '{}'))
    const firstName = get(body, 'firstName')
    const lastName = get(body, 'lastName')
    const email = get(body, 'email')
    const password = get(body, 'password')

    const signUpData = await createCustomer({
      firstName,
      lastName,
      email,
      password,
    })
    if (signUpData.error) {
      throw new Error(signUpData.error)
    }
    return signIn(req, res)
  } catch (error) {
    return res.status(400).send({
      error: get(error, 'message', 'An error occurred during sign up'),
      success: false,
    })
  }
}
