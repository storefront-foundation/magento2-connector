import Connector from 'react-storefront-connector'

import home from './home';
import cart from './cart';
import addToCartFromAmp from './cart/addToCartFromAmp';
import fetchWithGraphQl from './fetchWithGraphQl';
import product from './product';
import routes from './routes';
import session from './session';
import signIn from './session/signIn';
import signOut from './session/signOut';
import signUp from './session/signUp';
import subcategory from './subcategory';
import search from './search';

class Magento2Connector implements Connector {
  home = home
  cart = cart
  product = product
  session = session
  signIn = signIn
  signOut = signOut
  signUp = signUp
  subcategory = subcategory
  search = search
  routes = routes
}

export default new Magento2Connector()

