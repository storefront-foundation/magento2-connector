import get from 'lodash/get';

function convertCookieStringToObject(cookiesStr: string): Object | null {
  return (
    (cookiesStr || '').split(';').reduce((cookiesObjectAcc, cookieStr) => {
      let [name, value] = cookieStr.split('=');
      name = (name || '').trim(); // add trimming just in case
      value = (value || '').trim();
      return {
        ...cookiesObjectAcc,
        [name]: value,
      };
    }, {}) || null
  ); // return `null` instead of empty string
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

interface SetCookieOptions {
  /**
   * The Max-Age cookie option
   */
  maxAge?: number

  /**
   * The Expires cookie option
   */
  expires?: Date
}

/**
 * Prepares a Set-Cookie value string
 * @param name The name of the cookie
 * @param value The value to set
 * @param options Additional options
 * @returns {string}
 */
export function prepareSetCookie(name: string, value: string, options: SetCookieOptions = {}): string {
  const cookieValue = [`${name}=${value}`];

  if (options.maxAge) {
    cookieValue.push(`Max-Age=${options.maxAge}`);
  }

  if (options.expires && !options.maxAge) {
    cookieValue.push(`Expires=${options.expires.toUTCString()}`);
  }

  return cookieValue.join('; ');
}

/**
 * Prepares a Set-Cookie value string for cookie needs to be removed (sets negative expiry time)
 *
 * @param {string} cookieName Cookie name
 * @returns {string}
 */
export function prepareKillCookie(cookieName: string): string {
  return prepareSetCookie(cookieName, 'EXP', { expires: new Date(0) }); // 1 Jan 1970
}

/**
 * Sets multiple cookies into response object
 *
 * @param {Response} res Response object
 * @param {string[]} cookies Array of Set-Cookie response header values
 * @returns {string}
 */
export function setCookies(res: any, cookies: string[]): void {
  res.setHeader('Set-Cookie', cookies);
}
