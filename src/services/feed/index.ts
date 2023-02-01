import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ValueOf } from "../../types";
import { WsConnectionState } from "../../types/ws-connection-state";
import { OrderHistoryRes } from "../../types/order-history-res";
import { FeedState } from "../../types/feed-state";
import { covertOrderHistoryRes } from "./helpers/covert-order-history-res.helper";

export type FeedSliceState = FeedState & {
  connectionState: ValueOf<typeof WsConnectionState>;
};

const initialState: FeedSliceState = {
  ordersInProgress: [],
  orders: [],
  ordersInDone: [],
  total: null,
  totalToday: null,
  connectionState: WsConnectionState.IDLE,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    openConnection: (state, action: PayloadAction<string>) => {},
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

export const feed = feedSlice.reducer;
export const {
  openConnection,
  closeConnection,
  connectionSuccess,
  connectionError,
  onCloseConnection,
  sendMessage,
  getMessage,
} = feedSlice.actions;

export type FeedActions = ValueOf<typeof feedSlice.actions>;
