import get from 'lodash/get';
import CartItem from 'react-storefront-connector/CartItem';

function cartItemsNormalizer(items: any[]): CartItem[] {
  return items.map((item: any, index: number): CartItem => {
    const product = get(item, 'product', {});
    return {
      ...item,
      id: get(item, 'id', `cart-item-${index}`),
      quantity: get(item, 'quantity', 1),
      name: get(product, 'name', ''),
      url: `/p/${get(product, 'url_key', '')}${get(product, 'url_suffix', '')}`,
      thumbnail: {
        src: get(product, 'thumbnail.url', ''),
        type: 'image',
      },
      price: get(product, 'price_range.maximum_price.final_price.value', 0),
      priceText: `$${get(product, 'price_range.maximum_price.final_price.value', 0)}`,
    };
  });
}

export default cartItemsNormalizer;
