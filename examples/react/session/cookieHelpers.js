import get from 'lodash/get';

function convertCookieStringToObject(cookiesStr) {
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

export function setCookie(cookieName, cookieValue, expireInSeconds = 3600 * 24/* default: 1 day */) {
  const timestamp = new Date();
  timestamp.setSeconds(timestamp.getSeconds() + expireInSeconds);
  const expires = timestamp.toUTCString();
  document.cookie = `${cookieName}=${cookieValue}; expires=${expires}`;
}

export function killCookie(cookieName) {
  setCookie(cookieName, 'Unbeing dead isn\'t being alive', -3600 * 24 * 365);
}

export function getCookieValue(cookieName) {
  const cookies = convertCookieStringToObject(document.cookie);
  return get(cookies, cookieName, null);
}
