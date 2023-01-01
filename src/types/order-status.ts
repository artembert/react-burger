import { ValueOf } from "../types";
import { OrderStatusState } from "./constants/order-status-state";

export type OrderStatus = ValueOf<typeof OrderStatusState>;
