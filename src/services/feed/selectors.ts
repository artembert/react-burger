import { RootState } from "../store";

export const selectFeedConnectionState = (store: RootState) => store.feed.connectionState;
export const selectFeedOrders = (store: RootState) => store.feed.orders;
export const selectFeedTotal = (store: RootState) => store.feed.total;
export const selectFeedTotalToday = (store: RootState) => store.feed.totalToday;
export const selectFeedOrdersInDone = (store: RootState) => store.feed.ordersInDone;
export const selectFeedOrdersInProgress = (store: RootState) => store.feed.ordersInProgress;
