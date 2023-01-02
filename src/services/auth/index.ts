import { createSlice } from "@reduxjs/toolkit";
import { ValueOf } from "../../types";
import { LoadingState } from "../../types/loading-state";
import { fetchLogin, fetchLogout, fetchRegister, fetchUser } from "./requests";
import { clearTokens, setTokens } from "../token";

export type AuthSliceState = {
  name: string | null;
  email: string | null;
  loadingState: ValueOf<typeof LoadingState>;
  isAuthorized: boolean;
};

const initialState: AuthSliceState = {
  loadingState: LoadingState.IDLE,
  name: null,
  email: null,
  isAuthorized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state) => {
      state.loadingState = LoadingState.LOADING;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      setTokens(action.payload.accessToken, action.payload.refreshToken);
      state.loadingState = LoadingState.SUCCESSFUL;
      state.isAuthorized = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.email = null;
      state.name = null;
      state.isAuthorized = false;
      state.loadingState = LoadingState.ERROR;
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.loadingState = LoadingState.LOADING;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      setTokens(action.payload.accessToken, action.payload.refreshToken);
      state.loadingState = LoadingState.SUCCESSFUL;
      state.isAuthorized = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.email = null;
      state.name = null;
      state.isAuthorized = false;
      state.loadingState = LoadingState.ERROR;
    });
    builder.addCase(fetchLogout.pending, (state) => {
      state.loadingState = LoadingState.LOADING;
    });
    builder.addCase(fetchLogout.fulfilled, (state) => {
      clearTokens();
      state.loadingState = LoadingState.SUCCESSFUL;
      state.isAuthorized = false;
      state.email = null;
      state.name = null;
    });
    builder.addCase(fetchLogout.rejected, (state) => {
      state.loadingState = LoadingState.ERROR;
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.loadingState = LoadingState.LOADING;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loadingState = LoadingState.SUCCESSFUL;
      state.isAuthorized = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.email = null;
      state.name = null;
      state.isAuthorized = false;
      state.loadingState = LoadingState.ERROR;
    });
  },
});

export const auth = authSlice.reducer;
export { fetchRegister, fetchLogin, fetchLogout, fetchUser };
