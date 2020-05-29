import { useContext, useMemo } from 'react';
import get from 'lodash/get';
import SessionContext from '../session/SessionContext';

function useLoginStatus() {
  const context = useContext(SessionContext);
  const customerCartId = get(context, 'session.customerCartId', null);
  const isLoggedIn = useMemo(() => Boolean(customerCartId), [customerCartId]);
  return isLoggedIn;
}

export default useLoginStatus;
