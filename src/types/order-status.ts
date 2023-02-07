import { ValueOf } from "../types";
import { OrderStatusState } from "./constants/order-status-state";

export type OrderStatus = ValueOf<typeof OrderStatusState>;

export const isStatus = (value: string): value is OrderStatus =>
  value === OrderStatusState.DONE || value === OrderStatusState.PENDING || value === OrderStatusState.CREATED;
