import { OrderStatus } from "./order-status";

export type ProfileOrderDetails = {
  id: number;
  title: string;
  status: OrderStatus;
  ingredientsIds: string[];
  price: number;
  date: Date;
};
