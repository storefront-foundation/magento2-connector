import withAppData from '../app/withAppData'

export default async function home(req, res) {
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