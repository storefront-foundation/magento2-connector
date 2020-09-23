import Connector from 'react-storefront-connector';
import home from '../home/home';
import cart from '../cart';
import addToCart from '../cart/addToCart';
import updateCartItem from '../cart/updateCartItem';
import removeCartItem from '../cart/removeCartItem';
import product from '../product/product';
import productSlots from '../product/slots/productSlots';
import productSuggestions from '../product/suggestions/productSuggestions';
import routes from '../routes';
import session from '../session';
import signIn from '../session/signIn';
import signOut from '../session/signOut';
import signUp from '../session/signUp';
import subcategory from '../subcategory';
import search from '../search/search';
import searchSuggestions from '../search/suggestions/searchSuggestions';

export default class Magento2Connector implements Connector {
  home = home;

  cart = cart;

  addToCart = addToCart;

  updateCartItem = updateCartItem;

  removeCartItem = removeCartItem;

  product = product;

  session = session;

  signIn = signIn;

  signOut = signOut;

  signUp = signUp;

  subcategory = subcategory;

  search = search;

  routes = routes;

  productSlots = productSlots;

  productSuggestions = productSuggestions;

  searchSuggestions = searchSuggestions;
}
