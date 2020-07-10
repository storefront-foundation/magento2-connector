import withAppData from '../app/withAppData'
import Result from 'react-storefront-connector/Result'

export default async function home(req, res): Promise<Result<any>> {
  const data = await withAppData(req, () => Promise.resolve({
    title: `Home`,
    home: {},
    breadcrumbs: [
      {
        text: 'Home',
        href: '/',
      },
    ],
  }))
  return res.status(200).send({ ...data })
}