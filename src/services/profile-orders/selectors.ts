import { RootState } from "../store";

export const selectProfileOrdersConnectionState = (store: RootState) => store.profileOrders.connectionState;
export const selectProfileOrdersOrders = (store: RootState) => store.profileOrders.orders;
