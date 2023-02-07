import { request } from "../../../app/helpers/request";
import { API_ENDPOINT } from "../../../app/constants";
import { ORDERS } from "./constants";
import { OrderHistoryDetails } from "../../../types/order-history-details";
import { mapOrderFromHistoryRes } from "../../../app/helpers/covert-order-history-res.helper";
import { OrderHistoryRes } from "../../../types/order-history-res";

type OrderRes = {
  orders: OrderHistoryRes["orders"];
  success: boolean;
};

const endpoint = (id: string) => `${API_ENDPOINT}${ORDERS}/${id}`;

export const fetchOrder = async (id: string): Promise<OrderHistoryDetails> => {
  const response = await request<OrderRes>(endpoint(id));
  if (response.success) {
    return mapOrderFromHistoryRes(response.orders)[0];
  }
  return Promise.reject("Failed to fetch order");
};
