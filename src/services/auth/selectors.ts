import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AuthSliceState } from "./index";

export const selectAuthLoadingState = (store: RootState): AuthSliceState["loadingState"] => store.auth.loadingState;

export const selectAuthIsChecked = (store: RootState) => store.auth.isChecked;

export const selectAuthUserName = (store: RootState) => store.auth.name;

export const selectAuthUserEmail = (store: RootState) => store.auth.email;

export const selectAuthIsAuthorized = createSelector(
  selectAuthUserName,
  selectAuthUserEmail,
  (name, email) => name !== null && email !== null
);
