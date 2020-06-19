import get from 'lodash/get';

function convertCookieStringToObject(cookiesStr: string): Object | null {
  return (cookiesStr || '').split(';').reduce(
    (cookiesObjectAcc, cookieStr) => {
      let [name, value] = cookieStr.split('=');
      name = (name || '').trim(); // add trimming just in case
      value = (value || '').trim();
      return {
        ...cookiesObjectAcc,
        [name]: value,
      };
    },
    {},
  ) || null; // return `null` instead of empty string
}

/**
 * Gets cookie value in NodeJS handler
 *
 * @param {Request} req The request object
 * @param {String} cookieName Cookie name
 * @return {String} Cookie value (null if missing)
 */
export function getCookieValue(req: Request | any, cookieName: string): string | null {
  const cookie = get(req, 'headers.cookie');
  const cookies = convertCookieStringToObject(cookie);
  return get(cookies, cookieName, null);
}

/**
 * Kills cookie in NodeJS handler (sets negative expiry time)
 *
 * @param {Response} res The response object
 * @param {String} cookieName Cookie name
 */
export function killCookie(res: Response | any, cookieName: string): void {
  res.cookie(cookieName, 'I\'m dead', { maxAge: - 1000 * 3600 * 24 * 365 * 20 }); // ~20 years ago expiry
}