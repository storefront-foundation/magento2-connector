import { createContext } from 'react';

const initSessionState = {
  email: null,
  guestCartId: null,
  customerCartId: null,
  customerToken: null,
  cart: {
    items: [],
  },
  // account: {...}, // customer's account data will be here
};

const SessionContext = createContext(initSessionState);

export { initSessionState };
export default SessionContext;
