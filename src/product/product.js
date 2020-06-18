import fetch from './fetcher'
import normalize from './normalizer'
import withAppData from '../app/withAppData'

export default async function product({ id, color, size }, req, res) {
  return withAppData(req, async () => {
    id = id.replace('.html', '')
    const product = normalize(await fetch(id), id)

    return {
      title: `Product ${id}`,
      product,
      breadcrumbs: [
        {
          text: 'Home',
          href: '/',
        },
      ],
    }
  })
}
