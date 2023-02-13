import { profileOrders, connectionError, connectionSuccess, getMessage, onCloseConnection } from "./index";
import { WsConnectionState } from "../../types/ws-connection-state";
import { profileOrdersMock } from "./__fixtures__/profile-orders.mock";
import { ProfileOrdersSliceState } from "./index";

describe("feed reducer", () => {
  it("should return initial state", () => {
    expect(profileOrders(undefined, { type: undefined })).toEqual({
      ordersInProgress: [],
      orders: [],
      ordersInDone: [],
      total: null,
      totalToday: null,
      connectionState: WsConnectionState.IDLE,
    });
  });

  it("should handle success connection", () => {
    expect(profileOrders(undefined, connectionSuccess)).toEqual({
      ordersInProgress: [],
      orders: [],
      ordersInDone: [],
      total: null,
      totalToday: null,
      connectionState: WsConnectionState.CONNECTED,
    });
  });

  it("should handle connection error", () => {
    const previousState: ProfileOrdersSliceState = {
      ordersInProgress: [],
      orders: [],
      ordersInDone: [],
      total: null,
      totalToday: null,
      connectionState: WsConnectionState.CONNECTED,
    };
    expect(profileOrders(previousState, connectionError)).toEqual({
      ordersInProgress: [],
      orders: [],
      ordersInDone: [],
      total: null,
      totalToday: null,
      connectionState: WsConnectionState.ERROR,
    });
  });

  it("should handle connection close", () => {
    const previousState: ProfileOrdersSliceState = {
      ordersInProgress: [],
      orders: [],
      ordersInDone: [],
      total: null,
      totalToday: null,
      connectionState: WsConnectionState.CONNECTED,
    };
    expect(profileOrders(previousState, onCloseConnection)).toEqual({
      ordersInProgress: [],
      orders: [],
      ordersInDone: [],
      total: null,
      totalToday: null,
      connectionState: WsConnectionState.IDLE,
    });
  });

  it("should handle message from Socket", () => {
    const previousState: ProfileOrdersSliceState = {
      ordersInProgress: [],
      orders: [],
      ordersInDone: [],
      total: null,
      totalToday: null,
      connectionState: WsConnectionState.CONNECTED,
    };
    expect(profileOrders(previousState, getMessage(profileOrdersMock))).toEqual({
      ordersInProgress: [39234],
      orders: [
        {
          id: "63de78bc936b17001be58dd8",
          ingredientsIds: [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733cd",
          ],
          status: "pending",
          title: "Space краторный бургер",
          date: new Date("2023-02-04T15:24:44.272Z"),
          number: 39234,
        },
        {
          id: "63de787b936b17001be58dd6",
          ingredientsIds: [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733cf",
            "60d3b41abdacab0026a733cd",
          ],
          status: "done",
          title: "Space краторный антарианский бургер",
          date: new Date("2023-02-04T15:23:39.480Z"),
          number: 39233,
        },
        {
          id: "63de7859936b17001be58dd5",
          ingredientsIds: [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733cf",
            "60d3b41abdacab0026a733cd",
          ],
          status: "done",
          title: "Space краторный антарианский бургер",
          date: new Date("2023-02-04T15:23:05.657Z"),
          number: 39232,
        },
      ],
      ordersInDone: [39233, 39232],
      total: 39143,
      totalToday: 114,
      connectionState: WsConnectionState.CONNECTED,
    });
  });
});
