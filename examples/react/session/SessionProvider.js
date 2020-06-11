import React, { useEffect, useMemo, useState } from 'react';
import SessionContext, { initSessionState } from './SessionContext';
import { getCookieValue, killCookie, setCookie } from './cookieHelpers';

import fetch from 'isomorphic-unfetch';
import get from 'lodash/get';

async function obtainSession(session, setSession) {
  // ### 1 - LOGGED IN SESSION
  const tokenCookieValue = getCookieValue('M2_token');
  if (tokenCookieValue) {
    const customerCartUrl = `/api/M2/cart/customer/cart?token=${encodeURIComponent(tokenCookieValue)}`;
    const customerCartData = await fetch(customerCartUrl).then((res) => res.json());
    const { cart, customerCartId } = customerCartData;
    setSession({ // initialize customer session & drop guest
      ...session,
      guestCartId: null,
      customerCartId,
      customerToken: tokenCookieValue,
      cart,
    });
    setCookie('M2_token', tokenCookieValue, 3600 * 24 * 30); // renew customer token cookie for 30 more days
    setCookie('M2_customerCartId', customerCartId, 3600 * 24 * 30); // set/renew customer cart ID cookie for 30 days
    killCookie('M2_guestCartId'); // kill guest cart ID cookie just in case (prevents possible cart merges issues)
    return;
  }

  // ### 2 - GUEST SESSION
  // # 2.1 - Obtain returning guest session
  killCookie('M2_customerCartId'); // kill customer cart ID cookie just in case (prevents possible cart merges issues)
  const guestCartIdCookieValue = getCookieValue('M2_guestCartId');
  if (guestCartIdCookieValue) {
    const guestCartUrl = `/api/M2/cart/guest/cart?cartId=${encodeURIComponent(guestCartIdCookieValue)}`;
    const guestCartData = await fetch(guestCartUrl).then((res) => res.json());
    const { cart } = guestCartData;
    setSession({ // initialize guest session
      ...session,
      guestCartId: guestCartIdCookieValue,
      cart,
    });
    setCookie('M2_guestCartId', guestCartIdCookieValue, 3600 * 24 * 7); // renew cookie for 7 more days
    return;
  }

  // # 2.2 - Obtain new guest session
  const { guestCartId } = await fetch('/api/M2/cart/guest/obtainSession').then((res) => res.json());
  setSession({ // initialize guest session
    ...session,
    guestCartId,
  });
  setCookie('M2_guestCartId', guestCartId, 3600 * 24 * 7); // set guest cart id cookie for 7 days
}

export default function SessionProvider({ children }) {
  const [session, setSession] = useState(initSessionState);
  const context = useMemo(() => ({
    session,
    actions: {
      signIn: async (email, password) => {
        const emailQuery = encodeURIComponent(email);
        const passwordQuery = encodeURIComponent(password);
        const fetchUrl = `/api/M2/cart/customer/generateToken?email=${emailQuery}&password=${passwordQuery}`;
        const { token } = await fetch(fetchUrl).then((res) => res.json());
        if (!token) {
          // unsuccessful login
          return {
            success: false,
            reason: 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.',
          };
        }

        // fetch customer cart data
        const customerCartUrl = `/api/M2/cart/customer/cart?token=${encodeURIComponent(token)}`;
        const customerCartData = await fetch(customerCartUrl).then((res) => res.json());
        let { cart, customerCartId } = customerCartData;

        // if guest has cart items -> merge it with logged in customer cart
        const guestCartIdCookieValue = getCookieValue('M2_guestCartId');
        if (guestCartIdCookieValue && get(session, 'cart.items', []).length) {
          const tkn = encodeURIComponent(token);
          const sourceCartId = encodeURIComponent(guestCartIdCookieValue);
          const destinationCartId = encodeURIComponent(customerCartId);
          const queryStr = `token=${tkn}&sourceCartId=${sourceCartId}&destinationCartId=${destinationCartId}`;
          const mergeCartsFetchUrl = `/api/M2/cart/common/mergeCarts?${queryStr}`;
          const mergeCartsData = await fetch(mergeCartsFetchUrl).then((res) => res.json());
          cart = get(mergeCartsData, 'cart', cart);
          customerCartId = get(mergeCartsData, 'customerCartId', customerCartId);
        }

        // @TODO: also customer account data like firstName, lastName can be fetched here
        // Docs: https://devdocs.magento.com/guides/v2.3/graphql/queries/customer.html
        // ...

        setSession({ // initialize customer session & drop guest
          ...session,
          guestCartId: null,
          customerCartId,
          customerToken: token,
          cart,
        });
        setCookie('M2_token', token, 3600 * 24 * 30); // set customer token cookie for 30 more days
        setCookie('M2_customerCartId', customerCartId, 3600 * 24 * 30); // set customer cart ID cookie for 30 days
        killCookie('M2_guestCartId'); // kill guest cart ID cookie just in case (prevents possible cart merges issues)
        return {
          success: true,
        };
      },
      signOut: async () => {
        const token = encodeURIComponent(get(session, 'customerToken', ''));
        if (!token) {
          return {
            success: false,
            reason: 'session.customerToken doesn\'t exist',
          };
        }

        const { result } = await fetch(`/api/M2/cart/customer/revokeToken?token=${token}`).then((res) => res.json());
        if (result !== true) {
          console.error('An error occured during customer token revoke');
        }
        const { guestCartId } = await fetch('/api/M2/cart/guest/obtainSession').then((res) => res.json());
        setSession({ // initialize new guest session
          ...initSessionState,
          guestCartId,
        });
        setCookie('M2_guestCartId', guestCartId, 3600 * 24 * 7); // set guest cart id cookie for 7 days
        killCookie('M2_token'); // kill customer token cookie
        killCookie('M2_customerCartId'); // kill customer cart id cookie
        return {
          success: true,
        };
      },
      signUp: async ({
        firstName,
        lastName,
        email,
        password,
      }) => {
        let queryStr = '';
        queryStr += `firstName=${encodeURIComponent(firstName)}`;
        queryStr += `&lastName=${encodeURIComponent(lastName)}`;
        queryStr += `&email=${encodeURIComponent(email)}`;
        queryStr += `&password=${encodeURIComponent(password)}`;
        const signUpFetchUrl = `/api/M2/cart/customer/createCustomer?${queryStr}`;
        const signUpData = await fetch(signUpFetchUrl).then((res) => res.json());
        if (signUpData.error) {
          return {
            success: false,
            reason: signUpData.error,
          };
        }
        return {
          success: true,
        };
      },
      addToCart: async (product = {}, { size = {}, color = {}, quantity = 1 }) => {
        const cartId = get(session, 'guestCartId') || get(session, 'customerCartId');
        const token = get(session, 'customerToken');

        let sku = get(product, 'sku');

        if (product.isConfigurableProduct) {
          sku += `-${size.id}-${color.id}`;
        }

        let queryStr = '';
        queryStr += `sku=${encodeURIComponent(sku)}`;
        queryStr += `&quantity=${encodeURIComponent(quantity)}`;
        queryStr += `&cartId=${encodeURIComponent(cartId)}`;
        queryStr += token ? `&token=${encodeURIComponent(token)}` : '';
        const addToCartFetchUrl = `/api/M2/cart/common/addToCart?${queryStr}`;
        const addToCartData = await fetch(addToCartFetchUrl).then((res) => res.json());
        if (addToCartData.error) {
          return {
            success: false,
            reason: addToCartData.error,
          };
        }
        const { cart } = addToCartData;
        setSession({ // initialize customer session & drop guest
          ...session,
          cart,
        });
        return {
          success: true,
        };
      },
    },
  }), [session]);

  useEffect(() => {
    obtainSession(session, setSession);
  }, []);

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
}
