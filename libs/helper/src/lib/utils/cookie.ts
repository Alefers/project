import { CookieSerializeOptions, serialize } from 'cookie';


type TmpCookiesObj = { [key: string]: string };
type CookieValueTypes = string | undefined;

const stringify = (value = '') => {
  try {
    const result = JSON.stringify(value);
    return /^[{[]/.test(result) ? result : value;
  } catch (e) {
    return value;
  }
};

const decode = (str: string): string => {
  if (!str) return str;

  return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
};

export const getCookies = (): TmpCookiesObj => {
  const _cookies: TmpCookiesObj = {};
  const documentCookies = document.cookie ? document.cookie.split('; ') : [];

  for (let i = 0, len = documentCookies.length; i < len; i++) {
    const cookieParts = documentCookies[i].split('=');

    const _cookie = cookieParts.slice(1).join('=');
    const name = cookieParts[0];

    _cookies[name] = _cookie;
  }

  return _cookies;
};

export const getCookie = (key: string): CookieValueTypes => {
  const _cookies = getCookies();
  const value = _cookies[key];
  if (value === undefined) return undefined;
  return decode(value);
};

export const setCookie = (key: string, data: string, options?: CookieSerializeOptions): void => {
  document.cookie = serialize(key, stringify(data), { path: '/', ...options });
};

export const deleteCookie = (key: string, options?: CookieSerializeOptions): void => {
  return setCookie(key, '', { ...options, maxAge: -1 });
};

export const hasCookie = (key: string): boolean => {
  if (!key) return false;

  const cookie = getCookies();
  // eslint-disable-next-line no-prototype-builtins
  return cookie.hasOwnProperty(key);
};

export const getCookieExpirationTime = (min: number) => new Date(Date.now() + 60_000 * min);
