import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpMethod, requestOnce } from "../../../app/helpers/request";
import { API_ENDPOINT } from "../../../app/constants";
import { TokensPair } from "../../../types/tokens-pair";
import { TOKEN } from "./constants";

const endpoint = `${API_ENDPOINT}${TOKEN}`;

type RefreshTokenRes = {
  success: boolean;
  accessToken: `Bearer ${string}`;
  refreshToken: string;
};

export const fetchRefreshToken: (refreshToken: string) => Promise<TokensPair> = async (refreshToken) => {
  if (!refreshToken) {
    return Promise.reject("No refresh token provide");
  }
  const response = await requestOnce<RefreshTokenRes>(endpoint, {
    method: HttpMethod.POST,
    body: { token: refreshToken },
  });
  if (response.success) {
    return {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
  }
  return Promise.reject("Failed to refresh token");
};

export const fetchRefreshTokenThunk = createAsyncThunk("auth/refreshToken", () => fetchRefreshToken);
