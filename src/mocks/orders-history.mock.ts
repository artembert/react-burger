import { OrderHistoryDetails } from "../types/order-history-details";
import { OrderStatusState } from "../types/constants/order-status-state";

const ingredients = [
  "60d3b41abdacab0026a733c6",
  "60d3b41abdacab0026a733c7",
  "60d3b41abdacab0026a733c8",
  "60d3b41abdacab0026a733c9",
  "60d3b41abdacab0026a733ca",
  "60d3b41abdacab0026a733cb",
  "60d3b41abdacab0026a733cc",
  "60d3b41abdacab0026a733cd",
  "60d3b41abdacab0026a733ce",
  "60d3b41abdacab0026a733cf",
  "60d3b41abdacab0026a733d0",
  "60d3b41abdacab0026a733d1",
  "60d3b41abdacab0026a733d2",
  "60d3b41abdacab0026a733d3",
  "60d3b41abdacab0026a733d4",
];
export const profileOrdersHistoryMock: OrderHistoryDetails[] = [
  {
    id: "a423412f",
    number: 423412,
    date: new Date(2022, 11, 29, 9, 54),
    ingredientsIds: ingredients.slice(0, 4),
    title: "Death Star Starship Main бургер",
    status: OrderStatusState.PENDING,
  },
  {
    id: "a426422f",
    number: 426422,
    date: new Date(2022, 11, 29, 10, 14),
    ingredientsIds: ingredients.slice(0, 6),
    title: "Death Star Starship Main бургер",
    status: OrderStatusState.DONE,
  },

  {
    id: "a256913f",
    number: 256913,
    date: new Date(2022, 11, 29, 10, 25),
    ingredientsIds: ingredients.slice(0, 7),
    title: "Death Star Starship Main бургер",
    status: OrderStatusState.DONE,
  },

  {
    id: "a133412f",
    number: 133412,
    date: new Date(2022, 11, 29, 10, 34),
    ingredientsIds: ingredients.slice(0, 11),
    title: "Death Star Starship Main бургер",
    status: OrderStatusState.PENDING,
  },
  {
    id: "a687444f",
    number: 687444,
    date: new Date(2022, 11, 29, 10, 42),
    ingredientsIds: ingredients.slice(0, 14),
    title: "Death Star Starship Main бургер",
    status: OrderStatusState.CREATED,
  },
];

export const ordersHistoryMock = profileOrdersHistoryMock.map((item) => ({ ...item, status: undefined }));

export const ordersIds = ["034533", "034532", "034530", "034527", "034525", "034538", "034541", "034542"];
