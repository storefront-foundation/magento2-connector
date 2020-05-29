import fetch from 'isomorphic-unfetch';
import { host } from '../../config';

function fetchProductReviews(productId) {
  return fetch(`${host}/review/product/listAjax/id/${productId}`)
    .then((res) => res.text());
}

export default fetchProductReviews;
