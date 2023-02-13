import { LoadingState } from "../../types/loading-state";
import {
  clearWasPasswordReset,
  fetchForgetPassword,
  fetchResetPassword,
  resetPassword,
  ResetPasswordSliceState,
} from "./index";

describe("resetPassword reducer", () => {
  it("should return initial state", () => {
    expect(resetPassword(undefined, { type: undefined })).toEqual({
      loadingState: LoadingState.IDLE,
      wasForget: false,
      wasReset: false,
    });
  });

  it("should handle clearWasPasswordReset()", () => {
    const previousState: ResetPasswordSliceState = {
      loadingState: LoadingState.IDLE,
      wasForget: false,
      wasReset: true,
    };
    expect(resetPassword(previousState, clearWasPasswordReset())).toEqual({
      loadingState: LoadingState.IDLE,
      wasForget: false,
      wasReset: false,
    });
  });

  it("should handle fetchForgetPassword.pending", () => {
    const previousState: ResetPasswordSliceState = {
      loadingState: LoadingState.IDLE,
      wasForget: false,
      wasReset: false,
    };
    expect(resetPassword(previousState, fetchForgetPassword.pending)).toEqual({
      loadingState: LoadingState.LOADING,
      wasForget: false,
      wasReset: false,
    });
  });

  it("should handle fetchForgetPassword.fulfilled", () => {
    const previousState: ResetPasswordSliceState = {
      loadingState: LoadingState.LOADING,
      wasForget: false,
      wasReset: false,
    };
    expect(resetPassword(previousState, fetchForgetPassword.fulfilled)).toEqual({
      loadingState: LoadingState.SUCCESSFUL,
      wasForget: true,
      wasReset: false,
    });
  });

  it("should handle fetchForgetPassword.rejected", () => {
    const previousState: ResetPasswordSliceState = {
      loadingState: LoadingState.LOADING,
      wasForget: false,
      wasReset: false,
    };
    expect(resetPassword(previousState, fetchForgetPassword.rejected)).toEqual({
      loadingState: LoadingState.ERROR,
      wasForget: false,
      wasReset: false,
    });
  });

  it("should handle fetchResetPassword.pending", () => {
    const previousState: ResetPasswordSliceState = {
      loadingState: LoadingState.IDLE,
      wasForget: true,
      wasReset: false,
    };
    expect(resetPassword(previousState, fetchResetPassword.pending)).toEqual({
      loadingState: LoadingState.LOADING,
      wasForget: true,
      wasReset: false,
    });
  });

  it("should handle fetchResetPassword.fulfilled", () => {
    const previousState: ResetPasswordSliceState = {
      loadingState: LoadingState.LOADING,
      wasForget: true,
      wasReset: false,
    };
    expect(resetPassword(previousState, fetchResetPassword.fulfilled)).toEqual({
      loadingState: LoadingState.SUCCESSFUL,
      wasForget: true,
      wasReset: true,
    });
  });

  it("should handle fetchResetPassword.rejected", () => {
    const previousState: ResetPasswordSliceState = {
      loadingState: LoadingState.LOADING,
      wasForget: true,
      wasReset: false,
    };
    expect(resetPassword(previousState, fetchResetPassword.rejected)).toEqual({
      loadingState: LoadingState.ERROR,
      wasForget: true,
      wasReset: false,
    });
  });
});
