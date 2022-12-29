import { RootState } from "../store";

export const selectAuthIsAuthorized = (store: RootState) =>
  store.auth.isAuthorized && store.auth.name && store.auth.email;
