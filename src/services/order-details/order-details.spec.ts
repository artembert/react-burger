import {
  closeOrderDetailsPopup,
  makeOrder,
  openOrderDetailsPopup,
  orderDetails,
  OrderDetailsSliceState,
} from "./index";
import { LoadingState } from "../../types/loading-state";
import { orderDetailsMock } from "./__fixtures__/order-details.mock";

describe("orderDetails reducer", () => {
  it("should return initial state", () => {
    expect(orderDetails(undefined, { type: undefined })).toEqual({
      isPopupOpen: false,
      loadingState: LoadingState.IDLE,
      details: null,
    });
  });

  it("should handle openOrderDetailsPopup()", () => {
    expect(orderDetails(undefined, openOrderDetailsPopup())).toEqual({
      isPopupOpen: true,
      loadingState: LoadingState.IDLE,
      details: null,
    });
  });

  it("should handle closeOrderDetailsPopup()", () => {
    const previousState: OrderDetailsSliceState = {
      isPopupOpen: true,
      loadingState: LoadingState.IDLE,
      details: orderDetailsMock,
    };
    expect(orderDetails(previousState, closeOrderDetailsPopup())).toEqual({
      isPopupOpen: false,
      loadingState: LoadingState.IDLE,
      details: orderDetailsMock,
    });
  });

  it("should handle makeOrder.pending", () => {
    expect(orderDetails(undefined, makeOrder.pending)).toEqual({
      isPopupOpen: false,
      loadingState: LoadingState.LOADING,
      details: null,
    });
  });

  it("should handle makeOrder.fulfilled", () => {
    const previousState: OrderDetailsSliceState = {
      isPopupOpen: true,
      loadingState: LoadingState.LOADING,
      details: null,
    };
    expect(
      orderDetails(previousState, {
        type: makeOrder.fulfilled.type,
        payload: {
          name: "Хвощ подкустовный",
          order: {
            number: 4234234,
          },
        },
      })
    ).toEqual({
      isPopupOpen: true,
      loadingState: LoadingState.SUCCESSFUL,
      details: {
        name: "Хвощ подкустовный",
        number: 4234234,
      },
    });
  });

  it("should handle makeOrder.rejected", () => {
    const previousState: OrderDetailsSliceState = {
      isPopupOpen: true,
      loadingState: LoadingState.LOADING,
      details: null,
    };
    expect(
      orderDetails(previousState, {
        type: makeOrder.rejected.type,
      })
    ).toEqual({
      isPopupOpen: true,
      loadingState: LoadingState.ERROR,
      details: null,
    });
  });
});
