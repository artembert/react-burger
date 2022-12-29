import { createSlice } from "@reduxjs/toolkit";
import { ValueOf } from "../../types";
import { LoadingState } from "../../types/loading-state";
import { fetchLogin, fetchRegister } from "./requests";
import { setTokens } from "../token";

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
    builder.addCase(fetchRegister.pending, (state) => ({ ...state, loadingState: LoadingState.LOADING }));
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      setTokens(action.payload.accessToken, action.payload.refreshToken);
      return {
        ...state,
        loadingState: LoadingState.SUCCESSFUL,
        isAuthorized: true,
        email: action.payload.email,
        name: action.payload.name,
      };
    });
    builder.addCase(fetchRegister.rejected, (state) => ({
      ...state,
      email: null,
      name: null,
      isAuthorized: false,
      loadingState: LoadingState.ERROR,
    }));
    builder.addCase(fetchLogin.pending, (state) => ({ ...state, loadingState: LoadingState.LOADING }));
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      setTokens(action.payload.accessToken, action.payload.refreshToken);
      return {
        ...state,
        loadingState: LoadingState.SUCCESSFUL,
        isAuthorized: true,
        email: action.payload.email,
        name: action.payload.name,
      };
    });
    builder.addCase(fetchLogin.rejected, (state) => ({
      ...state,
      email: null,
      name: null,
      isAuthorized: false,
      loadingState: LoadingState.ERROR,
    }));
  },
});

export const {} = authSlice.actions;
export const auth = authSlice.reducer;
export { fetchRegister, fetchLogin };
