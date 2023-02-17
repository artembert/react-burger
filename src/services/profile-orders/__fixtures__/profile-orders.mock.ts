import { OrderHistoryRes } from "../../../types/order-history-res";

export const profileOrdersMock: OrderHistoryRes = {
  success: true,
  orders: [
    {
      _id: "63de78bc936b17001be58dd8",
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cd",
      ],
      status: "pending",
      name: "Space краторный бургер",
      createdAt: "2023-02-04T15:24:44.272Z",
      updatedAt: "2023-02-04T15:24:44.683Z",
      number: 39234,
    },
    {
      _id: "63de787b936b17001be58dd6",
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733cd",
      ],
      status: "done",
      name: "Space краторный антарианский бургер",
      createdAt: "2023-02-04T15:23:39.480Z",
      updatedAt: "2023-02-04T15:23:39.867Z",
      number: 39233,
    },
    {
      _id: "63de7859936b17001be58dd5",
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733cd",
      ],
      status: "done",
      name: "Space краторный антарианский бургер",
      createdAt: "2023-02-04T15:23:05.657Z",
      updatedAt: "2023-02-04T15:23:06.139Z",
      number: 39232,
    },
  ],
  total: 39143,
  totalToday: 114,
};
