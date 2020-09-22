import Result from 'react-storefront-connector/Result';
import withAppData from '../app/withAppData';

export default async function home(req/* , res */): Promise<Result<any>> {
  const data = await withAppData(req, () => Promise.resolve({
    title: 'Home',
    slots: {
      heading: 'Home',
      description: 'Welcome!',
    },
    breadcrumbs: [
      {
        text: 'Home',
        href: '/',
      },
    ],
  }));
  return { ...data };
}
