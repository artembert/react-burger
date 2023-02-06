import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ValueOf } from "../../types";
import { TWsConnectionState, WsConnectionState } from "../../types/ws-connection-state";
import { OrderHistoryRes } from "../../types/order-history-res";
import { FeedState } from "../../types/feed-state";
import { covertOrderHistoryRes } from "../../app/helpers/covert-order-history-res.helper";

export type ProfileOrdersSliceState = FeedState & {
  connectionState: TWsConnectionState;
};

const initialState: ProfileOrdersSliceState = {
  ordersInProgress: [],
  orders: [],
  ordersInDone: [],
  total: null,
  totalToday: null,
  connectionState: WsConnectionState.IDLE,
};

const profileOrdersSlice = createSlice({
  name: "profileOrders",
  initialState,
  reducers: {
    openConnection: (state, action: PayloadAction<{ url: string; token: string }>) => {},
    closeConnection: () => {},
    connectionSuccess: (state, action: PayloadAction<Event>) => {
      state.connectionState = WsConnectionState.CONNECTED;
    },
    connectionError: (state, action: PayloadAction<Event>) => {
      state.connectionState = WsConnectionState.ERROR;
    },
    onCloseConnection: (state, action: PayloadAction<CloseEvent>) => {
      state.connectionState = WsConnectionState.IDLE;
    },
    getMessage: (state, action: PayloadAction<OrderHistoryRes>) => {
      const { orders, total, totalToday, ordersInProgress, ordersInDone } = covertOrderHistoryRes(action.payload);
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
      state.ordersInProgress = ordersInProgress;
      state.ordersInDone = ordersInDone;
    },
    sendMessage: (state, action: PayloadAction<CloseEvent>) => {},
  },
});

export const profileOrders = profileOrdersSlice.reducer;
export const {
  openConnection,
  closeConnection,
  connectionSuccess,
  connectionError,
  onCloseConnection,
  sendMessage,
  getMessage,
} = profileOrdersSlice.actions;

export type ProfileOrdersActions = ValueOf<typeof profileOrdersSlice.actions>;
