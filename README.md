# Magento 2 Connector

The [React Storefront](https://github.com/storefront-foundation/react-storefront) headless ecommerce connector for [Adobe Magento 2](https://devdocs.magento.com/guides/v2.3/graphql/). 

Main features:
- Product listing pages (PLP)
- Product detail pages (PDP)
- Cart

This guide covers how to get up and running with the Magento 2 Connector. For information on connectors in general and how to write your own connector refer to the [React Storefront Connectors](https://docs.reactstorefront.io/guides/connectors) documentation.

## Requirements

You will need a Magento 2 (sometimes referred to as "M2") backend to try out the connector. 

## Running Locally

Create a new React Storefront app using version 8.14.0 or later:

```
npm create react-storefront my-m2-app
```

Next `cd` into your created application and install the Magento2 connector:

```
cd my-m2-app
npm install react-storefront-magento2-connector
```

Next configure the `M2_CONFIG_HOST` environment variable in `.env` file to point to your Magento2 backend. See `.env.sample` file as an example of adding env variable via [dotenv](https://www.npmjs.com/package/dotenv). You can also check [this guide](https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html) to get more info about Node.js Environment Variables. For example, your `.env` file may look like:

```
LEGACY_BACKEND_DOMAIN=www.my-magento-site.com
LEGACY_BACKEND_HOST_HEADER=www.my-magento-site.com
M2_CONFIG_HOST=http://www.my-magento-site.com
```

Finally set the connector in your `next.config.js` file. By default this file is set to use the `react-storefront/mock-connector` as shown below:

```
module.exports = withReactStorefront({

  // ... Some code
  
  connector: 'react-storefront/mock-connector',

  // ... More code
```

Change this line to use the `react-storefront-magento2-connector` as shown below:

```
module.exports = withReactStorefront({

  // ... Some code
  
  connector: 'react-storefront-magento2-connector',

  // ... More code
```

Now you can run your project locally,

```
npm start
```

And then visit http://127.0.0.1:3000 in your browser.

## Deploying to the Moovweb XDN

The front-end React Storefront can be hosted anywhere that supports Node and Express but it works great on the [Moovweb XDN](https://www.moovweb.com/). You can try the XDN for free by signing up [here](https://moovweb.app/signup?redirectTo=/). Once you have an account you can deploy it by running `xdn deploy`:

```
xdn deploy
```

Refer to the [XDN deployment guide](https://developer.moovweb.com/guides/deploying) for more information.


## Development

- In 1st terminal window (this repo), run `yalc publish` & `npm run watch`
- In 2nd terminal window, open [RSF starter app (`commercial` branch)](https://github.com/storefront-foundation/react-storefront-starter-app/tree/commercial)
- Go to `next.config.js` and change `connector` field value to `react-storefront-magento2-connector`
- Run `yalc add react-storefront-connector`
- Run `npm i`
- Run `npm run start`
