import { RootState } from "../store";
import { ResetPasswordSliceState } from "./index";

export const selectResetPasswordLoadingState = (store: RootState): ResetPasswordSliceState["loadingState"] =>
  store.resetPassword.loadingState;
export const selectResetPasswordWasForget = (store: RootState) => store.resetPassword.wasForget;
