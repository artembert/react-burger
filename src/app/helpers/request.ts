import { getAccessToken } from "../../services/token";
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

export const request = async <T>(url: string, options: Options = { method: HttpMethod.GET }) => {
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
  // TODO: check if token expired
  return handleFetchResponse<T>(res);
};
