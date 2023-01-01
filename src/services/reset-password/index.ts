import { createSlice } from "@reduxjs/toolkit";
import { fetchForgetPassword } from "./requests";
import { ValueOf } from "../../types";
import { LoadingState } from "../../types/loading-state";

export type ResetPasswordSliceState = {
  loadingState: ValueOf<typeof LoadingState>;
  wasReset: boolean;
};

const initialState: ResetPasswordSliceState = {
  loadingState: LoadingState.IDLE,
  wasReset: false,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    clearWasPasswordReset: (state) => ({ ...state, wasReset: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForgetPassword.pending, (state) => ({ ...state, loadingState: LoadingState.LOADING }));
    builder.addCase(fetchForgetPassword.fulfilled, (state) => ({
      ...state,
      loadingState: LoadingState.SUCCESSFUL,
      wasReset: true,
    }));
    builder.addCase(fetchForgetPassword.rejected, (state) => ({
      ...state,
      loadingState: LoadingState.ERROR,
      wasReset: false,
    }));
  },
});

export const resetPassword = resetPasswordSlice.reducer;
export const { clearWasPasswordReset } = resetPasswordSlice.actions;
export { fetchForgetPassword };
