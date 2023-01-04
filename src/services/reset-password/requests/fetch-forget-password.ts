import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpMethod, request } from "../../../app/helpers/request";
import { API_ENDPOINT } from "../../../app/constants";
import { FORGOT_PASSWORD } from "./constants";

type ForgetPasswordRes = {
  success: boolean;
  message: string;
};

type Params = {
  email: string;
};

const endpoint = `${API_ENDPOINT}${FORGOT_PASSWORD}`;

export const fetchForgetPassword = createAsyncThunk<void, Params>("resetPassword/forget", async (payload) => {
  const response = await request<ForgetPasswordRes>(endpoint, {
    method: HttpMethod.POST,
    body: payload,
  });
  if (response.success) {
    return Promise.resolve();
  }
  return Promise.reject("Failed to fetch forgot password");
});
