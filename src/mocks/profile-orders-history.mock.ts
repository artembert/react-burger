import { ProfileOrderDetails } from "../types/profile-order-details";
import { OrderStatusState } from "../types/constants/order-status-state";

const ingredients = [
  "60666c42cc7b410027a1a9b1",
  "60666c42cc7b410027a1a9b5",
  "60666c42cc7b410027a1a9b6",
  "60666c42cc7b410027a1a9b7",
  "60666c42cc7b410027a1a9b4",
  "60666c42cc7b410027a1a9b9",
];
export const profileOrdersHistoryMock: ProfileOrderDetails[] = [
  {
    id: 423412,
    date: new Date(2022, 11, 29, 9, 54),
    ingredientsIds: ingredients,
    price: 320,
    title: "Death Star Starship Main бургер",
    status: OrderStatusState.REJECTED,
  },
  {
    id: 426422,
    date: new Date(2022, 11, 29, 10, 14),
    ingredientsIds: ingredients,
    price: 320,
    title: "Death Star Starship Main бургер",
    status: OrderStatusState.DONE,
  },

  {
    id: 256913,
    date: new Date(2022, 11, 29, 10, 25),
    ingredientsIds: ingredients,
    price: 320,
    title: "Death Star Starship Main бургер",
    status: OrderStatusState.DONE,
  },

  {
    id: 133412,
    date: new Date(2022, 11, 29, 10, 34),
    ingredientsIds: ingredients,
    price: 320,
    title: "Death Star Starship Main бургер",
    status: OrderStatusState.IN_PROGRESS,
  },
  {
    id: 687444,
    date: new Date(2022, 11, 29, 10, 42),
    ingredientsIds: ingredients,
    price: 320,
    title: "Death Star Starship Main бургер",
    status: OrderStatusState.CREATED,
  },
];
