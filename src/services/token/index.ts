import Cookies from "js-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constant";

const accessTokenExpireTime = 20 * 60 * 1000;

export const setTokens = (accessToken: string, refreshToken: string) => {
  const expTime = new Date(new Date().getTime() + accessTokenExpireTime);
  const bearerToken = accessToken.includes("Bearer") ? accessToken.split(" ")[1] : accessToken;
  Cookies.set(ACCESS_TOKEN, bearerToken, { expires: expTime, path: "/" });
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getAccessToken = (): string => Cookies.get(ACCESS_TOKEN) || "";

export const getRefreshToken = (): string => localStorage.getItem(REFRESH_TOKEN) || "";

export const clearTokens = () => {
  Cookies.remove(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
