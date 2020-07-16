import createCustomer from './customer/createCustomer'
import signIn from './signIn'
import Session from 'react-storefront-connector/Session'
import SignUpData from 'react-storefront-connector/SignUpData'

export default async function signUp(
  data: SignUpData,
  req: Request,
  res: Response
): Promise<Session> {
  const signUpData = await createCustomer(data)

  if (signUpData.error) {
    throw new Error(signUpData.error)
  }

  return signIn(data.email, data.password, req, res)
}
