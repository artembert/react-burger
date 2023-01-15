import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "../../services/token";
import { fetchRefreshToken } from "../../services/auth/requests";
import { handleFetchResponse } from "./handle-fetch-response";

type Options =
  | {
      authorization?: boolean;
      method: typeof HttpMethod.GET;
    }
  | {
      body: any;
      method: typeof HttpMethod.POST | typeof HttpMethod.PATCH;
      authorization?: boolean;
    };

export const HttpMethod = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
} as const;

export const request = <T>(url: string, options: Options = { method: HttpMethod.GET }) => {
  return requestOnce<T>(url, options).catch((e: unknown) => {
    if ((e as { isJwtExpired: boolean })?.isJwtExpired && getRefreshToken()) {
      return fetchRefreshToken(getRefreshToken())
        .then((tokensPair) => {
          setTokens(tokensPair.accessToken, tokensPair.refreshToken);
          return requestOnce<T>(url, options);
        })
        .catch(() => {
          clearTokens();
          return Promise.reject("Failed to refresh tokens");
        });
    }
    return Promise.reject(e);
  });
};

export const requestOnce = async <T>(url: string, options: Options = { method: HttpMethod.GET }) => {
  const shouldHaveBody = options.method === HttpMethod.POST || options.method === HttpMethod.PATCH;
  const headers = new Headers({ "content-type": "application/json" });
  if (options.authorization) {
    headers.append("authorization", `Bearer ${getAccessToken()}`);
  }
  const res = await fetch(url, {
    method: options.method,
    body: shouldHaveBody ? JSON.stringify(options.body) : undefined,
    headers,
  });
  if (res.status === 401) {
    return Promise.reject({
      isJwtExpired: true,
    });
  }
  return handleFetchResponse<T>(res);
};
