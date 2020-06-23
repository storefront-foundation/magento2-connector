import get from 'lodash/get'

function convertCookieStringToObject(cookiesStr: string): Object | null {
  return (
    (cookiesStr || '').split(';').reduce((cookiesObjectAcc, cookieStr) => {
      let [name, value] = cookieStr.split('=')
      name = (name || '').trim() // add trimming just in case
      value = (value || '').trim()
      return {
        ...cookiesObjectAcc,
        [name]: value,
      }
    }, {}) || null
  ) // return `null` instead of empty string
}

/**
 * Gets cookie value in NodeJS handler
 *
 * @param {Request} req The request object
 * @param {String} cookieName Cookie name
 * @return {String} Cookie value (null if missing)
 */
export function getCookieValue(req: Request | any, cookieName: string): string | null {
  const cookie = get(req, 'headers.cookie')
  const cookies = convertCookieStringToObject(cookie)
  return get(cookies, cookieName, null)
}

/**
 * Kills cookie in NodeJS handler (sets negative expiry time)
 *
 * @param {Response} res The response object
 * @param {String} cookieName Cookie name
 */
export function killCookie(res: any, name: string): void {
  setCookie(res, name, 'expire', { expires: new Date(0) }) // 1 Jan 1970
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
 * Sets a cookie using the set-cookie response header
 * @param res The http response
 * @param name The name of the cookie
 * @param value The value to set
 * @param options Additional options
 */
export function setCookie(res: any, name: string, value: string, options: SetCookieOptions = {}) {
  let cookieValue = [`${name}=${value}`]

  if (options.maxAge) {
    cookieValue.push(`Max-Age=${options.maxAge}`)
  }

  if (options.expires && !options.maxAge) {
    cookieValue.push(`Expires=${options.expires.toUTCString()}`)
  }

  res.setHeader('Set-Cookie', cookieValue.join('; '))
}
