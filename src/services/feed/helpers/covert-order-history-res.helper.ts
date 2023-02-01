import { OrderHistoryRes } from "../../../types/order-history-res";
import { FeedState } from "../../../types/feed-state";
import { OrderStatusState } from "../../../types/constants/order-status-state";
import { isStatus } from "../../../types/order-status";

export const covertOrderHistoryRes = (res: OrderHistoryRes): FeedState => {
  return {
    orders: res.orders.map((item) => ({
      id: item._id,
      ingredientsIds: item.ingredients,
      title: item.name,
      number: item.number,
      date: new Date(item.createdAt),
      status: isStatus(item.status) ? item.status : OrderStatusState.CREATED,
    })),
    ordersInProgress: res.orders
      .filter((item) => item.status.toUpperCase() === OrderStatusState.IN_PROGRESS.toUpperCase())
      .map((item) => item.number),
    ordersInDone: res.orders
      .filter((item) => item.status.toUpperCase() === OrderStatusState.DONE.toUpperCase())
      .map((item) => item.number),
    total: res.total,
    totalToday: res.totalToday,
  };
};
