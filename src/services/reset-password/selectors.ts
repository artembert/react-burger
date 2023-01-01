import { RootState } from "../store";

export const selectResetPasswordWasReset = (store: RootState) => store.resetPassword.wasReset;
