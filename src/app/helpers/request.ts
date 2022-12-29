import { getAccessToken } from "../../services/token";
import { handleFetchResponse } from "./handle-fetch-response";

type Options =
  | {
      authorization?: boolean;
      method: typeof HttpMethod.GET;
    }
  | {
      body: any;
      method: typeof HttpMethod.POST;
      authorization?: boolean;
    };

export const HttpMethod = {
  GET: "GET",
  POST: "POST",
} as const;

export const request = async <T>(url: string, options: Options = { method: HttpMethod.GET }) => {
  const headers = new Headers({ "content-type": "application/json" });
  if (options.authorization) {
    headers.append("authorization", `Bearer ${getAccessToken()}`);
  }
  const res = await fetch(url, {
    method: options.method,
    body: options.method === HttpMethod.POST ? JSON.stringify(options.body) : undefined,
    headers,
  });
  return handleFetchResponse<T>(res);
};
