import { LoadingState } from "../../types/loading-state";
import { auth, AuthSliceState, fetchLogin, fetchLogout, fetchRegister, fetchUpdateUser, fetchUser } from "./index";
import { fetchRefreshTokenThunk } from "./requests/fetch-refresh-token";

describe("auth reducer", () => {
  it("should return initial state", () => {
    expect(auth(undefined, { type: undefined })).toEqual({
      loadingState: LoadingState.IDLE,
      name: null,
      email: null,
      isChecked: false,
    });
  });

  describe("fetchRegister", () => {
    it("should handle fetchRegister.pending", () => {
      const previousState: AuthSliceState = {
        loadingState: LoadingState.IDLE,
        name: null,
        email: null,
        isChecked: false,
      };
      expect(auth(previousState, fetchRegister.pending)).toEqual({
        loadingState: LoadingState.LOADING,
        name: null,
        email: null,
        isChecked: false,
      });
    });

    it("should handle fetchRegister.fulfilled", () => {
      const previousState: AuthSliceState = {
        loadingState: LoadingState.LOADING,
        name: null,
        email: null,
        isChecked: false,
      };
      expect(
        auth(previousState, {
          type: fetchRegister.fulfilled,
          payload: {
            name: "John Snow",
            email: "targarien111!@yahoo.com",
            accessToken: "access.token.jwt",
            refreshToken: "refresh.token.jwt",
          },
        })
      ).toEqual({
        loadingState: LoadingState.SUCCESSFUL,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      });
    });

    it("should handle fetchRegister.rejected", () => {
      const previousState: AuthSliceState = {
        loadingState: LoadingState.LOADING,
        name: null,
        email: null,
        isChecked: false,
      };
      expect(auth(previousState, fetchRegister.rejected)).toEqual({
        loadingState: LoadingState.ERROR,
        name: null,
        email: null,
        isChecked: true,
      });
    });
  });

  describe("fetchLogin", () => {
    it("should handle fetchLogin.pending", () => {
      expect(auth(undefined, fetchLogin.pending)).toEqual({
        loadingState: LoadingState.LOADING,
        name: null,
        email: null,
        isChecked: false,
      });
    });

    it("should handle fetchLogin.fulfilled", () => {
      const previousState: AuthSliceState = {
        loadingState: LoadingState.LOADING,
        name: null,
        email: null,
        isChecked: false,
      };
      expect(
        auth(previousState, {
          type: fetchLogin.fulfilled,
          payload: {
            name: "John Snow",
            email: "targarien111!@yahoo.com",
            accessToken: "access.token.jwt",
            refreshToken: "refresh.token.jwt",
          },
        })
      ).toEqual({
        loadingState: LoadingState.SUCCESSFUL,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      });
    });

    it("should handle fetchLogin.rejected", () => {
      const previousState: AuthSliceState = {
        loadingState: LoadingState.LOADING,
        name: null,
        email: null,
        isChecked: false,
      };
      expect(auth(previousState, fetchLogin.rejected)).toEqual({
        loadingState: LoadingState.ERROR,
        name: null,
        email: null,
        isChecked: true,
      });
    });
  });

  describe("fetchLogout", () => {
    it("should handle fetchLogout.pending", () => {
      const previousState: AuthSliceState = {
        loadingState: LoadingState.SUCCESSFUL,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      };
      expect(auth(previousState, fetchLogout.pending)).toEqual({
        loadingState: LoadingState.LOADING,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      });
    });

    it("should handle fetchLogout.fulfilled", () => {
      const previousState: AuthSliceState = {
        loadingState: LoadingState.LOADING,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      };
      expect(auth(previousState, fetchLogout.fulfilled)).toEqual({
        loadingState: LoadingState.SUCCESSFUL,
        name: null,
        email: null,
        isChecked: true,
      });
    });

    it("should handle fetchLogout.rejected", () => {
      const previousState: AuthSliceState = {
        loadingState: LoadingState.LOADING,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      };
      expect(auth(previousState, fetchLogout.rejected)).toEqual({
        loadingState: LoadingState.ERROR,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      });
    });
  });

  describe("fetchUser", () => {
    it("should handle fetchUser.pending", () => {
      expect(auth(undefined, fetchUser.pending)).toEqual({
        loadingState: LoadingState.LOADING,
        name: null,
        email: null,
        isChecked: false,
      });
    });

    it("should handle fetchUser.fulfilled", () => {
      const previousState: AuthSliceState = {
        loadingState: LoadingState.LOADING,
        name: null,
        email: null,
        isChecked: false,
      };
      expect(
        auth(previousState, {
          type: fetchUser.fulfilled,
          payload: {
            name: "John Snow",
            email: "targarien111!@yahoo.com",
          },
        })
      ).toEqual({
        loadingState: LoadingState.SUCCESSFUL,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      });
    });

    it("should handle fetchUser.rejected", () => {
      const previousState: AuthSliceState = {
        loadingState: LoadingState.LOADING,
        name: null,
        email: null,
        isChecked: false,
      };
      expect(auth(previousState, fetchUser.rejected)).toEqual({
        loadingState: LoadingState.ERROR,
        name: null,
        email: null,
        isChecked: true,
      });
    });
  });

  describe("fetchUpdateUser", () => {
    it("should handle fetchUpdateUser.pending", () => {
      const previousState: AuthSliceState = {
        loadingState: LoadingState.SUCCESSFUL,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      };
      expect(auth(previousState, fetchUpdateUser.pending)).toEqual({
        loadingState: LoadingState.LOADING,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      });
    });

    it("should handle fetchUpdateUser.fulfilled", () => {
      const previousState: AuthSliceState = {
        loadingState: LoadingState.LOADING,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      };
      expect(
        auth(previousState, {
          type: fetchUpdateUser.fulfilled,
          payload: {
            name: "John Snow",
            email: "targarien111!@yahoo.com",
          },
        })
      ).toEqual({
        loadingState: LoadingState.SUCCESSFUL,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      });
    });

    it("should handle fetchUpdateUser.rejected", () => {
      const previousState: AuthSliceState = {
        loadingState: LoadingState.LOADING,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      };
      expect(auth(previousState, fetchUpdateUser.rejected)).toEqual({
        loadingState: LoadingState.ERROR,
        name: "John Snow",
        email: "targarien111!@yahoo.com",
        isChecked: true,
      });
    });
  });

  it("should clear session when fetchRefreshTokenThunk.rejected", () => {
    const previousState: AuthSliceState = {
      loadingState: LoadingState.LOADING,
      name: "John Snow",
      email: "targarien111!@yahoo.com",
      isChecked: true,
    };
    expect(auth(previousState, fetchRefreshTokenThunk.rejected)).toEqual({
      loadingState: LoadingState.ERROR,
      name: null,
      email: null,
      isChecked: true,
    });
  });
});
