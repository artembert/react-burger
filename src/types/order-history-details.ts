import { OrderStatus } from "./order-status";

export type OrderHistoryDetails = {
  id: number;
  title: string;
  ingredientsIds: string[];
  date: Date;
  status?: OrderStatus;
};
