import { OrderHistoryDetails } from "./order-history-details";

export type FeedState = {
  orders: OrderHistoryDetails[];
  total: number | null;
  totalToday: number | null;
  ordersInProgress: number[];
  ordersInDone: number[];
};
