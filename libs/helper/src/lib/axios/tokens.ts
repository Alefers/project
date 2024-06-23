import {
  setCookie,
  getCookie,
  deleteCookie,
  getCookieExpirationTime
} from '../utils';
import type { ITokens } from '../utils';


export const accessCookieName = "access";
export const refreshCookieName = "refresh";

export const saveTokens = ({ access, refresh }: ITokens, accessLifeTime: number, refreshLifeTime: number) => {
  setCookie(accessCookieName, access.token, {
    expires: getCookieExpirationTime(accessLifeTime),
  });
  if (refreshLifeTime > 0 && refresh) {
    setCookie(refreshCookieName, refresh.token, {
      expires: getCookieExpirationTime(refreshLifeTime),
    });
  } else {
    deleteCookie(refreshCookieName);
  }
};

export const getAccessToken = (): string => {
  return getCookie(accessCookieName) as string;
};

export const getRefreshToken = (): string => {
  return getCookie(refreshCookieName) as string;
};

export const removeAuthCookies = () => {
  deleteCookie(accessCookieName);
  deleteCookie(refreshCookieName);
};
