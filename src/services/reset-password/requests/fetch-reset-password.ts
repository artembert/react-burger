import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpMethod, request } from "../../../app/helpers/request";
import { API_ENDPOINT } from "../../../app/constants";
import { RESET_PASSWORD } from "./constants";

type ResetPasswordRes = {
  success: boolean;
  message: string;
};

type Params = {
  password: string;
  token: string;
};

const endpoint = `${API_ENDPOINT}${RESET_PASSWORD}`;

export const fetchResetPassword = createAsyncThunk<void, Params>("resetPassword/reset", async (payload) => {
  const response = await request<ResetPasswordRes>(endpoint, {
    method: HttpMethod.POST,
    body: payload,
  });
  if (response.success) {
    return Promise.resolve();
  }
  return Promise.reject("Failed to reset password");
});
