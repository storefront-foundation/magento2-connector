import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Media from 'react-storefront-connector/Media';
import { Product } from '../types/ProductPageData';

function getThumbnail(rawProduct): Media {
  return {
    src: get(rawProduct, 'image.url', ''),
    alt: get(rawProduct, 'image.label', 'thumbnail'),
    type: 'image',
  };
}

function getMedia(rawProduct) {
  const thumbnail = getThumbnail(rawProduct);
  const thumbnails = get(rawProduct, 'media_gallery', []).map((item, i) => ({
    src: get(item, 'url', ''),
    alt: get(item, 'label', `thumbnail ${i}`),
  }));
  return {
    thumbnail,
    thumbnails,
    full: thumbnails,
  };
}

function getSizes(rawProduct) {
  const configurableOptions = get(rawProduct, 'configurable_options', []);
  const sizeOption = configurableOptions.find((obj) => obj.attribute_code === 'size');
  return get(sizeOption, 'values', [])
    .map((opt) => ({
      text: get(opt, 'label'),
      id: get(opt, 'swatch_data.value'),
    }));
}

function getColors(rawProduct) {
  const configurableOptions = get(rawProduct, 'configurable_options', []);
  const colorOption = configurableOptions.find((obj) => obj.attribute_code === 'color');
  const rawProductVariants = get(rawProduct, 'variants', []);
  return get(colorOption, 'values', [])
    .map((opt) => {
      const color = get(opt, 'label');
      const variant = rawProductVariants.find((_variant) => get(_variant, 'product.sku', '').includes(`-${color}`));
      const thumbnails = get(variant, 'product.media_gallery', []).map((mediaGalleryObj) => ({
        src: get(mediaGalleryObj, 'url'),
        alt: color,
      }));
      return {
        id: color,
        text: color,
        css: get(opt, 'swatch_data.value'),
        image: {
          alt: color,
          // @TODO: add support of RGB color code in ProductOptionSelector component:
          src: `https://via.placeholder.com/48x48/${get(opt, 'swatch_data.value').replace('#', '')}?text=%20`,
        },
        media: {
          thumbnails,
          thumbnail: thumbnails[0],
          full: thumbnails, // @HARDCODE for now
        },
      };
    });
}

function getSpecs(rawProduct, rawCustomAttributes) {
  const specsAttributes = [
    {
      name: 'Style',
      key: 'style_general',
    },
    {
      name: 'Material',
      key: 'material',
    },
    {
      name: 'Pattern',
      key: 'pattern',
    },
    {
      name: 'Climate',
      key: 'climate',
    },
    {
      name: 'Activity',
      key: 'activity',
    },
    {
      name: 'Gender',
      key: 'gender',
    },
    {
      name: 'Category',
      key: 'category_gear',
    },
  ];
  return specsAttributes
    .map((specsAttribute) => {
      const spec = specsAttribute.key;
      const specName = specsAttribute.name;
      if (!rawCustomAttributes) return null;

      const attr = rawCustomAttributes.find((_attr) => get(_attr, 'attribute_code') === spec);
      const rawValue = get(rawProduct, spec) || '';
      const value = rawValue
        .split(',')
        .map((x) => {
          const opts = get(attr, 'attribute_options', []);
          const opt = opts.find((_attr) => _attr.value === x.trim());
          return get(opt, 'label', '');
        })
        .join(', ');
      if (!value) {
        return null;
      }
      return {
        name: specName,
        value,
      };
    })
    .filter(Boolean);
}

function specsToHtml(specs) {
  return specs
    .filter((spec) => spec.name && spec.value)
    .map((spec) => `<b>${spec.name}:</b> ${spec.value}`)
    .join('<br/>');
}

/**
 * Magento 2: product normalizer
 */
function normalizer(rawData, productId): Product | null {
  const rawProduct = get(rawData, 'data.products.items[0]');
  const rawCustomAttributes = get(rawData, 'data.customAttributeMetadata.items', []);

  if (!rawProduct) {
    return null;
  }

  const colors = getColors(rawProduct);
  const sizes = getSizes(rawProduct);
  const isConfigurableProduct = !isEmpty(get(rawProduct, 'configurable_options'));
  const price = get(rawProduct, 'price_range.maximum_price.final_price.value');

  return {
    isConfigurableProduct,
    id: productId,
    reviewsKey: get(rawProduct, 'id'), // product ID in Magento database (used for other queries)
    sku: get(rawProduct, 'sku'),
    url: `/p/${productId}.html`,
    name: get(rawProduct, 'name'),
    description: get(rawProduct, 'description.html'),
    price,
    priceText: `$${price.toFixed(2)}`,
    sizes,
    colors,
    thumbnail: getThumbnail(rawProduct),
    media: getMedia(rawProduct),
    specs: specsToHtml(getSpecs(rawProduct, rawCustomAttributes)),
  };
}

export default normalizer;
