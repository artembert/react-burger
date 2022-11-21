import { handleFetchResponse } from "./handle-fetch-response";

type Options =
  | {
      method: typeof HttpMethod.GET;
    }
  | {
      body: any;
      method: typeof HttpMethod.POST;
    };

export const HttpMethod = {
  GET: "GET",
  POST: "POST",
} as const;

export const request = async <T>(url: string, options: Options = { method: HttpMethod.GET }) => {
  const res = await fetch(url, {
    method: options.method,
    body: options.method === HttpMethod.POST ? JSON.stringify(options.body) : undefined,
    headers: new Headers({
      "content-type": "application/json",
    }),
  });
  return handleFetchResponse<T>(res);
};
