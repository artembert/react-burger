import { handleFetchResponse } from "../../../app/helpers/handle-fetch-response";

export type NewOrderReqBody = {
  ingredients: string[];
};

type NewOrderDto = {
  name: string;
  order: {
    number: number;
  };
};

type NewOrderRes = NewOrderDto & {
  success: boolean;
};

const newOrderDetailsEndpoint = "https://norma.nomoreparties.space/api/orders";

export const makeNewOrderRequest = async (body: NewOrderReqBody): Promise<NewOrderDto> => {
  const response = await fetch(newOrderDetailsEndpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "content-type": "application/json",
    }),
  });
  const payload = await handleFetchResponse<NewOrderRes>(response);
  if (payload.success) {
    return {
      name: payload.name,
      order: payload.order,
    };
  }
  return Promise.reject("Failed to detch burger ingredients");
};
