import { RootState } from "../store";
import { OrderDetailsSliceState } from "./index";

export const selectOrderDetailsLoadingSate = (store: RootState): OrderDetailsSliceState["loadingState"] =>
  store.orderDetails.loadingState;

export const selectOrderDetailsDetails = (store: RootState) => store.orderDetails.details;

export const selectIsOrderDetailsPopupOpen = (store: RootState) => store.orderDetails.isPopupOpen;
