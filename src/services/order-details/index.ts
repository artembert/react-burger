import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LoadingState} from "../../types/loading-state";
import {makeNewOrderRequest, NewOrderReqBody} from "./requests/make-new-order-request";
import {LoadingStatus} from "../../types/loading-status";

export type OrderDetailsSliceState = {
  isPopupOpen: boolean;
  loadingState: LoadingStatus;
  details: null | {
    name: string;
    number: number;
  };
};

const initialState: OrderDetailsSliceState = {
  isPopupOpen: false,
  loadingState: LoadingState.IDLE,
  details: null,
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    openOrderDetailsPopup(state) {
      state.isPopupOpen = true;
    },
    closeOrderDetailsPopup(state) {
      state.isPopupOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeOrder.pending, (state) => ({...state, loadingState: LoadingState.LOADING}));
    builder.addCase(makeOrder.fulfilled, (state, action) => ({
      ...state,
      loadingState: LoadingState.SUCCESSFUL,
      details: {
        name: action.payload.name,
        number: action.payload.order.number,
      },
    }));
    builder.addCase(makeOrder.rejected, (state) => ({
      ...state,
      loadingState: LoadingState.ERROR,
      details: null,
    }));
  },
});

export const makeOrder = createAsyncThunk("orderDetails/makeOrder", async (body: NewOrderReqBody, {dispatch}) => {

  dispatch(openOrderDetailsPopup());
  return makeNewOrderRequest(body);
});

export const {openOrderDetailsPopup, closeOrderDetailsPopup} = orderDetailsSlice.actions;
export const orderDetails = orderDetailsSlice.reducer;
