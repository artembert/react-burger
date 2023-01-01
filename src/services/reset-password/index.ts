import { createSlice } from "@reduxjs/toolkit";
import { fetchForgetPassword, fetchResetPassword } from "./requests";
import { ValueOf } from "../../types";
import { LoadingState } from "../../types/loading-state";

export type ResetPasswordSliceState = {
  loadingState: ValueOf<typeof LoadingState>;
  wasForget: boolean;
  wasReset: boolean;
};

const initialState: ResetPasswordSliceState = {
  loadingState: LoadingState.IDLE,
  wasForget: false,
  wasReset: false,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    clearWasPasswordReset: (state) => ({ ...state, wasReset: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForgetPassword.pending, (state) => {
      state.loadingState = LoadingState.LOADING;
    });
    builder.addCase(fetchForgetPassword.fulfilled, (state) => {
      state.loadingState = LoadingState.SUCCESSFUL;
      state.wasForget = true;
    });
    builder.addCase(fetchForgetPassword.rejected, (state) => {
      state.loadingState = LoadingState.ERROR;
      state.wasForget = false;
    });
    builder.addCase(fetchResetPassword.pending, (state) => {
      state.loadingState = LoadingState.LOADING;
    });
    builder.addCase(fetchResetPassword.fulfilled, (state) => {
      state.loadingState = LoadingState.SUCCESSFUL;
      state.wasReset = true;
    });
    builder.addCase(fetchResetPassword.rejected, (state) => {
      state.loadingState = LoadingState.ERROR;
      state.wasReset = false;
    });
  },
});

export const resetPassword = resetPasswordSlice.reducer;
export const { clearWasPasswordReset } = resetPasswordSlice.actions;
export { fetchForgetPassword, fetchResetPassword };
