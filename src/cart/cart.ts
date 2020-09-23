import Result from 'react-storefront-connector/Result';
import withAppData from '../app/withAppData';
import CartResponse from '../types/CartResponse';

/**
 * GET: default cart handler
 */
export default async function cart(req/* , res */): Promise<Result<CartResponse>> {
  return withAppData(req, () => Promise.resolve({
    title: 'Cart',
    cart: {},
    breadcrumbs: [
      {
        text: 'Home',
        href: '/',
      },
    ],
  }));
}
