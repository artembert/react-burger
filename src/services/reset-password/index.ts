import { createSlice } from "@reduxjs/toolkit";

export type ResetPasswordSliceState = {
  wasReset: boolean;
};

const initialState: ResetPasswordSliceState = {
  wasReset: false,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const resetPassword = resetPasswordSlice.reducer;
