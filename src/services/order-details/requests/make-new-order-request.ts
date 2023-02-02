import { HttpMethod, request } from "../../../app/helpers/request";
import { API_ENDPOINT } from "../../../app/constants";

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

const newOrderDetailsEndpoint = `${API_ENDPOINT}/orders`;

export const makeNewOrderRequest = async (body: NewOrderReqBody): Promise<NewOrderDto> => {
  const response = await request<NewOrderRes>(newOrderDetailsEndpoint, {
    method: HttpMethod.POST,
    body,
    authorization: true,
  });
  if (response.success) {
    return {
      name: response.name,
      order: response.order,
    };
  }
  return Promise.reject("Failed to make a new order");
};
