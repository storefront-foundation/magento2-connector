import fetch from 'isomorphic-unfetch';
import { graphQlHost } from './config';

function fetchWithGraphQl(query, token = null) {
  const authHeaders = token ? {
    Authorization: `Bearer ${token}`,
  } : {};
  console.log('__ : fetchWithGraphQl -> graphQlHost', graphQlHost);
  return fetch(graphQlHost, {
    method: 'POST',
    headers: {
      ...authHeaders,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Store: 'default',
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());
}

export default fetchWithGraphQl;
