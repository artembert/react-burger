import Cookies from "js-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constant";

const accessTokenExpireTime = 20 * 60 * 1000;

export const setTokens = (accessToken: string, refreshToken: string) => {
  const expTime = new Date(new Date().getTime() + accessTokenExpireTime);
  const bearerToken = accessToken.includes("Bearer") ? accessToken.split(" ")[1] : accessToken;
  Cookies.set(ACCESS_TOKEN, bearerToken, { expires: expTime });
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};
