import fetch from './fetcher'
import normalize from './normalizer'
import withAppData from '../app/withAppData'

export default async function product({ id, color, size }, req, res) {
  return withAppData(req, async () => {
    id = id.replace('.html', '')
    const record = normalize(await fetch(id), id)

    return {
      title: `Product ${id}`,
      product: record,
      breadcrumbs: [
        {
          text: 'Home',
          href: '/',
        },
      ],
    }
  })
}
