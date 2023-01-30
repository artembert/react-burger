import { OrderStatus } from "./order-status";

export type OrderHistoryDetails = {
  id: number;
  title: string;
  ingredientsIds: string[];
  price: number;
  date: Date;
  status?: OrderStatus;
};
