import get from 'lodash/get';

function cartItemsNormalizer(items) {
  return items.map((item, index) => {
    const product = get(item, 'product', {})
    return {
      ...item,
      id: get(item, 'id', `cart-item-${index}`),
      quantity: get(item, 'quantity', 1),
      name: get(product, 'name', ''),
      url: `/p/${get(product, 'url_key', '')}${get(product, 'url_suffix', '')}`,
      thumbnail: {
        src: get(product, 'thumbnail.url', ''),
      },
      price: get(product, 'price_range.maximum_price.final_price.value', 0),
      priceText: `$${get(product, 'price_range.maximum_price.final_price.value', 0)}`,
    };
  });
}

export default cartItemsNormalizer;
