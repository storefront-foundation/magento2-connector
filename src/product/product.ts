import Result from 'react-storefront-connector/Result';
import fetch from './fetcher';
import normalize from './normalizer';
import withAppData from '../app/withAppData';
import ProductPageData from '../types/ProductPageData';

export default async function product({ id/* , color, size  */ }, req/* , res */): Promise<Result<ProductPageData>> {
  return withAppData(req, async () => {
    id = id.replace('.html', ''); // eslint-disable-line no-param-reassign
    const normalizedProduct = normalize(await fetch(id), id);

    return {
      title: `Product ${id}`,
      product: normalizedProduct,
      breadcrumbs: [
        {
          text: 'Home',
          href: '/',
        },
      ],
    };
  });
}
