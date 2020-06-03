# Magento 2 Connector

[Adobe Magento 2](https://devdocs.magento.com/guides/v2.3/graphql/) connector for [React Storefront](https://github.com/react-storefront-community/react-storefront).

## Requirements

`M2_CONFIG_HOST` Node.js Environment Variable defining your origin site based on Magento 2.

See `.env.sample` file as an example of adding env variable via [dotenv](https://www.npmjs.com/package/dotenv). You can also check [this guide](https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html) to get more info about Node.js Environment Variables.

## Usage

Initialize config environment variables by using

```js
require('dotenv').config();
``` 

in one of your server files (for example `server.js` in NextJS).

Then, you can simply import normalizer and fetch helper in your backend handlers.

### Product data:
```js
import { fetchProduct, normalizeProduct } from 'react-storefront-magento2-connector/product';
...

const rawProduct = await fetchProduct(productId);
// normalize it for React Storefront https://docs.reactstorefront.io/guides/product
const product = normalizeProduct(rawProduct, productId);
```

### Product reviews:
```js
import fetchProductReviews from 'react-storefront-magento2-connector/product/reviews/fetchProductReviews';
...
// Magento API returns HTML as result for reviews, so no need to normalize the data
const data = await fetchProductReviews(productId);
...
```

### CMS slots:

```js
 import { fetchCmsBlocks, normalizeCmsBlocks } from 'react-storefront-magento2-connector/cms/blocks';
 ...
 // identifiers is a string with CMS block id
 const rawData = await fetchCmsBlocks({ identifiers });
 const data = normalizeCmsBlocks(rawData);
 ...
```

### Search

```js
 import { fetchSearch, normalizeSearch } from 'react-storefront-magento2-connector/search';
 ...
//  where "search" is a search term
 const rawData = await fetchSearch({ search });
//  normalize it to follow React Storefront data contract https://docs.reactstorefront.io/guides/search
 const data = normalizeSearch(rawData);
 ...
```

### Subcategory

#### Subcategory data

```js
 import { fetchSubcategory, normalizeSubcategory } from 'react-storefront-magento2-connector/subcategory';
 ...
 const rawData = await fetchSubcategory({ categoryId });
//  normalize data to follow React Storefront data contract https://docs.reactstorefront.io/guides/subcategory
 const { id, name } = normalizeSubcategory(rawData);
```

#### Subcategory id by URL key

```js
 import { fetchSubcategoryId, normalizeSubcategoryId } from 'react-storefront-magento2-connector/subcategory/id';
 ...
 const rawData = await fetchSubcategoryId({ urlKey });
 const id = normalizeSubcategoryId(rawData);
 ...
```

#### Nested subcategories by URL key

```js
 import {
  fetchSubcategorySubCategories,
  normalizeSubcategorySubCategories,
 } from 'react-storefront-magento2-connector/subcategory/sub-categories';
 ...
 const rawData = await fetchSubcategorySubCategories({ urlKey });
 const data = normalizeSubcategorySubCategories(rawData);
 ...
```

### Menu

```js
 import { fetchMenu, normalizeMenu } from 'react-storefront-magento2-connector/menu';
 ...
 const rawData = await fetchMenu({});
 const data = normalizeMenu(rawData);
 ...
```

### Helpers:

Catch / properly handle error message from GraphQL response

```js
import getError from 'react-storefront-magento2-connector/helpers/getError';
...
const rawData = await fetchProduct(productId);

const error = getError(rawData);
if (error) {
   return {
     error,
   };
}
```

### Cart

[Add to cart](examples/next/cart/common/addToCart.js)

[Merge carts](examples/next/cart/common/mergeCarts.js)

[Create customer](examples/next/cart/customer/createCustomer.js)

[Generate token](examples/next/cart/customer/generateToken.js)

[Revoke token](examples/next/cart/customer/revokeToken.js)

[Guest cart](examples/next/cart/guest/cart.js)

[Obtain session / create empty cart](examples/next/cart/guest/obtainSession.js)

#### Get cart data

```js
 import { fetchCart, normalizeCart } from 'react-storefront-magento2-connector/cart/customer/cart';
 ...
 const rawData = await fetchCart(token);
 const data = normalizeCart(rawData);
 ...
```





## Examples

- See `/examples/react/` for [ReactJS](https://reactjs.org/) stuff examples
- See `/examples/rsf/` for [React Storefront](https://github.com/react-storefront-community/react-storefront) handlers examples
- See `/examples/next/` for [NextJS](https://nextjs.org/) handlers examples (they are also can be used in RSF v7+)
