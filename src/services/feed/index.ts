import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ValueOf } from "../../types";
import { TWsConnectionState, WsConnectionState } from "../../types/ws-connection-state";
import { OrderHistoryRes } from "../../types/order-history-res";
import { FeedState } from "../../types/feed-state";
import { covertOrderHistoryRes } from "./helpers/covert-order-history-res.helper";

export type FeedSliceState = FeedState & {
  connectionState: TWsConnectionState;
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
    openFeedConnection: (state, action: PayloadAction<{ url: string }>) => {},
    closeFeedConnection: () => {},
    feedConnectionSuccess: (state, action: PayloadAction<Event>) => {
      state.connectionState = WsConnectionState.CONNECTED;
    },
    feedConnectionError: (state, action: PayloadAction<Event>) => {
      state.connectionState = WsConnectionState.ERROR;
    },
    onCloseFeedConnection: (state, action: PayloadAction<CloseEvent>) => {
      state.connectionState = WsConnectionState.IDLE;
    },
    getFeedMessage: (state, action: PayloadAction<OrderHistoryRes>) => {
      const { orders, total, totalToday, ordersInProgress, ordersInDone } = covertOrderHistoryRes(action.payload);
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
      state.ordersInProgress = ordersInProgress;
      state.ordersInDone = ordersInDone;
    },
    sendFeedMessage: (state, action: PayloadAction<CloseEvent>) => {},
  },
});

export const feed = feedSlice.reducer;
export const {
  openFeedConnection,
  closeFeedConnection,
  feedConnectionSuccess,
  feedConnectionError,
  onCloseFeedConnection,
  getFeedMessage,
  sendFeedMessage,
} = feedSlice.actions;

export type FeedActions = ValueOf<typeof feedSlice.actions>;
