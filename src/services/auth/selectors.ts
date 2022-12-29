import { RootState } from "../store";
import { AuthSliceState } from "./index";

export const selectAuthLoadingState = (store: RootState): AuthSliceState["loadingState"] => store.auth.loadingState;

export const selectAuthIsAuthorized = (store: RootState) =>
  store.auth.isAuthorized && store.auth.name && store.auth.email;
